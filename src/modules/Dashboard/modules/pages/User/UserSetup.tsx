import { Dispatch, FC, SetStateAction, useContext, useEffect, useState } from 'react'
import setupImg from '../../../../../assets/Kindergarten student-bro 1.webp'
import { CustomInput } from '../../../components/CustomInput/CustomInput'
import { CustomSelect } from '../../../components/CustomSelect/CustomSelect'
import '../../components/Setup.scss'
import { initialState, selectProps } from '../../utils/setupUtils'
import * as yup from 'yup'
import { showAlert, Error, Success } from '../../../components/Error/Alerts'
import { createUser, fetchUserByRoles, fetchUserRoles, updateUserDataFn } from './UserApi'
import { fetchDistricts } from '../School/SchoolAPI'
import Select, { OptionProps, OptionContext } from 'react-select'
import { UserTableProps as UserProps } from './UserTable'
import { privateGateway } from '../../../../../services/apiGateway'
import { campusRoutes } from '../../../../../services/urls'
import styles from './UserSetup.module.css'
import { toast } from 'react-toastify'
import { OptionDistrict, OptionZone } from '../../../../../utils/Locations'
import { GlobalContext } from '../../../../../utils/GlobalVariable'
interface UserTableProps {
    setViewSetup: Dispatch<SetStateAction<boolean>>
    updateUserData: Function
    updateUser?: any
    resetUpdateUser: () => void
}
interface Option {
    value: string;
    label: string;
    clearableValue?: boolean;
}
const UserSetup: FC<UserTableProps> = ({ setViewSetup, updateUserData, updateUser, resetUpdateUser }) => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState<string>("")
    const [password, setPassword] = useState('')
    const [role, setRole] = useState(initialState)
    const { roles } = useContext(GlobalContext)
    const [roleList, setRoleList] = useState<selectProps[]>([])
    const [district, setDistrict] = useState<selectProps>({} as selectProps)
    const [districtList, setDistrictList] = useState<selectProps[]>(OptionDistrict)
    const [zone, setZone] = useState<selectProps>({} as selectProps)
    const [zoneList, setZoneList] = useState<selectProps[]>(OptionZone)
    const [coordinator, setCoordinator] = useState<selectProps>({} as selectProps)
    const [coordinatorRoleBasedList, setCoordinatorRoleBasedList] = useState<UserProps[]>([] as UserProps[])
    const [instituteList, setInstituteList] = useState<selectProps[]>([])
    const [selectedInstitute, setSelectedInstitute] = useState<selectProps[]>([])
    const [showPassword, setShowPassword] = useState<boolean>(false)

    const reset = () => {
        setName("")
        setEmail("")
        setPhone("")
        setPassword("")
        setRole(initialState)
        setViewSetup(false)
        resetUpdateUser()
    }

    useEffect(() => {
        if (roles.length) {
            setRoleList(roles)
        }
        if (role.id === 'IN') {
            fetchUserByRoles(setCoordinatorRoleBasedList)
        }
        if (district.id && role.id === 'IN') {
            getSelectedInstitutes(district.name, setInstituteList)
        }
    }, [coordinator, role, roles, district])
    useEffect(() => {
        if (updateUser?.id) {
            setName(updateUser.name)
            setEmail(updateUser.email)
            setPhone(updateUser.phone)
            setRole(updateUser.role)
            setDistrict(updateUser.district)
            setZone(updateUser.zone)
            setSelectedInstitute(updateUser.institutes)
        }
    }, [updateUser])

    function validateSchema() {
        const validate = yup.object({
            name: yup.string().required('Name is required').test('only-spaces', 'Only spaces are not allowed for user name', value => {
                // Check if the value consists only of spaces
                return !(/^\s+$/.test(value));
            }),
            email: yup.string().email('Invalid email').required('Email is required'),
            phone: yup.string()
                .required('Phone is required')
                .test('valid-phone', 'Invalid phone number', value => {
                    // Check for valid phone number format
                    if (!value) return false;

                    const hasPlusSign = value.includes('+');
                    const numericPart = hasPlusSign ? value.replace('+', '') : value;

                    if (hasPlusSign && numericPart.length > 13) {
                        return false;
                    }

                    if (!hasPlusSign && numericPart.length > 12) {
                        return false;
                    }

                    return /^\d{10,12}$/.test(numericPart);
                }),
            password: yup.string().required('Password is required').test('only-spaces', 'Only spaces are not allowed for password', value => {
                // Check if the value consists only of spaces
                return !(/^\s+$/.test(value));
            }),
            role: yup.string().required('Role is required'),
        })
        return validate.validate(
            {
                name: name,
                email: email,
                phone: phone,
                password: password,
                role: role.name,
            },
            { abortEarly: false }
        )
    }

    function handleCreate() {

        validateSchema().then(() =>
            createUser(name, email.trim(), phone, role.id, password.trim(), district.name, zone.name, updateUserData, setViewSetup, coordinator.id, selectedInstitute)
        )
            .catch(err => err.errors.map((error: string) => toast.error(error)))

    }
    function handleUpdate() {
        updateUserDataFn(updateUser.id, name, email.trim(), phone, role.id, updateUserData, setViewSetup, selectedInstitute, resetUpdateUser)
    }

    const handleOptionRemove = (
        selectedOption: any,
        { action, removedValue }: { action: string; removedValue: any }
    ) => {
        if (action === 'remove') {
            // Disable clearing of selected options
            return !(removedValue as any).clearableValue;
        }
        return true;
    };
    return (
        <div className="white-container">
            <h3>{updateUser?.id ? 'Update ' : ' Setup'} a User</h3>
            <div className="setup-club">
                <div className="setup-filter">
                    <div className="select-container club">
                        <CustomInput value="Name" setData={setName} data={name} />
                        <CustomInput value="Email" type='email' setData={setEmail} data={email} />
                        <CustomInput value="Phone" type='phone' setData={setPhone} data={phone} />
                        <CustomSelect
                            option={roleList}
                            header='Role'
                            setData={updateUser?.role ? undefined : setRole}
                            isSearchable={false}
                            isClearable={false}
                            value={updateUser?.role ? role : undefined}
                            isDisabled={updateUser?.id ? true : false}
                        />
                        {(role.name === 'District Coordinator' || role.name === 'Programme Executive') && <CustomSelect
                            option={districtList}
                            header={'Coordinator District'}
                            setData={updateUser?.id ? undefined : setDistrict}
                            isSearchable={true}
                            value={updateUser?.district ? district : undefined}
                            isClearable={false}
                            isDisabled={updateUser?.id ? true : false}
                        />}
                        {(role.name === 'Zonal Coordinator') && <CustomSelect
                            option={zoneList}
                            header={'Coordinator Zone'}
                            setData={setZone}
                            isSearchable={true}
                            value={updateUser?.zone ? zone : undefined}
                            isDisabled={updateUser?.id ? true : false}
                        />}
                        {(role.id === 'IN') &&
                            <>
                                {!updateUser?.id && <CustomSelect
                                    option={coordinatorRoleBasedList}
                                    header={'Coordinator'}
                                    setData={setCoordinator}
                                    isSearchable={true}
                                />}
                                <CustomSelect
                                    option={districtList}
                                    header={'District'}
                                    setData={setDistrict}
                                    isSearchable={true}
                                    value={updateUser?.district ? district : undefined}
                                />
                                <div className={"setup-item"} >
                                    <p>Select Institutes</p>
                                    <Select
                                        className='react-select-container'
                                        options={instituteList}
                                        placeholder={'Select Institutes'}
                                        isMulti={true}

                                        getOptionLabel={(option) => option.name}
                                        getOptionValue={(option) => option.id}
                                        onChange={(data: any) => {
                                            if (data) {
                                                setSelectedInstitute(data)
                                            }
                                            else
                                                setSelectedInstitute([])
                                        }}
                                        isClearable={false}
                                        value={updateUser?.institutes ? selectedInstitute : undefined}
                                    />
                                </div>
                            </>
                        }
                        {!updateUser?.id && <div className={`${styles.password}`}>
                            <input value={password} placeholder='Enter password' onChange={(e) => setPassword(e.target.value)} type={showPassword ? 'text' : "password"} className={styles.input} />
                            <i className='fas fa-eye' onMouseDown={() => setShowPassword(true)} onMouseOut={() => setShowPassword(false)}></i>
                        </div>}
                        <div className="create-btn-container">
                            <button className="black-btn"
                                onClick={() => {
                                    updateUser?.id ?
                                        handleUpdate() :
                                        handleCreate()
                                }
                                }>{updateUser?.id ? 'Update' : 'Create'}</button>
                            <button className="black-btn"
                                onClick={reset}
                            >Cancel</button>
                        </div>
                    </div>
                </div>
                {/* <div className="setup-img">
                    <img src={setupImg} alt="  " />
                </div> */}
            </div>
        </div >
    )
}
function getSelectedInstitutes(district: string, setInstituteList: Dispatch<SetStateAction<selectProps[]>>) {
    privateGateway.get(`${campusRoutes.listInstitutes}${district}/`)
        .then((res) => {
            setInstituteList(res.data.response)
        })
        .catch((err) => {
            console.error(err)
        })
}

export default UserSetup 
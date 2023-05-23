import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import setupImg from '../../../../../assets/Kindergarten student-bro 1.png'
import { CustomInput } from '../../../components/CustomInput/CustomInput'
import { CustomSelect } from '../../../components/CustomSelect/CustomSelect'
import { privateGateway } from '../../../../../services/apiGateway'
import { setupRoutes } from '../../../../../services/urls'
import '../../components/Setup.scss'
import { initialState, selectProps } from '../../utils/setupUtils'

const UserSetup: FC<{ title: string }> = ({ title }) => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState<string>('')
    const [password, setPassword] = useState("")
    const [role, setRole] = useState(initialState)
    const [roleList, setRoleList] = useState<selectProps[]>([])
    const reset = () => {
        setName("")
        setEmail("")
        setPhone("")
        setPassword("")
        setRole(initialState)
    }
    useEffect(() => {
        console.log('working')
        fetchUserRoles(setRoleList)
    }, [])
    function handleCreate() {
        createUser(name, email, phone, role.id, password)
    }
    return (
        <div className="white-container">
            <h3>Setup a new {title}</h3>
            <div className="setup-club">
                <div className="setup-filter">
                    <div className="select-container club">
                        <CustomInput value="Name" setData={setName} data={name} />
                        <CustomInput value="Email" setData={setEmail} data={email} />
                        <CustomInput value="Phone" setData={setPhone} data={phone} />
                        <CustomSelect
                            option={roleList}
                            value="Role"
                            setData={setRole}
                        />
                        <CustomInput value="Password" setData={setPassword} data={password} />
                        <div className="create-btn-container">
                            <button className="black-btn"
                                onClick={handleCreate}>Create</button>
                            <button className="black-btn"
                                onClick={reset}
                            >Cancel</button>
                        </div>
                    </div>
                </div>
                <div className="setup-img">
                    <img src={setupImg} alt="HI" />
                </div>
            </div>
        </div>
    )
}
function fetchUserRoles(setData: Dispatch<SetStateAction<selectProps[]>>) {
    privateGateway.get(setupRoutes.user.roles.list)
        .then(res => res.data.response.club_status)
        .then(data =>
            setData(data?.map((value: string, index: number) =>
                ({ id: index.toString(), name: value })))
        )
        .catch(err => console.log(err))
}
function createUser(
    name: string,
    email: string,
    phone: string,
    role: string,
    password: string
) {
    const postData = {
        name: name,
        email: email,
        phone: phone,
        role: role,
        password: password
    }
    privateGateway.post(setupRoutes.user.create, postData)
        .then(res => console.log('Success :', res?.data?.message?.general[0]))
        .catch(err => console.log('Error :', err?.response?.data?.message?.general[0]))
}

export default UserSetup 
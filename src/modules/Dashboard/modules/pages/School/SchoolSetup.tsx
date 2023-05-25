import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import setupImg from '../../../../../assets/Kindergarten student-bro 1.png'
import { CustomInput } from '../../../components/CustomInput/CustomInput'
import { CustomSelect } from '../../../components/CustomSelect/CustomSelect'
import { privateGateway } from '../../../../../services/apiGateway'
import { setupRoutes } from '../../../../../services/urls'
import '../../components/Setup.scss'
import { initialState, selectProps } from '../../utils/setupUtils'
import * as yup from 'yup'
import { Error, Success, showAlert } from '../../../components/Error/Alerts'
import { createSchool, fetchDistrictAssemblies, fetchDistrictBlocks, fetchDistrictSchools, fetchDistricts, } from './SchoolAPI'
interface SchoolSetupProps {
    setViewSetup: Dispatch<SetStateAction<boolean>>
    updateSchoolData: Function
}
const SchoolSetup: FC<SchoolSetupProps> = ({ setViewSetup, updateSchoolData }) => {
    const [districtList, setDistrictList] = useState<selectProps[]>([])
    const [district, setDistrict] = useState<selectProps>(initialState)
    const [schoolList, setSchoolList] = useState<selectProps[]>([])
    const [school, setSchool] = useState<selectProps>(initialState)
    const [assemblyList, setAssemblyList] = useState<selectProps[]>([])
    const [assembly, setAssembly] = useState<selectProps>(initialState)
    const [blockList, setBlockList] = useState<selectProps[]>([])
    const [block, setBlock] = useState<selectProps>(initialState)
    const [errorMessage, setErrorMessage] = useState("")
    const [successMessage, setSuccessMessage] = useState("")
    useEffect(() => {
        fetchDistricts(setDistrictList)
    }, [])
    useEffect(() => {
        if (district?.id) {
            fetchDistrictAssemblies(setAssemblyList, district.id)
            fetchDistrictBlocks(setBlockList, district.id)
            fetchDistrictSchools(setSchoolList, district.name)
        }
    }, [district.id])
    function validateDistrict() {
        const districtValidator = yup.string().required('District is required')
        return districtValidator.validate(district.name)
    }
    function validateSchema() {
        const validation = yup.object().shape({
            college: yup.string().required('College is required'),
            block: yup.string().required('Block is required'),
            assembly: yup.string().required('Assembly is required'),
        })
        return validation.validate(
            {
                assembly: assembly.name,
                block: block.name,
                college: school.name
            },
            { abortEarly: true }
        )
    }
    function handleCreate() {
        type postDataProps = {
            clubName: string,
            instituteType: string,
            instituteId: string,
            legislativeAssemblyId: string,
            districtId: string,
            blockId: string,
        }
        const postData: postDataProps = {
            clubName: school.name,
            instituteType: "School",
            instituteId: school.id,
            legislativeAssemblyId: assembly.id,
            districtId: district.id,
            blockId: block.id,
        }
        validateDistrict()
            .then(() => {
                validateSchema().then(() => {
                    createSchool<postDataProps>(postData, updateSchoolData, setViewSetup, setSuccessMessage, setErrorMessage)
                })
                    .catch((err) => {
                        showAlert(err.message, setErrorMessage)
                    })
            })
            .catch((err) => {
                showAlert(err.message, setErrorMessage)
            })
    }
    return (
        <div className="white-container">
            <h3>Setup a new Model School</h3>
            <div className="setup-club">
                <div className="setup-filter">
                    <div className="select-container club">
                        <CustomSelect option={districtList} header="District" setData={setDistrict} />
                        {district?.id &&
                            <>
                                <CustomSelect option={assemblyList} header="Legislative Assembly" setData={setAssembly} />
                                <CustomSelect option={blockList} header="Block" setData={setBlock} />
                                <CustomSelect option={schoolList} header="School" setData={setSchool} />
                            </>
                        }

                        <div className="create-btn-container">
                            <button className="black-btn"
                                onClick={handleCreate}>Create</button>
                            <button className="black-btn"
                                onClick={() => setViewSetup(false)}
                            >Cancel</button>
                        </div>
                    </div>
                </div>
                <div className="setup-img">
                    <img src={setupImg} alt="HI" />
                </div>
            </div>
            {errorMessage && <Error error={errorMessage} />}
            {successMessage && <Success success={successMessage} />}
        </div>
    )
}

export default SchoolSetup 
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import setupImg from '../../../../../assets/Kindergarten student-bro 1.png'
import { CustomInput } from '../../../components/CustomInput/CustomInput'
import { CustomSelect } from '../../../components/CustomSelect/CustomSelect'
import { initialState, selectProps } from '../../utils/setupUtils'
import * as yup from 'yup'
import { Error, Success, showAlert } from '../../../components/Error/Alerts'
import { createAssembly, fetchDistricts } from './assemblyAPI'
interface AssemblySetupProps {
    setViewSetup: Dispatch<SetStateAction<boolean>>
    updateAssemblyData: Function
}
const AssemblySetup: FC<AssemblySetupProps> = ({ setViewSetup, updateAssemblyData }) => {
    const [assembly, setAssembly] = useState<string>("")
    const [district, setDistrict] = useState<selectProps>(initialState)
    const [districtList, setDistrictList] = useState<selectProps[]>([])
    const [errorMessage, setErrorMessage] = useState("")
    const [successMessage, setSuccessMessage] = useState("")

    const reset = () => {
        setAssembly("")
        setDistrict(initialState)
        setViewSetup(false)
    }
    useEffect(() => {
        fetchDistricts(setDistrictList)
    }, [])
    function validateSchema() {
        const validationSchema = yup.object().shape({
            name: yup.string().required('Assembly Name is required'),
            district: yup.string().required('District is required'),
        })
        return validationSchema.validate(
            { name: assembly, district: district.name },
            { abortEarly: true })
    }
    function handleCreate() {
        validateSchema()
            .then(() => {
                createAssembly(assembly, district.id, updateAssemblyData, setViewSetup, setSuccessMessage, setErrorMessage)
            })
            .catch(err => showAlert(err.message, setErrorMessage))
    }
    return (
        <div className="white-container">
            <h3>Setup a Assembly</h3>
            <div className="setup-club">
                <div className="setup-filter">
                    <div className="select-container club">
                        <CustomInput value={'Assembly'} setData={setAssembly} data={assembly} />
                        <CustomSelect option={districtList} header="District" setData={setDistrict} />
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
            {errorMessage && <Error error={errorMessage} />}
            {successMessage && <Success success={successMessage} />}
        </div>)
}

export default AssemblySetup
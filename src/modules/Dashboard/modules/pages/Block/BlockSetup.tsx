import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import setupImg from '../../../../../assets/Kindergarten student-bro 1.png'
import { CustomInput } from '../../../components/CustomInput/CustomInput'
import { CustomSelect } from '../../../components/CustomSelect/CustomSelect'
import { initialState, selectProps } from '../../utils/setupUtils'
import { privateGateway } from '../../../../../services/apiGateway'
import { setupRoutes } from '../../../../../services/urls'
import { Error, Success, showAlert } from '../../../components/Error/Alerts'
interface BlockSetupProps {
    setViewSetup: Dispatch<SetStateAction<boolean>>
    updateBlockData: Function
}
import * as yup from 'yup'

const BlockSetup: FC<BlockSetupProps> = ({ setViewSetup, updateBlockData }) => {
    const [block, setBlock] = useState<string>("")
    const [district, setDistrict] = useState<selectProps>(initialState)
    const [districtList, setDistrictList] = useState<selectProps[]>([])
    const [errorMessage, setErrorMessage] = useState("")
    const [successMessage, setSuccessMessage] = useState("")
    const reset = () => {
        setBlock("")
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
            { name: block, district: district.name },
            { abortEarly: true })
    }
    function handleCreate() {
        validateSchema()
            .then(() => {
                createBlock(block, district.id, updateBlockData, setViewSetup, setSuccessMessage, setErrorMessage)
            })
            .catch(err => showAlert(err.message, setErrorMessage))
    }
    return (
        <div className="white-container">
            <h3>Setup a Block</h3>
            <div className="setup-club">
                <div className="setup-filter">
                    <div className="select-container club">
                        <CustomInput value={'Block'} setData={setBlock} data={block} />
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
function fetchDistricts(setData: Dispatch<SetStateAction<selectProps[]>>) {
    privateGateway.get(setupRoutes.district.list)
        .then(res => res.data.response.districts)
        .then(data => setData(data))
        .catch(err => console.log(err))
}
function createBlock(
    block: string,
    districtId: string,
    update: Function,
    setViewSetup: Dispatch<SetStateAction<boolean>>,
    setSuccessMessage: Dispatch<SetStateAction<string>>,
    setErrorMessage: Dispatch<SetStateAction<string>>
) {
    const postData = {
        name: block,
        districtId: districtId,
    }
    privateGateway.post(setupRoutes.block.create, postData)
        .then(res => {
            update()
            showAlert(res?.data?.message?.general[0], setSuccessMessage)
            console.log('Success :', res?.data?.message?.general[0])
            setTimeout(() => {
                setViewSetup(false)
            }, 3000)
        })
        .catch(err => {
            showAlert(err?.response?.data?.message?.general[0], setErrorMessage)
            console.log('Error :', err?.response?.data?.message?.general[0])
        })
}
export default BlockSetup
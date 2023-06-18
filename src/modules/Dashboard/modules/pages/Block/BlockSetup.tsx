import { Dispatch, FC, SetStateAction, useContext, useEffect, useState } from 'react'
import setupImg from '../../../../../assets/Kindergarten student-bro 1.webp'
import { CustomInput } from '../../../components/CustomInput/CustomInput'
import { CustomSelect } from '../../../components/CustomSelect/CustomSelect'
import { initialState, selectProps } from '../../utils/setupUtils'

import { Error, Success, showAlert } from '../../../components/Error/Alerts'
interface BlockSetupProps {
    setViewSetup: Dispatch<SetStateAction<boolean>>
    updateBlockData: Function
}
import * as yup from 'yup'
import { createBlock, fetchDistricts } from './blockAPI'
import { toast } from 'react-toastify'
import { GlobalContext } from '../../../../../utils/GlobalVariable'

const BlockSetup: FC<BlockSetupProps> = ({ setViewSetup, updateBlockData }) => {
    const [block, setBlock] = useState<string>("")
    const [district, setDistrict] = useState<selectProps>(initialState)
    const [districtList, setDistrictList] = useState<selectProps[]>([])

    const { districts } = useContext(GlobalContext)
    const reset = () => {
        setBlock("")
        setDistrict(initialState)
        setViewSetup(false)
    }
    useEffect(() => {
        setDistrictList(districts)
    }, [districts])
    function validateSchema() {
        const validationSchema = yup.object().shape({
            name: yup.string().required('Block Name is required').test('only-spaces', 'Only spaces are not allowed for Block name', value => {
                // Check if the value consists only of spaces
                return !(/^\s+$/.test(value));
            }),
            district: yup.string().required('District is required'),
        })
        return validationSchema.validate(
            { name: block, district: district.name },
            { abortEarly: false })
    }
    function handleCreate() {
        validateSchema()
            .then(() => {
                createBlock(block, district.id, updateBlockData, setViewSetup)
            })
            .catch(err => err.errors.map((error: string) => toast.error(error)))
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
        </div>)
}

export default BlockSetup
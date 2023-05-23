import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import setupImg from '../../../../../assets/Kindergarten student-bro 1.png'
import { CustomInput } from '../../../components/CustomInput/CustomInput'
import { CustomSelect } from '../../../components/CustomSelect/CustomSelect'
import { initialState, selectProps } from '../../utils/setupUtils'
import { privateGateway } from '../../../../../services/apiGateway'
import { setupRoutes } from '../../../../../services/urls'
const Setup: FC<{ title: string }> = ({ title }) => {
    const [Block, setBlock] = useState("")
    const [district, setDistrict] = useState<selectProps>(initialState)
    const [districtList, setDistrictList] = useState<selectProps[]>([])
    const reset = () => {
        setBlock("")
        setDistrict(initialState)
    }
    useEffect(() => {
        fetchDistricts(setDistrictList)
    }, [])
    function handleCreate() {
        createBlock(Block, district.id)
    }
    return (
        <div className="white-container">
            <h3>Setup a new {title}</h3>
            <div className="setup-club">
                <div className="setup-filter">
                    <div className="select-container club">
                        <CustomInput value={`${title}`} setData={setBlock} data={Block} />
                        <CustomSelect option={districtList} value="District" setData={setDistrict} />
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
function fetchDistricts(setData: Dispatch<SetStateAction<selectProps[]>>) {
    privateGateway.get(setupRoutes.district.list)
        .then(res => res.data.response.districts)
        .then(data => setData(data))
        .catch(err => console.log(err))
}
function createBlock(
    Block: string,
    district_id: string,
) {
    const postData = {
        name: Block,
        district_id: district_id,
    }
    privateGateway.post(setupRoutes.block.create, postData)
        .then(res => console.log('Success :', res.data.message.general[0]))
        .catch(err => console.log('Error :', err?.response.data.message.general[0]))
}
export default Setup
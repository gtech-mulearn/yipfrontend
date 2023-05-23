import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import setupImg from '../../../../../assets/Kindergarten student-bro 1.png'
import { CustomInput } from '../../../components/CustomInput/CustomInput'
import { CustomSelect } from '../../../components/CustomSelect/CustomSelect'
import { initialState, selectProps } from '../../utils/setupUtils'
import { privateGateway } from '../../../../../services/apiGateway'
import { setupRoutes } from '../../../../../services/urls'
const AssemblySetup: FC<{ title: string }> = ({ title }) => {
    const [Assembly, setAssembly] = useState("")
    const [district, setDistrict] = useState<selectProps>(initialState)
    const [districtList, setDistrictList] = useState<selectProps[]>([])
    const reset = () => {
        setAssembly("")
        setDistrict(initialState)
    }
    useEffect(() => {
        fetchDistricts(setDistrictList)
    }, [])
    function handleCreate() {
        createAssembly(Assembly, district.id)
    }
    return (
        <div className="white-container">
            <h3>Setup a new {title}</h3>
            <div className="setup-club">
                <div className="setup-filter">
                    <div className="select-container club">
                        <CustomInput value={`${title}`} setData={setAssembly} data={Assembly} />
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
function createAssembly(
    assembly: string,
    districtId: string,
) {
    const postData = {
        name: assembly,
        districtId: districtId,
    }
    privateGateway.post(setupRoutes.assembly.create, postData)
        .then(res => console.log('Success :', res.data.message.general[0]))
        .catch(err => console.log('Error :', err?.response.data.message.general[0]))
}
export default AssemblySetup
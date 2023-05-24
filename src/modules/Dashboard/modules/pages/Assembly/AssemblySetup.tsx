import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import setupImg from '../../../../../assets/Kindergarten student-bro 1.png'
import { CustomInput } from '../../../components/CustomInput/CustomInput'
import { CustomSelect } from '../../../components/CustomSelect/CustomSelect'
import { initialState, selectProps } from '../../utils/setupUtils'
import { privateGateway } from '../../../../../services/apiGateway'
import { setupRoutes } from '../../../../../services/urls'
interface AssemblySetupProps {
    setViewSetup: Dispatch<SetStateAction<boolean>>
    updateAssemblyData: Function
}
const AssemblySetup: FC<AssemblySetupProps> = ({ setViewSetup, updateAssemblyData }) => {
    const [assembly, setAssembly] = useState<string>("")
    const [district, setDistrict] = useState<selectProps>(initialState)
    const [districtList, setDistrictList] = useState<selectProps[]>([])
    const reset = () => {
        setAssembly("")
        setDistrict(initialState)
        setViewSetup(false)
    }
    useEffect(() => {
        fetchDistricts(setDistrictList)
    }, [])
    function handleCreate() {
        createAssembly(assembly, district.id, updateAssemblyData, setViewSetup)
    }
    return (
        <div className="white-container">
            <h3>Setup a Assembly</h3>
            <div className="setup-club">
                <div className="setup-filter">
                    <div className="select-container club">
                        <CustomInput value={'Assembly'} setData={setAssembly} data={assembly} />
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
    update: Function,
    setViewSetup: Dispatch<SetStateAction<boolean>>
) {
    const postData = {
        name: assembly,
        districtId: districtId,
    }
    privateGateway.post(setupRoutes.assembly.create, postData)
        .then(res => {
            update()
            console.log('Success :', res.data.message.general[0])
        })
        .catch(err => console.log('Error :', err?.response.data.message.general[0]))
        .finally(() => setViewSetup(false))
}
export default AssemblySetup
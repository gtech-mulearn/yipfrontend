import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import setupImg from '../../../../../assets/Kindergarten student-bro 1.png'
import { CustomInput } from '../../../components/CustomInput/CustomInput'
import { CustomSelect, intialState } from '../../../components/CustomSelect/CustomSelect'
import { privateGateway } from '../../../../../services/apiGateway'
import { setupRoutes } from '../../../../../services/urls'
import '../../components/Setup.scss'
import { initialState, selectProps } from '../../utils/setupUtils'
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
    useEffect(() => {
        fetchDistricts(setDistrictList)
    }, [])
    useEffect(() => {
        if (district?.id) {
            fetchAssemblies(setAssemblyList, district.id)
            fetchBlocks(setBlockList, district.id)
            fetchSchools(setSchoolList, district.name)
        }
    }, [district.id])
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
        createSchool<postDataProps>(postData, updateSchoolData, setViewSetup)
    }
    return (
        <div className="white-container">
            <h3>Setup a new Model School</h3>
            <div className="setup-club">
                <div className="setup-filter">
                    <div className="select-container club">
                        <CustomSelect option={districtList} value="District" setData={setDistrict} />
                        {district?.id &&
                            <>
                                <CustomSelect option={assemblyList} value="Legislative Assembly" setData={setAssembly} />
                                <CustomSelect option={blockList} value="Block" setData={setBlock} />
                                <CustomSelect option={schoolList} value="School" setData={setSchool} />
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
        </div>
    )
}
function fetchDistricts(setData: Dispatch<SetStateAction<selectProps[]>>) {
    privateGateway.get(setupRoutes.district.list)
        .then(res => res.data.response.districts)
        .then(data => setData(data))
        .catch(err => console.log(err))
}
function fetchAssemblies(setData: Dispatch<SetStateAction<selectProps[]>>, districtId: string) {
    privateGateway.get(`${setupRoutes.district.assembly}${districtId}/`)
        .then(res => res.data.response.legislativeAssembly)
        .then(data => setData(data))
        .catch(err => console.log(err))
}
function fetchBlocks(setData: Dispatch<SetStateAction<selectProps[]>>, districtId: string) {
    privateGateway.get(`${setupRoutes.district.block}${districtId}/`)
        .then(res => res.data.response.block)
        .then(data => { setData(data) })
        .catch(err => console.log(err))
}
function fetchSchools(setData: Dispatch<SetStateAction<selectProps[]>>, districtName: string) {
    const reqData: any = {
        district: districtName
    }
    privateGateway.post(setupRoutes.district.school, reqData)
        .then(res => res.data.response.institutions)
        .then(data => setData(data.map((item: any) => ({ id: item.id, name: item.title, }))))
        .catch(err => console.log(err))
}
function createSchool<postDataProps>(postData: postDataProps, update: Function, setViewSetup: Dispatch<SetStateAction<boolean>>) {
    privateGateway.post(setupRoutes.school.create, postData)
        .then(res => {
            update()
            console.log('Success :', res.data.message.general[0])
        })
        .catch(err => console.log('Error :', err?.response.data.message.general[0]))
        .finally(() => setViewSetup(false))
}
export default SchoolSetup 
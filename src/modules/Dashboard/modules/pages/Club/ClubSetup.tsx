import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import setupImg from '../../../../../assets/Kindergarten student-bro 1.png'
import { CustomInput } from '../../../components/CustomInput/CustomInput'
import { CustomSelect, intialState } from '../../../components/CustomSelect/CustomSelect'
import { privateGateway } from '../../../../../services/apiGateway'
import { setupRoutes } from '../../../../../services/urls'
import '../../components/Setup.scss'
import { initialState, selectProps } from '../../utils/setupUtils'
interface ClubSetupProps {
    setViewSetup: Dispatch<SetStateAction<boolean>>
    updateSchoolData: Function
}
const ClubSetup: FC<ClubSetupProps> = ({ setViewSetup, updateSchoolData }) => {
    const [districtList, setDistrictList] = useState<selectProps[]>([])
    const [district, setDistrict] = useState<selectProps>(initialState)
    const [collegeList, setCollegeList] = useState<selectProps[]>([])
    const [college, setCollege] = useState<selectProps>(initialState)

    const reset = () => {
        setDistrict(initialState)
        setCollege(initialState)
        setDistrictList([])
        setCollegeList([])

    }
    useEffect(() => {
        fetchDistricts(setDistrictList)
    }, [])
    useEffect(() => {
        if (district?.id) {
            fetchcolleges(setCollegeList, district.name)
        }
    }, [district?.id])
    function handleCreate() {
        type postDataProps = {
            clubName: string,
            instituteType: string,
            instituteId: string,
            districtId: string,
        }
        const postData: postDataProps = {
            clubName: college.name,
            instituteType: "College",
            instituteId: college.id,
            districtId: district.id,
        }
        createClub<postDataProps>(postData, updateSchoolData, setViewSetup)
    }
    return (
        <div className="white-container">
            <h3>Setup a YIP Club</h3>
            <div className="setup-club">
                <div className="setup-filter">
                    <div className="select-container club">
                        <CustomSelect option={districtList} value="District" setData={setDistrict} />
                        <CustomSelect option={collegeList} value="college" setData={setCollege} />
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
function fetchDistricts(setData: Dispatch<SetStateAction<selectProps[]>>) {
    privateGateway.get(setupRoutes.district.list)
        .then(res => res.data.response.districts)
        .then(data => setData(data))
        .catch(err => console.log(err))
}

function fetchcolleges(setData: Dispatch<SetStateAction<selectProps[]>>, districtName: string) {
    const reqData: any = {
        district: districtName
    }
    privateGateway.post(setupRoutes.district.college, reqData)
        .then(res => res.data.response.institutions)
        .then(data => {
            setData(data.map((item: any) => ({ id: item.id, name: item.title, })))
        })
        .catch(err => console.log(err))
}
function createClub<postDataProps>(postData: postDataProps, update: Function, setViewSetup: Dispatch<SetStateAction<boolean>>) {
    console.log(postData)
    privateGateway.post(setupRoutes.club.create, postData)
        .then(res => {
            update()
            console.log('Success :', res.data.message.general[0])
        })
        .catch(err => console.log('Error :', err?.response.data.message.general[0]))
        .finally(() => setViewSetup(false))
}
export default ClubSetup 
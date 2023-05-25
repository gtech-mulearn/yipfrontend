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
import { createClub, fetchDistricts, fetchcolleges } from './clubAPI'
interface ClubSetupProps {
    setViewSetup: Dispatch<SetStateAction<boolean>>
    updateClubData: Function
}
const ClubSetup: FC<ClubSetupProps> = ({ setViewSetup, updateClubData }) => {
    const [districtList, setDistrictList] = useState<selectProps[]>([])
    const [district, setDistrict] = useState<selectProps>(initialState)
    const [collegeList, setCollegeList] = useState<selectProps[]>([])
    const [college, setCollege] = useState<selectProps>(initialState)
    const [errorMessage, setErrorMessage] = useState("")
    const [successMessage, setSuccessMessage] = useState("")
    const reset = () => {
        setDistrict(initialState)
        setCollege(initialState)
        setDistrictList([])
        setCollegeList([])
        setViewSetup(false)
    }
    useEffect(() => {
        fetchDistricts(setDistrictList)
    }, [])
    useEffect(() => {
        if (district?.id) {
            fetchcolleges(setCollegeList, district.name)
        }
    }, [district?.id])
    function validateDistrict() {
        const districtValidator = yup.string().required('District is required')
        return districtValidator.validate(district.name)
    }
    function validateSchema() {
        const validation = yup.object().shape({
            college: yup.string().required('College is required'),
        })
        return validation.validate(
            {
                college: college.name
            },
        )
    }

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
        validateDistrict()
            .then(() => {
                validateSchema().then(() => {
                    createClub<postDataProps>(postData, updateClubData, setViewSetup, setSuccessMessage, setErrorMessage)
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
            <h3>Setup a YIP Club</h3>
            <div className="setup-club">
                <div className="setup-filter">
                    <div className="select-container club">
                        <CustomSelect option={districtList} header="District" setData={setDistrict} />
                        <CustomSelect option={collegeList} header="college" setData={setCollege} />
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
        </div>
    )
}

export default ClubSetup 
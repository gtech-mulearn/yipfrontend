import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import "../../components/Formik/reactSelectStyles.css";
import "../../components/Setup.scss";
import {
    initialState,
    selectEditedProps,
    selectProps,
} from "../../utils/setupUtils";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
    createClub,
    fetchDistricts,
    fetchcolleges,
} from "./clubAPI";
import { Form, Formik } from "formik";
import FormikReactSelect from "../../components/Formik/FormikComponents";
interface ClubSetupProps {
    setViewSetup: Dispatch<SetStateAction<boolean>>;
    updateClubData: Function;
}
const ClubSetup: FC<ClubSetupProps> = ({ setViewSetup, updateClubData }) => {
	const notify = () => toast("Wow so easy !");
    const [districtList, setDistrictList] = useState<selectProps[]>([]);
    const [districtListEdited, setDistrictListEdited] = useState<
        selectEditedProps[]
    >([]);
    const [district, setDistrict] = useState<selectProps>(initialState);
    const [collegeList, setCollegeList] = useState<selectProps[]>([]);
    const [collegeListEdited, setCollegeListEdited] = useState<
        selectEditedProps[]
    >([]);
    const [college, setCollege] = useState<selectProps>(initialState);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [selectedOption, setSelectedOption] = useState();
    const [none, setNone] = useState();
    const reset = () => {
		notify();
        setDistrict(initialState);
        setCollege(initialState);
        setDistrictList([]);
        setCollegeList([]);
        setViewSetup(false);
    };
    useEffect(() => {
        fetchDistricts(setDistrictListEdited, setDistrictList);
    }, []);

    useEffect(() => {
        fetchcolleges(
            setCollegeListEdited,
            setCollegeList,
            String(selectedOption)
        );
    }, [selectedOption]);

    function handleCreate(college: string, district: string) {
        const collegeId = collegeList.filter(
            (mapCollege) => mapCollege.name === college
        );

        const districtId = districtList.filter(
            (mapDistrict) => mapDistrict.name === district
        );

        console.log(collegeId[0]);

        type postDataProps = {
            clubName: string;
            instituteType: string;
            instituteId: string;
            districtId: string;
        };
        const postData: postDataProps = {
            clubName: college,
            instituteType: "College",
            instituteId: collegeId[0].id,
            districtId: districtId[0].id,
        };
        createClub<postDataProps>(
            postData,
            updateClubData,
            setViewSetup,
            setSuccessMessage,
            setErrorMessage
        );

    }
	const validateSchema = Yup.object().shape({
        district: Yup.string()
            .required("Required"),
        college: Yup.string().required("Required")
    });

    return (
        <div className="white-container">
			<div className="formikContainer">

            <h3>Setup a YIP Club</h3>
            <Formik
                onSubmit={(values) => {
                    handleCreate(values.college, values.district);
                }}
				validationSchema={validateSchema}
                initialValues={{
                    district: "",
                    college: "",
                }}
                enableReinitialize
            >
                <Form className="reactInputContainer">
					<div className="inputBoxOuter">

                    <FormikReactSelect
                        name="district"
                        isMulti={false}
                        isSearchable
                        options={districtListEdited}
                        setSelectedOption={setSelectedOption}
                        label={"District"}
                    />
                    {
                        <FormikReactSelect
                            name="college"
                            isMulti={false}
                            isSearchable
                            options={collegeListEdited}
                            setSelectedOption={setNone}
                            label={"College"}
                        />
                    }
					</div>
                    <div className="create-btn-container">
                        <button type="submit" className="black-btn">
                            Create
                        </button>
                        <button className="black-btn" onClick={reset}>
                            Cancel
                        </button>
                    </div>
                </Form>
            </Formik>
			</div>
        </div>
    );
};

export default ClubSetup;

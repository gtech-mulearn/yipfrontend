import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import "../../components/Formik/reactSelectStyles.css";
import "../../components/Setup.scss";
import {
    initialState,
    selectCollegeProps,
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
import { Form, Formik, ErrorMessage } from "formik";
import FormikReactSelect from "../../components/Formik/FormikComponents";


interface ClubSetupProps {
    setViewSetup: Dispatch<SetStateAction<boolean>>;
    updateClubData: Function;
}
const ClubSetup: FC<ClubSetupProps> = ({ setViewSetup, updateClubData }) => {
    const notify = () => toast("Wow so easy !");
    const [districtList, setDistrictList] = useState<selectProps[]>([]);
    const [districtListEdited, setDistrictListEdited] = useState<
        selectProps[]
    >([]);
    const [district, setDistrict] = useState<selectProps>(initialState);
    const [collegeList, setCollegeList] = useState<selectCollegeProps[]>([]);
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
    }, [selectedOption, updateClubData]);

    function handleCreate(college: string, district: string) {


        const districtId = districtList.filter(
            (mapDistrict) => mapDistrict.name === district
        );


        type postDataProps = {
            clubName: string;
            instituteType: string;
            instituteId: string;
            districtId: string;
        };
        const postData: postDataProps = {
            clubName: college,
            instituteType: "College",
            instituteId: college,
            districtId: districtId[0].id,
        };
        console.log(postData.instituteId)
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
                            <div className="inputBoxInner">
                                <FormikReactSelect
                                    name="district"
                                    isMulti={false}
                                    isSearchable
                                    options={districtListEdited.map((mapDistrict: selectProps) => ({ label: mapDistrict.name, value: mapDistrict.name }))}
                                    setSelectedOption={setSelectedOption}
                                    label={"District"}
                                />
                                <ErrorMessage
                                    name="district"
                                    component="div"
                                    className="error-message"
                                />
                            </div>
                            <div className="inputBoxInner">
                                <FormikReactSelect
                                    name="college"
                                    isMulti={false}
                                    isSearchable
                                    options={collegeListEdited}
                                    setSelectedOption={setNone}
                                    label={"College"}
                                // value={() => collegeListEdited.filter((item: selectEditedProps) => item.label !== '' && item.label !== college.name)}
                                />
                                <ErrorMessage
                                    name="college"
                                    component="div"
                                    className="error-message"
                                />
                            </div>
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

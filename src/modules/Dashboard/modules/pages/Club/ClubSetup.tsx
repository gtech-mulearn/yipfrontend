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
import "react-toastify/dist/ReactToastify.css";
import {
    createClub,
    fetchDistricts,
    fetchcolleges,
} from "./clubAPI";
import { Form, Formik, ErrorMessage } from "formik";
import FormikReactSelect from "../../components/Formik/FormikComponents";
import { CustomSelect } from "../../../components/CustomSelect/CustomSelect";
import { CustomInput } from "../../../components/CustomInput/CustomInput";
import { toast } from "react-toastify";


interface ClubSetupProps {
    setViewSetup: Dispatch<SetStateAction<boolean>>;
    updateClubData: Function;
}
const typesOfCampus = [{ id: "0", name: "College" }, { id: "1", name: "School" }]
const ClubSetup: FC<ClubSetupProps> = ({ setViewSetup, updateClubData }) => {
    const notify = () => { };
    const [districtList, setDistrictList] = useState<selectProps[]>([]);
    const [districtListEdited, setDistrictListEdited] = useState<
        selectProps[]
    >([]);
    const [district, setDistrict] = useState<selectProps>(initialState);
    const [collegeList, setCollegeList] = useState<selectProps[]>([]);
    const [collegeListEdited, setCollegeListEdited] = useState<
        selectProps[]
    >([]);
    const [college, setCollege] = useState<selectProps>(initialState);
    const [campusType, setCampusType] = useState<selectProps>(typesOfCampus[0]);
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
        setCollege({} as selectProps);
        setCollegeList([]);
        fetchcolleges(
            setCollegeList,
            district.name
        );
    }, [district.id, updateClubData]);

    function handleCreate() {
        type postDataProps = {
            // name: string;
            // type: string;
            // district: string;
            instituteId: string;
        };
        const postData: postDataProps = {
            // name: college.name,
            instituteId: college.id,
            // district: district.name,
            // type: 'College',
        };
        validationSchema()
            .then(() => {
                createClub<postDataProps>(
                    postData,
                    updateClubData,
                );
            }).catch(err => err.errors.map((error: string) => toast.error(error)))


    }
    function validationSchema() {
        const validateSchema = Yup.object().shape({
            district: Yup.string()
                .required("Please select a district"),
            college: Yup.string().required("Please select a college"),
        });
        return validateSchema.validate(
            {
                district: district.name,
                college: college.name,
            },
            {
                abortEarly: false,
            }
        )
    }

    return (
        <div className="white-container">
            <div className="formikContainer">
                <h3>Create Campus Tracking</h3>
                <div className="setup-club">
                    <div className="setup-filter">
                        <div className="select-container club">
                            {/* <CustomSelect
                                option={typesOfCampus}
                                value={campusType}
                                header={"College/School"}
                                setData={setCampusType}
                                isClearable={false}
                            /> */}
                            <CustomSelect option={districtList} setData={setDistrict} header={"District"} />
                            <CustomSelect option={collegeList}
                                setData={setCollege} header={"Campus"}
                                value={collegeList.filter((item: selectProps) => item.id === college.id)}
                            />
                            {/* <CustomInput value={'ICT Id'} data={ictId} setData={setIctId} /> */}
                            <div className="create-btn-container">
                                <button className="black-btn"
                                    onClick={handleCreate}>Create</button>
                                <button className="black-btn"
                                    onClick={reset}
                                >Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClubSetup;

{/* <Formik
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
                </Formik> */}
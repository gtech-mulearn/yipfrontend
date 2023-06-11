import { useEffect, useState } from "react";
import { CustomSelect } from "../../../../../components/CustomSelect/CustomSelect";
import { privateGateway } from "../../../../../../../services/apiGateway";
import { selectProps } from "../../../../utils/setupUtils";
import { CustomInput } from "../../../../../components/CustomInput/CustomInput";
import "../Modals/CampusModal.scss";
import { campusRoutes, tableRoutes } from "../../../../../../../services/urls";
import { getPocRoles } from "../../utils";
import {
    error,
    errorCheck,
    errorMessage,
    success,
} from "../../../../../components/Toastify/ToastifyConsts";
import * as yup from "yup";
import { toast } from "react-toastify";
const ConnectionModal = ({
    cancel,
    campusId,
    campusStatus,
}: {
    cancel: () => void;
    campusId: string;
    campusStatus: string;
}) => {
    const [designationList, setDesignationList] = useState<selectProps[]>([]);
    const [designation, setDesignation] = useState<selectProps>(
        {} as selectProps
    );
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    function validateSchema() {
        const validationSchema = yup.object().shape({
            designation: yup.string().required("Designation is required"),
            name: yup.string().required('Name is required').test('only-spaces', 'Only spaces are not allowed for user name', value => {
                // Check if the value consists only of spaces
                return !(/^\s+$/.test(value));
            }),
            email: yup.string().required("Email is required"),
            mobile: yup.string()
                .required('Phone is required')
                .test('valid-phone', 'Invalid phone number', value => {
                    // Check for valid phone number format
                    if (!value) return false;

                    const hasPlusSign = value.includes('+');
                    const numericPart = hasPlusSign ? value.replace('+', '') : value;

                    if (hasPlusSign && numericPart.length > 13) {
                        return false;
                    }

                    if (!hasPlusSign && numericPart.length > 12) {
                        return false;
                    }

                    return /^\d{10,12}$/.test(numericPart);
                }),
            status: yup.string().test('Valid Status', 'Update to Confirmed first !!!', value => {
                console.log(value)
                if (value === 'Identified') {
                    cancel()
                    return false;

                }
                else
                    return true
            })
        })
        return validationSchema.validate(
            {
                designation: designation.name,
                name: name,
                email: email,
                mobile: mobile,
                status: campusStatus
            },
            { abortEarly: false }
        )
    }
    useEffect(() => {
        getPocRoles(setDesignationList);
    }, []);
    return (
        <div className="secondary-box">
            {
                <>
                    <div className="data-box">
                        <div className="content">
                            <CustomSelect
                                option={designationList}
                                header={"Designation"}
                                placeholder={"Select Designation"}
                                customCSS={{
                                    className: "react-select-container",
                                    classNamePrefix: "react-select",
                                }}
                                setData={setDesignation}
                            />
                        </div>
                    </div>
                    <div className="data-box">
                        <div className="content">
                            <CustomInput
                                value={"Name"}
                                data={name}
                                setData={setName}
                                customCSS={"setup-item"}
                            />
                        </div>
                    </div>
                    <div className="data-box">
                        <div className="content">
                            <CustomInput
                                value={"Email"}
                                data={email}
                                setData={setEmail}
                                customCSS={"setup-item"}
                            />
                        </div>
                    </div>
                    <div className="data-box">
                        <div className="content">
                            <CustomInput
                                value={"Mobile Number"}
                                data={mobile}
                                setData={setMobile}
                                customCSS={"setup-item"}
                            />
                        </div>
                    </div>
                </>
            }
            <div className="last-container">
                <div className="modal-buttons">
                    <button
                        className="btn-update "
                        onClick={() =>
                            validateSchema().then(() => {
                                assignFacilitator(
                                    campusId,
                                    designation.id as string,
                                    name,
                                    email,
                                    mobile,
                                    cancel
                                )
                            }).catch(err => err.errors.map((error: string) => toast.error(error)))
                        }
                    >
                        Add Facilitator
                    </button>
                    <button className="cancel-btn " onClick={cancel}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

function assignFacilitator(
    id: string,
    designation: string,
    name: string,
    email: string,
    mobile: string,
    cancel: () => void
) {
    const postData = {
        clubId: id,
        type: "POC",
        name: name,
        email: email,
        phone: mobile,
        role: designation,
    };
    privateGateway
        .post(campusRoutes.subUser.create, postData)
        .then((res) => {
            updateCampusStatus(id, "Connection Established", cancel);
            success();
            cancel();
        })
        .catch((err) => {
            errorMessage(err.response);
            errorCheck(err.response);
        });
}
export function updateCampusStatus(id: string, status: string, cancel: () => void) {
    privateGateway
        .put(tableRoutes.status.update, { clubId: id, clubStatus: status })
        .then((res) => {
            console.log("Success :", res?.data?.message?.general[0]);
            cancel();
        })
        .catch((err) => console.error(err));
}
export default ConnectionModal;

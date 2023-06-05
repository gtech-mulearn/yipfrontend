import { useEffect, useState } from "react";
import { CustomSelect } from "../../../../../components/CustomSelect/CustomSelect";
import { privateGateway } from "../../../../../../../services/apiGateway";
import { selectProps } from "../../../../utils/setupUtils";
import { CustomInput } from "../../../../../components/CustomInput/CustomInput";
import "../CampusModal/CampusModal.scss";
import { campusRoutes, tableRoutes } from "../../../../../../../services/urls";
import { getPocRoles } from "../../utils";
import {
    error,
    errorCheck,
    errorMessage,
    success,
} from "../../../../../components/Toastify/ToastifyConsts";
const ConnectionModal = ({
    cancel,
    campusId,
    isNotConnected,
}: {
    cancel: () => void;
    campusId: string;
    isNotConnected: boolean;
}) => {
    const [designationList, setDesignationList] = useState<selectProps[]>([]);
    const [designation, setDesignation] = useState<selectProps>(
        {} as selectProps
    );
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
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
                            assignFacilitator(
                                campusId,
                                designation.id as string,
                                name,
                                email,
                                mobile,
                                cancel
                            )
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
function updateCampusStatus(id: string, status: string, cancel: () => void) {
    privateGateway
        .put(tableRoutes.status.update, { clubId: id, clubStatus: status })
        .then((res) => {
            console.log("Success :", res?.data?.message?.general[0]);
            cancel();
        })
        .catch((err) => console.error(err));
}
export default ConnectionModal;

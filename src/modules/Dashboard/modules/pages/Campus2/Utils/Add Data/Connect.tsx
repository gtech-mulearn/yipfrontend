import { toast } from "react-toastify"
import { CampusModalProps } from "../../Layout/Layout"
import { privateGateway } from "../../../../../../../services/apiGateway"
import { campusRoutes } from "../../../../../../../services/urls"
import { errorCheck, errorMessage, success } from "../../../../../components/Toastify/ToastifyConsts"
import { updateCampusStatus } from "../../../Campus/components/Connection/ConnectionModal"
import { listElementProps } from "../../Components/Modal/Modal"

export interface ConnectDataProps {
    clubId: string,
    type: string | undefined,
    name: string,
    email: string,
    phone: string,
    status: string,
    role: string,
}
interface AddConnectOptions {
    postData: ConnectDataProps;
    close: () => void;
    updateCampus: () => void;
    noStatusUpdate?: boolean;
}


export function AddConnect({ postData, close, updateCampus, noStatusUpdate = true }: AddConnectOptions) {
    toast.loading('Updating', {
        toastId: 'Updating'
    })
    privateGateway
        .post(campusRoutes.subUser.create, postData)
        .then((res) => {
            toast.dismiss('Updating')
            const newClose = () => {
                success()
                close()
                updateCampus()
            }
            if (!noStatusUpdate)
                updateCampusStatus(postData.clubId, postData.status, newClose)
            else
                newClose()
        })
        .catch((err) => {
            toast.dismiss('Updating')
            errorMessage(err.response);
            errorCheck(err.response);
        })
}
export default AddConnect
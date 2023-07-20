import { privateGateway } from "../../../../../../services/apiGateway";
import { tableRoutes } from "../../../../../../services/urls";
import { errorCheck, errorMessage } from "../../../../components/Toastify/ToastifyConsts";

export function updateCampusStatus(id: string, status: string, cancel: () => void, postData?: any) {
    privateGateway
        .put(tableRoutes.status.update, { clubId: id, clubStatus: status, ...postData })
        .then((res) => {
            cancel();
        })
        .catch((err) => {
            errorCheck(err.response);
            errorMessage(err.response);
            console.error(err)
        });

}
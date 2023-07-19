import { privateGateway } from "../../../../../../services/apiGateway";
import { tableRoutes } from "../../../../../../services/urls";

export function updateCampusStatus(id: string, status: string, cancel: () => void) {

    privateGateway
        .put(tableRoutes.status.update, { clubId: id, clubStatus: status })
        .then((res) => {
            cancel();
        })
        .catch((err) => console.error(err));
}
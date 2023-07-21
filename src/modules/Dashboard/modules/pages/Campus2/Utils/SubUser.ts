import { privateGateway } from "../../../../../../services/apiGateway"
import { campusRoutes } from "../../../../../../services/urls"

export function deleteSubUser(id: string, close: () => void) {
    privateGateway.delete(`${campusRoutes.subUser.delete}${id}/`)
        .then((res) => {
            close()
        }).catch((err) => {
            console.log(err)
        })
}
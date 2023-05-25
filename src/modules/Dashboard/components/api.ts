import { Dispatch, SetStateAction } from "react";
import { privateGateway } from "../../../services/apiGateway";
import { setupRoutes } from "../../../services/urls";
interface userInfoProps {
    name: string,
    role: string
}
export function fetchUserInfo(setData: Dispatch<SetStateAction<userInfoProps>>) {
    privateGateway.get(setupRoutes.user.info)
        .then((res) => setData(res.data.response))
        .catch((err: any) => console.log('Error :', err?.response.data.message.general[0]))
}
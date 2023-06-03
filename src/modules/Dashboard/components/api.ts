import { Dispatch, SetStateAction } from "react";
import { privateGateway } from "../../../services/apiGateway";
import { setupRoutes } from "../../../services/urls";
import { urlProps } from "../utils/navbarUtils";
export interface userInfoProps {
    name: string,
    role: string,
    email?: string
}
const restricted_roles: string[] = ['CA', 'Admin']
export async function fetchUserInfo(setData: Dispatch<SetStateAction<userInfoProps>>) {

    await privateGateway.get(setupRoutes.user.info)
        .then((res) => {
            setData(res.data.response)


        })
        .catch((err: any) => console.log('Error :', err?.response.data.message.general[0]))
}
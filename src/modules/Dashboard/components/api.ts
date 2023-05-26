import { Dispatch, SetStateAction } from "react";
import { privateGateway } from "../../../services/apiGateway";
import { setupRoutes } from "../../../services/urls";
import { urlProps } from "../utils/navbarUtils";
export interface userInfoProps {
    name: string,
    role: string,
    email?: string
}
export async function fetchUserInfo(setData: Dispatch<SetStateAction<userInfoProps>>, list: urlProps[], setUrls: Dispatch<SetStateAction<urlProps[]>>) {
    await privateGateway.get(setupRoutes.user.info)

        .then((res) => {
            setData(res.data.response)
            for (let role of import.meta.env.VITE_NO_CAMPUS_ACCESS_ROLE.split(',')) {
                if (res.data.response.role === role) {
                    setUrls(list.filter((item: urlProps) => item.title !== 'Campus'))
                }
            }

        })
        .catch((err: any) => console.log('Error :', err?.response.data.message.general[0]))
}
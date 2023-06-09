import { Dispatch, SetStateAction } from "react";
import { privateGateway } from "../../../services/apiGateway";
import { setupRoutes } from "../../../services/urls";
import { loading } from "./Toastify/ToastifyConsts";
import { toast } from "react-toastify";

export interface userInfoProps {
    name: string,
    role: string,
    email?: string
}

export async function fetchUserInfo(setData: Dispatch<SetStateAction<userInfoProps>>) {
    await privateGateway.get(setupRoutes.user.info)
        .then((res) => {
            setData(res.data.response)
        })
        .catch((err: any) => {
            toast.error('Error :', err?.response.data.message.general[0] || err.message)
        })
}
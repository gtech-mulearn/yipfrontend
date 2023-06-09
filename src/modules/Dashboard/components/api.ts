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
    loading(0)
    await privateGateway.get(setupRoutes.user.info)
        .then((res) => {
            setData(res.data.response)
            toast.dismiss()
        })
        .catch((err: any) => {
            toast.dismiss('0')
            toast.error('Error :', err?.response.data.message.general[0] || err.message)
        })
}
import { publicGateway } from "../../../services/apiGateway";
import { authRoutes } from "../../../services/urls";
import { Dispatch, SetStateAction } from "react";
export const login = (
    email: string,
    password: string,
    setErrorStatus: Dispatch<SetStateAction<boolean>>
) => {
    interface loginPostDataProps {
        email: string
        password: string
    }
    const postData: loginPostDataProps = {
        email: email,
        password: password
    }
    publicGateway.post(authRoutes.login, postData)
        .then((res) => res.data)
        .then((data) => {
            setErrorStatus(false)
            localStorage.setItem("accessToken", data.response.accessToken)
            window.location.replace("/intern-dashboard")
        })
        .catch((err) => {
            setErrorStatus(true)
            console.error('Error :', err?.response?.data?.message?.general[0])
        })
}
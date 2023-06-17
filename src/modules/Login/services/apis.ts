import { toast } from "react-toastify";
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
    toast.info("Logging In...", {
        toastId: "loading",
    })
    publicGateway.post(authRoutes.login, postData)
        .then((res) => res.data)
        .then((data) => {
            toast.dismiss("loading")
            toast.success('Successfully Logged In')
            setErrorStatus(false)
            localStorage.setItem("accessToken", data.response.accessToken)
            setTimeout(() => {
                window.location.replace("/intern-dashboard")
            }, 1000);
        })
        .catch((err) => {
            toast.dismiss("loading")
            setErrorStatus(true)
            console.error('Error :', err?.response?.data?.message?.general[0])
        })
}
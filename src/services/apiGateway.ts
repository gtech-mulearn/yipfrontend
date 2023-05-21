import axios from "axios"

const apiGateway = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}`,
    headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "application/json",
    }
})
export const apiPublicGateway = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}`,
    headers: { "Content-Type": "application/json" }
})
export default apiGateway
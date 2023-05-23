import axios from "axios"

export const privateGateway = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}`,
    headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "application/json",
    }
})
export const publicGateway = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}`,
    headers: { "Content-Type": "application/json" }
})

import axios from "axios";
import { Navigate } from "react-router-dom";

export const privateGateway = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}`,
    headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "application/json",
    },
});

axios.interceptors.response.use(
    function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
    },
    function (error) {
        // console.log(error);
        if (error.response.data.statusCode === 1000) {
            //TODO: show toast that the session has expired
            localStorage.clear();
            window.location.href = "/";
        }
        return Promise.reject(error);
    }
);

export const publicGateway = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}`,
    headers: { "Content-Type": "application/json" },
});

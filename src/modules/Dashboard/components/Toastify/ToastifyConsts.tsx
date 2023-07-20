import { Slide, Zoom, toast } from "react-toastify";
import './Toast.css'
export const success = () =>
    toast.success("Success", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });

export const error = (msg: string) =>
    toast.error(msg, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });
export const loading = (id: string) => {
    toast.loading("Loading...", {
        toastId: String(id),
        position: "bottom-center",
        autoClose: 5000,
        closeOnClick: false,
        theme: "colored",
        className: 'blue-shadow',
    });
}

export const errorCheck = (err: any) => {
    console.log(err)
    if (err?.status === 400) {
        err.data.message.general.map((msg: string) => error(msg));
    } else if (err?.status === 500) {
        error("Server down");
    } else {
        error("Something went wrong");
    }
};

export const errorMessage = (err: any) => {
    let data: any = {}
    if (err?.data?.message.length > 0) {
        data = err?.data?.message;
    }
    else {
        data = err?.data?.response?.message ? err.data.response.message : err.data.message;

        console.log(err.data.message)
    }
    for (const key in data) {
        if (data[key].length > 0) {
            data[key].forEach((msg: any) => {
                error(String(`${key}: ${msg}`));
            });
        }
    }

};

import { toast } from "react-toastify";

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

export const errorCheck = (err: any) => {
    if (err?.status === 400) {
        err.data.message.general.map((msg: string) => error(msg));
    } else if (err?.status === 500) {
        error("Server down");
    } else {
        error("Something went wrong");
    }
};

export const errorMessage = (err: any) => {
    const data = err.data.message;
    for (const key in data) {
        if (data[key].length > 0) {
            data[key].forEach((msg: any) => {
                console.log(`${key}: ${msg}`);
                // error(`${key}: ${error}`);
                error(String(`${key}: ${msg}`));
            });
        }
    }
};

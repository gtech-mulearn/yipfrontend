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


export const error = (msg:string) =>
	toast.error(msg, {
		position: "bottom-center",
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: true,
		draggable: true,
		progress: undefined,
		theme: "colored",
	});

export const errorCheck = (err:any) => {
	if (err?.status === 400) {
        err.data.message.general.map((msg: string) => error(msg));
    } else if (err?.status === 500) {
        error("Server down");
    } else {
        error("Something went wrong");
    }
}

export const errorMessage = (err:any) => {
	err.data.message.general.map((msg: any) => {
        //extract the key frm the msg object
        Object.keys(msg).forEach(function (key) {
            error(String(msg[key][0].replace("This", key)));
        });
    });
}
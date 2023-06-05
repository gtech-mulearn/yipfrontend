import { Dispatch, SetStateAction } from "react";
import { privateGateway } from "../../../../../services/apiGateway";
import { tableRoutes } from "../../../../../services/urls";
import { AxiosRequestConfig } from "axios";

export const uploadSubmissions = (config: AxiosRequestConfig) => {
    privateGateway
        .post(tableRoutes.user.uploadSubmissions, config)
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });
};

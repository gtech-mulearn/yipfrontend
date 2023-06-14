import { Dispatch, SetStateAction } from "react";
import { privateGateway } from "../../../../../services/apiGateway";
import { campusRoutes, setupRoutes, tableRoutes, yip5Routes } from "../../../../../services/urls";
import { AxiosRequestConfig } from "axios";
import { AssignViewProps, CampusViewProps, InternViewProps, commonViewProps, districtViewProps, zoneViewProps } from "./InternUtils";
import { selectProps } from "../../utils/setupUtils";

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
export function fetchState(setStateTable: React.Dispatch<React.SetStateAction<commonViewProps[]>>) {
    privateGateway.get(yip5Routes.stateBasedData)
        .then((res) => setStateTable([res.data.response]))
        .catch((err) => console.log(err));
}

export function fetchCampus(
    setData: Dispatch<SetStateAction<CampusViewProps[]>>,
    setData2: Dispatch<SetStateAction<CampusViewProps[]>>
) {
    privateGateway
        .get(yip5Routes.campusList)
        .then((res) => {
            setData(res.data.response);
            setData2(res.data.response);
        })
        .catch((err) => {
            console.log(err);
        });
}

export function fetchDistrict(
    setDistrictFilter: Dispatch<SetStateAction<districtViewProps[]>>,
    setDistricttable: Dispatch<SetStateAction<districtViewProps[]>>
) {
    privateGateway
        .get(yip5Routes.listDistrict)
        .then((res) => {
            setDistrictFilter(res.data.response);
            setDistricttable(res.data.response);
        })
        .catch((err) => {
            console.log(err);
        });
}

export function fetchIntern(
    setData: Dispatch<SetStateAction<InternViewProps[]>>,
    setData2: Dispatch<SetStateAction<InternViewProps[]>>
) {
    privateGateway
        .get(yip5Routes.internList)
        .then((res) => {
            setData(
                res.data.response.map((intern: InternViewProps) => {
                    return {
                        ...intern,
                        districtName: intern?.district?.join(",") || intern?.district || '',
                    };
                })
            );
            setData2(
                res.data.response.map((intern: InternViewProps) => {
                    return { ...intern, districtName: intern.district.join(",") };
                })
            );
        })
        .catch((err) => console.log(err));
}
export function fetchZoneFilter(setData: Dispatch<SetStateAction<selectProps[]>>) {
    privateGateway
        .get(yip5Routes.zoneList)
        .then((res) => setData(res.data.response))
        .catch((err) => console.log(err));
}
export function fetchDistrictFilter(
    zone: string,
    setData: Dispatch<SetStateAction<selectProps[]>>
) {
    const getDistrictByZone = zone ? `${campusRoutes.listDistrict}${zone}/` : setupRoutes.district.list
    privateGateway.get(getDistrictByZone)
        .then((res) => res.data.response.districts)
        .then((data) => setData(data))
        .catch((err) => console.error(err));
}
export function fetchZone(setZoneList: React.Dispatch<React.SetStateAction<zoneViewProps[]>>, setZonetable: React.Dispatch<React.SetStateAction<zoneViewProps[]>>) {
    privateGateway.get(yip5Routes.zoneBasedData)
        .then((res) => {
            setZoneList(res.data.response);
            setZonetable(res.data.response);
        })
        .catch((err) => console.log(err));
}
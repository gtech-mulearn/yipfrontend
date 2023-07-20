import { Dispatch, SetStateAction } from "react";
import { privateGateway } from "../../../../../../services/apiGateway";
import { campusRoutes } from "../../../../../../services/urls";
interface selectProps {
    name: string;
    id: string;
}

export function getListOfCoordinatorByDistrict(district: string, setCoordinatorList: Dispatch<SetStateAction<selectProps[]>>) {
    privateGateway.get(`${campusRoutes.districtCoordinator.listByDistrict}${district}/`)
        .then(res => res.data.response)
        .then(data => setCoordinatorList(data))
        .catch(err => console.error(err))
}
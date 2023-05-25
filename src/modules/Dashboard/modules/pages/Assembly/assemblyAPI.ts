import { Dispatch, SetStateAction } from "react";
import { privateGateway } from "../../../../../services/apiGateway";
import { selectProps } from "../../utils/setupUtils";
import { setupRoutes, tableRoutes } from "../../../../../services/urls";
import { AssemblyTableProps } from "./AssemblyTable";
import { showAlert } from "../../../components/Error/Alerts";

export function fetchDistricts(setData: Dispatch<SetStateAction<selectProps[]>>) {
    privateGateway.get(setupRoutes.district.list)
        .then(res => res.data.response.districts)
        .then(data => setData(data))
        .catch(err => console.log('Error :', err?.response?.data?.message?.general[0]))
}
export function fetchAssemblys(
    setData: Dispatch<SetStateAction<AssemblyTableProps[]>>,
    setData2: Dispatch<SetStateAction<AssemblyTableProps[]>>,
    updateTable?: Function
) {
    privateGateway.get(tableRoutes.assembly.list)
        .then(res => res.data.response)
        .then(data => {
            setData(data)
            setData2(data)
            if (updateTable) updateTable(data)
        })
        .catch(err => console.log('Error :', err?.response?.data?.message?.general[0]))
}
export function deleteModelAssembly(id: string, updateAssemblyStatus: Function,
    setSuccessMessage: Dispatch<SetStateAction<string>>,
    setErrorMessage: Dispatch<SetStateAction<string>>,
    setAssembly: Dispatch<SetStateAction<AssemblyTableProps>>
) {
    privateGateway.delete(`${tableRoutes.assembly.delete}${id}/`)
        .then(res => {
            setSuccessMessage(res?.data?.message?.general[0])
            setTimeout(() => {
                updateAssemblyStatus()
                setAssembly({} as AssemblyTableProps)
            }, 1000)
        })
        .catch(err => console.log('Error :', err?.response?.data?.message?.general[0]))
}

export function createAssembly(
    assembly: string,
    districtId: string,
    update: Function,
    setViewSetup: Dispatch<SetStateAction<boolean>>,
    setSuccessMessage: Dispatch<SetStateAction<string>>,
    setErrorMessage: Dispatch<SetStateAction<string>>
) {
    const postData = {
        name: assembly,
        districtId: districtId,
    }
    privateGateway.post(setupRoutes.assembly.create, postData)
        .then(res => {
            update()
            showAlert(res?.data?.message?.general[0], setSuccessMessage)
            setTimeout(() => {
                setViewSetup(false)
            }, 3000)
            console.log('Success :', res.data.message.general[0])
        })
        .catch(err => {
            showAlert(err?.response?.data?.message?.general[0], setErrorMessage)
            console.log('Error :', err?.response.data.message.general[0])
        })
}
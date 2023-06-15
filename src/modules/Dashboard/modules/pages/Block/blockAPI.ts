import { Dispatch, SetStateAction } from "react"
import { BlockTableProps } from "./BlockTable"
import { privateGateway } from "../../../../../services/apiGateway"
import { setupRoutes, tableRoutes } from "../../../../../services/urls"
import { selectProps } from "../../utils/setupUtils"
import { showAlert } from "../../../components/Error/Alerts"
import { toast } from "react-toastify"
import { errorCheck, errorMessage, success } from "../../../components/Toastify/ToastifyConsts"

export function deleteModelBlock(id: string, updateBlockStatus: Function,
    setSuccessMessage: Dispatch<SetStateAction<string>>,
    setErrorMessage: Dispatch<SetStateAction<string>>,
    setBlock: Dispatch<SetStateAction<BlockTableProps>>
) {
    privateGateway.delete(`${tableRoutes.block.delete}${id}/`)
        .then(res => {
            setSuccessMessage(res?.data?.message?.general[0])
            setTimeout(() => {
                updateBlockStatus()
                setBlock({} as BlockTableProps)
            }, 1000)
        })
        .catch(err => console.log('Error :', err?.response?.data?.message?.general[0]))
}
export function fetchDistricts(setData: Dispatch<SetStateAction<selectProps[]>>) {
    privateGateway.get(setupRoutes.district.list)
        .then(res => res.data.response.districts)
        .then(data => setData(data))
        .catch(err => console.error(err))
}
export function createBlock(
    block: string,
    districtId: string,
    update: Function,
    setViewSetup: Dispatch<SetStateAction<boolean>>,
) {
    const postData = {
        name: block,
        districtId: districtId,
    }
    privateGateway.post(setupRoutes.block.create, postData)
        .then(res => {
            update()
            success()
            setViewSetup(false)
        })
        .catch(err => {
            errorMessage(err.response)
            errorCheck(err.response)
        })
}

export function fetchBlocks(
    setData: Dispatch<SetStateAction<BlockTableProps[] | null>>,
    setData2: Dispatch<SetStateAction<BlockTableProps[] | null>>,
    updateTable?: Function
) {
    privateGateway.get(tableRoutes.block.list)
        .then(res => res.data.response)
        .then(data => {
            setData(data)
            setData2(data)
            if (updateTable) updateTable(data)

        })
        .catch(err => console.log('Error :', err?.response?.data?.message?.general[0]))
}
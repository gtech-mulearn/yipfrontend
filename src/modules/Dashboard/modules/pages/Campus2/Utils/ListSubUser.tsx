import { Dispatch, SetStateAction } from "react"
import { privateGateway } from "../../../../../../services/apiGateway"
export interface FacilitatorProps {
    id: string
    name: string
    email: string
    phone: string
    type: string
    role: string
    status?: string
}

function listSubUser(setData: Dispatch<SetStateAction<FacilitatorProps[]>>, id: string = '', data: string) {
    const controller = new AbortController()
    privateGateway.get(`/api/v1/yip/sub-user-management/list-sub-user/${id}/${data}/`, { signal: controller.signal })
        .then((res) => {
            setData(res.data.response)
        }).catch((err) => {
            console.log(err)
        })
    return () => {
        controller.abort()
    }
}
export default listSubUser
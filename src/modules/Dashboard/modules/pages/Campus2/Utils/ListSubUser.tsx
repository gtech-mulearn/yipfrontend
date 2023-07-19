import { Dispatch, SetStateAction } from "react"
import { privateGateway } from "../../../../../../services/apiGateway"
export interface FacilitatorProps {
    id: string
    name: string
    email: string
    phone: string
    type: string
    role: string
}
function listSubUser(setData: Dispatch<SetStateAction<FacilitatorProps[]>>, id: string = '', data: string) {
    privateGateway.get(`/api/v1/yip/list-sub-user/${id}/${data}/`)
        .then((res) => {
            setData(res.data.response)
        }).catch((err) => {
            console.log(err)
        })
}
export default listSubUser
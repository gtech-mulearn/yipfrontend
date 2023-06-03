import { Dispatch, SetStateAction } from "react"
import { privateGateway } from "../../../../../services/apiGateway"
import { bannerRoutes, setupRoutes, tableRoutes } from "../../../../../services/urls"
import { CountResponse } from "./SchoolBanner"
import { SchoolTableProps, localBodyProps } from "./SchoolTable"
import { selectProps } from "../../utils/setupUtils"
import { showAlert } from "../../../components/Error/Alerts"

export const fetchInstitutionStatusCount = async (setCount: Dispatch<SetStateAction<CountResponse>>) => {
    privateGateway.get(`${bannerRoutes.schoolBanner}`)
        .then(res => res.data.response)
        .then(res => setCount(res))
        .catch(err => console.error(err))
}
export function updateSchoolStatus(id: string, status: string, setSchool: Dispatch<SetStateAction<SchoolTableProps>>, update: Function,
    setSuccess: Dispatch<SetStateAction<string>>,
    setError: Dispatch<SetStateAction<string>>
) {
    privateGateway.put(tableRoutes.status.update, { clubId: id, clubStatus: status })
        .then(res => {
            console.log('Success :', res?.data?.message?.general[0])
            setSuccess(res?.data?.message?.general[0])
            setTimeout(() => {
                setSchool({} as SchoolTableProps)
                update()
            }, 1000)
        })
        .catch(err => setError(err?.response?.data?.message?.general[0]))
}
export function deleteModelSchool(id: string, update: Function, setSuccess: Dispatch<SetStateAction<string>>,
    setError: Dispatch<SetStateAction<string>>, setClub: Dispatch<SetStateAction<SchoolTableProps>>
) {
    privateGateway.delete(`${tableRoutes.school.delete}${id}/`)
        .then(res => {
            update()
            setSuccess(res?.data?.message?.general[0])
            setTimeout(() => {
                update()
                setClub({} as SchoolTableProps)
            }, 1000)
        })
        .catch(err => setError(err?.response?.data?.message?.general[0]))
}

export function fetchDistricts(setData: Dispatch<SetStateAction<selectProps[]>>) {
    privateGateway.get(setupRoutes.district.list)
        .then(res => res.data.response.districts)
        .then(data => setData(data))
        .catch(err => console.error(err))
}
export function fetchDistrictAssemblies(setData: Dispatch<SetStateAction<selectProps[]>>, districtId: string) {
    privateGateway.get(`${setupRoutes.district.assembly}${districtId}/`)
        .then(res => res.data.response.legislativeAssembly)
        .then(data => setData(data))
        .catch(err => console.error(err))
}
export function fetchDistrictBlocks(setData: Dispatch<SetStateAction<selectProps[]>>, districtId: string) {
    privateGateway.get(`${setupRoutes.district.block}${districtId}/`)
        .then(res => res.data.response.block)
        .then(data => { setData(data) })
        .catch(err => console.error(err))
}
export function fetchDistrictSchools(setData: Dispatch<SetStateAction<selectProps[]>>, districtName: string) {
    const reqData: any = {
        district: districtName
    }
    privateGateway.post(setupRoutes.district.school, reqData)
        .then(res => res.data.response.institutions)
        .then(data => setData(data.map((item: any) => ({ id: item.id, name: item.title, }))))
        .catch(err => console.error(err))
}
export function createSchool<postDataProps>(postData: postDataProps, update: Function, setViewSetup: Dispatch<SetStateAction<boolean>>,
    setSuccessMessage: Dispatch<SetStateAction<string>>,
    setErrorMessage: Dispatch<SetStateAction<string>>) {
    privateGateway.post(setupRoutes.school.create, postData)
        .then(res => {
            update()
            showAlert(res?.data?.message?.general[0], setSuccessMessage)
            console.log('Success :', res?.data?.message?.general[0])
            setTimeout(() => {
                setViewSetup(false)
            }, 3000)
        })
        .catch(err => {
            showAlert(err?.response?.data?.message?.general[0], setErrorMessage)
            console.log('Error :', err?.response?.data?.message?.general[0])
        })
}


export function fetchAssemblies(setData: Dispatch<SetStateAction<localBodyProps[]>>) {


    privateGateway.get(tableRoutes.assembly.list)
        .then(res => res.data.response)
        .then(data => setData(data))
        .catch(err => console.log('Error :', err?.response?.data?.message?.general[0]))
}
export function fetchBlocks(setData: Dispatch<SetStateAction<localBodyProps[]>>) {
    privateGateway.get(tableRoutes.block.list)
        .then(res => res.data.response)
        .then(data => setData(data))
        .catch(err => console.log('Error :', err?.response?.data?.message?.general[0]))
}
export async function fetchSchools(
    setData: Dispatch<SetStateAction<SchoolTableProps[]>>,
    setData2: Dispatch<SetStateAction<SchoolTableProps[]>>,
    updateTable?: Function
) {
    await privateGateway.get(tableRoutes.school.list)
        .then(res => res.data.response.clubs)
        .then(data => {
            setData(data)
            setData2(data)
            if (updateTable) updateTable(data)
        })
        .catch(err => console.log('Error :', err?.response?.data?.message?.general[0]))
}
export function fetchStatus(setData: Dispatch<SetStateAction<string[]>>, setOptionStatusList: Dispatch<SetStateAction<selectProps[]>>) {
    privateGateway.get(tableRoutes.status.list)
        .then(res => res.data.response.clubStatus)
        .then(data => {
            setData(data)
            setOptionStatusList(data.map((item: selectProps, index: string) => {
                return {
                    id: index,
                    name: item
                }
            }))
        })
        .catch(err => console.log('Error :', err?.response?.data?.message?.general[0]))
}
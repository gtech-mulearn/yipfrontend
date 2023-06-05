import { Dispatch, SetStateAction } from "react"
import { UserTableProps } from "./UserTable"
import { setupRoutes, tableRoutes } from "../../../../../services/urls"
import { privateGateway } from "../../../../../services/apiGateway"
import { selectProps } from "../../utils/setupUtils"
import { showAlert } from "../../../components/Error/Alerts"

export function deleteThisUser(id: string, update: Function,
    setSuccessMessage: Dispatch<SetStateAction<string>>,
    setErrorMessage: Dispatch<SetStateAction<string>>,
    setUser: Dispatch<SetStateAction<UserTableProps>>
) {
    privateGateway.delete(`${tableRoutes.user.delete}${id}/`)
        .then(res => {
            setSuccessMessage(res?.data?.message?.general[0])
            setTimeout(() => {
                update()
                setUser({} as UserTableProps)
            }, 1000)
        })
        .catch(err => setErrorMessage(err?.response?.data?.message?.general[0]))
}
export function fetchUserRoles(setData: Dispatch<SetStateAction<selectProps[]>>) {
    privateGateway.get(setupRoutes.user.roles.list)
        .then(res => res.data.response.roles)
        .then(data =>
            setData(data?.map((item: { value: string, label: string }) =>
                ({ id: item.value, name: item.label }))))
        .catch(err => console.error(err))
}
export function createUser(
    name: string,
    email: string,
    phone: string,
    role: string,
    password: string,
    district: string,
    zone: string,
    updateUserData: Function,
    setViewSetup: Dispatch<SetStateAction<boolean>>,
    setSuccessMessage: Dispatch<SetStateAction<string>>,
    setErrorMessage: Dispatch<SetStateAction<string>>,
    coordinatorId?: string,
    institutes?: selectProps[]
) {
    const postData = {
        name: name,
        email: email,
        phone: phone,
        role: role,
        password: password,
        district: district,
        zone: zone,
        coordinatorId: coordinatorId,
        institutes: institutes
    }

    // console.log(selectPostData(postData))
    privateGateway.post(setupRoutes.user.create, selectPostData(postData))

        .then(res => {
            updateUserData()
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
export function fetchUserByRoles(role: string, setUserList: Dispatch<SetStateAction<UserTableProps[]>>) {
    privateGateway.get(`${tableRoutes.user.listByRoles}${role}/`)
        .then(
            res => { setUserList(res.data.response) })
        .catch(err => console.log(err))
}
export async function fetchUsers(setUserList: Dispatch<SetStateAction<UserTableProps[]>>, setListForTable: Dispatch<SetStateAction<UserTableProps[]>>, updateTable?: Function) {
    await privateGateway.get(tableRoutes.user.list)
        .then(res => res.data.response)
        .then(data => {
            setUserList(data)
            setListForTable(data)
            if (updateTable) updateTable(data)
        })
        .catch(err => console.log('Error :', err?.response?.data?.message?.general[0]))
}
function selectPostData(postData: any) {
    const commonPostData = {
        name: postData.name,
        email: postData.email,
        phone: postData.phone,
        role: postData.role,
        password: postData.password
    }
    if (postData.role === 'DC' || postData.role === 'PE') {
        return { ...commonPostData, district: postData.district, }
    }
    if (postData.role === 'ZC') {
        return { ...commonPostData, zone: postData.zone }
    }
    if (postData.role === 'IN') {
        return { ...commonPostData, districtCoordinatorId: postData.coordinatorId, instituteId: postData.institutes.map((institute: any) => (institute.id)) }
    }
    return commonPostData
}
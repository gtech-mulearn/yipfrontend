import { Dispatch, SetStateAction } from "react"
import { UserTableProps } from "./UserTable"
import { setupRoutes, tableRoutes } from "../../../../../services/urls"
import { privateGateway } from "../../../../../services/apiGateway"
import { selectProps } from "../../utils/setupUtils"
import { showAlert } from "../../../components/Error/Alerts"
import { errorCheck, errorMessage, success } from "../../../components/Toastify/ToastifyConsts"
import { toast } from "react-toastify"

export function deleteThisUser(id: string, update: Function,
    setSuccessMessage: Dispatch<SetStateAction<string>>,
    setErrorMessage: Dispatch<SetStateAction<string>>,
    setUser: Dispatch<SetStateAction<UserTableProps>>
) {
    privateGateway.delete(`${tableRoutes.user.delete}${id}/`)
        .then(res => {
            toast.info(res?.data?.message?.general[0])
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
    toast.info("Creating user...", {
        toastId: 'userCreate',
    })
    // console.log(selectPostData(postData))
    privateGateway.post(setupRoutes.user.create, selectPostData(postData))
        .then(res => {
            toast.dismiss('userCreate')
            success();
            updateUserData()
            setViewSetup(false)
        })
        .catch(err => {
            toast.dismiss('userCreate')
            errorMessage(err.response)
            errorCheck(err.response)
        })
}
export function fetchUserByRoles(setUserList: Dispatch<SetStateAction<UserTableProps[]>>) {
    privateGateway.get(tableRoutes.user.listByRoles)
        .then(
            res => { setUserList(res.data.response) })
        .catch(err => console.log(err))
}
export async function fetchUsers(setUserList: Dispatch<SetStateAction<UserTableProps[] | null>>, setListForTable: Dispatch<SetStateAction<UserTableProps[] | null>>, updateTable?: Function) {
    await privateGateway.get(tableRoutes.user.list)
        .then(res => res.data.response)
        .then(data => {
            const newData = data.map((item: any) => (
                {
                    ...item,
                    role: (item?.role?.name || item?.role || ''),
                    location: getLocation(item),
                    institutes: item?.role?.institutes ? item?.role?.institutes : [],
                    coordinator: item?.role?.district_coordinator ? { id: item?.role?.district_coordinator_id, name: item?.role?.district_coordinator } : {} as selectProps
                }
            ))
            setUserList(newData)
            setListForTable(newData)
            if (updateTable) updateTable(newData)

        })
        .catch(err => console.log('Error :', err?.response?.data?.message?.general[0]))
}
function getLocation(item: any) {
    if (item?.role?.zone) return item?.role?.zone + ' Zone';
    else if (item?.role?.district) return item?.role?.district;
    else if (item?.role?.name === 'Intern') return Array.isArray(item?.role?.district) ? item?.role?.district?.map((district: any) => district?.name).join(',') : item?.role?.district ? item?.role?.district : '';
    else return 'Kerala ';
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
        return { ...commonPostData, districtCoordinatorId: postData.coordinatorId, instituteId: postData.institutes.length > 0 ? postData.institutes.map((institute: any) => (institute.id)) : null }
    }
    return commonPostData
}
export function updateUserDataFn(
    id: string,
    name: string,
    email: string,
    phone: string,
    role: string,
    updateUser: Function,
    setViewSetup: any,
    selectedInstitute: selectProps[],
    reset: () => void
) {
    const postData = {
        name: name,
        email: email,
        phone: phone,
        role: role,
        institutes: selectedInstitute,
        internId: id
    }
    toast.loading("Updating user...", {
        toastId: id,
        autoClose: false
    })
    privateGateway.put(`${setupRoutes.user.update}${id}/`, selectPostUpdateData(postData))
        .then(res => {
            toast.dismiss(id)
            success();
            updateUser()
            setViewSetup(false)
            reset()
        })
        .catch(err => {
            toast.dismiss(id)
            errorMessage(err.response)
            errorCheck(err.response)
        })

}
function selectPostUpdateData(postData: any) {
    const commonPostData = {
        name: postData.name,
        email: postData.email,
        phone: postData.phone,
        role: postData.role,
        internId: postData.internId,
        instituteId: postData.institutes.length > 0 ? postData.institutes.map((institute: any) => (institute.id)) : []
    }
    return commonPostData
}
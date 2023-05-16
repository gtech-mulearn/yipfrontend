import React, { SetStateAction } from "react"
import { link, urlProps } from "../service/RouteLink"
import apiGateway from "../service/apiGateway"
import { institutionProps } from "../service/dataHandler"

export const getCurrentPageUtils = (): urlProps => {
    for (let i in link) {
        if (window.location.pathname === link[i].path) {
            return link[i]
        }
    }
    return {} as urlProps
}

export const fetchUserList = async (setData: React.Dispatch<React.SetStateAction<institutionProps[]>>) => {
    apiGateway.get('/api/v1/yip/list-users/')
        .then((res) => res.data.response)
        .then((data) => setData(data))
        .catch((err) => console.log(err))
}
export interface postDataUserProps {
    name: string,
    email: string,
    password: string,
    phone: string,
    role: string,
}
export const addUser = async (postData: postDataUserProps) => {
    apiGateway.post('/api/v1/yip/create-user/', postData)
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
}

export const handleDelete = (schoolId: string, setUpdateData: React.Dispatch<React.SetStateAction<boolean>>) => {

    apiGateway.delete(`/api/v1/yip/delete-${getCurrentPageUtils().content !== 'Users' ? 'model-schools' : 'user'}/${schoolId}/`)
        .then(() => setUpdateData((prev: boolean) => !prev))
        .catch(error => console.error(error))
}
export const getRoles = async (setRoles: React.Dispatch<React.SetStateAction<string[]>>) => {
    apiGateway.get('/api/v1/yip/get-roles/')
        .then((res) => res.data.response.club_status)
        .then((data) => {
            setRoles(
                data.map((role: string, index: number) => ({ value: index, label: role })))
        })
        .catch((err) => console.log(err))
}
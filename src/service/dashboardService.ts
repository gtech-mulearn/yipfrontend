import apiGateway from "./apiGateway"
import yip, { institutionProps } from "./dataHandler"
import React from "react"


export interface DashboardContextProps {
    currentOption: string
    setCurrentOption: React.Dispatch<React.SetStateAction<string>>
    dataUpdate: boolean
    setUpdateData: React.Dispatch<React.SetStateAction<boolean>>
    create: boolean
    setCreate: React.Dispatch<React.SetStateAction<boolean>>
    institutions: institutionProps[]
    setInstitutions: React.Dispatch<React.SetStateAction<institutionProps[]>>
}
export const fetchInstitutions = async (content: string, setData: Function) => {
    apiGateway.get(`/api/v1/yip/${content === "Model School" ? "get-model-schools" : "get-colleges"}/`)
        .then(res => setData(res.data.response.clubs))
        .catch(err => console.error(err))
}
export const fetchData = () => {
    yip.fetchStatus()
    yip.fetchDistrict()
    yip.fetchLegislativeAssemblies()
    yip.fetchBlocks()
}
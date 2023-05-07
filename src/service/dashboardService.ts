import apiGateway from "./apiGateway"
import yip from "./dataHandler"
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
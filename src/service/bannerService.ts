import apiGateway from "./apiGateway";

export const fetchInstitutionStatusCount = async (setCount: Function, currentPage: string) => {
    const institutionType = currentPage === 'Model School' ? 'School' : 'College'
    apiGateway.get(`/api/v1/yip/get-clubs-count/${institutionType}/`)
        .then(res => res.data.response)
        .then(res => {
            console.log(res)
            setCount(res)
        })
        .catch(err => console.log(err))
}




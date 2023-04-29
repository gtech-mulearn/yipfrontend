import apiGateway from "./apiGateway"
class YIP {
    district: any
    modelSchools: any
    yipClubs: any
    clubStatus: any
    page: string


    constructor() {
        this.modelSchools = []
        this.yipClubs = []
        this.page = "Model School"
    }
    fetchDistrict = async () => {
        try {
            const response = await apiGateway.get(`/api/v1/yip/district/`)
            const { districts } = response.data.response
            this.district = districts
            return districts
        } catch (error) {
            console.error(error)
            return []
        }
    }
    fetchModelSchools = async () => {
        try {
            const response = await apiGateway.get(`/api/v1/yip/get-model-schools/`)
            const { clubs } = response.data.response
            this.modelSchools = clubs
            return clubs
        } catch (error) {
            console.error(error)
            this.modelSchools = []
            return []
        }
    }
    fetchStatus = async () => {
        try {
            const response = await apiGateway.get(`/api/v1/yip/list-clubs-status/`)
            const { club_status } = response.data.response
            this.clubStatus = club_status.map((item: string, id: number) => { return { id: id, name: item } })
            return club_status
        } catch (error) {
            console.error(error)
            this.clubStatus = []
            return []
        }
    }
    fetchYIPClubs = async () => {
        try {
            const response = await apiGateway.get(`/api/v1/yip/get-colleges/`)
            const { clubs } = response.data.response
            this.yipClubs = clubs
            return clubs
        } catch (error) {
            console.error(error)
            this.yipClubs = []
            return []
        }
    }

    deleteInstitution = async (institutionId: string, currentOption: string, index: number, setUpdateData: any) => {
        try {
            const response = await apiGateway.delete(`/api/v1/yip/delete-model-schools/${institutionId}/`)
            if (currentOption === "Model School") {
                this.modelSchools.splice(index, 1)
                setUpdateData((prev: any) => !prev)
            }
            else if (currentOption === "YIP Club") {
                this.yipClubs.splice(index, 1)
                setUpdateData((prev: any) => !prev)
            }
        } catch (error) {
            console.error(error)
        }
    }

    createInstitution = async (body: any, setUpdateData: any) => {
        try {
            const response = apiGateway.post(`/api/v1/yip/create-club/`, body)
            setUpdateData((prev: any) => !prev)
        } catch (error) {
            console.error(error)
        }
    }
}

const yip = new YIP()

export default yip

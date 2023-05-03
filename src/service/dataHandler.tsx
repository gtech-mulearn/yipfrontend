import apiGateway from "./apiGateway"
export interface institutionProps {
    id: string,
    name: string
    district: string
    club_status: string
    legislative_assembly: string
    block: string
}
interface districtProps {
    id: string,
    name: string
}
export interface conditionProps {
    updater: Boolean
    name: string
}
interface cLubStatusProps {
    id: string
    name: string
}
class YIP {
    district: districtProps[]
    clubStatus: []
    updateSortedTable: Function
    setTableData: Function
    institutions: institutionProps[]
    collegeSearchValue: string
    constructor() {
        this.district = []
        this.clubStatus = []
        this.updateSortedTable = () => { console.log("not working") }
        this.setTableData = () => { console.log("not working") }
        this.institutions = []
        this.collegeSearchValue = ""
    }
    collegeSearch = (search: string) => {
        this.collegeSearchValue = search
        let itemName = "", searchItem = ""
        this.setTableData(this.institutions.filter((item: institutionProps) => {
            itemName = item.name.toLowerCase().replaceAll(' ', '').replace(/[^a-zA-Z0-9 ]/g, '');
            searchItem = search.toLowerCase().replaceAll(' ', '').replace(/[^a-zA-Z0-9 ]/g, '');
            return itemName.includes(searchItem)
        }))
    }
    setFilter = (filterItem: string, statusFilter: string, setTableData: Function, institutions: institutionProps[]) => {

        if (statusFilter === "All" && filterItem === "All") {
            yip.institutions = institutions
        }
        else if (statusFilter !== "All" && filterItem !== "All") {
            yip.institutions = institutions.filter((item: any) => {
                return item.club_status === statusFilter && item.district === filterItem
            })
        }
        else if (filterItem !== "All" && statusFilter === "All") {
            yip.institutions = institutions.filter((item: any) => item.district === filterItem && true)
        }
        else if (statusFilter !== "All" && filterItem === "All") {
            yip.institutions = institutions.filter((item: any) => item.club_status === statusFilter && true)
        }
        setTableData(yip.institutions)
        this.collegeSearch(this.collegeSearchValue)

    }
    sortStatusUpdater = (value: string) => {
        switch (value) {
            case "Unsorted": return 'Sorted:ASC'
            case "Sorted:ASC": return 'Sorted:DESC'
            case "Sorted:DESC": return 'Sorted:ASC'
        }

    }

    sort = (setTableData: Function, sortBy: string, tableData: institutionProps[], setCondition: Function, condition: conditionProps) => {
        if (sortBy !== 'Manage' && sortBy !== 'SL') {
            let newTable: institutionProps[] = []
            sortBy = sortBy.toLowerCase().replace(' ', '_')
            if (sortBy !== 'status') {
                newTable = tableData
                newTable.sort((a: any, b: any) => {
                    if (a[sortBy] < b[sortBy]) return (condition.name === "Unsorted" || condition.name === "Sorted:DESC") ? -1 : 1
                    if (a[sortBy] > b[sortBy]) return (condition.name === "Unsorted" || condition.name === "Sorted:DESC") ? 1 : -1
                    return 0
                })
            }
            else {
                newTable = []
                const clubStatus = condition.name === "Unsorted" ? this.clubStatus : this.clubStatus.reverse()
                clubStatus.map((status: cLubStatusProps) => {
                    newTable.push(...tableData.filter((item: institutionProps) => {
                        return item.club_status === status.name
                    }))
                })
            }
            setTableData(newTable)
            setCondition((prev: conditionProps) => {
                return { updater: !prev.updater, name: this.sortStatusUpdater(condition.name) }
            })

        }
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


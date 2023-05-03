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

interface legislativeProps {
    id: string
    name: string
    district: string
}
class YIP {
    district: districtProps[]
    clubStatus: []
    updateSortedTable: Function
    setTableData: Function
    institutions: institutionProps[]
    collegeSearchValue: string
    legislative_assembly: legislativeProps[]
    filteredAssembly: legislativeProps[]
    assemblyFilter: string
    institutionsData: institutionProps[]
    statusFilter: string
    districtFilter: string
    updateTable: Function
    currentPage: string
    blockFilter: string
    blocks: legislativeProps[]
    filteredBlocks: legislativeProps[]

    constructor() {
        this.institutionsData = []
        this.district = []
        this.clubStatus = []
        this.legislative_assembly = []
        this.filteredAssembly = []
        this.updateSortedTable = () => { console.log("not working") }
        this.setTableData = () => { console.log("not working") }
        this.institutions = []
        this.collegeSearchValue = ""
        this.assemblyFilter = "All"
        this.statusFilter = 'All'
        this.districtFilter = 'All'
        this.updateTable = () => { console.log("not working") }
        this.currentPage = ""
        this.blockFilter = "All"
        this.blocks = []
        this.filteredBlocks = []
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

    setFilter = () => {
        this.filteredAssembly = this.legislative_assembly
        this.filteredBlocks = this.blocks
        this.institutions = this.institutionsData
        if (this.statusFilter !== "All") {
            this.institutions = this.institutions.filter((item: any) => {
                return item.club_status === this.statusFilter
            })
        }
        if (this.districtFilter !== "All") {
            this.filteredAssembly = this.legislative_assembly.filter((item: legislativeProps) => item.district === this.districtFilter)
            this.filteredBlocks = this.blocks.filter((item: legislativeProps) => item.district === this.districtFilter)
            this.institutions = this.institutions.filter((item: institutionProps) => {
                return item.district === this.districtFilter
            })
        }
        if (this.assemblyFilter !== "All") {
            this.institutions = this.institutions.filter((item: any) => {
                return item.legislative_assembly === this.assemblyFilter
            })
        }
        if (this.blockFilter !== "All") {
            this.institutions = this.institutions.filter((item: any) => {
                return item.block === this.blockFilter
            })
        }

        this.setTableData(this.institutions)
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
            console.log('this is working well')
            setUpdateData((prev: any) => !prev)
        } catch (error) {
            console.error(error)
        }
    }
    fetchLegislativeAssemblies = async () => {
        try {
            const response = await apiGateway.get(`/api/v1/yip/list-legislative-assembly/`)
            this.legislative_assembly = response.data.response
            this.filteredAssembly = response.data.response
        } catch (error) {
            console.log(error)
        }
    }
    fetchBlocks = async () => {
        try {
            const response = await apiGateway.get(`/api/v1/yip/list-blocks/`)
            this.blocks = response.data.response
        }
        catch (error) {
            console.log(error)
        }
    }
}
const yip = new YIP()

export class InstituteCreate {
    legislative_assembly: legislativeProps[]
    institutions: institutionProps[]
    filteredAssembly: legislativeProps[]
    districtFilter: string
    assemblyFilter: string

    constructor(legislative_assembly: legislativeProps[]) {
        this.legislative_assembly = legislative_assembly
        this.filteredAssembly = []
        this.institutions = []
        this.districtFilter = "All"
        this.assemblyFilter = "All"
    }

    setFilter = () => {
        if (this.districtFilter !== "All") {
            this.filteredAssembly = this.legislative_assembly.filter((item: any) => item.district === this.districtFilter)
        }
        else {
            this.filteredAssembly = this.legislative_assembly
        }
    }
}

export default yip


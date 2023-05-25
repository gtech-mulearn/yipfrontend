import { useState, Dispatch, SetStateAction, useEffect, FC } from "react"
import { CustomSelect } from "../../../components/CustomSelect/CustomSelect"
import { initialState, selectProps } from "../../utils/setupUtils"
import CustomTable from "../../components/CustomTable/CustomTable"
import '../../components/Table.scss'
import Modal from "./SchoolModal"
import { fetchAssemblies, fetchBlocks, fetchDistricts, fetchSchools, fetchStatus } from "./SchoolAPI"
export interface SchoolTableProps {
    id: string
    name: string
    district: string
    block: string
    legislative_assembly: string
    club_status: string
}
export interface localBodyProps extends selectProps {
    district: string
}
const TableTitleList = ["Name", "District", " Assembly", "Block", "Status"]
const list: (keyof SchoolTableProps)[] = ['name', 'district', 'block', 'legislative_assembly', 'club_status']
interface SchoolSetupProps {
    setViewSetup: Dispatch<SetStateAction<boolean>>
    updateSchoolData: Function
    updated: boolean
}
const SchoolTable: FC<SchoolSetupProps> = ({ setViewSetup, updateSchoolData, updated }) => {
    const [districtList, setDistrictList] = useState<selectProps[]>([])
    const [district, setDistrict] = useState<selectProps>(initialState)
    const [filterByAssembly, setFilterByAssembly] = useState<boolean>(true)
    const [assembly, setAssembly] = useState<string>('')
    const [assemblyList, setAssemblyList] = useState<localBodyProps[]>([])
    const [block, setBlock] = useState<string>('')
    const [blockList, setBlockList] = useState<localBodyProps[]>([])
    const [status, setStatus] = useState<string>('')
    const [statusList, setStatusList] = useState<string[]>([])
    const [optionStatusList, setOptionStatusList] = useState<selectProps[]>([])
    const [schoolList, setSchoolList] = useState<SchoolTableProps[]>([])
    const [listForTable, setListForTable] = useState<SchoolTableProps[]>([])
    const [search, setSearch] = useState<string>('')
    const [filterBtn, setFilterBtn] = useState<boolean>(false)
    const [school, setSchool] = useState<SchoolTableProps>({} as SchoolTableProps)
    const [menu, setMenu] = useState<boolean>(window.innerWidth > 768)

    useEffect(() => {
        fetchDistricts(setDistrictList)
        fetchAssemblies(setAssemblyList)
        fetchBlocks(setBlockList)
        fetchSchools(setSchoolList, setListForTable)
        fetchStatus(setStatusList, setOptionStatusList)
    }, [])

    useEffect(() => {
        fetchSchools(setSchoolList, setListForTable, updateTable)
    }, [updated])

    useEffect(() => {
        setAssembly('')
        setBlock('')
    }, [filterByAssembly])
    useEffect(() => {
        setListForTable(filterSchool(schoolList, search, district, assembly, block, status))
    }, [district, block, assembly, status, search, filterBtn])
    function updateTable(schoolList: SchoolTableProps[]) {
        setListForTable(filterSchool(schoolList, search, district, assembly, block, status))
    }
    function resetFilter() {
        setFilterBtn(false)
        setDistrict(initialState)
        setAssembly('')
        setBlock('')
        setStatus('')
    }
    function filterBy(list: localBodyProps[]) {
        return list.filter((item: localBodyProps) =>
            district.id ? item.district === district.name : true)
    }
    return (
        <>
            {school?.id && <Modal school={school} setSchool={setSchool} optionStatusList={optionStatusList} updateSchoolData={updateSchoolData} />}
            <div className='white-container'>

                {/* Table top */}

                <div className="table-top">
                    <div className='table-header'>
                        <h3>Model School List</h3>
                        <div className='table-header-btn'>
                            <li className="fas fa-bars " onClick={() => setMenu(!menu)}></li>
                        </div>
                    </div>
                    {menu && <div className='table-fn'>
                        <div className='search-bar'>
                            <input className='search-bar-item'
                                id='search'
                                name='search'
                                type="text"
                                value={search}
                                placeholder={`Search `}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <li
                                className='fas fa-close cursor'
                                onClick={() => setSearch('')}
                            ></li>
                        </div>
                        <div className="table-fn-btn cursor" onClick={() => setViewSetup((prev: boolean) => !prev)}>
                            <i className="fa-solid fa-plus"></i>
                            <p>Add Model School</p>
                        </div>
                        <div className="table-fn-btn cursor" onClick={() => setFilterBtn(!filterBtn)}>
                            <i className="fa-solid fa-filter"></i>
                            <p>Filter</p>
                        </div>
                        {filterBtn && <div className="table-fn-btn  cursor" onClick={resetFilter}>
                            <p></p>
                            <i className="fa-solid fa-close  "></i>
                            <p></p>
                        </div>}
                    </div>}
                </div>

                {/* Filters */}

                {filterBtn && <div className="filter-container">
                    <div className="filter-box">
                        <div className="table-white-btn" onClick={() => setFilterByAssembly((prev: boolean) => !prev)}>
                            <i className="fa-solid fa-repeat"></i>
                            <p>{`Filter By ${filterByAssembly ? 'Block' : 'Assembly'}`}</p>
                        </div>
                        <CustomSelect option={districtList} header='District' setData={setDistrict} requiredHeader={false} />
                        <CustomSelect
                            option={filterByAssembly ? filterBy(assemblyList) : filterBy(blockList)}
                            header={filterByAssembly ? 'Assembly' : 'Block'}
                            setValue={filterByAssembly ? setAssembly : setBlock}
                            requiredHeader={false}
                            requiredData={false}
                            requiredLabel={true}
                            sentenceCase={!filterByAssembly}

                        />
                        <CustomSelect option={optionStatusList} header='Status' setValue={setStatus} requiredHeader={false} requiredData={false} requiredLabel={true} />
                    </div >
                </div>
                }

                {/*  Table  */}

                <CustomTable<SchoolTableProps>
                    tableHeadList={TableTitleList}
                    tableData={listForTable}
                    orderBy={list}
                    sortOrder={{
                        sortBy: 'club_status' as keyof SchoolTableProps,
                        orderList: statusList,
                        orderSymbol: {
                            asc: 'fa-arrow-up-short-wide',
                            desc: 'fa-arrow-down-wide-short'
                        }
                    }}
                    customCSS={[{
                        name: 'club_status',
                        css: 'status'
                    }]}
                    manage={{
                        value: 'View',
                        manageFunction: (item: SchoolTableProps) => { setSchool(item) }
                    }}
                />
            </div >
        </>
    )
}
function filterSchool(schoolList: SchoolTableProps[], search: string, district: selectProps, assembly: string, block: string, status: string) {
    let list = schoolList
    if (search) {
        list = searchSchool(list, search)
    }
    if (assembly) {
        list = list.filter(school => school.legislative_assembly === assembly)
    }
    if (block) {
        list = list.filter(school => school.block === block)
    }
    if (status) {
        list = list.filter(school => school.club_status === status)
    }
    if (district.name) {
        list = list.filter(school => school.district === district.name)
    }
    return list
}
function searchSchool(schoolList: SchoolTableProps[], search: string) {
    return schoolList.filter((school: SchoolTableProps) =>
        rawString(school.name).includes(rawString(search)) ||
        rawString(school.district).includes(rawString(search)) ||
        rawString(school.legislative_assembly).includes(rawString(search)) ||
        rawString(school.block).includes(rawString(search)) ||
        rawString(school.club_status).includes(rawString(search))
    )
}

function rawString(str: string) {
    if (str === '' || str === null || str === undefined) return ''
    str = str.toLowerCase()
    str = str.replace(/[^a-zA-Z0-9 ]/g, '')
    str = str.replaceAll(' ', '')
    return str
}


export default SchoolTable
import React, { Dispatch, FC, SetStateAction, useEffect, useRef, useState } from 'react'
import { initialState, selectProps } from '../../utils/setupUtils'
import Modal from './AssemblyModal'
import { CustomSelect } from '../../../components/CustomSelect/CustomSelect'
import CustomTable from '../../components/CustomTable/CustomTable'
import { fetchAssemblys, fetchDistricts } from './assemblyAPI'
import { loading } from '../../../components/Toastify/ToastifyConsts'
import { OptionDistrict } from '../../../../../utils/Locations'

interface AssemblySetupProps {
    setViewSetup: Dispatch<SetStateAction<boolean>>
    updateAssemblyData: Function
    updated: boolean
}
export interface AssemblyTableProps {
    id: string
    name: string
    district: string
}

const TableTitleList = ["Name", "District",]
const list: (keyof AssemblyTableProps)[] = ['name', 'district',]
const AssemblyTable: FC<AssemblySetupProps> = ({ setViewSetup, updateAssemblyData, updated }) => {
    const [search, setSearch] = useState<string>('')
    const [assembly, setAssembly] = useState<AssemblyTableProps>({} as AssemblyTableProps)
    const [assemblyList, setAssemblyList] = useState<AssemblyTableProps[] | null>(null)
    const [filterBtn, setFilterBtn] = useState<boolean>(false)
    const [districtList, setDistrictList] = useState<selectProps[]>([])
    const [district, setDistrict] = useState<selectProps>(initialState)
    const [listForTable, setListForTable] = useState<AssemblyTableProps[] | null>(null)
    const [menu, setMenu] = useState<boolean>(window.innerWidth > 768)
    const fetchedOnce = useRef(false)
    useEffect(() => {

        setDistrictList(OptionDistrict)
        fetchAssemblys(setAssemblyList, setListForTable)
    }, [])
    useEffect(() => {
        setListForTable(filterAssembly(assemblyList, search, district))
    }, [assemblyList])
    useEffect(() => {
        if (fetchedOnce.current)
            fetchAssemblys(setAssemblyList, setListForTable, updateTable)
    }, [updated])
    useEffect(() => {
        if (fetchedOnce.current)
            setListForTable(filterAssembly(assemblyList, search, district))
        fetchedOnce.current = true
    }, [search, district, filterBtn])
    function updateTable(assemblyList: AssemblyTableProps[]) {
        setListForTable(filterAssembly(assemblyList, search, district))
    }

    function resetFilter() {
        setFilterBtn(false)
        setDistrict(initialState)
    }
    return (
        <>
            {assembly?.id && (
                <Modal
                    assembly={assembly}
                    setAssembly={setAssembly}
                    update={updateAssemblyData}
                />
            )}
            <div className="white-container">
                {/* Table top */}

                <div className="table-top">
                    <div className="table-header">
                        <h3>Assembly List</h3>
                        <div
                            className="table-header-btn"
                            onClick={() => setMenu(!menu)}
                        >
                            <li className="fas fa-bars "></li>
                        </div>
                    </div>
                    {menu && (
                        <div className="table-fn">
                            <div className="search-bar">
                                <input
                                    className="search-bar-item"
                                    id="search"
                                    name="search"
                                    type="text"
                                    value={search}
                                    placeholder={`Search`}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                                <li
                                    className="fas fa-close cursor"
                                    onClick={() => setSearch("")}
                                ></li>
                            </div>
                            <div
                                className="table-fn-btn cursor"
                                onClick={() => {
                                    window.scrollTo(0, 0);
                                    setViewSetup((prev: boolean) => !prev);
                                }}
                            >
                                <i className="fa-solid fa-plus"></i>
                                <p>Add Assembly</p>
                            </div>
                            <button
                                className="table-fn-btn cursor"
                                style={{ cursor: "pointer" }}
                                onClick={() => setFilterBtn(!filterBtn)}
                            >
                                <i className="fa-solid fa-filter"></i>
                                <p className="filter">Filter</p>
                            </button>
                            {filterBtn && (
                                <div
                                    className="table-fn-btn  cursor"
                                    onClick={resetFilter}
                                >
                                    <p></p>
                                    <i className="fa-solid fa-close"></i>
                                    <p></p>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Filters */}

                {filterBtn && (
                    <div className="filter-container">
                        <div className="filter-box">
                            <CustomSelect
                                option={districtList}
                                header="District"
                                setData={setDistrict}
                                requiredHeader={false}
                            />
                        </div>
                    </div>
                )}

                {/* Table */}

                <CustomTable<AssemblyTableProps>
                    tableHeadList={TableTitleList}
                    tableData={listForTable}
                    orderBy={list}
                    manage={{
                        value: "Delete",
                        manageFunction: (item: AssemblyTableProps) => {
                            setAssembly(item);
                        },
                        icon: "fa-trash",
                    }}
                    countPerPage={11}
                />
            </div>
        </>
    );
}
function filterAssembly(assemblyList: AssemblyTableProps[] | null, search: string, district: selectProps) {
    if (assemblyList === null) return assemblyList
    let list = assemblyList
    if (search) {
        list = searchAssembly(list, search)
    }
    if (district.name) {
        list = list.filter(assembly => assembly.district === district.name)
    }
    return list
}
function searchAssembly(assemblyList: AssemblyTableProps[], search: string) {
    return assemblyList.filter((assembly: AssemblyTableProps) =>
        rawString(assembly.name).includes(rawString(search)) ||
        rawString(assembly.district).includes(rawString(search))
    )
}
function rawString(str: string) {
    str = str?.toLowerCase()
    str = str?.replace(/[^a-zA-Z0-9 ]/g, '')
    str = str?.replaceAll(' ', '')
    return str
}


export default AssemblyTable


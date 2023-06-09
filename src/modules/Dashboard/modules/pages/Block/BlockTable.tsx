import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { initialState, selectProps } from '../../utils/setupUtils'
import Modal from './BlockModal'
import { CustomSelect } from '../../../components/CustomSelect/CustomSelect'
import CustomTable from '../../components/CustomTable/CustomTable'
import { fetchBlocks, fetchDistricts } from './blockAPI'
import { loading } from '../../../components/Toastify/ToastifyConsts'

interface BlockSetupProps {
    setViewSetup: Dispatch<SetStateAction<boolean>>
    updateBlockData: Function
    updated: boolean
}
export interface BlockTableProps {
    id: string
    name: string
    district: string
}

const TableTitleList = ["Name", "District",]
const list: (keyof BlockTableProps)[] = ['name', 'district',]
const BlockTable: FC<BlockSetupProps> = ({ setViewSetup, updateBlockData, updated }) => {
    const [search, setSearch] = useState<string>('')
    const [block, setBlock] = useState<BlockTableProps>({} as BlockTableProps)
    const [blockList, setBlockList] = useState<BlockTableProps[]>([])
    const [filterBtn, setFilterBtn] = useState<boolean>(false)
    const [districtList, setDistrictList] = useState<selectProps[]>([])
    const [district, setDistrict] = useState<selectProps>(initialState)
    const [menu, setMenu] = useState<boolean>(window.innerWidth > 768)
    const [listForTable, setListForTable] = useState<BlockTableProps[]>([])

    useEffect(() => {

        fetchDistricts(setDistrictList)
        fetchBlocks(setBlockList, setListForTable)
    }, [])
    useEffect(() => {

        fetchBlocks(setBlockList, setListForTable, updateTable)
    }, [updated])
    useEffect(() => {
        setListForTable(filterBlock(blockList, search, district))
    }, [search, district, filterBtn])
    function updateTable(blockList: BlockTableProps[]) {
        setListForTable(filterBlock(blockList, search, district))
    }

    function resetFilter() {
        setFilterBtn(false)
        setDistrict(initialState)
    }
    return (
        <>
            {block?.id && (
                <Modal
                    block={block}
                    setBlock={setBlock}
                    update={updateBlockData}
                />
            )}
            <div className="white-container">
                {/* Table top */}

                <div className="table-top">
                    <div className="table-header">
                        <h3>Block List</h3>
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
                                    placeholder={`Search `}
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
                                <p>Add Block</p>
                            </div>
                            <button
                                className="table-fn-btn cursor"
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                    setFilterBtn(!filterBtn);
                                }}
                            >
                                <i className="fa-solid fa-filter"></i>
                                <p>Filter</p>
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

                <CustomTable<BlockTableProps>

                    tableHeadList={TableTitleList}
                    tableData={listForTable}
                    orderBy={list}

                    manage={{
                        value: "Delete",
                        manageFunction: (item: BlockTableProps) => {
                            setBlock(item);
                        },
                        icon: "fa-trash",
                    }}
                    countPerPage={11}
                />
            </div>
        </>
    );
}
function filterBlock(blockList: BlockTableProps[], search: string, district: selectProps) {
    let list = blockList
    if (search) {
        list = searchBlock(list, search)
    }
    if (district.name) {
        list = list.filter(block => block.district === district.name)
    }
    return list
}
function searchBlock(blockList: BlockTableProps[], search: string) {
    return blockList.filter((school: BlockTableProps) =>
        rawString(school.name).includes(rawString(search)) ||
        rawString(school.district).includes(rawString(search))
    )
}
function rawString(str: string) {
    str = str.toLowerCase()
    str = str.replace(/[^a-zA-Z0-9 ]/g, '')
    str = str.replaceAll(' ', '')
    return str
}

export default BlockTable


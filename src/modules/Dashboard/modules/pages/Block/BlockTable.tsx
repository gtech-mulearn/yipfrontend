import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { initialState, selectProps } from '../../utils/setupUtils'
import { setupRoutes, tableRoutes } from '../../../../../services/urls'
import { privateGateway } from '../../../../../services/apiGateway'
import Modal from './BlockModal'
import { CustomSelect } from '../../../components/CustomSelect/CustomSelect'
import CustomTable from '../../components/CustomTable/CustomTable'

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
            {block?.id && <Modal block={block} setBlock={setBlock} update={updateBlockData} />}
            <div className='white-container'>

                {/* Table top */}

                <div className="table-top">
                    <div className='table-header'>
                        <h3>Block List</h3>
                        <div className='table-header-btn'>
                            <li className="fas fa-bars "></li>
                        </div>
                    </div>
                    <div className='table-fn'>
                        <div className='search-bar'>
                            <input className='search-bar-item'
                                id='search'
                                name='search'
                                type="text"
                                value={search}
                                placeholder={`Search Model block`}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <li
                                className='fas fa-close cursor'
                                onClick={() => setSearch('')}
                            ></li>
                        </div>
                        <div className="table-fn-btn cursor" onClick={() => setViewSetup((prev: boolean) => !prev)}>
                            <i className="fa-solid fa-plus"></i>
                            <p>Add BLock</p>
                        </div>
                        <button className="table-fn-btn show-in-500 cursor">Show Banner</button>
                        <div className="table-fn-btn cursor" onClick={() => setFilterBtn(!filterBtn)}>
                            <i className="fa-solid fa-filter"></i>
                            <p>Filter</p>
                        </div>
                        {filterBtn && <div className="table-fn-btn  cursor" onClick={resetFilter}>
                            <p></p>
                            <i className="fa-solid fa-close"></i>
                            <p></p>
                        </div>}
                    </div>
                </div>

                {/* Filters */}

                {filterBtn && <div className="filter-container">
                    <div className="filter-box">
                        <CustomSelect option={districtList} value='District' setData={setDistrict} requiredHeader={false} />
                    </div >
                </div>
                }

                {/* Table */}

                <CustomTable<BlockTableProps>
                    tableHeadList={TableTitleList}
                    tableData={listForTable}
                    orderBy={list}
                    manage={{
                        value: 'View',
                        manageFunction: (item: BlockTableProps) => { setBlock(item) }
                    }}
                />
            </div>
        </>
    )
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
    return blockList.filter((block: BlockTableProps) => rawString(block.name).includes(rawString(search)))
}
function rawString(str: string) {
    str = str.toLowerCase()
    str = str.replace(/[^a-zA-Z0-9 ]/g, '')
    str = str.replaceAll(' ', '')
    return str
}
function fetchDistricts(setData: Dispatch<SetStateAction<selectProps[]>>) {
    privateGateway.get(setupRoutes.district.list)
        .then(res => res.data.response.districts)
        .then(data => setData(data))
        .catch(err => console.log('Error :', err?.response?.data?.message?.general[0]))
}
function fetchBlocks(
    setData: Dispatch<SetStateAction<BlockTableProps[]>>,
    setData2: Dispatch<SetStateAction<BlockTableProps[]>>,
    updateTable?: Function
) {
    privateGateway.get(tableRoutes.block.list)
        .then(res => res.data.response)
        .then(data => {
            setData(data)
            setData2(data)
            if (updateTable) updateTable(data)
        })
        .catch(err => console.log('Error :', err?.response?.data?.message?.general[0]))
}
export default BlockTable


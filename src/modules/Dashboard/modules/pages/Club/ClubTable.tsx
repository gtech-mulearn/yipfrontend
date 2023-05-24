import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { initialState, selectProps } from '../../utils/setupUtils'
import Modal from './Modal'
import { CustomSelect } from '../../../components/CustomSelect/CustomSelect'
import CustomTable from '../../components/CustomTable/CustomTable'
import { privateGateway } from '../../../../../services/apiGateway'
import { setupRoutes, tableRoutes } from '../../../../../services/urls'
interface ClubSetupProps {
    setViewSetup: Dispatch<SetStateAction<boolean>>
    updateClubData: Function
    updated: boolean
}
export interface ClubTableProps {
    id: string
    name: string
    district: string
    block: null
    legislative_assembly: null
    club_status: string
}
const TableTitleList = ["Name", "District", "Status"]
const list: (keyof ClubTableProps)[] = ['name', 'district', 'club_status']
const ClubTable: FC<ClubSetupProps> = ({ setViewSetup, updateClubData, updated }) => {
    const [districtList, setDistrictList] = useState<selectProps[]>([])
    const [district, setDistrict] = useState<selectProps>(initialState)
    const [status, setStatus] = useState<string>('')
    const [statusList, setStatusList] = useState<string[]>([])
    const [optionStatusList, setOptionStatusList] = useState<selectProps[]>([])
    const [clubList, setClubList] = useState<ClubTableProps[]>([])
    const [listForTable, setListForTable] = useState<ClubTableProps[]>([])
    const [search, setSearch] = useState<string>('')
    const [filterBtn, setFilterBtn] = useState<boolean>(false)
    const [club, setClub] = useState<ClubTableProps>({} as ClubTableProps)

    useEffect(() => {
        fetchDistricts(setDistrictList)
        fetchClubs(setClubList, setListForTable)
        fetchStatus(setStatusList, setOptionStatusList)
    }, [])

    useEffect(() => {
        fetchClubs(setClubList, setListForTable, updateTable)
    }, [updated])

    useEffect(() => {
        setListForTable(filterClub(clubList, search, district, status))
    }, [district, status, search, filterBtn])
    function updateTable(clubList: ClubTableProps[]) {
        setListForTable(filterClub(clubList, search, district, status))
    }
    function resetFilter() {
        setFilterBtn(false)
        setDistrict(initialState)
        setStatus('')
    }
    return (
        <>
            {club?.id && <Modal club={club} setClub={setClub} optionStatusList={optionStatusList} update={updateClubData} />}
            <div className='white-container'>

                {/* Table top */}

                <div className="table-top">
                    <div className='table-header'>
                        <h3>Model club List</h3>
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
                                placeholder={`Search Model club`}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <li
                                className='fas fa-close cursor'
                                onClick={() => setSearch('')}
                            ></li>
                        </div>
                        <div className="table-fn-btn cursor" onClick={() => setViewSetup((prev: boolean) => !prev)}>
                            <i className="fa-solid fa-plus"></i>
                            <p>Add Model club</p>
                        </div>
                        <button className="table-fn-btn show-in-500 cursor">Show Banner</button>
                        <div className="table-fn-btn cursor" onClick={() => setFilterBtn(!filterBtn)}>
                            <i className="fa-solid fa-filter"></i>
                            <p>Filter</p>
                        </div>
                        {filterBtn && <div className="table-fn-btn  cursor" onClick={resetFilter}>
                            <p></p>
                            <i className="fa-solid fa-close  "></i>
                            <p></p>
                        </div>}
                    </div>
                </div>

                {/* Filters */}

                {filterBtn && <div className="filter-container">
                    <div className="filter-box">
                        <CustomSelect option={districtList} value='District' setData={setDistrict} requiredHeader={false} />
                        <CustomSelect option={optionStatusList} value='Status' setValue={setStatus} requiredHeader={false} requiredData={false} requiredLabel={true} />
                    </div >
                </div>
                }

                {/*  Table  */}

                <CustomTable<ClubTableProps>
                    tableHeadList={TableTitleList}
                    tableData={listForTable}
                    orderBy={list}
                    sortOrder={{
                        sortBy: 'club_status' as keyof ClubTableProps,
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
                        manageFunction: (item: ClubTableProps) => { setClub(item) }
                    }}
                />
            </div >
        </>
    )
}
function filterClub(clubList: ClubTableProps[], search: string, district: selectProps, status: string) {
    let list = clubList
    if (search) {
        list = searchClub(list, search)
    }
    if (status) {
        list = list.filter(club => club.club_status === status)
    }
    if (district.name) {
        list = list.filter(club => club.district === district.name)
    }
    return list
}
function searchClub(clubList: ClubTableProps[], search: string) {
    return clubList.filter((club: ClubTableProps) => rawString(club.name).includes(rawString(search)))
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

async function fetchClubs(
    setData: Dispatch<SetStateAction<ClubTableProps[]>>,
    setData2: Dispatch<SetStateAction<ClubTableProps[]>>,
    updateTable?: Function
) {
    await privateGateway.get(tableRoutes.club.list)
        .then(res => res.data.response.clubs)
        .then(data => {
            setData(data)
            setData2(data)
            if (updateTable) updateTable(data)
        })
        .catch(err => console.log('Error :', err?.response?.data?.message?.general[0]))
}
export function fetchStatus(setData: Dispatch<SetStateAction<string[]>>, setOptionStatusList: Dispatch<SetStateAction<selectProps[]>>) {
    privateGateway.get(tableRoutes.status.list)
        .then(res => res.data.response.clubStatus)
        .then(data => {
            setData(data)
            setOptionStatusList(data.map((item: selectProps, index: string) => {
                return {
                    id: index,
                    name: item
                }
            }))
        })
        .catch(err => console.log('Error :', err?.response?.data?.message?.general[0]))
}
export default ClubTable
import React, { Dispatch, FC, SetStateAction, useContext, useEffect, useRef, useState } from 'react'
import { initialState, selectProps } from '../../utils/setupUtils'
import Modal from './ClubModal'
import { CustomSelect } from '../../../components/CustomSelect/CustomSelect'
import CustomTable from '../../components/CustomTable/CustomTable'
import { privateGateway } from '../../../../../services/apiGateway'
import { setupRoutes, tableRoutes } from '../../../../../services/urls'
import { fetchClubs, fetchDistricts, fetchStatus } from './clubAPI'
import { useNavigate } from 'react-router-dom'
import { loading } from '../../../components/Toastify/ToastifyConsts'
import { GlobalContext } from '../../../../../utils/GlobalVariable'
import roles from '../../../../../utils/roles'
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
    const { userInfo } = useContext(GlobalContext)
    const navigate = useNavigate()
    const [districtList, setDistrictList] = useState<selectProps[]>([])
    const [district, setDistrict] = useState<selectProps>(initialState)
    const [status, setStatus] = useState<string>('')
    const [statusList, setStatusList] = useState<string[]>([])
    const [optionStatusList, setOptionStatusList] = useState<selectProps[]>([])
    const [clubList, setClubList] = useState<ClubTableProps[] | null>(null)
    const [listForTable, setListForTable] = useState<ClubTableProps[] | null>(null)
    const [search, setSearch] = useState<string>('')
    const [filterBtn, setFilterBtn] = useState<boolean>(false)
    const [club, setClub] = useState<ClubTableProps>({} as ClubTableProps)
    const [menu, setMenu] = useState<boolean>(window.innerWidth > 768)
    const fetchedOnce = useRef(false)
    useEffect(() => {
        fetchDistricts(setDistrictList)
        fetchClubs(setClubList, setListForTable)
        fetchStatus(setStatusList, setOptionStatusList)
    }, [])
    useEffect(() => {
        setListForTable(filterClub(clubList, search, district, status))
    }, [clubList])
    useEffect(() => {
        if (fetchedOnce.current)
            fetchClubs(setClubList, setListForTable, updateTable)
    }, [updated])

    useEffect(() => {
        if (fetchedOnce.current)
            setListForTable(filterClub(clubList, search, district, status))
        fetchedOnce.current = true
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
            {club?.id && (
                <Modal
                    club={club}
                    setClub={setClub}
                    optionStatusList={optionStatusList}
                    update={updateClubData}
                />
            )}
            <div className="white-container">
                {/* Table top */}

                <div className="table-top">
                    <div className="table-header">
                        <h3>YIP Campus List</h3>
                        <div className="table-header-btn">
                            <li
                                className="fas fa-bars "
                                onClick={() => setMenu(!menu)}
                            ></li>
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
                            {userInfo.role !== roles.INTERN && <div
                                className="table-fn-btn cursor"
                                onClick={() =>
                                    setViewSetup((prev: boolean) => !prev)
                                }
                            >
                                <i className="fa-solid fa-plus"></i>
                                <p>Add Campus</p>
                            </div>}
                            <div
                                className="table-fn-btn cursor"
                                style={{ cursor: "pointer" }}
                                onClick={() => setFilterBtn(!filterBtn)}
                            >
                                <i className="fa-solid fa-filter"></i>
                                <p>Filter</p>
                            </div>
                            {filterBtn && (
                                <div
                                    className="table-fn-btn  cursor"
                                    onClick={resetFilter}
                                >
                                    <p></p>
                                    <i className="fa-solid fa-close  "></i>
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
                            <CustomSelect
                                option={optionStatusList.slice(0, 5)}
                                header="Status"
                                setValue={setStatus}
                                requiredHeader={false}
                                requiredData={false}
                                requiredLabel={true}
                            />
                        </div>
                    </div>
                )}

                {/*  Table  */}

                <CustomTable<ClubTableProps>
                    tableHeadList={TableTitleList}
                    tableData={listForTable}
                    orderBy={list}
                    sortOrder={{
                        sortBy: "club_status" as keyof ClubTableProps,
                        orderList: statusList,
                        orderSymbol: {
                            asc: "fa-arrow-up-short-wide",
                            desc: "fa-arrow-down-wide-short",
                        },
                    }}
                    customCSS={[
                        {
                            name: "club_status",
                            css: "status",
                        },
                    ]}
                    manage={{
                        value: "View",
                        manageFunction: (item: ClubTableProps) => {
                            navigate(`/campus-dashboard/club/${item.id}`);
                        },
                        icon: "fa-solid fa-eye",
                    }}
                />
            </div>
        </>
    );
}
function filterClub(clubList: ClubTableProps[] | null, search: string, district: selectProps, status: string) {
    if (clubList === null) return clubList
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
    return clubList.filter((club: ClubTableProps) =>
        rawString(club.name)?.includes(rawString(search)) ||
        rawString(club.district)?.includes(rawString(search)) ||
        rawString(club.club_status)?.includes(rawString(search)))
}

function rawString(str: string) {
    str = str?.toLowerCase()
    str = str?.replace(/[^a-zA-Z0-9 ]/g, '')
    str = str?.replaceAll(' ', '')
    return str
}
export default ClubTable
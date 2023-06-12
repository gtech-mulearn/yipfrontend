import React, { Dispatch, FC, SetStateAction, useContext, useEffect, useRef, useState } from 'react'
import { initialState, selectProps } from '../../utils/setupUtils'
import { CustomSelect } from '../../../components/CustomSelect/CustomSelect'
import CustomTable from '../../components/CustomTable/CustomTable'

import Modal from './UserModal'
import { fetchUserRoles, fetchUsers } from './UserApi'
import { GlobalContext } from '../../../../../utils/GlobalVariable'


export interface UserTableProps {
    id: string
    name: string
    email: string
    phone: string
    role: string
    location: string
    institutes: string[]
}
const TableTitleList = ["Name", "Email", "Phone", " Role", 'Location']
const list: (keyof UserTableProps)[] = ['name', 'email', 'phone', 'role', 'location']

interface UserSetupProps {
    setViewSetup: Dispatch<SetStateAction<boolean>>
    updateUserData: Function
    updated: boolean
}

const UserTable: FC<UserSetupProps> = ({ setViewSetup, updateUserData, updated }) => {
    const [searchName, setSearchName] = useState("")
    const [filterBtn, setFilterBtn] = useState(false)
    const { roles } = useContext(GlobalContext)

    const [roleList, setRoleList] = useState<selectProps[]>([])
    const [role, setRole] = useState<selectProps>(initialState)
    const [listForTable, setListForTable] = useState<UserTableProps[]>([])
    const [user, setUser] = useState<UserTableProps>({} as UserTableProps)
    const [userList, setUserList] = useState<UserTableProps[]>([])
    const [menu, setMenu] = useState<boolean>(window.innerWidth > 768)
    const [refresh, setRefresh] = useState<boolean>(false)
    const [timeStamp, setTimeStamp] = useState<number>(0)
    const firstCall = useRef(false)

    useEffect(() => {
        if (userList.length) {
            let currentTime = Date.now()
            setTimeStamp(currentTime)
            const data = { list: userList, timeStamp: currentTime }
            sessionStorage.setItem("userList", JSON.stringify(data))
        }
    }, [userList])
    useEffect(() => {
        if (!firstCall.current) {
            const userListStorage = sessionStorage.getItem("userList")
            if (userListStorage) {
                setUserList(JSON.parse(userListStorage).list)
                setListForTable(JSON.parse(userListStorage).list)
                setTimeStamp(JSON.parse(userListStorage).timeStamp)
            }
            fetchUsers(setUserList, setListForTable)
        }
        if (roles.length) {
            setRoleList(roles)
        }
        if (userList.length) {
            setListForTable(filterUser(userList, searchName, role))
        }
    }, [searchName, role, roles])
    useEffect(() => {
        if (firstCall.current) {
            fetchUsers(setUserList, setListForTable)
        }
        firstCall.current = true
    }, [updated, refresh])
    function updateTable(userList: UserTableProps[]) {
        setListForTable(filterUser(userList, searchName, role))
    }
    function resetFilter() {
        setFilterBtn(false)
        setRole(initialState)
    }

    return (
        <>
            <div className="white-container">
                {/* Modal */}
                {user?.id && (
                    <Modal
                        user={user}
                        setUser={setUser}
                        updateUserData={updateUserData}
                    />
                )}

                {/* Search ,Filters View */}

                <div className="table-top">
                    <div className="table-header">
                        <h3>User List</h3>
                        <div className='table-sub-container'>
                            <li className='fas fa-rotate-right' onClick={() => setRefresh(!refresh)}></li>
                            {/* <p className='update-time'>
                                <p>Last Updated at </p>
                                <p>{new Date(timeStamp).toLocaleString()}</p>
                            </p> */}
                            <div className="table-header-btn">
                                <li
                                    className="fas fa-bars "
                                    onClick={() => setMenu(!menu)}
                                ></li>
                            </div>
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
                                    value={searchName}
                                    placeholder={`Search`}
                                    onChange={(e) =>
                                        setSearchName(e.target.value)
                                    }
                                />
                                <li
                                    className="fas fa-close cursor"
                                    onClick={() => setSearchName("")}
                                ></li>
                            </div>
                            <div
                                className="table-fn-btn cursor"
                                onClick={() =>
                                    setViewSetup((prev: boolean) => !prev)
                                }
                            >
                                <i className="fa-solid fa-plus"></i>
                                <p>Add User</p>
                            </div>
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
                                option={roleList}
                                header="Role"
                                setData={setRole}
                                requiredHeader={false}

                            />
                        </div>
                    </div>
                )}

                {/*  Table  */}

                <CustomTable<UserTableProps>
                    tableHeadList={TableTitleList}
                    tableData={listForTable}
                    orderBy={list}
                    capitalize={false}
                    sortOrder={{
                        sortBy: "role",
                        orderList: roleList.map((role) => role.name),
                        orderSymbol: {
                            asc: "fa-arrow-up-short-wide",
                            desc: "fa-arrow-down-wide-short",
                        },
                    }}
                    manage={{
                        value: "View",
                        manageFunction: (item: UserTableProps) => {
                            setUser(item);
                        },
                    }}
                    countPerPage={11}
                />
            </div>
        </>
    );
}
function filterUser(userList: UserTableProps[], search: string, role: selectProps) {
    let list = userList
    if (search) list = searchUser(list, search)
    if (role.name) list = list.filter(user => user.role === role.name || user.role === role.id)
    return list
}
function searchUser(schoolList: UserTableProps[], search: string) {
    return schoolList.filter((school: UserTableProps) =>
        rawString(school.name).includes(rawString(search)) ||
        rawString(school.email).includes(rawString(search)) ||
        rawString(school.phone).includes(rawString(search)) ||
        rawString(school.role).includes(rawString(search)) ||
        rawString(school.location).includes(rawString(search))
    )
}

function rawString(str: string) {
    str = str?.toLowerCase()
    str = str?.replace(/[^a-zA-Z0-9 ]/g, '')
    str = str?.replaceAll(' ', '')
    return str
}


export default UserTable
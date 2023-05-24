import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { initialState, selectProps } from '../../utils/setupUtils'
import { CustomSelect } from '../../../components/CustomSelect/CustomSelect'
import CustomTable from '../../components/CustomTable/CustomTable'
import { privateGateway } from '../../../../../services/apiGateway'
import { setupRoutes, tableRoutes } from '../../../../../services/urls'
import Modal from './UserModal'

export interface UserTableProps {
    id: string
    name: string
    email: string
    phone: string
    role: string
}
const TableTitleList = ["Name", "Email", "Phone", " Role"]
const list: (keyof UserTableProps)[] = ['name', 'email', 'phone', 'role']

interface UserSetupProps {
    setViewSetup: Dispatch<SetStateAction<boolean>>
    updateUserData: Function
    updated: boolean
}

const UserTable: FC<UserSetupProps> = ({ setViewSetup, updateUserData, updated }) => {
    const [searchName, setSearchName] = useState("")
    const [searchEmail, setSearchEmail] = useState("")
    const [filterBtn, setFilterBtn] = useState(false)
    const [roleList, setRoleList] = useState<selectProps[]>([])
    const [role, setRole] = useState<selectProps>(initialState)
    const [listForTable, setListForTable] = useState<UserTableProps[]>([])
    const [user, setUser] = useState<UserTableProps>({} as UserTableProps)
    const [userList, setUserList] = useState<UserTableProps[]>([])

    useEffect(() => {
        fetchUsers(setUserList, setListForTable)
        fetchUserRoles(setRoleList)
    }, [])
    useEffect(() => {
        fetchUsers(setUserList, setListForTable, updateTable)
    }, [updated])
    useEffect(() => {
        setListForTable(filterUser(userList, searchName, searchEmail, role))
    }, [searchName, searchEmail, role])
    function updateTable(userList: UserTableProps[]) {
        setListForTable(filterUser(userList, searchName, searchEmail, role))
    }
    function resetFilter() {
        setFilterBtn(false)
        setRole(initialState)
    }

    return (
        <>
            <div className='white-container'>
                {/* Modal */}
                {user?.id && <Modal user={user} setUser={setUser} updateUserData={updateUserData} />}

                {/* Search ,Filters View */}

                <div className="table-top">
                    <div className='table-header'>
                        <h3>User List</h3>
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
                                value={searchName}
                                placeholder={`Search by name`}
                                onChange={(e) => setSearchName(e.target.value)}
                            />
                            <li
                                className='fas fa-close cursor'
                                onClick={() => setSearchName('')}
                            ></li>
                        </div>
                        <div className='search-bar'>
                            <input className='search-bar-item'
                                id='search'
                                name='search'
                                type="text"
                                value={searchEmail}
                                placeholder={`Search by email`}
                                onChange={(e) => setSearchEmail(e.target.value)}
                            />
                            <li
                                className='fas fa-close cursor'
                                onClick={() => setSearchEmail('')}
                            ></li>
                        </div>
                        <div className="table-fn-btn cursor" onClick={() => setViewSetup((prev: boolean) => !prev)}>
                            <i className="fa-solid fa-plus"></i>
                            <p>Add User</p>
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
                        <CustomSelect option={roleList} value='Role' setData={setRole} requiredHeader={false} />
                    </div>
                </div>}

                {/*  Table  */}

                <CustomTable<UserTableProps>
                    tableHeadList={TableTitleList}
                    tableData={listForTable}
                    orderBy={list}
                    capitalize={false}
                    manage={{
                        value: 'View',
                        manageFunction: (item: UserTableProps) => { setUser(item) }
                    }}
                />
            </div>
        </>
    )
}
function filterUser(userList: UserTableProps[], searchName: string, searchEmail: string, role: selectProps) {
    let list = userList
    if (searchName) {
        list = search(list, searchName)
    }
    if (searchEmail) {
        list = search(list, searchEmail)
    }
    if (role.name) {
        console.log(role)
        list = list.filter(user => { user.role === role.id })
    }
    return list
}
function search(schoolList: UserTableProps[], search: string) {
    return schoolList.filter((school: UserTableProps) => rawString(school.name).includes(rawString(search)))
}
function rawString(str: string) {
    str = str.toLowerCase()
    str = str.replace(/[^a-zA-Z0-9 ]/g, '')
    str = str.replaceAll(' ', '')
    return str
}
async function fetchUsers(setUserList: Dispatch<SetStateAction<UserTableProps[]>>, setListForTable: Dispatch<SetStateAction<UserTableProps[]>>, updateTable?: Function) {
    await privateGateway.get(tableRoutes.user.list)
        .then(res => res.data.response)
        .then(data => {
            setUserList(data)
            setListForTable(data)
            if (updateTable) updateTable(data)
        })
        .catch(err => console.log('Error :', err?.response?.data?.message?.general[0]))
}
function fetchUserRoles(setData: Dispatch<SetStateAction<selectProps[]>>) {
    privateGateway.get(setupRoutes.user.roles.list)
        .then(res => res.data.response.roles)
        .then(data =>
            setData(data?.map((item: { value: string, label: string }) =>
                ({ id: item.value, name: item.label }))))
        .catch(err => console.log(err))
}
export default UserTable
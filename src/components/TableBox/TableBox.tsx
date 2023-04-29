import React, { useState, useEffect } from 'react'
import './TableBox.scss'
import fakeData from './fakeData.json'
import Select, { StylesConfig } from 'react-select';
import apiGateway from '../../service/apiGateway';
import yip from '../../service/dataHandler';
const schoolTableTitle = ["SL", "Name", "District", "Status", "Legislative Assembly", "Block"]
const clubTableTitle = ["SL", "Name", "District", "Status", "Manage"]
const userTableTitle = ["SL", "Name", "Email", "Phone", "Role", "Status"]


interface tableProps {
    current_option: string
    institutions: any
    update: any
    setCreate: any
    setUpdateData: any
    dataUpdate: any
}

interface tableBoxProps {
    id: string,
    name: string,
    institute_type: string,
    legislative_assembly: string,
    status: boolean,
}


const TableBox: React.FC<tableProps> = ({ current_option, institutions, update, dataUpdate, setCreate, setUpdateData }) => {
    const [showFilterBox, setShowFilterBox] = useState(false);
    const [filterItem, setFilterItem] = useState("All")
    const [showSortBox, setShowSortBox] = useState(false);
    const [districts, setDistricts] = useState([])
    const [tableData, setTableData] = useState<tableBoxProps[]>([])
    const [modalTrigger, setModalTrigger] = useState(false)
    const [confirmDelete, setConfirmDelete] = useState(false)
    const [deleteId, setDeleteId] = useState("")
    const [deleteData, setDelete] = useState([])
    const [status, setStatus] = useState([])
    const [statusFilter, setStatusFilter] = useState("All")

    useEffect(() => {
        setPagination(1)
        if (statusFilter === "All" && filterItem === "All") {
            setTableData(institutions)
        }
        else if (statusFilter !== "All" && filterItem !== "All") {
            setTableData(institutions.filter((item: any) => {
                return item.club_status === statusFilter && item.district === filterItem
            }))
        }
        else if (filterItem !== "All" && statusFilter === "All") {
            setTableData(institutions.filter((item: any) => item.district === filterItem && true))
        }
        else if (statusFilter !== "All" && filterItem === "All") {

            setTableData(institutions.filter((item: any) => item.club_status === statusFilter && true))
            console.log(institutions.filter((item: any) => item.club_status === statusFilter && true))
        }
    }, [filterItem, statusFilter, update])

    const sendData = (club_id: string, club_status: string): any => {
        const postData: any = {
            club_id: club_id,
            club_status: club_status
        }
        const updateStatus = async () => {
            apiGateway.put(`/api/v1/yip/update-club/`, postData)
                .then((res) => setUpdateData((prev: any) => !prev))
                .catch(error => console.error(error))
        }
        updateStatus()
    }

    let tableTitle = []
    if (current_option === "Model School") {
        tableTitle = schoolTableTitle
    } else if (current_option === "YIP Club") {
        tableTitle = clubTableTitle
    } else {
        tableTitle = userTableTitle
    }

    const handleFilterClick = () => {
        setShowFilterBox(!showFilterBox);
        setShowSortBox(false);
    }

    const handleSortClick = () => {
        setShowSortBox(!showSortBox);
        setShowFilterBox(false);
    }

    const handleDelete = (schoolId: any) => {
        const fetchData = async () => {
            apiGateway.delete(`/api/v1/yip/delete-model-schools/${schoolId}/`)
                .then(res => {
                    setUpdateData((prev: any) => !prev)
                })
                .catch(error => console.error(error));
        }
        fetchData()
    }

    const [page, setPagination] = useState(1)

    function paginateArray<T>(array: T[], page: number): T[] {
        const startIndex = (page - 1) * 10;
        const endIndex = startIndex + 10;
        return array.slice(startIndex, endIndex);
    }

    useEffect(() => {
        if (confirmDelete) {
            handleDelete(deleteId)
        }
        setModalTrigger(false)
        setConfirmDelete(false)
    }, [confirmDelete])

    return (
        <>

            {modalTrigger && <div className="modal-overlay">
                <div className="modal">

                    <p>Are you sure you want to delete this item?</p>
                    <div className="modal-buttons">
                        <button onClick={() => { setConfirmDelete(true); update() }} className="confirm-delete">Delete</button>
                        <button onClick={() => { setConfirmDelete(false); setModalTrigger(false) }} className="cancel-delete">Cancel</button>
                    </div>
                </div>
            </div>}

            <div className='white-container container-table'>
                <div className="table-top">
                    <h3>{current_option} List</h3>

                    <div className='table-fn'>
                        <div className="table-fn-btn" onClick={() => {
                            setCreate(true)
                        }}>
                            <i className="fa-solid fa-plus"></i>
                            <p>Add {current_option}</p>
                        </div>
                        <div className="table-fn-btn" onClick={handleFilterClick}>
                            <i className="fa-solid fa-filter"></i>
                            <p>Filter</p>
                        </div>
                        {showFilterBox && <button
                            className='table-fn-btn '
                            onClick={() => {
                                setShowFilterBox(false);
                                setFilterItem("All")
                                setStatusFilter("All")
                            }}
                        >Close</button>}
                    </div>
                </div>

                {showFilterBox && <div className="filter-container">

                    <div className="filter-box">
                        <Select
                            styles={{
                                control: (baseStyles, state) => ({
                                    ...baseStyles,
                                    minWidth: "200px",
                                }),
                            }}
                            options={yip.district}
                            isSearchable={true}
                            isClearable={true}
                            placeholder={`Select a District`}
                            getOptionValue={(option: any) => option.id}
                            getOptionLabel={(option: any) => option.name}
                            onChange={(data: any) => {
                                try {
                                    setFilterItem(data.name)
                                } catch (error) {
                                    setFilterItem("All")
                                }
                            }}
                        />
                        <Select
                            styles={{
                                control: (baseStyles, state) => ({
                                    ...baseStyles,
                                    minWidth: "200px",
                                }),
                            }}
                            options={yip.clubStatus}
                            isSearchable={true}
                            isClearable={true}
                            placeholder={`Select a Status`}
                            getOptionValue={(option: any) => option.id}
                            getOptionLabel={(option: any) => option.name}
                            onChange={(data: any) => {
                                try {
                                    setStatusFilter(data.name)
                                } catch (error) {
                                    setStatusFilter("All")
                                }
                            }}
                        />

                    </div>

                </div>}

                <table>
                    <thead>
                        <tr>
                            {
                                tableTitle.map((item: any, index: number) => {
                                    return <th key={index}>{item}</th>
                                })
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            (paginateArray(tableData, page))
                                .map((item: any, i: number) => (
                                    <tr key={i}>
                                        <td >{(page - 1) * 10 + i + 1}</td>
                                        <td >{item.name}</td>
                                        <td >{item.district}</td>
                                        {item.club_status && <td >
                                            <Select
                                                className="react-select-container"
                                                classNamePrefix="react-select"
                                                options={yip.clubStatus}
                                                isSearchable={true}
                                                placeholder={item.club_status}
                                                getOptionValue={(option: any) => option.id}
                                                getOptionLabel={(option: any) => option.name}
                                                onChange={(data: any) => {
                                                    sendData(item.id, data.name)
                                                }}
                                            />
                                        </td>}
                                        {item.legislative_assembly && <td >{item.legislative_assembly}</td>}
                                        {item.block && <td >{item.block}</td>}
                                        {item.club_status && <td >
                                            <a onClick={() => { setModalTrigger(true); setDeleteId(item.id) }}>
                                                <i className="fas fa-trash"></i>Delete
                                            </a>
                                        </td>}
                                    </tr>
                                ))
                        }
                    </tbody>
                </table>
                {!(tableData.length) && <div className="no-data-table">
                    No data available{filterItem !== 'All' ? ` for district ${filterItem}` : ''} {statusFilter !== 'All' ? ` for status ${statusFilter}` : ''}
                </div>}
                <div className='paginator'>
                    <div>
                        <div onClick={() => { setPagination(1) }}>
                            <i   >{"|<<"}</i>
                        </div>
                        <div onClick={() => { setPagination(page > 1 ? page - 1 : 1) }}>
                            <i >{"|<"}</i>
                        </div>

                        <input type="text" value={`${page} / ${Math.trunc(tableData.length / 10) + (tableData.length % 10 ? 1 : 0)}`} min={1} max={tableData.length / 10 + (tableData.length % 10 ? 0 : 1)} onChange={(e) => {
                            setPagination(Number(e.target.value))
                        }} />
                        <div onClick={() => { if (page < tableData.length / 10 + (tableData.length % 10 ? 0 : 1)) setPagination(page + 1) }}>
                            <i >{">|"}</i></div>
                        <div onClick={() => { setPagination(Math.trunc(tableData.length / 10) + (tableData.length % 10 ? 1 : 0)) }}>
                            <i >{">>|"}</i>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TableBox

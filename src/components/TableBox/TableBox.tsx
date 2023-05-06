import React, { useState, useEffect } from 'react'
import './TableBox.scss'
import Select, { StylesConfig } from 'react-select';
import apiGateway from '../../service/apiGateway';
import yip, { conditionProps, institutionProps } from '../../service/dataHandler';
const schoolTableTitle = ["SL", "Name", "District", "Legislative Assembly", "Block", "Status", "Manage"]
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

const TableBox: React.FC<tableProps> = ({ current_option, institutions, update, dataUpdate, setCreate, setUpdateData }) => {
    const [showFilterBox, setShowFilterBox] = useState(false);
    const [filterItem, setFilterItem] = useState("All")
    const [showSortBox, setShowSortBox] = useState(false);
    const [tableData, setTableData] = useState<institutionProps[]>([])
    const [modalTrigger, setModalTrigger] = useState(false)
    const [confirmDelete, setConfirmDelete] = useState(false)
    const [deleteId, setDeleteId] = useState("")
    const [deleteData, setDelete] = useState<boolean>(false)
    const [statusFilter, setStatusFilter] = useState("All")
    const [selectedData, setSelectedData] = useState<any>({})
    const [club, setClub] = useState<any>({})

    yip.setTableData = setTableData
    yip.institutionsData = institutions
    yip.updateTable = updateTable

    useEffect(() => {
        setPagination(1)
        yip.statusFilter = statusFilter
        yip.districtFilter = filterItem
        yip.setFilter()
    }, [filterItem, statusFilter, update])
    useEffect(() => {
        setPagination(1)

    }, [])
    useEffect(() => {
        setFilterItem("All")
        setStatusFilter("All")
        yip.assemblyFilter = "All"
        yip.statusFilter = "All"
        yip.districtFilter = "All"
        setShowFilterBox(false)
    }, [yip.currentPage])

    function updateTable() {
        setUpdateData((prev: any) => !prev)
    }

    const sendData = (club_id: string, club_status: string): any => {
        const postData: any = {
            club_id: club_id,
            club_status: club_status
        }
        const updateStatus = async () => {
            apiGateway.put(`/api/v1/yip/update-club/`, postData)
                .then((res) => {
                    setClub({})
                    setUpdateData((prev: any) => !prev)
                })
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
            {modalTrigger && <Modal setConfirmDelete={setConfirmDelete} setModalTrigger={setModalTrigger} selectedData={selectedData}
                setDelete={setDelete} club={club} sendData={sendData} setClub={setClub}
                deleteData={deleteData} handleDelete={handleDelete} setSelectedData={setSelectedData} update={update}

            />}
            <div className='white-container container-table'>
                <FilterHeader setCreate={setCreate} handleFilterClick={handleFilterClick} showFilterBox={showFilterBox}
                    setShowFilterBox={setShowFilterBox} setFilterItem={setFilterItem} setStatusFilter={setStatusFilter} />
                {showFilterBox && <FilterTable setFilterItem={setFilterItem} setStatusFilter={setStatusFilter} />}

                <InstitutionsTable tableTitle={tableTitle} paginateArray={paginateArray} page={page} tableData={tableData}
                    setModalTrigger={setModalTrigger} setSelectedData={setSelectedData} setDeleteId={setDeleteId}
                    institutions={institutions} setTableData={setTableData} />
                {!(tableData.length) &&
                    <div className="no-data-table">
                        No data available{filterItem !== 'All' ? ` for district ${filterItem}` : ''} {statusFilter !== 'All' ? ` for status ${statusFilter}` : ''}
                    </div>}

                <Paginator setPagination={setPagination} page={page} tableData={tableData} />
            </div >
        </>
    )
}
const Modal = (props: any) => {
    function closeModal() {
        props.setModalTrigger(false)
        props.setConfirmDelete(false)
        props.setDelete(false)
        props.setClub({})
        props.setSelectedData({})
    }
    return (
        <div className="modal-overlay">
            <div className='modal'>
                <div className='heading'>
                    <div className="title">Manage {yip.currentPage}</div>
                    <div className="close-btn" onClick={closeModal}><i className="fa fa-close"></i>
                    </div>
                </div>
                <div className='secondary-box'>
                    <div className="data-box">
                        <div className="title">Name</div>
                        <div className="content">{props.selectedData.name}</div>
                    </div>
                    <div className="data-box">
                        <div className="title">District</div>
                        <div className="content">{props.selectedData.district}</div>
                    </div>
                    {props.selectedData.legislative_assembly && <div className="data-box">
                        <div className="title">Legislative Assembly</div>
                        <div className="content">{props.selectedData.legislative_assembly}</div>
                    </div>}
                    {props.selectedData.block && <div className="data-box">
                        <div className="title">BRC</div>
                        <div className="content">{props.selectedData.block}</div>
                    </div>}
                    <div className="data-box">
                        <div className="title">Update Status</div>
                        <div className="content">
                            <Select
                                className="react-select-container"
                                classNamePrefix="react-select"
                                options={yip.clubStatus}
                                isSearchable={true}
                                placeholder={props.selectedData.club_status}
                                getOptionValue={(option: any) => option.id}
                                getOptionLabel={(option: any) => option.name}
                                onChange={(data: any) => {
                                    props.setClub({ id: props.selectedData.id, status: data.name })
                                }}
                            />
                        </div>
                    </div>
                    <div>
                        <div className={`${(props.club.status && props.selectedData.club_status !== props.club.status) ? 'btn-update ' : 'btn-disabled'}`}
                            onClick={() => {
                                if (props.club.status && props.selectedData.club_status !== props.club.status) {
                                    props.sendData(props.club.id, props.club.status)
                                    closeModal()
                                }
                            }}>
                            Update Status
                        </div>
                    </div>
                    <div className='last-container'>
                        {props.deleteData && <p>Are you sure you want to delete this item?</p>}
                        <div className="modal-buttons">
                            {props.deleteData ?
                                <button onClick={() => {
                                    props.handleDelete(props.selectedData.id)
                                    closeModal()
                                    props.update()
                                }} className="confirm-delete">Confirm Delete</button>
                                : <button onClick={() => { props.setDelete(true) }} className="confirm-delete">Delete</button>}
                            <button onClick={closeModal} className="cancel-delete">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
const FilterHeader = (props: any) => {
    return (
        <div className="table-top">
            <h3>{yip.currentPage} List</h3>

            <div className='table-fn'>
                <Search />
                <div className="table-fn-btn" onClick={() => {
                    props.setCreate(true)
                    console.log("i have opened create")

                }}>
                    <i className="fa-solid fa-plus"></i>
                    <p>Add {yip.currentPage}</p>
                </div>
                <div className="table-fn-btn" onClick={props.handleFilterClick}>
                    <i className="fa-solid fa-filter"></i>
                    <p>Filter</p>
                </div>
                {props.showFilterBox && <i
                    className='table-fn-btn fa fa-close '
                    onClick={() => {
                        props.setShowFilterBox(false);
                        props.setFilterItem("All")
                        props.setStatusFilter("All")
                        yip.assemblyFilter = 'All'
                        yip.blockFilter = 'All'
                        yip.updateTable()
                    }}
                ></i>}
            </div>
        </div>
    )
}
const Search = () => {
    const [search, setSearch] = useState("")
    useEffect(() => {
        yip.collegeSearch(search)
    }, [search])
    return (
        <div className='search-box'>
            <input className='search-bar' type="text" value={search} placeholder="Search College" onChange={e => {
                setSearch(e.target.value)
            }} />
            {search && <li className='fas fa-close' onClick={() => {
                setSearch('')
            }}></li>}
        </div>
    )
}
const FilterTable = (props: any) => {
    const [assemblyFilter, setAssemblyFilter] = useState('All')
    const [switchAssembly, setSwitchAssembly] = useState(true)
    return (
        <div className="filter-container">
            <div className="filter-box">
                {yip.currentPage === 'Model School' && <>
                    <div className="table-fn-btn" onClick={() => {
                        if (switchAssembly)
                            yip.assemblyFilter = "All"
                        else
                            yip.blockFilter = "All"
                        setSwitchAssembly((prev: boolean) => !prev)
                        yip.updateTable()
                    }}>
                        <i className="fa-solid fa-repeat"></i>
                        <p>{`Filter By ${switchAssembly ? 'block' : 'Assembly'}`}</p>
                    </div>
                    {switchAssembly && <Select
                        styles={{
                            control: (baseStyles, state) => ({
                                ...baseStyles,
                                minWidth: "230px",
                            }),
                        }}
                        options={yip.filteredAssembly}
                        isSearchable={true}
                        isClearable={true}
                        placeholder={`Select a Legislative Assembly`}
                        getOptionValue={(option: any) => option.id}
                        getOptionLabel={(option: any) => option.name}
                        onChange={(data: any) => {
                            try {
                                yip.assemblyFilter = data.name
                            } catch (error) {
                                yip.assemblyFilter = "All"
                            }
                            yip.updateTable()
                        }}
                    />}
                    {!switchAssembly && <Select
                        styles={{
                            control: (baseStyles, state) => ({
                                ...baseStyles,
                                minWidth: "230px",
                            }),
                        }}
                        options={yip.filteredBlocks}
                        isSearchable={true}
                        isClearable={true}
                        placeholder={`Select a Block`}
                        getOptionValue={(option: any) => option.id}
                        getOptionLabel={(option: any) => option.name}
                        onChange={(data: any) => {
                            try {
                                yip.blockFilter = data.name

                            } catch (error) {
                                yip.blockFilter = "All"
                            }
                            yip.updateTable()
                        }}
                    />}
                </>}
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
                            props.setFilterItem(data.name)
                        } catch (error) {
                            props.setFilterItem("All")
                        }
                    }}
                />
                <Select
                    styles={{
                        control: (baseStyles) => ({
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
                            props.setStatusFilter(data.name)
                        } catch (error) {
                            props.setStatusFilter("All")
                        }
                    }}
                />

            </div>

        </div >
    )
}
interface condition {
    updater: boolean, name: string, district: string, club_status: string, legislative_assembly: string, block: string
}
const InstitutionsTable = (props: any) => {
    const [condition, setCondition] = useState<conditionProps>({ updater: false, name: "Unsorted" })
    const [styleThis, setStyler] = useState<string>('')
    useEffect(() => {

    }, [condition])
    function getStyles(value: string) {
        if (value === 'SL' || value === 'Manage') {
        }
        else if (value === 'Status') {
            if (value === styleThis) {
                switch (condition.name) {
                    case 'Sorted:ASC': return 'fa-arrow-up-short-wide color'
                        break;
                    case 'Sorted:DESC': return 'fa-arrow-up-wide-short color'
                        break
                }
            }
            else return 'fa-arrow-up-short-wide'
        }
        else if (value === styleThis) {
            switch (condition.name) {
                case 'Sorted:ASC':
                    return 'fa-arrow-up-a-z color'
                    break
                case 'Sorted:DESC':
                    return 'fa-arrow-up-z-a color'
                    break
            }
        }
        else return 'fa-arrow-up-a-z'
    }
    return (
        <table>
            <thead>
                <tr>
                    {
                        props.tableTitle.map((item: string, index: number) =>
                        (
                            <th key={index} className={`${item === 'Status' ? 'stat' : ''}`}
                                onClick={() => {
                                    if (!(item === 'SL' || item === 'Manage')) {
                                        setStyler(item)
                                        yip.sort(props.setTableData, item, props.tableData, setCondition, condition)
                                    }
                                }}
                            >
                                <div className='header'>
                                    <div>{item}</div>
                                    <div>
                                        <i className={`fa-solid ${getStyles(item)}`}></i>
                                    </div>
                                </div>
                            </th>)
                        )
                    }
                </tr>
            </thead>
            {
                props.tableData && <tbody>
                    {
                        (props.paginateArray(props.tableData, props.page))
                            .map((item: any, i: number) => (
                                <tr key={i}>
                                    <td >{(props.page - 1) * 10 + i + 1}</td>
                                    <td className='name'>{item.name}</td>
                                    <td className='district'>{item.district}</td>
                                    {item.legislative_assembly && <td >{item.legislative_assembly}</td>}
                                    {item.block && <td >{item.block}</td>}
                                    {item.club_status && <td className='status' >
                                        {item.club_status}
                                    </td>}
                                    <td >
                                        <a onClick={() => {
                                            props.setModalTrigger(true)
                                            props.setDeleteId(item.id)
                                            props.setSelectedData(item)
                                        }}>
                                            <i className="fas fa-edit"></i>Edit
                                        </a>
                                    </td>
                                </tr>
                            ))
                    }
                </tbody>
            }
        </table >
    )
}
const Paginator = (props: any) => {
    return (
        <div className='paginator'>
            <div>
                <div onClick={() => { props.setPagination(1) }}>
                    <i   >{"|<<"}</i>
                </div>
                <div onClick={() => { props.setPagination(props.page > 1 ? props.page - 1 : 1) }}>
                    <i >{"|<"}</i>
                </div>

                <input type="text" value={`${props.page} / ${Math.trunc(props.tableData.length / 10) + (props.tableData.length % 10 ? 1 : 0)}`} min={1} max={props.tableData.length / 10 + (props.tableData.length % 10 ? 0 : 1)} onChange={(e) => {
                    props.setPagination(Number(e.target.value))
                }} />
                <div onClick={() => { if (props.page < Math.trunc(props.tableData.length / 10) + (props.tableData.length % 10 ? 1 : 0)) props.setPagination(props.page + 1) }}>
                    <i >{">|"}</i></div>
                <div onClick={() => { props.setPagination(Math.trunc(props.tableData.length / 10) + (props.tableData.length % 10 ? 1 : 0)) }}>
                    <i >{">>|"}</i>
                </div>
            </div>
        </div>
    )
}
export default TableBox

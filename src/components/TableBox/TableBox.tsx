import React, { useState, useEffect } from 'react'
import './TableBox.scss'
import fakeData from './fakeData.json'
import Select, { StylesConfig } from 'react-select';
import apiGateway from '../../service/apiGateway';

const schoolTableTitle = ["SL", "Name", "Status", "District", "Legislative Assembly", "Block", "Manage"]
const clubTableTitle = ["SL", "Name", "Status", "District"]
const userTableTitle = ["SL", "Name", "Email", "Phone", "Role", "Status"]


interface tableProps {
    current_option: string
    institutions: any
    update: any
    setCreate: any
}

interface tableBoxProps {
    id: string,
    name: string,
    institute_type: string,
    legislative_assembly: string,
    status: boolean,
}


const TableBox: React.FC<tableProps> = ({ current_option, institutions, update, setCreate }) => {
    const [showFilterBox, setShowFilterBox] = useState(false);
    const [filterItem, setFilterItem] = useState("all")
    const [showSortBox, setShowSortBox] = useState(false);
    const [districts, setDistricts] = useState([])
    const [tableData, setTableData] = useState<tableBoxProps[]>([])
    const [modalTrigger, setModalTrigger] = useState(false)
    const [confirmDelete, setConfirmDelete] = useState(false)
    const [deleteId, setDeleteId] = useState("")
    const [deleteData, setDelete] = useState([])
    const [status, setStatus] = useState([])
    const [errorStatus, setErrorStatus] = useState<boolean>(false)


    const sendData = (club_id: string, club_status: string): any => {
        const postData: any = {
            club_id: club_id,
            club_status: club_status
        }
        const updateStatus = async () => {
            apiGateway.put(`/api/v1/yip/update-club/`, postData)
                .then((response) =>
                    response
                )
                .catch(error => console.error(error));
        }
        updateStatus()
        //console.log("data send!!")
    }


    let tableTitle = []
    if (current_option === "Model School") {
        tableTitle = schoolTableTitle
    } else if (current_option === "YIP Club") {
        tableTitle = clubTableTitle
    } else {
        tableTitle = userTableTitle
    }

    useEffect(() => {

        let link_item = ""

        if (current_option === "Model School") {
            link_item = "get-model-schools"
        } else if (current_option === "YIP Club") {
            link_item = "get-colleges"
        } else {
            link_item = "get-users"
        }
        const fetchData = async () => {
            apiGateway.get(`/api/v1/yip/${link_item}/`)
                .then(({ data }) => {
                    //console.log("statsu: ", data.response)
                    const { clubs } = data.response;
                    //console.log("-axios :", clubs);
                    setTableData(clubs);
                })
                .catch(error => console.error(error));
        }
        fetchData()
    }, [current_option])

    useEffect(() => {
        const fetchData = async () => {
            apiGateway.get(`/api/v1/yip/district/`)
                .then(({ data }) => {
                    const { districts } = data.response;
                    //console.log("districts-axios :", districts);
                    setDistricts(districts);
                })
                .catch(error => console.error(error));
        }
        fetchData()
    }, [])


    useEffect(() => {
        const fetchData = async () => {
            apiGateway.get(`/api/v1/yip/list-clubs-status/`)
                .then((res) => {

                    setStatus(res.data.response.club_status.map((item: string, id: number) => { return { id: id, name: item } }));
                })
                .catch(error => console.error(error));
        }
        fetchData()
    }, [])


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
                .then(res => update())
                .catch(error => console.error(error));
        }
        fetchData()
    }

    useEffect(() => {
        const requestOptions = {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                "Content-Type": "application/json"
            }
        };
        // const fetchData = async () => {
        //     try {
        //         const response = await fetch(import.meta.env.VITE_BACKEND_URL + `/api/v1/yip/list-clubs-status/`, requestOptions);
        //         const data = await response.json();
        //         const status = data.response.club_status
        //         const optionsArray = status.map((item: string, id: number) => {
        //             return { id: id, name: item };
        //         });
        //         //console.log(optionsArray);
        //         setStatus(optionsArray)
        //     } catch (error) {
        //         console.error("this is error", error);
        //     }
        // }
        // fetchData()
        const fetchData = async () => {
            apiGateway.get(`/api/v1/yip/list-clubs-status/`)
                .then(({ data }) => {
                    const { club_status } = data.response;
                    // //console.log("delete-status-axios :", data.response);
                })
                .catch(error => console.error(error));
        }
        fetchData()
    }, [])

    useEffect(() => {
        if (confirmDelete) {
            handleDelete(deleteId)
        }
        setModalTrigger(false)
        setConfirmDelete(false)
    }, [confirmDelete])


    const SchoolTableData = (props: { item: any, index: number }) => {
        const { item, index } = props;
        return (
            <ul id="clubs_listed">
                <li id="sl_no" className="value">{index + 1}</li>
                <li id="club_id" className="value name" value="{{club.id}}">{item.name}</li>
                {item.club_status && <li className="value editable status">
                    <Select
                        options={status}
                        isSearchable={false}
                        placeholder={item.club_status}
                        getOptionValue={(option: any) => option.id}
                        getOptionLabel={(option: any) => option.name}
                        onChange={(status: any) => {
                            sendData(item.id, status.name)
                        }}
                    />
                </li>}
                <li className="value" value="{{club.id}}">{item.district}</li>
                {item.legislative_assembly && <li className="value" value="{{club.district.id}}">{item.legislative_assembly}</li>}
                {item.block && <li className="value">{(item.block)}
                </li>}
                {item.club_status && <li className="value editable">
                    <a onClick={() => { setModalTrigger(true); setDeleteId(item.id) }} id="delete">
                        <i className="fa-solid fa-trash"></i>Delete</a>
                </li>}
            </ul>
        );
    };


    const ClubTableData = (props: { item: any, index: number }) => {
        const { item, index } = props;
        return (
            <ul id="clubs_listed">
                <li id="sl_no" className="value">{index + 1}</li>
                <li id="club_id" className="value name" value="{{club.id}}">{item.name}</li>
                {item.club_status && <li className="value editable status">
                    <Select
                        options={status}
                        isSearchable={false}
                        placeholder={item.club_status}
                        getOptionValue={(option: any) => option.id}
                        getOptionLabel={(option: any) => option.name}
                        onChange={(status: any) => {
                            sendData(item.id, status.name)
                        }}
                    />
                </li>}
                <li className="value" value="{{club.id}}">{item.district}</li>
                {item.legislative_assembly && <li className="value" value="{{club.district.id}}">{item.legislative_assembly}</li>}
                {item.block && <li className="value">{(item.block)}
                </li>}
                {item.club_status && <li className="value editable">
                    <a onClick={() => { setModalTrigger(true); setDeleteId(item.id) }} id="delete">
                        <i className="fa-solid fa-trash"></i>Delete</a>
                </li>}
            </ul>
        );
    };

    return (
        <>

            {modalTrigger && <div className="modal-overlay">
                <div className="modal">
                    <div>{ }</div>
                    <p>Are you sure you want to delete this item?</p>
                    <div className="modal-buttons">
                        <button onClick={() => { setConfirmDelete(true); update() }} className="confirm-delete">Delete</button>
                        <button onClick={() => { setConfirmDelete(false); setModalTrigger(false) }} className="cancel-delete">Cancel</button>
                    </div>
                </div>
            </div>}

            <div className='white-container'>
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
                        {/* <div className="table-fn-btn">
                        <i className="fa-solid fa-sort" onClick={handleSortClick}></i>
                        <p>Sort</p>
                    </div> */}
                    </div>
                </div>
                <div className="filter-container">
                    {showFilterBox && (
                        <div className="filter-box">
                            <Select
                                options={districts}
                                isSearchable={true}
                                isClearable={true}
                                placeholder={`Select a District`}
                                getOptionValue={(option: any) => option.id}
                                getOptionLabel={(option: any) => option.name}
                                onChange={(data: any) => {
                                    setFilterItem(data.name)

                                }}
                            />
                            <button
                                className='black-btn btn'
                                onClick={() => {
                                    setShowFilterBox(false);
                                    setFilterItem("all")
                                }}
                            >Close</button>
                        </div>
                    )}
                    {/* {showSortBox && (
                            <div className="sort-box">
                                <div className="sort">
                                    <input type="checkbox" name="sort-item" id="identified"/><label>Identified</label>
                                    <input type="checkbox" name="sort-item" id="identified"/><label>Identified</label>
                                    <input type="checkbox" name="sort-item" id="identified"/><label>Identified</label>
                                </div>
                            </div>
                        )} */}
                </div>
                <div id="table-container" className="table-container">
                    <div className="table-title">
                        <ul>
                            {
                                tableTitle.map((item: any, index: number) => {
                                    return <li className={`value assembly`} key={index}>{item}</li>
                                })
                            }
                        </ul>
                    </div>
                    <div className="table-list">

                        <div className="table-content">

                            {
                                institutions.filter((item: any) => filterItem === "all" ? true : item.district === filterItem)
                                    .map((item: any, i: number) => {
                                        return (
                                            <>
                                                <ul id="clubs_listed">
                                                    <li id="sl_no" className="value">{i + 1}</li>
                                                    <li id="club_id" className="value name" value="{{club.id}}">{item.name}</li>
                                                    {item.club_status && <li className="value editable status">
                                                        <Select
                                                            options={status}
                                                            isSearchable={false}
                                                            isClearable={true}
                                                            placeholder={item.club_status}
                                                            getOptionValue={(option: any) => option.id}
                                                            getOptionLabel={(option: any) => option.name}
                                                            onChange={(data: any) => {
                                                                sendData(item.id, data.name)
                                                            }}
                                                        />
                                                    </li>}
                                                    <li className="value" value="{{club.id}}">{item.district}</li>
                                                    {item.legislative_assembly && <li className="value" value="{{club.district.id}}">{item.legislative_assembly}</li>}
                                                    {item.block && <li className="value">{(item.block)}
                                                    </li>}
                                                    {item.club_status && <li className="value editable">
                                                        <a onClick={() => { setModalTrigger(true); setDeleteId(item.id) }} id="delete">
                                                            <i className="fa-solid fa-trash"></i>Delete</a>
                                                    </li>}
                                                </ul>
                                            </>
                                        );
                                    })
                            }

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TableBox

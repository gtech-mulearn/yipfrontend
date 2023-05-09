import React, { useEffect, useContext } from 'react'
import './TableBox.scss'
import apiGateway from '../../service/apiGateway';
import yip from '../../service/dataHandler';
import { DashboardContext } from '../../utils/DashboardContext';
import { TableContext } from '../../utils/TableContext';

import Modal from './components/Modal';
import FilterHeader from './components/features/FilterHeader';
import FilterTable from './components/features/FilterTable';
import InstitutionsTable from './components/InstitutionsTable';
import Paginator from './components/Paginator';
interface tableProps {
    update: any
}

const TableBox: React.FC<tableProps> = ({ update }) => {
    const { institutions, setUpdateData, setCreate, dataUpdate } = useContext(DashboardContext)
    const {
        showFilterBox, setShowFilterBox,
        filterItem, setFilterItem,
        showSortBox, setShowSortBox,
        tableData, setTableData,
        modalTrigger, setModalTrigger,
        confirmDelete, setConfirmDelete,
        deleteId,
        statusFilter, setStatusFilter,
        setClub,
        setPagination
    } = useContext(TableContext)


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




    useEffect(() => {
        if (confirmDelete) {
            handleDelete(deleteId)
        }
        setModalTrigger(false)
        setConfirmDelete(false)
    }, [confirmDelete])

    return (
        <>
            {modalTrigger && <Modal sendData={sendData} handleDelete={handleDelete} />}
            <div className='white-container container-table'>
                <FilterHeader setCreate={setCreate} handleFilterClick={handleFilterClick} showFilterBox={showFilterBox}
                    setShowFilterBox={setShowFilterBox} setFilterItem={setFilterItem} setStatusFilter={setStatusFilter} />
                {showFilterBox && <FilterTable setFilterItem={setFilterItem} setStatusFilter={setStatusFilter} />}

                <InstitutionsTable />
                {!(tableData.length) &&
                    <div className="no-data-table">
                        No data available{filterItem !== 'All' ? ` for district ${filterItem}` : ''} {statusFilter !== 'All' ? ` for status ${statusFilter}` : ''}
                    </div>}
                <Paginator />
            </div >
        </>
    )
}




export default TableBox

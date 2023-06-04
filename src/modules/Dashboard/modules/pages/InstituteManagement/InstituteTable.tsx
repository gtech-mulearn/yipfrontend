import React, { useEffect, useState } from 'react'
import { selectProps } from '../../utils/setupUtils'
import { CustomSelect } from '../../../components/CustomSelect/CustomSelect'
import CustomTable from '../../components/CustomTable/CustomTable'
import { fetchDistricts } from '../School/SchoolAPI'
import { privateGateway } from '../../../../../services/apiGateway'
import { campusRoutes } from '../../../../../services/urls'
import Modal from '../Club/ClubModal'
export interface InstituteTableProps {
    name: string
    district: string
    ict_id: string
    id: string

}
// name,id,distict,ict_id
const InstituteTable = () => {
    const [districtList, setDistrictList] = useState<selectProps[]>([])
    const [district, setDistrict] = useState<selectProps>({} as selectProps)
    const [status, setStatus] = useState<string>('')
    const [statusList, setStatusList] = useState<string[]>([])
    const [optionStatusList, setOptionStatusList] = useState<selectProps[]>([])
    const [clubList, setClubList] = useState<InstituteTableProps[]>([])
    const [listForTable, setListForTable] = useState<InstituteTableProps[]>([])
    const [search, setSearch] = useState<string>('')
    const [filterBtn, setFilterBtn] = useState<boolean>(false)
    const [club, setClub] = useState<InstituteTableProps>({} as InstituteTableProps)
    const [menu, setMenu] = useState<boolean>(window.innerWidth > 768)
    const TableTitleList = ['Name', 'District', 'ICT Id']
    const list: (keyof InstituteTableProps)[] = ['name', 'district', 'ict_id']
    function resetFilter() {
        setFilterBtn(false)
        setDistrict({} as selectProps)
        setStatus('')
    }
    useEffect(() => {
        console.log('hi')
        fetchDistricts(setDistrictList)
        fetchInstitutes(setListForTable)
    }, [])
    useEffect(() => {
        updateTable(listForTable)
    }, [search, district])
    function updateTable(clubList: InstituteTableProps[]) {
        setListForTable(filterClub(clubList, search, district))
    }
    return (
        <div className='white-container'>
            <div className="table-top">
                <div className='table-header'>
                    <h3>ICT Connected Institutes List</h3>
                    <div className='table-header-btn'>
                        <li className="fas fa-bars " onClick={() => setMenu(!menu)}></li>
                    </div>
                </div>
                {menu && <div className='table-fn'>
                    <div className='search-bar'>
                        <input className='search-bar-item'
                            id='search'
                            name='search'
                            type="text"
                            value={search}
                            placeholder={`Search`}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <li
                            className='fas fa-close cursor'
                            onClick={() => setSearch('')}
                        ></li>
                    </div>
                    <div className="table-fn-btn cursor" onClick={() => setFilterBtn(!filterBtn)}>
                        <i className="fa-solid fa-filter"></i>
                        <p>Filter</p>
                    </div>
                    {filterBtn && <div className="table-fn-btn  cursor" onClick={resetFilter}>
                        <p></p>
                        <i className="fa-solid fa-close  "></i>
                        <p></p>
                    </div>}
                </div>}
            </div>

            {/* Filters */}

            {filterBtn && <div className="filter-container">
                <div className="filter-box">
                    <CustomSelect option={districtList} header='District' setData={setDistrict} requiredHeader={false} />
                </div >
            </div>
            }

            {/*  Table  */}

            <CustomTable<InstituteTableProps>
                tableHeadList={TableTitleList}
                tableData={listForTable}
                orderBy={list}
            />
            {/* {open && <Modal instituteID />} */}
        </div>
    )
}

function filterClub(clubList: InstituteTableProps[], search: string, district: selectProps) {
    let list = clubList
    if (search) {
        list = searchClub(list, search)
    }
    if (district.name) {
        list = list.filter(club => club.district === district.name)
    }
    return list
}
function searchClub(clubList: InstituteTableProps[], search: string) {
    return clubList.filter((club: InstituteTableProps) =>
        rawString(club.name).includes(rawString(search)) ||
        rawString(club.district).includes(rawString(search)))
}
function rawString(str: string) {
    str = str.toLowerCase()
    str = str.replace(/[^a-zA-Z0-9 ]/g, '')
    str = str.replaceAll(' ', '')
    return str
}
function fetchInstitutes(setClubList: React.Dispatch<React.SetStateAction<InstituteTableProps[]>>) {
    privateGateway.get(`${campusRoutes.listInstitutes}`)
        .then(res => {
            console.log(res.data.response)
            setClubList(res.data.response)
        })
        .catch(err => {
            console.log(err)
        })
}
function editIctId(ictId: string, instituteId: string) {
    privateGateway.put(`${campusRoutes.editIctId}${instituteId}/`, {
        ict_id: ictId
    })
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
}
export default InstituteTable
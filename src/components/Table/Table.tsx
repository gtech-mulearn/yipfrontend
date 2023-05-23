import React, { ReactNode, useState } from 'react'
import { getCurrentPageUtils, paginateArray } from '../../utils/utils'
import './Table.scss'
import { NewSelect, dummy, intialState } from '../Setup/Setup'

import CustomTable from '../CustomTable/CustomTable';

interface TableProps {
    id: string,
    name: string,
    district?: string,
    block?: string | null,
    legislative_assembly?: string | null,
    club_status?: string
    email?: string,
    phone?: string
    role?: string
}
const tableDummy: TableProps[] = [
    {
        "id": "2d2e27bd-c4b1-4617-a1aa-093d2c920ed3",
        "name": "G. H. S. S. PERINGOTTUKARA",
        "district": "Thrissur",
        "block": "Dasan",
        "legislative_assembly": "Irinjalakuda",
        "club_status": "Execom Formed",
    },
    {
        "id": "3493a53a-8136-4653-85b8-08aabb6f0733",
        "name": "CRESCENT PUBLIC SCHOOL CHALAKUDY",
        "district": "Thrissur",
        "block": "WADAKKANCHERY",
        "legislative_assembly": "Chalakudy",
        "club_status": "Identified"
    },
    {
        "id": "3cf6b197-92c1-4560-b57e-cb87a8e4cd6e",
        "name": "RAHMANIYA HS MUTTAM",
        "district": "Kannur",
        "block": "KANNUR SOUTH",
        "legislative_assembly": "Peravoor",
        "club_status": "Identified"
    },
    {
        "id": "47577704-a51a-49d4-ae0d-1e36629e1dd5",
        "name": "ST THOMAS HIGH SCHOOL",
        "district": "Kottayam",
        "block": "KOTTAYAM EAST",
        "legislative_assembly": "Kanjirappally",
        "club_status": "Execom Formed"
    },
    {
        "id": "4b706bab-f828-4a2f-923d-117c46786dd4",
        "name": "S. N. T. H. S. S NATIKA",
        "district": "Thrissur",
        "block": "Dasan",
        "legislative_assembly": "Irinjalakuda",
        "club_status": "Identified"
    },
    {
        "id": "4eb595d3-c93f-49d2-9526-e125d1f80015",
        "name": "ST. M. M. C. H. S KANIPPAYYUR",
        "district": "Thrissur",
        "block": "IRINJALAKUDA",
        "legislative_assembly": "Irinjalakuda",
        "club_status": "Orientation Completed"
    },
    {
        "id": "5002d764-e9b0-49cc-9607-3fb8ae823d63",
        "name": "GOVT. H. S MARATHENCODE",
        "district": "Thrissur",
        "block": "Dasan",
        "legislative_assembly": "Irinjalakuda",
        "club_status": "Connection established"
    },
    {
        "id": "5c74b9b8-f3e7-4635-a43f-89e51833c7fc",
        "name": "GOVT. HSS CHATTUKAPARA",
        "district": "Kannur",
        "block": "KANNUR NORTH",
        "legislative_assembly": "Thalassery",
        "club_status": "Identified"
    },
    {
        "id": "604fdc59-8e59-4f7c-83d4-30ecc2b31c96",
        "name": "SABARI CENTRAL SCHOOL",
        "district": "Palakkad",
        "block": "PALAKKAD",
        "legislative_assembly": "Thalassery",
        "club_status": "Connection established"
    },
    {
        "id": "6b9eea09-368c-4d7e-87e8-fe995d43e0a2",
        "name": "ASSISI ENGLISH MEDIUM SCHOOL PAYANGADI",
        "district": "Kannur",
        "block": "KANNUR SOUTH",
        "legislative_assembly": "Thalassery",
        "club_status": "Identified"
    },
], tableDummy2: TableProps[] = [
    {
        "id": "51502bc4-13ad-45e5-adae-7a884605b35b",
        "name": "SREE VIVEKANANDA COLLEGE",
        "district": "Thrissur",
        "block": null,
        "legislative_assembly": null,
        "club_status": "Confirmed"
    },
    {
        "id": "5f90bbdc-1cca-48e3-8057-6ba8c07dc816",
        "name": "GOVT.POLYTECHNIC COLLEGE MEPPADI",
        "district": "Wayanad",
        "block": null,
        "legislative_assembly": null,
        "club_status": "Identified"
    },
    {
        "id": "5fb4e0a6-e64e-4401-8d90-5759bebfad1a",
        "name": "THEJUS ENGINEERING COLLEGE",
        "district": "Thrissur",
        "block": null,
        "legislative_assembly": null,
        "club_status": "Identified"
    },
    {
        "id": "60b8bbbe-f875-4ef9-8206-767a0519a8f6",
        "name": "CO-OPERATIVE ARTS & SCIENCE COLLEGE,MADAI, PAZHAYANGADI",
        "district": "Kannur",
        "block": null,
        "legislative_assembly": null,
        "club_status": "Identified"
    },
    {
        "id": "612c485e-4185-403d-9f3e-fb59e1fd1ed6",
        "name": "MET'S SCHOOL OF ENGINEERING - MALA",
        "district": "Thrissur",
        "block": null,
        "legislative_assembly": null,
        "club_status": "Identified"
    },
    {
        "id": "61a7b9d6-5ba8-4db8-b82c-b32066494ace",
        "name": "KFRI PEECHI",
        "district": "Thrissur",
        "block": null,
        "legislative_assembly": null,
        "club_status": "Identified"
    },
    {
        "id": "681bb985-612e-41aa-a28c-26117dbfc8de",
        "name": "VICTORY INSTITUTE OF TECHINCAL COURSES PRIVATE INDUSTRIAL TRAINING INSTITUT",
        "district": "Palakkad",
        "block": null,
        "legislative_assembly": null,
        "club_status": "Identified"
    },
    {
        "id": "6d089fe0-34fc-40bc-9993-ed3f39f090e1",
        "name": "ST. GREGORIOS TEACHER TRAINING COLLEGE, MEENANGADI",
        "district": "Wayanad",
        "block": null,
        "legislative_assembly": null,
        "club_status": "Identified"
    },
    {
        "id": "7219fa6e-aab5-4878-93ff-56e09964f99c",
        "name": "GURUDEV ARTS AND SCIENCE COLLEGE MATHIL",
        "district": "Kannur",
        "block": null,
        "legislative_assembly": null,
        "club_status": "Connection established"
    },
    {
        "id": "72eea9c0-cb65-47d1-9cb8-b5934df82f42",
        "name": "GOVT .ITI DESAMANGALAM",
        "district": "Thrissur",
        "block": null,
        "legislative_assembly": null,
        "club_status": "Identified"
    },
    {
        "id": "740a5719-ab7b-4b08-bbf2-b3d249704fa5",
        "name": "SREE NARAYANA GURU COLLEGE OF ADVANCED STUDIES, PAMPANAR, PEERUMADE",
        "district": "Idukki",
        "block": null,
        "legislative_assembly": null,
        "club_status": "Identified"
    },
    {
        "id": "7550f4f7-d861-42b6-a9be-9ec260f3af27",
        "name": "EKC",
        "district": "Thrissur",
        "block": null,
        "legislative_assembly": null,
        "club_status": "Orientation Completed"
    },
]
const list: (keyof TableProps)[] = ['name', 'district', 'block', 'legislative_assembly', 'club_status']
const Table = () => {
    const [value, setValue] = useState('All')
    return (
        <>
            <div className='white-container'>

                {/* Table top */}

                <div className="table-top">
                    <div className='table-header'>
                        <h3>{getCurrentPageUtils().content} List</h3>
                        <div className='table-header-btn'>
                            <li className="fas fa-bars "></li>
                        </div>
                    </div>
                    <div className='table-fn'>
                        <div className='search-bar'>
                            <input className='search-bar-item' type="text" placeholder={`Search ${getCurrentPageUtils().content}`} />
                            <li className='fas fa-close'></li>
                        </div>
                        <div className="table-fn-btn" >
                            <i className="fa-solid fa-plus"></i>
                            <p>Add {getCurrentPageUtils().content}</p>
                        </div>
                        <button className="table-fn-btn show-in-500">Show Banner</button>
                        <div className="table-fn-btn">
                            <i className="fa-solid fa-filter"></i>
                            <p>Filter</p>
                        </div>
                    </div>
                </div>

                {/* Filters */}

                <div className="filter-container">
                    <div className="filter-box">
                        <div className="table-white-btn">
                            <i className="fa-solid fa-repeat"></i>
                            <p>{`Filter By Assembly`}</p>
                        </div>
                        <NewSelect option={dummy} value='District' setValue={setValue} requiredHeader={false} requiredLabel={true} />
                        <NewSelect option={dummy} value='District' setValue={setValue} requiredHeader={false} requiredLabel={true} />
                        <NewSelect option={dummy} value='District' setValue={setValue} requiredHeader={false} requiredLabel={true} />
                    </div >
                </div>

                {/*  Table  */}
                <CustomTable<TableProps>
                    tableHeadList={getCurrentPageUtils().tableTitleList}
                    tableData={tableDummy} orderBy={list}
                    sortOrder={{
                        sortBy: 'club_status' as keyof TableProps,
                        orderList: [
                            "Identified",
                            "Confirmed",
                            "Connection established",
                            "Orientation Scheduled",
                            "Orientation Completed",
                            "Execom Formed"
                        ],
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
                        value: 'Edit',
                        manageFunction: () => { console.log('manage') }
                    }}
                />
            </div>
        </>
    )
}



export default Table
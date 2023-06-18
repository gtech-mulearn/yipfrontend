import React, { Dispatch, SetStateAction, useEffect, useReducer, useRef } from 'react'
import CustomTable from '../../components/CustomTable/CustomTable';
import { privateGateway } from '../../../../../services/apiGateway';
import { user } from '../../../../../services/urls';
interface reportProps {
    "pre_registration": string,
    "district": string,
    "no_of_interns": string,
    "no_of_club_visited": string,
    "no_of_events_scheduled": string,
    "no_of_events_completed": string
}
const TableTitleList = ["District", 
, "No. of Active Interns",
'No. of Pre-Registrations '
 'No.of Visited', 'No.of Events Scheduled', 'No.of Events Completed']
const orderBy: (keyof reportProps)[] = ['district', 
'no_of_interns', 
'pre_registration',
 'no_of_club_visited', 'no_of_events_scheduled', 'no_of_events_completed']
const styleHead = {
    unOrder: 'fa-sort',
    asc: ' fa-sort-amount-desc',
    desc: 'fa-sort-amount-asc',
}
const customStyles = {
    headerStyle: [
        orderBy.slice(1,).map((item, index) => {
            return {
                ...styleHead,
                title: item,
            }
        }),
        {
            title: 'pre_registration',
            ...styleHead
        },
        {
            title: 'no_of_interns',
            ...styleHead
        },
        {
            title: 'no_of_club_visited',
            ...styleHead
        },
        {
            title: 'no_of_events_scheduled',
            ...styleHead
        },
        {
            title: 'no_of_events_completed',
            ...styleHead
        }


    ],
    alignNumbersCenter: [
        {
            name: 'pre_registration',
            css: 'center-align'
        },
        {
            name: 'no_of_interns',
            css: 'center-align'
        },
        {
            name: 'no_of_club_visited',
            css: 'center-align'
        },
        {
            name: 'no_of_events_scheduled',
            css: 'center-align'
        },
        {
            name: 'no_of_events_completed',
            css: 'center-align'
        }
    ]
}
const InternReport = () => {
    const [list, setList] = React.useState<reportProps[] | null>(null)
    const fetchOnce = useRef(false)
    useEffect(() => {
        fetchReport(setList)
    }, [])
    return (
        <div className='dash-container'>
            <div className="white-container">
                <div className="table-top">
                    <div className="table-header">
                        <h3>Intern report</h3>
                    </div>
                </div>
                <CustomTable
                    tableHeadList={TableTitleList}
                    tableData={list}
                    orderBy={orderBy}
                    capitalize={false}
                    customCSS={customStyles.alignNumbersCenter}
                    customHeaderCssSort={customStyles.headerStyle as any}
                />
            </div>
        </div>
    )
}

export default InternReport

function fetchReport(setData: Dispatch<SetStateAction<reportProps[] | null>>) {
    privateGateway.get(user.report)
        .then(res => res.data.response)
        .then(data => setData(data))
        .catch(err => console.log(err))
}
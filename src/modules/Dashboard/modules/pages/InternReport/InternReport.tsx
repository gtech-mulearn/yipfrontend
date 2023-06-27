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
    "no_of_events_completed": string,
    "no_of_participants": string
}
const TableTitleList = ["District",
    "No. of Active Interns",
    'No. of Pre-Registrations ',
    'No.of Visited', 'No.of Events Scheduled', 'No.of Events Completed', 'No.of Participants']
const orderBy: (keyof reportProps)[] = ['district',
    'no_of_interns',
    'pre_registration',
    'no_of_club_visited', 'no_of_events_scheduled', 'no_of_events_completed', 'no_of_participants']
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
        },
        {
            title: 'no_of_participants',
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
        },
        {
            name: 'no_of_participants',
            css: 'center-align'
        }
    ]
}
const InternReport = () => {
    const [list, setList] = React.useState<reportProps[] | null>(null)
    const fetchOnce = useRef(true)
    useEffect(() => {
        if (fetchOnce.current)
            fetchReport(setList)
        fetchOnce.current = false
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
                    Total={true}
                />
            </div>
        </div>
    )
}

export default InternReport

function fetchReport(setData: Dispatch<SetStateAction<reportProps[] | null>>) {
    privateGateway.get(user.report)
        .then(res => res.data.response)
        .then(data => setData(() => ([
            ...data,
            getTotal(data)
        ])))
        .catch(err => console.log(err))
}
function getTotal(data: reportProps[]) {
    const total = data.reduce((acc, item) => {
        acc.pre_registration += Number(item.pre_registration)
        acc.no_of_interns += Number(item.no_of_interns)
        acc.no_of_club_visited += Number(item.no_of_club_visited)
        acc.no_of_events_scheduled += Number(item.no_of_events_scheduled)
        acc.no_of_events_completed += Number(item.no_of_events_completed)
        acc.no_of_participants += Number(item.no_of_participants)
        return acc
    }, {
        pre_registration: 0,
        no_of_interns: 0,
        no_of_club_visited: 0,
        no_of_events_scheduled: 0,
        no_of_events_completed: 0,
        no_of_participants: 0
    })
    return { ...total, district: 'Total' }
}
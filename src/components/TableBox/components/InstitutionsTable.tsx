import { useState, useEffect, useContext } from "react"
import yip, { conditionProps } from "../../../service/dataHandler"
import { DashboardContext } from "../../../utils/DashboardContext"
import { TableContext } from "../../../utils/TableContext"
import { getCurrentPageUtils, toSentenceCase } from "../../../utils/utils"

const InstitutionsTable = () => {
    const { tableData, setTableData, page, setModalTrigger, setDeleteId, setSelectedData, selectedData } = useContext(TableContext)

    const [condition, setCondition] = useState<conditionProps>({ updater: false, name: "Unsorted" })
    const [styleThis, setStyler] = useState<string>('')

    function paginateArray<T>(array: T[], page: number): T[] {
        const startIndex = (page - 1) * 10;
        const endIndex = startIndex + 10;
        return array.slice(startIndex, endIndex);
    }
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
                        getCurrentPageUtils().tableTitleList.map((item: string, index: number) =>
                        (
                            <th key={index} className={`${item === 'Status' ? 'stat' : ''}`}
                                onClick={() => {
                                    if (!(item === 'SL' || item === 'Manage')) {
                                        setStyler(item)
                                        yip.sort(setTableData, item, tableData, setCondition, condition)
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
                tableData && <tbody>
                    {
                        (paginateArray(tableData, page))
                            .map((item: any, i: number) => (
                                <tr key={i}>
                                    <td >{(page - 1) * 10 + i + 1}</td>
                                    <td className='name'>{getCurrentPageUtils().content === 'Block' ? toSentenceCase(item.name) : item.name}</td>
                                    {item.district && <td className='district'>{item.district}</td>}
                                    {item.legislative_assembly && <td >{item.legislative_assembly}</td>}
                                    {item.block && <td >{toSentenceCase(item.block)}</td>}
                                    {item.club_status && <td className='status' >
                                        {item.club_status}
                                    </td>}
                                    {item.email && <td >{item.email}</td>}
                                    {item.phone && <td >{item.phone}</td>}
                                    {item.role && <td >{item.role}</td>}
                                    <td >
                                        <a onClick={() => {
                                            setModalTrigger(true)
                                            setDeleteId(item.id)
                                            setSelectedData(item)
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
export default InstitutionsTable
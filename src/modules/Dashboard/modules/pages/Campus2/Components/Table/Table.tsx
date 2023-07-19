import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react"
import InfoTab from "../InfoTabs/InfoTab"
import SmallStatus from "../SmallBox/SmallStatus"
import { downloadCSV, handleDownloadCSV } from "../../Utils/DownloadCSV"
import './Table.css'
import Edit from '../../Assets/edit-white.svg'
import Trash from '../../Assets/trash.svg'
import paginateArray from "../../Utils/ArrayPaginator"
import sortTable from "../../Utils/SortTable"
import handleTdDoubleClick from "../../Utils/CopyToClipBoard"

export interface TableProps<T> {
    opener?: boolean
    title: string
    headings: string[]
    table: T[] | null
    columns: (keyof T)[]
    type: string
    buttons?: {
        edit?: (props: any) => void
        delete?: (props: any) => void
    }
    sort?: {
        order?: string[]
        icon?: {
            asc: string
            desc: string
        }
    }
    filter?: {
        columns: (keyof T)[]
    }
    search?: {
        columns: (keyof T)[]
    }
    download?: () => void
    total?: boolean
    children?: JSX.Element
}

const Table = <T,>({
    sort = { icon: { asc: 'fa-arrow-up-z-a', desc: 'fa-arrow-up-a-z' } }, opener = false, ...props }: TableProps<T>) => {
    const [openTable, setOpenTable] = useState(opener)
    const [csvData, setCsvData] = useState([])
    const [table, setTable] = useState<T[] | null>(props.table)
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(10)
    const [sortColumn, setSortColumn] = useState(0)
    const [asc, setAsc] = useState(true)
    useEffect(() => {
        sortTable(props.table, props, setTable, sortColumn, asc)
    }, [props.table, sortColumn, asc])
    useEffect(() => {
        setAsc(true)
    }, [sortColumn])
    useEffect(() => {
        handleDownloadCSV(table as T[], props.columns, setCsvData)
    }, [table])

    return (
        <div className={`ux-table ${openTable ? 'ux-table-open' : ''}`}>
            <InfoTab
                title={props.title} openLayer={openTable} closer={() => setOpenTable(!openTable)}  >
                <>
                    {props.children}
                    <SmallStatus value={"Download CSV"} style={"button"} run={() => downloadCSV(props.title, csvData)} />
                </>
            </InfoTab>
            {openTable &&
                <div className="ano-table">
                    <table className="table">
                        <thead>
                            <tr className="tr">
                                <th className="th">
                                    <div className="slno">
                                        S/N
                                    </div>
                                </th>
                                {props.headings.map((heading, index) => (
                                    <th className={`th click 
                                    ${index === sortColumn ? (asc ? 'asc' : 'desc') : ''}
                                    `} key={index} onClick={() => { setSortColumn(index); setAsc(!asc) }}>
                                        <div className="clicked">
                                            {heading}
                                            {index === sortColumn && <i className={`fa-solid ${asc ? sort?.icon?.desc : sort?.icon?.asc}`}></i>}
                                        </div>
                                    </th>
                                ))}
                                {props.buttons && <th className="th">Manage</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {
                                paginateArray(table as T[], page, perPage)?.map((item: any, key) => (
                                    <tr className="tr" key={key}>
                                        <td className="td">
                                            <div className="slno">
                                                {key + 1}
                                            </div>
                                        </td>
                                        {props.columns.map((column, index) =>
                                            (<td className="td" key={index} onDoubleClick={(e) => handleTdDoubleClick(e, item[column])}>{item[column] as string}</td>)
                                        )}
                                        <td className="td">
                                            <div className="manage">
                                                {props.buttons?.edit &&
                                                    <SmallStatus
                                                        value={Edit}
                                                        style='image'
                                                        run={() => {
                                                            if (props.buttons?.edit)
                                                                props.buttons?.edit(item)
                                                        }} />}
                                                {props.buttons?.delete &&
                                                    <SmallStatus
                                                        value={Trash}
                                                        style='image'
                                                        run={() => {
                                                            if (props.buttons?.delete)
                                                                props.buttons?.delete(item)
                                                        }} />}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>}
        </div>
    )
}
export default Table

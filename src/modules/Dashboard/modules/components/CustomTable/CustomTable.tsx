
import { useEffect, useState } from "react"
import './customTable.scss'
interface sortProps {
    status: string;
    updater: boolean;

}
function paginateArray<T>(array: T[], page: number): T[] {
    const startIndex = (page - 1) * 10;
    const endIndex = startIndex + 10;
    return array.slice(startIndex, endIndex);
}
export interface CustomTableProps<TableProps> {
    tableHeadList: string[]
    tableData: TableProps[]
    orderBy: (keyof TableProps)[]
    sortOrder?: {
        sortBy: keyof TableProps
        orderList: string[]
        orderSymbol: {
            asc: string
            desc: string
        }
    },
    customCSS?: {
        name: string
        css: string
    }[]
    manage?: {
        value: string
        manageFunction: any
        icon?: string
    },
    capitalize?: boolean,
    pagination?: boolean,
    filter?: boolean
}
function CustomTable<TableProps>({
    tableHeadList,
    tableData,
    orderBy,
    sortOrder,
    customCSS,
    manage,
    capitalize = true,
    pagination = true,
    filter = true
}:
    CustomTableProps<TableProps>) {
    const [page, setPage] = useState(1)
    const [sortedTable, setSortedTable] = useState(tableData)
    const [sort, setSort] = useState<sortProps>({ updater: false, status: "Unsorted" })
    const [selectedHeading, setSelectedHeading] = useState<number>(-1)
    useEffect(() => {
        setPage(1)
        setSortedTable(tableData)
        setSort({ updater: false, status: "Unsorted" })
    }, [tableData])
    function capitalizeString(sentence: string): string {
        if (sentence === undefined || sentence === null) return ""
        let capitalizedSentence = sentence.toLowerCase();
        capitalizedSentence = capitalizedSentence.charAt(0).toUpperCase() + capitalizedSentence.slice(1);
        for (let i = 2; i < capitalizedSentence.length - 1; i++)
            if (capitalizedSentence.charAt(i).match(/[^\w\']/))
                capitalizedSentence = capitalizedSentence.slice(0, i + 1) + capitalizedSentence.charAt(i + 1).toUpperCase() + capitalizedSentence.slice(i + 2);
        return capitalizedSentence;
    }
    function sortTable(index: number) {

        sortedTable.sort((a: any, b: any) => {
            const isNotSorted = sort.status === "Unsorted" || sort.status === "Sorted:DESC"
            if (a[orderBy[index]] < b[orderBy[index]]) return isNotSorted ? -1 : 1
            if (a[orderBy[index]] > b[orderBy[index]]) return isNotSorted ? 1 : -1
            return 0
        })
        setSortedTable(sortedTable)
        setSort((prev: sortProps) => {
            return {
                ...prev,
                updater: !prev.updater,
                status: sortStatusUpdater(sort.status)
            }
        })
    }
    function sortOrderByRequired(index: number) {
        if (sortOrder?.sortBy === orderBy[index]) sortByOrder(index)
        else { sortTable(index) }
    }
    function sortByOrder(index: number): void {
        let tempTable: TableProps[] = []
        let listOrder = sort.status === 'Unsorted' ? sortOrder?.orderList : sortOrder?.orderList.reverse()
        listOrder?.map((value: string) => {
            tempTable.push(
                ...sortedTable.filter((item: TableProps) => item[orderBy[index]] === value)
            )
        })
        setSortedTable(tempTable)
        setSort((prev: sortProps) => {
            return {
                ...prev,
                updater: !prev.updater,
                status: sortStatusUpdater(sort.status)
            }
        })
    }

    function getIconStyleForSortedHeading(index: number): string {
        if (selectedHeading === index) {
            if (sortOrder?.sortBy === orderBy[index]) {
                switch (sort.status) {
                    case 'Sorted:ASC': return sortOrder?.orderSymbol.asc as string + ' selected';
                    case 'Sorted:DESC': return sortOrder?.orderSymbol.desc as string + ' selected'
                }
            }
            else {
                switch (sort.status) {
                    case 'Sorted:ASC': return 'fa-arrow-up-a-z  selected'
                    case 'Sorted:DESC': return 'fa-arrow-up-z-a selected'
                }
            }
        }
        if (orderBy[index] === sortOrder?.sortBy) {
            return (sortOrder.orderSymbol.asc)
        }
        return 'fa-arrow-up-a-z'
    }

    function customCssByRequired(index: number, className: string): string {
        if (customCSS) {
            for (let item of customCSS) {
                if (item.name === orderBy[index]) {
                    return `${item.css}-${className.toLowerCase().replace(/\s+/g, '-')}`
                }

            }
        }
        return ''
    }
    function sortStatusUpdater(value: string) {
        switch (value) {
            case "Unsorted": return 'Sorted:ASC'
            case "Sorted:ASC": return 'Sorted:DESC'
            case "Sorted:DESC": return 'Sorted:ASC'
        }
        return ''
    }

    return (
        <div className="table-wrap">

            <table className='table '>
                {/* Table Header */}
                <thead>
                    <tr>
                        <th >
                            <div className="th-wrap ">
                                <div>{'SL.No'}</div>
                            </div>
                        </th>
                        {tableHeadList.map((item: string, index: number) => (
                            <th key={index} onClick={() => {
                                if (filter) {
                                    setPage(1)
                                    sortOrderByRequired(index)
                                    setSelectedHeading(index)
                                }
                            }}>
                                <div className={`th-wrap ${filter ? 'cursor' : ''} ${!manage?.value && index === tableHeadList.length - 1 ? 'end' : ''}`}>
                                    <i className={`fa-solid ${filter ? getIconStyleForSortedHeading(index) : ''}`}></i>
                                    <div>{item}</div>

                                </div>
                            </th>)
                        )}
                        {manage?.value &&
                            <th>
                                <div className="th-wrap end ">
                                    <div>{'Manage'}</div>
                                </div>
                            </th>
                        }
                    </tr>
                </thead>

                {/* Table Body */}

                <tbody>
                    {paginateArray(sortedTable, page).map((item: TableProps, key: number) =>
                    (
                        <tr key={key} >
                            <td >{(page - 1) * 10 + key + 1}</td>
                            {
                                orderBy.map((item2: keyof TableProps, index: number) => (
                                    <>
                                        <td className={`${customCssByRequired(index, item[item2] as string)} ${!manage?.value && index === tableHeadList.length - 1 ? 'end' : ''}`} key={index}>{capitalize ? capitalizeString(item[item2] as string) : item[item2] as string}</td>
                                    </>
                                ))
                            }
                            {manage?.value &&
                                <td className="">
                                    <div className="manage">
                                        <div className="edit-btn " onClick={() => { manage.manageFunction(item) }}>
                                            <i className={`fa ${manage.icon ? manage.icon : 'fa-edit '}`}></i>
                                            {manage.value}
                                        </div>
                                    </div>
                                </td>
                            }
                        </tr>
                    )
                    )}
                </tbody>
            </table >
            {!sortedTable.length && <div className="no-data">No Data to show </div>}
            {/* Pagination */}

            {pagination && <div className='paginator' >
                <div>
                    <div onClick={() => { setPage(1) }}>
                        <i   >{"|<<"}</i>
                    </div>
                    <div onClick={() => { setPage(page > 1 ? page - 1 : 1) }}>
                        <i >{"|<"}</i>
                    </div>
                    <div className="input">
                        {`${page} / ${Math.trunc(sortedTable.length / 10) + 1}`}
                    </div>
                    <div onClick={() => { if (page < Math.trunc(sortedTable.length / 10) + 1) setPage(page + 1) }}>
                        <i >{">|"}</i></div>
                    <div onClick={() => { setPage(Math.trunc(sortedTable.length / 10) + 1) }}>
                        <i >{">>|"}</i>
                    </div>
                </div>
            </div >}
        </div>
    )
}
export default CustomTable
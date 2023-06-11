
import { useEffect, useState } from "react"
import './customTable.scss'
import { convertToNormalDate } from "../../pages/Campus/utils";
import React, { Dispatch, SetStateAction } from "react";
import exportFromJSON from 'export-from-json';
import { ThreeDots, RotatingSquare } from "react-loader-spinner";
interface sortProps {
    status: string;
    updater: boolean;

}
function paginateArray<T>(array: T[], page: number, countInPage: number): T[] {
    const startIndex = (page - 1) * countInPage;
    const endIndex = startIndex + countInPage;
    return array.slice(startIndex, endIndex);
}
export interface CustomTableProps<TableProps> {
    tableHeadList: string[]
    tableData: TableProps[]
    orderBy: (keyof TableProps)[]
    sortOrder?: {
        sortBy?: keyof TableProps
        orderList: string[]
        orderSymbol: {
            asc: string
            desc: string
        }
    },
    customHeaderCssSort?: {
        title: keyof TableProps,
        unOrder?: string,
        asc: string,
        desc: string,
    }[],
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
    filter?: boolean,
    loading?: boolean,
    setupLoading?: (item: boolean) => void
    countPerPage?: number,
    gridView?: boolean
}
function CustomTable<TableProps>({
    tableHeadList,
    tableData,
    orderBy,
    sortOrder,
    customCSS,
    customHeaderCssSort,
    manage,
    capitalize = true,
    pagination = true,
    filter = true,
    loading = true,
    setupLoading = (item: boolean) => {
        return item
    },
    countPerPage = 10,
    gridView = false
}
    :
    CustomTableProps<TableProps>) {

    const [page, setPage] = useState(1)
    const [sortedTable, setSortedTable] = useState(tableData)
    const [sort, setSort] = useState<sortProps>({ updater: false, status: "Unsorted" })
    const [selectedHeading, setSelectedHeading] = useState<number>(-1)
    const [csvData, setCsvData] = useState<any>();
    const [countInPage, setCountInPage] = useState(countPerPage)
    const [notLoading, setNotLoading] = useState('')
    const [boxView, setBoxView] = useState(false)
    const lastPage = Math.floor(sortedTable.length / countInPage) + (sortedTable.length % countInPage ? 1 : 0)
    useEffect(() => {
        handleDownloadCSV()
    }, [tableData, sortedTable, sort, selectedHeading])
    useEffect(() => {
        if (tableData.length === 0)
            setTimeout(() => {
                setupLoading(false)
                setNotLoading('No Data to Display')
            }, 5000)
    }, [])
    useEffect(() => {
        if (countInPage < 1) {
            setCountInPage(10)
        }

    }, [countInPage])
    const handleDownloadCSV = () => {
        //check the view value and dowload the data in the corresponding state variable as a csv
        const updatedData = sortedTable.map((item: any) => {
            let rest = {}
            for (let key of orderBy) {
                rest = { ...rest, [key]: item[key] || item[key] === 0 ? item[key] : "" }
            }
            return rest;
        });
        setCsvData(updatedData);
    };
    const downloadCSV = () => {
        const fileName = 'data';
        const fields = Object.keys(csvData[0]);

        exportFromJSON({
            data: csvData,
            fileName,
            fields,
            exportType: 'csv',
        });
    };
    useEffect(() => {
        setPage(1)
    }, [countInPage])

    useEffect(() => {

        setPage(1)
        setSortedTable(tableData)
        setSort({ updater: false, status: "Unsorted" })
    }, [tableData])
    function capitalizeString(sentence: string): string {
        if (sentence === undefined || sentence === null) return ""
        let capitalizedSentence = sentence?.toLowerCase();
        capitalizedSentence = capitalizedSentence.charAt(0).toUpperCase() + capitalizedSentence.slice(1);
        for (let i = 2; i < capitalizedSentence.length - 1; i++)
            if (capitalizedSentence.charAt(i).match(/[^\w\']/))
                capitalizedSentence = capitalizedSentence.slice(0, i + 1) + capitalizedSentence.charAt(i + 1).toUpperCase() + capitalizedSentence.slice(i + 2);
        return capitalizedSentence;
    }
    function sortTable(index: number) {

        let tempTable = sortedTable.sort((a: any, b: any) => {
            const isNotSorted = sort.status === "Unsorted" || sort.status === "Sorted:DESC"
            if (
                (a[orderBy[index]] || a[orderBy[index]] === 0 ?
                    a[orderBy[index]] : '') < (b[orderBy[index]] || b[orderBy[index]] === 0 ? b[orderBy[index]] : '')) return isNotSorted ? -1 : 1
            if ((a[orderBy[index]] || a[orderBy[index]] === 0 ?
                a[orderBy[index]] : '') > (b[orderBy[index]] || b[orderBy[index]] === 0 ? b[orderBy[index]] : '')) return isNotSorted ? 1 : -1
            return 0
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
                    case 'Sorted:ASC':
                        return sortOrder?.orderSymbol.asc as string + ' selected';
                    case 'Sorted:DESC':
                        return sortOrder?.orderSymbol.desc as string + ' selected';
                }
            } else if (customHeaderCssSort) {
                for (let item of customHeaderCssSort) {
                    if (item.title === orderBy[index]) {
                        switch (sort.status) {
                            case 'Sorted:ASC':
                                return item.asc as string + ' selected';
                            case 'Sorted:DESC':
                                return item.desc as string + ' selected';
                        }
                    }
                }
                switch (sort.status) {
                    case 'Sorted:ASC':
                        return 'fa-arrow-up-a-z selected';
                    case 'Sorted:DESC':
                        return 'fa-arrow-up-z-a selected';
                }
            }
        }
        if (customHeaderCssSort) {
            for (let item of customHeaderCssSort) {
                if (item.title === orderBy[index]) {
                    return item.unOrder ? item.unOrder : item.asc;
                }
            }
        }
        if (orderBy[index] === sortOrder?.sortBy) {
            return sortOrder.orderSymbol.asc;
        }
        return 'fa-arrow-up-a-z';
    }

    function customCssByRequiredByValue(index: number, className: string): string {
        if (customCSS) {
            for (let item of customCSS) {
                if (item.name === orderBy[index]) {
                    return `${item.css}-${(String(className)).toLowerCase().replace(/\s+/g, '-')} ${item.css}`
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
            <div className="btn-wrap">
                <button className='table-btn' onClick={() => downloadCSV()}>
                    <i className="fa-solid fa-download"></i>
                    Download CSV
                </button>
                {gridView && <button className='table-btn grid' onClick={() => setBoxView(!boxView)}>
                    <i className={`fa-solid ${boxView ? 'fa-th-large' : 'fa-list'}`}></i>
                    {boxView ? ' Grid View' : 'List View'}
                </button>}
            </div>
            <div className="wrapper-table">

                {boxView ?
                    <>
                        <div className="sortList">
                            {filter &&
                                tableHeadList.map((item: string, index: number) => (
                                    <p className={`sort-btns ${index === selectedHeading ? 'selected' : ''}`} onClick={() => {
                                        if (filter) {
                                            setPage(1)
                                            sortOrderByRequired(index)
                                            setSelectedHeading(index)
                                        }
                                    }}>
                                        <i className={`fa-solid ${filter ? getIconStyleForSortedHeading(index) : ''}`}></i>
                                        {item}</p>
                                ))
                            }
                        </div>
                        <div className="box-list">
                            {paginateArray(sortedTable, page, countInPage).map((item: TableProps, key: number) => (
                                <div className="boxed" key={key}>
                                    <div className="boxed-heading">
                                        <div >
                                            {/* <p className="heading">{tableHeadList[0]}</p> */}
                                            <p> {item[orderBy[0]] ? item[orderBy[0]] as string : ' '}</p >
                                        </div>
                                    </div>
                                    <div className="boxed-data">
                                        {orderBy.slice(1,).map((item2: keyof TableProps, index: number) => (
                                            <div key={index} className="data">
                                                <p className="heading">{tableHeadList[index + 1]}</p>
                                                <p> {item[item2] === 0 || item[item2] ? item[item2] as string : ' '}</p >
                                            </div>
                                        ))}
                                    </div>
                                    {manage?.value &&
                                        <div className="manage">
                                            <div className="edit-btn " onClick={() => { manage.manageFunction(item) }}>
                                                <i className={`fa ${manage.icon ? manage.icon : 'fa-edit '}`}></i>
                                                {manage.value}
                                            </div>
                                        </div>
                                    }
                                </div>
                            ))}
                        </div>
                    </>
                    : <table className='table '>
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
                                        <div className={`th-wrap ${filter ? 'cursor' : ''} `}>
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
                            {paginateArray(sortedTable, page, countInPage).map((item: TableProps, key: number) => {

                                //console.log(item)
                                return (
                                    <tr key={key} >
                                        <td >{(page - 1) * countInPage + key + 1}</td>
                                        {
                                            orderBy.map((item2: keyof TableProps, index: number) => (
                                                <>
                                                    <td
                                                        className={`
                                                ${customCssByRequiredByValue(index, item[item2] as string)} `}
                                                        key={index}>
                                                        {capitalize ? capitalizeString(item[item2] as string) : item[item2] as string}
                                                    </td>
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
                            })}
                        </tbody>
                    </table >}
            </div>
            {
                !sortedTable.length && <div className="no-data">
                    <ThreeDots
                        height="60"
                        width="60"
                        color="#59b3fa"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        wrapperClass="no-data"
                        visible={!notLoading}
                    />
                    {notLoading ? notLoading : ''}</div>
            }
            {/* Pagination */}

            {
                pagination &&
                <div className='paginator' >
                    <div className="count-in-page">

                        <input className="input" type="number" value={countInPage} min={1} max={sortedTable.length} onChange={(e) => {
                            setCountInPage(Number(e.target.value))
                        }} />
                        <p> Per Page </p>
                    </div>
                    <div>
                        <div onClick={() => { setPage(1) }}>
                            <i className="fas fa-backward-fast" />
                        </div>
                        <div onClick={() => { setPage(page > 1 ? page - 1 : 1) }}>
                            <i className="fas fa-backward-step" />
                        </div>
                        <div className="input">
                            {`${page * countInPage < sortedTable.length ? page * countInPage : sortedTable.length} / ${sortedTable.length}`}
                        </div>
                        <div onClick={() => { setPage(page * countInPage < sortedTable.length ? page + 1 : page) }}>
                            <i className="fas fa-forward-step" /></div>
                        <div onClick={() => { setPage(lastPage) }}>
                            <i className="fas fa-forward-fast"></i>                        </div>
                    </div>
                </div >
            }
        </div >
    )
}
export default CustomTable
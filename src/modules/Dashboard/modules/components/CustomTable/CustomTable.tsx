
import { useContext, useEffect, useRef, useState } from "react"
import './customTable.scss'
import { convertToNormalDate } from "../../pages/Campus/utils";
import React, { Dispatch, SetStateAction } from "react";
import exportFromJSON from 'export-from-json';
import { ThreeDots, RotatingSquare } from "react-loader-spinner";
import roles from "../../../../../utils/roles";
import { GlobalContext } from "../../../../../utils/GlobalVariable";
import { isEmptyArray } from "formik";
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
    tableData: TableProps[] | null
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
    Total?: boolean,
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
    Total = false,
    countPerPage = 10,
    gridView = false
}
    :
    CustomTableProps<TableProps>) {
    const [isValidData, setIsValidData] = useState(Array.isArray(tableData))
    const [isLoading, setIsLoading] = useState(tableData === null)
    const [sortedTable, setSortedTable] = useState(tableData ? tableData : [])
    const [page, setPage] = useState(1)
    const [sort, setSort] = useState<sortProps>({ updater: false, status: "Unsorted" })
    const [selectedHeading, setSelectedHeading] = useState<number>(-1)
    const [csvData, setCsvData] = useState<any>();
    const [countInPage, setCountInPage] = useState(countPerPage)
    const [notLoading, setNotLoading] = useState('')
    const [boxView, setBoxView] = useState(false)
    const lastPage = Math.floor(sortedTable.length / countInPage) + (sortedTable.length % countInPage ? 1 : 0)
    const fetched = useRef(false)
    const { userInfo } = useContext(GlobalContext)
    useEffect(() => {
        if (Array.isArray(tableData)) setIsLoading(false)
        if (!Array.isArray(tableData)) { setIsValidData(false) }
        handleDownloadCSV()
        if (Array.isArray(tableData) && tableData.length === 0) {
            setNotLoading('No Data to Display')
        }
        else if (tableData === null) {
            setTimeout(() => {
                setIsLoading(false)
                setNotLoading('Something Went Wrong!!!')
            }, 20000);
        }
    }, [tableData, sortedTable, sort, selectedHeading])
    useEffect(() => {
        if (fetched.current) return
        fetched.current = true
    }, [])
    useEffect(() => {
        if (countInPage === -1) {
            setCountInPage(10)
        }

    }, [countInPage])
    const handleDownloadCSV = () => {
        //check the view value and dowload the data in the corresponding state variable as a csv
        const updatedData = [...sortedTable.map((item: any, index: number) => {
            let ict = item?.ict_id ? { ict_id: item?.ict_id } : {}
            let rest = { Sl_no: String(index + 1), ...ict }
            for (let key of orderBy) {
                rest = { ...rest, [key]: item[key] || item[key] === 0 ? item[key] : "" }
            }
            return rest;
        }), Total ? ({ Sl_no: '', ...(tableData ? tableData?.slice(tableData.length - 1)[0] : []) }) : {}]
        setCsvData(updatedData)
    };
    const downloadCSV = () => {
        const fileName = 'Table';
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
        handleTableData()
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
    function handleTableData() {
        if (Total) {
            setSortedTable(tableData ? tableData.slice(0, tableData.length - 1) : [])
        }
        else {
            setSortedTable(tableData ? tableData : [])
        }
    }
    function sortTable(index: number) {
        setSort((prev: sortProps) => {
            const tempSortStatus = sortStatusUpdater(prev.status);
            const valueType = typeof (sortedTable.find(item => item[orderBy[index]]))?.[orderBy[index]]
            let substitute = ''
            let isNotSorted = true
            if (selectedHeading !== index && prev.status === 'Unsorted') isNotSorted = false
            if (selectedHeading === index && prev.status === 'Sorted:DESC') isNotSorted = false
            if (valueType === 'string') {
                substitute = 'zzz'
            } else if (valueType === 'number') {
                substitute = '0'
            }
            const tempTable = sortedTable.slice().sort((a: any, b: any) => {
                let aValue = a[orderBy[index]] ? a[orderBy[index]] : substitute
                aValue = isNaN(aValue) ? aValue.toLowerCase().trim() : aValue
                let bValue = b[orderBy[index]] ? b[orderBy[index]] : substitute
                bValue = isNaN(bValue) ? bValue.toLowerCase().trim() : bValue
                if (aValue < bValue) return isNotSorted ? -1 : 1;
                if (aValue > bValue) return isNotSorted ? 1 : -1;
                return 0;
            });

            setSortedTable(tempTable);

            return {
                ...prev,
                updater: !prev.updater,
                status: tempSortStatus,
            };
        });
        setSelectedHeading(index)
    }

    function sortOrderByRequired(index: number) {
        if (sortOrder?.sortBy === orderBy[index]) sortByOrder(index)
        else { sortTable(index) }
    }
    function sortByOrder(index: number): void {
        let tempTable: TableProps[] = []
        let listOrder = sortOrder?.orderList
        if (selectedHeading === index) {
            if (sort.status === 'Sorted:ASC')
                listOrder = [...(sortOrder?.orderList ? sortOrder?.orderList : [])].reverse()
        }
        //  = sort.status === 'Unsorted' ? sortOrder?.orderList : sortOrder?.orderList.reverse()
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
        setSelectedHeading(index)
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
                {userInfo.role !== roles.INTERN && <button className='table-btn' onClick={() => downloadCSV()}>
                    <i className="fa-solid fa-download"></i>
                    Download CSV
                </button>}
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
                                    <p key={index} className={`sort-btns ${index === selectedHeading ? 'selected' : ''}`} onClick={() => {
                                        if (filter) {
                                            setPage(1)
                                            sortOrderByRequired(index)
                                            // setSelectedHeading(index)
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
                                return (
                                    <tr key={key} >
                                        <td >{(page - 1) * countInPage + key + 1}</td>
                                        {
                                            orderBy.map((item2: keyof TableProps, something: number) => (
                                                <td
                                                    className={`
                                                ${customCssByRequiredByValue(something, item[item2] as string)} `}
                                                    key={something}>
                                                    {capitalize ? capitalizeString(item[item2] as string) : item[item2] as string}
                                                </td>
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
                            {
                                Total && <>
                                    <tr>
                                        <td></td>
                                        {
                                            tableData?.slice(tableData?.length - 1,).map((item: TableProps, key: number) => (
                                                <>
                                                    {
                                                        orderBy.map((item2: keyof TableProps, something: number) => (
                                                            <td
                                                                className={`
                                                        ${customCssByRequiredByValue(something, item[item2] as string)} bold`}
                                                                key={something}>
                                                                {capitalize ? capitalizeString(item[item2] as string) : item[item2] as string}
                                                            </td>
                                                        ))
                                                    }
                                                </>
                                            ))
                                        }
                                    </tr>
                                </>
                            }
                        </tbody>
                    </table >}
            </div>
            {<>
                {(isLoading || (!isLoading && isEmptyArray(tableData))) && <div className="no-data">
                    <ThreeDots
                        height="60"
                        width="60"
                        color="#59b3fa"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        wrapperClass="no-data"
                        visible={isLoading}
                    />
                    {!isLoading && (isEmptyArray(tableData)) ? notLoading : ''}
                </div>}
                {
                    !isLoading && notLoading && tableData === null &&
                    <div className="no-data">{notLoading}</div>
                }
            </>
            }
            {/* Pagination */}

            {
                pagination &&
                <div className='paginator' >
                    <div className="count-in-page">

                        <input className="input" name="count" id="count" type="number" value={countInPage} min={1} max={sortedTable.length} onChange={(e) => {
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
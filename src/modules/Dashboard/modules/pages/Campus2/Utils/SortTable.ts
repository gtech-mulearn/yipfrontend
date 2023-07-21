import { Dispatch, SetStateAction } from "react"
import { TableProps } from "../Components/Table/Table"
import { DateConverter } from "./Date"
import { toast } from "react-toastify"

function sortTable<T>(table: T[] | null, props: TableProps<T>, setTable: Dispatch<SetStateAction<T[] | null>>, index: number = 0, asc: boolean = true) {
    if (table === null) return []
    if (props?.sort?.order) {
        return table
    }
    else {
        const tableCopy: T[] = table?.slice().sort((a: any, b: any) => {
            let t1 = (a[props.columns[index]]), t2 = b[props.columns[index]]
            if (t1 === t2) {
                if (a[props?.columns[index + 1]] && b[props?.columns[index + 1]]) {
                    t1 = a[props?.columns[index + 1]], t2 = b[props?.columns[index + 1]]
                }
            }
            if (isNaN(t1)) {
                t1 = convertToString(t1), t2 = convertToString(t2)
                return asc ? t1.localeCompare(t2) : t2.localeCompare(t1)
            }
            return asc ? t1 - t2 : t2 - t1

        })
        setTable(tableCopy)
    }
}
function convertToString(value: any) {
    if (value === null || value === undefined) return ""
    return String(value)

}
function sortDates(date1: Date, date2: Date): [Date, Date] {
    date1 = new Date(date1), date2 = new Date(date2)
    return date1.getTime() <= date2.getTime() ? [date1, date2] : [date2, date1];
}
function isDate(value: any): boolean {
    const x = new Date(value)
    return x instanceof Date;
}

export default sortTable
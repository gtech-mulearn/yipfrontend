import exportFromJSON from 'export-from-json';
import { Dispatch, SetStateAction } from 'react';
import { toast } from 'react-toastify';
export const downloadCSV = (title: string, csvData: any[]) => {
    try {
        const fileName = title;
        const fields = Object.keys(csvData[0]);
        exportFromJSON({
            data: csvData,
            fileName,
            fields,
            exportType: 'csv',
        });
    } catch (error) {
        toast.error('Something went wrong')
    }
};

export const handleDownloadCSV = <T,>(table: T[], columns: (keyof T)[], setCsvData: Dispatch<SetStateAction<any>>) => {
    if (table === null) {
        return
    }
    const updatedData = [...table?.map((item: any, index: number) => {
        let ict = item?.ict_id ? { ict_id: item?.ict_id } : {}
        let rest = { Sl_no: String(index + 1), ...ict }
        for (let key of columns) {
            rest = { ...rest, [key]: item[key] || item[key] === 0 ? item[key] : "" }
        }
        return rest;
    })]
    setCsvData(updatedData)
};  
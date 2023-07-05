import * as fs from 'fs';
import { Dispatch, SetStateAction } from 'react';
import { toast } from 'react-toastify';

function createCSV(data: any[], filePath: string) {
    // Convert the data to CSV format
    const csvData = data.map(row => row.join(',')).join('\n');

    // Write the CSV data to the file
    fs.writeFile(filePath, csvData, 'utf8', (err) => {
        if (err) {
            console.error('Error writing CSV file:', err);
        } else {
            console.log('CSV file created successfully!');
        }
    });
}
const data = [
    ['Name', 'Age', 'City'],
    ['John Doe', 25, 'New York'],
    ['Jane Smith', 30, 'London'],
];

// Example component
function handleReport(data: any) {
    const invalidIct = data.includes('Invalid Ict Ids'),
        missingFields = data.includes('Missing fields: ict_id, pre_registrations, vos, group_formed, idea_submission');
    if (missingFields) {
        toast.error('Missing fields: ict_id, pre_registrations, vos, group_formed, idea_submission');
        toast.info('Make sure file format is correct.');
    }
    if (invalidIct) {
        toast.error('Invalid Ict Ids');
        toast.info('A report has been generated for the invalid Ict Ids.Download and make corrections to upload');
    }
    let reportData = data.split('Invalid Ict Ids:- ').slice(1,).join(',').split(',').join('\n')
    reportData = "The following ict ids are either invalid:\n Or The campus with the ict id is not added to the list\nif the campus is not found in database please contact developers\n" + reportData
    console.log(reportData)
    return reportData;
}
export function downloadCSVReport(data: string, setReportData: Dispatch<SetStateAction<string | null>>) {
    if (data === null) {
        return;
    }
    const blob = new Blob([data], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'data.csv';
    link.click();

    URL.revokeObjectURL(url);
    setReportData(null)
}
export default handleReport;

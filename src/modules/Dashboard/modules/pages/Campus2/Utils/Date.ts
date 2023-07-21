export function DateConverter(value: string) {
    if (value === null || value === '' || value === undefined) {
        return 'Invalid value'
    }
    const date = new Date(value);
    const formattedDate = date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
    return formattedDate// Output: "29 May 2023"
}

export function formatDate(dateTimeString: string | Date): string {
    if (dateTimeString === null) return ''
    const options: Intl.DateTimeFormatOptions = {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    };
    const date = new Date(dateTimeString);
    return date.toLocaleString('en-US', options);
}

export const isNotFutureDate = (dateTime: string) => {
    if (dateTime === '') return true
    const selectedDateTime = new Date(dateTime).getTime()
    const currentDateTime = new Date().getTime()
    return selectedDateTime < currentDateTime
}
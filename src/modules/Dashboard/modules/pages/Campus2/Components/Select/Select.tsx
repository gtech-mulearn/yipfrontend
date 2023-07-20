import React from 'react';
import ReactSelect from 'react-select'

const pStyle: React.CSSProperties = {
    display: 'block',
    width: '100%', // Make the input element fill the width of the div
    boxSizing: 'border-box', // Include padding and border in the width calculation
    fontWeight: 'bold',
    padding: '3px 5px',
    fontSize: '12.5px',
};
const Select = ({ ...props }: any) => {
    const handleSearch = (searchValue: string, callBack: any) => {
        const filteredOptions = props.options.filter((option: any) => {
            return rawString(option.label.toLowerCase()).includes(rawString(searchValue))
        })
        callBack(filteredOptions)
    }
    return (
        <div>
            <p style={pStyle}>{(props?.header || props.name)}</p>
            <ReactSelect
                styles={{
                    control: (styles) => ({ ...styles, width: '100%', marginBottom: '12px' }),
                }}
                loadOptions={handleSearch}
                defaultOptions
                getOptionValue={(option: any): string => option.id}
                getOptionLabel={(option: any): string => option.name}
                placeholder={`Select a ${(props?.header || props.name)}`}
                {...props}
            />
        </div>
    )
}
function rawString(str: string) {
    if (str === null || str === undefined || str === '') return "";
    str = str?.toLowerCase();
    str = str.replace(/[^a-zA-Z0-9 ]/g, "");
    str = str.replaceAll(" ", "");
    return str;
}
export default Select
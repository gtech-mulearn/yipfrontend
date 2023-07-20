const inputStyle: React.CSSProperties = {
    display: 'block',
    width: '100%', // Make the input element fill the width of the div
    boxSizing: 'border-box', // Include padding and border in the width calculation
    border: '1px solid #ced4da',
    borderRadius: '0.5rem',
};
const pStyle: React.CSSProperties = {
    display: 'block',
    width: '100%', // Make the input element fill the width of the div
    boxSizing: 'border-box', // Include padding and border in the width calculation
    fontWeight: 'bold',
    padding: '3px 5px',
    fontSize: '12.5px',
};
const Input = ({ ...props }: any) => {
    return (
        <div>
            <p style={pStyle}>{(props?.header || props.name)}</p>
            <input style={inputStyle} placeholder={`Enter a ${(props?.header || props.name)}`} type="text" {...props} />
        </div>
    )
}

export default Input
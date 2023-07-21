import React from 'react'

const Form = ({ ...props }: any) => {
    const handleData = (e: React.FormEvent<HTMLFormElement>) => {
        const elements: { [key: string]: string | string[] } = {}; // Assuming the values can be either string or an array of strings
        if (e?.preventDefault) {
            e.preventDefault()
            for (let value of Object.values(e.target))
                if (value.name) {
                    elements[value.name] = elements[value.name] ? [...elements[value.name], value.value] : value.value
                }
        }
        props.onSubmit(elements)
    };
    return (
        <form onSubmit={handleData}>
            {props.children}
        </form>
    )
}

export default Form
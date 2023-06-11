import { Dispatch, FC, SetStateAction } from "react"
import { inputProps } from "../../utils/CustomInputUtils"

export const CustomInput = ({ value, type = "text", setData, data, requiredHeader = true, customCSS = "setup-item", ...props }: {
    value: string
    type?: string
    data: string
    requiredHeader?: boolean
    setData: Dispatch<SetStateAction<string>>
    customCSS?: string,
}) => (
    <div className={customCSS}>
        {requiredHeader && <p>{value}</p>}
        <input
            type={type}
            name={`name-${value}`}
            placeholder={`Enter ${value}`}
            value={data}
            id={`id-${value}`}
            onChange={(e) => { setData(e.target.value) }}
            {...props}
        />
    </div>
)

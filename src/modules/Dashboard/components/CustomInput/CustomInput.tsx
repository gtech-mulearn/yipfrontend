import { FC } from "react"
import { inputProps } from "../../utils/CustomInputUtils"

export const CustomInput: FC<inputProps> = ({ value, type = "text", setData, data, requiredHeader = true, customCSS = "setup-item" }) => (
    <div className={customCSS}>
        {requiredHeader && <p>{value}</p>}
        <input
            type={type}
            name={`name-${value}`}
            placeholder={`Enter ${value}`}
            value={data}
            id={`id-${value}`}
            onChange={(e) => { setData(e.target.value) }} />
    </div>
)


import { FC, Dispatch, SetStateAction } from "react"
interface inputProps {
    value: string
    data: string
    setData: Dispatch<SetStateAction<string>>
}
import './CustomInput.scss'
export const CustomInput: FC<inputProps> = ({ value, setData, data }) => (
    <div className="setup-item" >
        <p>{value}</p>
        <input
            type="text"
            name={`name-${value}`}
            placeholder={`Enter ${value}`}
            value={data}
            id={`id-${value}`}
            onChange={(e) => { setData(e.target.value) }} />
    </div>
)

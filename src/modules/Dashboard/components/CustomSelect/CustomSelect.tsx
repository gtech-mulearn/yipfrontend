import { Dispatch, SetStateAction, FC } from "react"
import { dummyProps } from "../../utils/setupUtils"
import Select from 'react-select'
import './CustomSelect.scss'

interface newSelectProps {
    option: dummyProps[]
    value: string
    setData?: Dispatch<SetStateAction<dummyProps>>
    setValue?: Dispatch<SetStateAction<string>>
    requiredHeader?: boolean
    requiredLabel?: boolean
}
export const intialState = { id: '', name: '' }

export const CustomSelect: FC<newSelectProps> = ({
    option,
    value,
    setData = () => { setData(intialState) },
    setValue = () => { setValue('All') },
    requiredHeader = true,
    requiredLabel = false,
}) => {
    return (
        <div className="setup-item">
            {requiredHeader && <p>{value}</p>}
            <Select

                options={option}
                isSearchable={true}
                isClearable={true}
                placeholder={`Select a ${value}`}
                getOptionValue={(option: dummyProps) => option.id}
                getOptionLabel={(option: dummyProps) => option.name}
                onChange={(data) => {
                    if (requiredLabel) {
                        if (data === null) setValue('All')
                        else setValue(data.name)
                    }
                    else {
                        if (data === null) setData(intialState)
                        else setData(data)
                    }
                }}
            />
        </div>
    )
}

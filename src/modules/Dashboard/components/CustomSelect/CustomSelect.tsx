import { Dispatch, SetStateAction, FC } from "react"
import Select from 'react-select'
import './CustomSelect.scss'
interface dummyProps {
    id: string,
    name: string
}
interface newSelectProps {
    option: dummyProps[]
    value: string
    setData?: Dispatch<SetStateAction<dummyProps>>
    setValue?: Dispatch<SetStateAction<string>>
    requiredHeader?: boolean
    requiredLabel?: boolean
    requiredData?: boolean
    sentenceCase?: boolean
}
export const intialState = { id: '', name: '' }

export const CustomSelect: FC<newSelectProps> = ({
    option,
    value,
    setData = () => { setData(intialState) },
    setValue = () => { setValue('') },
    requiredHeader = true,
    requiredLabel = false,
    requiredData = true,
    sentenceCase = false
}) => {
    return (
        <div className="setup-item">
            {requiredHeader && <p>{value}</p>}
            <Select
                options={option}
                isSearchable={true}
                isClearable={true}
                noOptionsMessage={() => 'No options'}
                placeholder={`Select a ${value}`}
                getOptionValue={(option: dummyProps) => option.id}
                getOptionLabel={(option: dummyProps) => sentenceCase ? capitalizeString(option.name) : option.name}
                onChange={(data: any) => {
                    try {
                        if (requiredData) {
                            setData?.(data?.id ? data : intialState)
                            console.log(intialState)
                        }
                        if (requiredLabel) setValue?.(data?.id ? data.name : '')

                    } catch (error) {
                        if (requiredData) setData?.(intialState)
                        if (requiredLabel) setValue?.('')
                    }
                }}
            />
        </div>
    )
}
function capitalizeString(sentence: string): string {
    let capitalizedSentence = sentence.toLowerCase();
    capitalizedSentence = capitalizedSentence.charAt(0).toUpperCase() + capitalizedSentence.slice(1);
    for (let i = 2; i < capitalizedSentence.length - 1; i++)
        if (capitalizedSentence.charAt(i).match(/[^\w\']/))
            capitalizedSentence = capitalizedSentence.slice(0, i + 1) + capitalizedSentence.charAt(i + 1).toUpperCase() + capitalizedSentence.slice(i + 2);
    return capitalizedSentence;
}
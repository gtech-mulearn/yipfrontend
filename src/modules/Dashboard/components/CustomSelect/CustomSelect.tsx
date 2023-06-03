import { Dispatch, SetStateAction, FC, useEffect, useState } from "react"
import Select, { Props as SelectProps } from 'react-select'
import './CustomSelect.scss'
import { optionProps, intialState } from "../../utils/CustomSelectUtils"

interface CustomSelectProps extends SelectProps<optionProps> {
    option: optionProps[]
    header: string,
    setData?: Dispatch<SetStateAction<optionProps>>
    setValue?: Dispatch<SetStateAction<string>>
    requiredHeader?: boolean
    requiredLabel?: boolean
    requiredData?: boolean
    sentenceCase?: boolean
    requirePlaceHolder?: boolean
    customCSS?: {
        className: string
        classNamePrefix: string,

    },
    defaultValue?: optionProps
}
export const CustomSelect: FC<CustomSelectProps> = ({
    option,
    header,
    setData = () => { setData(intialState) },
    setValue = () => { setValue('') },
    requiredHeader = true,
    requiredLabel = false,
    requiredData = true,
    sentenceCase = false,
    requirePlaceHolder = false,
    customCSS = {
        className: '',
        classNamePrefix: ""
    },
    defaultValue,
    ...props
}) => {
    const [update, setUpdate] = useState<boolean>(false)
    const [customDefault, setCustomDefault] = useState<optionProps>(defaultValue || option[0])
    return (
        <div className={customCSS.className ? 'special-setup' : "setup-item"}>
            {requiredHeader && <p>{header}</p>}
            <Select
                className='react-select-container'
                classNamePrefix={customCSS.classNamePrefix}
                options={option}
                isClearable={true}
                isMulti={false}
                isSearchable={true}
                placeholder={`Select a ${header}`}
                noOptionsMessage={() => 'No options'}
                getOptionValue={(option: any): string => option.id}
                getOptionLabel={(option: any): string => sentenceCase ? capitalizeString(option.name) : option.name}
                onChange={(data: any) => {
                    try {
                        if (data === null) {
                            if (defaultValue?.name) {
                                if (requiredData) setData?.(defaultValue)
                                if (requiredLabel) setValue?.(defaultValue.name)
                            }
                            if (requiredData)
                                setData?.(data?.name ? data : intialState)

                            if (requiredLabel)
                                setValue?.(data?.name ? data.name : '')

                        }
                        else {
                            if (requiredData)
                                setData?.(data?.name ? data : intialState)

                            if (requiredLabel)
                                setValue?.(data?.name ? data.name : '')

                        }
                    } catch (error) {
                        if (requiredData) setData?.(intialState)
                        if (requiredLabel) setValue?.('')
                    }
                }}
                {...props}
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
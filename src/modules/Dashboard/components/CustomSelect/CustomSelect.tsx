import { Dispatch, SetStateAction, FC, useEffect, useState } from "react"
import Select from 'react-select'
import './CustomSelect.scss'
interface dummyProps {
    id: string,
    name: string
}
export const intialState = { id: '', name: '' }

export const CustomSelect: FC<{
    option: dummyProps[]
    value: string
    setData?: Dispatch<SetStateAction<dummyProps>>
    setValue?: Dispatch<SetStateAction<string>>
    requiredHeader?: boolean
    requiredLabel?: boolean
    requiredData?: boolean
    sentenceCase?: boolean
    placeHolder?: string
    requirePlaceHolder?: boolean
    customCSS?: {
        className: string
        classNamePrefix: string
    }
}> = ({
    option,
    value,
    setData = () => { setData(intialState) },
    setValue = () => { setValue('') },
    requiredHeader = true,
    requiredLabel = false,
    requiredData = true,
    sentenceCase = false,
    placeHolder = '',
    requirePlaceHolder = false,
    customCSS = {
        className: '',
        classNamePrefix: ""
    }
}) => {
        const [update, setUpdate] = useState<boolean>(false)
        return (
            <div className={customCSS.className ? 'special-setup' : "setup-item"}>
                {requiredHeader && <p>{value}</p>}
                <Select
                    className='react-select-container'
                    classNamePrefix={customCSS.classNamePrefix}
                    options={option}
                    isSearchable={true}
                    isClearable={true}
                    noOptionsMessage={() => 'No options'}
                    placeholder={requirePlaceHolder ? placeHolder : `Select a ${value}`}
                    getOptionValue={(option: dummyProps) => option.id}
                    getOptionLabel={(option: dummyProps) => sentenceCase ? capitalizeString(option.name) : option.name}
                    onChange={(data: any) => {
                        try {
                            if (requiredData) {
                                setData?.(data?.name ? data : intialState)
                            }
                            if (requiredLabel) {
                                setValue?.(data?.name ? data.name : '')
                                console.log(data)
                            }

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
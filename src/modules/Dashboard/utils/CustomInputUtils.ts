import { DetailedHTMLProps, Dispatch, InputHTMLAttributes, SetStateAction } from "react"

export interface inputProps {
    value: string
    type?: string
    data: string
    requiredHeader?: boolean
    setData: Dispatch<SetStateAction<string>>
    customCSS?: string,
}
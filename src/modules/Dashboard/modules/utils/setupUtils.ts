export interface selectProps {
    id: string
    name: string
}
export interface selectCollegeProps {
    id: string
    title: string
}
export const initialState = { id: "", name: "" }

export interface selectEditedProps {
    value: string
    label: string
}
export const initialEditedState = { value: "", label: "" }

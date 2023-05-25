import React, { Dispatch, FC, SetStateAction } from 'react'
import './Alerts.scss'
export const Error: FC<{ error: string }> = ({ error }) => {
    return (
        <div className='alert-container'>
            <div className='error alert-sub-container'>
                <i className="fas fa-exclamation-triangle"></i>
                {error}
            </div>
        </div>
    )
}
export const Success: FC<{ success: string }> = ({ success }) => {
    return (
        <div className='alert-container'>
            <div className='success alert-sub-container'>
                {success}
            </div>
        </div>
    )
}
export function showAlert(alert: string, setAlert: Dispatch<SetStateAction<string>>, timeout: number = 3000) {
    setAlert(alert)
    setTimeout(() => {
        setAlert('')
    }, timeout)
}

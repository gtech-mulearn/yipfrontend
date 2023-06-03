import YIPlogo from '../../../../assets/logo.png'
import { useNavigate } from "react-router-dom"
import { buttons, urlProps } from '../../utils/navbarUtils'
import './LeftDrawer.scss'
import React, { useEffect } from 'react'
import { fetchUserInfo } from '../api'

export const LeftDrawer = () => {
    const navigate = useNavigate();
    const [newButton, setNewButton] = React.useState(buttons)
    const [userInfo, setUserInfo] = React.useState({ role: '', name: '' })
    useEffect(() => {
        fetchUserInfo(setUserInfo)
    }, [])


    return (
        <div className="left-menu">
            <img src={YIPlogo} alt="logo" />
            <div className="menu-items">
                {
                    (newButton).map((item: urlProps, index: number) =>
                        <div className="menu-item-container " key={index} onClick={() => navigate(item.url)}>
                            <div className="link-item" >
                                <li className="menu-item">
                                    <div className={`menu-icon ${window.location.pathname === item.url ? "active" : ""}`}>
                                        <i className={`fa-sharp fa-solid ${item.icon}`}></i>
                                    </div>
                                    <h5>{item.title}</h5>
                                </li>
                            </div>
                        </div>
                    )
                }
            </div>
            <button
                className="logout"
                onClick={() => {
                    localStorage.removeItem('accessToken')
                    window.location.href = "/"
                }}
            >
                Logout
            </button>
        </div>
    )
}


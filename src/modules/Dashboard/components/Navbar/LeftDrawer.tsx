import YIPlogo from '../../../../assets/logo.webp'
import { useNavigate } from "react-router-dom"
import { buttons, urlProps } from '../../utils/navbarUtils'
import './LeftDrawer.scss'
import React, { useEffect } from 'react'
import { fetchUserInfo } from '../api'

export const LeftDrawer = () => {
    const navigate = useNavigate();
    const [newButton, setNewButton] = React.useState(buttons)
    const [userInfo, setUserInfo] = React.useState({ role: '', name: '' })
    const [open, setOpen] = React.useState(false)
    useEffect(() => {
        if (userInfo.role === '') {
            fetchUserInfo(setUserInfo)
        }

        // console.log(userInfo)

        const filteredButtons = buttons.filter((item: urlProps) => {
            if (item && item.roles && item.roles.includes(userInfo.role)) {
                return item
            }
        })

        setNewButton(filteredButtons)
    }, [userInfo])

    return (
        <div className="left-menu">
            <img src={YIPlogo} alt="logo" />
            {
                newButton.map((item: urlProps, index: number) => {

                    if (item.title === 'Users' || item.title === 'Legislative Assembly' || item.title === 'Block' || item.title === 'Institute Management') {
                        return (
                            <div className="menu-items" key={index} >
                                {item.title === 'Institute Management' && <div className="menu-item-container " key={index} onClick={() => { navigate('/institute-management'); setOpen((prev: boolean) => !prev) }}>
                                    <div className="link-item" >
                                        <li className="menu-item">
                                            <div className={`menu-icon ${window.location.pathname === '/user'

                                                || window.location.pathname === '/legislative-assembly' || window.location.pathname === '/block' ||
                                                window.location.pathname === '/institute-management' ? "active" : ""}`}>
                                                <i className={`fa-sharp fa-solid ${item.icon}`}></i>
                                            </div>
                                            <h5>{'Admin Management'}</h5>
                                        </li>
                                    </div>
                                </div>}
                                {open && <div className="menu-item-container " key={index} onClick={() => navigate(item.url)}>
                                    <div className="link-item" >
                                        <li className="menu-item side">
                                            <div className={`menu-icon ${window.location.pathname === item.url ? "active" : ""}`}>
                                                <i className={`fa-sharp fa-solid ${item.icon}`}></i>
                                            </div>
                                            <h5>{item.title}</h5>
                                        </li>
                                    </div>
                                </div>}
                            </div>
                        )
                    }
                    else {
                        return (<div className="menu-item-container " key={index} onClick={() => navigate(item.url)}>
                            <div className="link-item" >
                                <li className="menu-item">
                                    <div className={`menu-icon ${window.location.pathname === item.url ? "active" : ""}`}>
                                        <i className={`fa-sharp fa-solid ${item.icon}`}></i>
                                    </div>
                                    <h5>{item.title}</h5>
                                </li>
                            </div>
                        </div>)
                    }
                }
                )
            }
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


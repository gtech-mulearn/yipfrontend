import YIPlogo from '../../../../assets/logo.webp'
import { useNavigate } from "react-router-dom"
import { buttons, managementButtons, urlProps } from '../../utils/navbarUtils'
import './LeftDrawer.scss'
import React, { useContext, useEffect } from 'react'
import { fetchUserInfo } from '../api'
import { Grid } from "react-loader-spinner";
import { GlobalContext } from '../../../../utils/GlobalVariable'

export const LeftDrawer = () => {
    const { userInfo } = useContext(GlobalContext)

    const navigate = useNavigate();
    const [newButton, setNewButton] = React.useState(buttons)
    const [management, setManagement] = React.useState<urlProps[]>(managementButtons)
    const [open, setOpen] = React.useState(false)
    const [selection, setSelection] = React.useState(managementButtons[0].url)
    useEffect(() => {
        filterBtns(userInfo, setNewButton, buttons)
        filterBtns(userInfo, setManagement, managementButtons)
    }, [userInfo])
    const handleScrollClick = (url: string) => {
        window.open(url, '_blank'); // Opens a new tab or window
    };
    return (
        <div className="left-menu">
            <img src={YIPlogo} alt="logo" />



            {
                newButton.map((item: urlProps, index: number) =>

                (<div className="menu-item-container " key={index} onClick={() => {
                    navigate(item.url)
                    setOpen(false)
                }}
                    onAuxClick={() => handleScrollClick(item.url)}
                >
                    <div className="link-item" >
                        <li className="menu-item">
                            <div className={`menu-icon ${window.location.pathname === item.url ? "active" : ""}`}>
                                <i className={`fa-sharp fa-solid ${item.icon}`}></i>
                            </div>
                            <h5>{item.title}</h5>
                        </li>
                    </div>
                </div>)
                )
            }
            {management.length > 0 &&
                <div className="menu-items" >
                    <div className="menu-item-container " onClick={() => {
                        navigate(selection); setOpen((prev: boolean) => !prev)

                    }}
                        onAuxClick={() => handleScrollClick(selection)}
                    >
                        <div className="link-item" >
                            <li className="menu-item">
                                <div className={`menu-icon ${checkIfSelected(management) ? "active" : ""}`}>
                                    <i className={`fa-sharp fa-solid fa-cogs`}></i>
                                </div>
                                <h5>{' Management'}</h5>
                            </li>
                        </div>
                    </div>
                    {open &&
                        management.map((item: urlProps, index: number) => (
                            <div className="menu-item-container " key={index} onClick={() => {
                                setSelection(item.url)
                                navigate(item.url)
                            }}
                                onAuxClick={() => handleScrollClick(item.url)}
                            >
                                <div className="link-item" >
                                    <li className="menu-item side">
                                        <div className={`menu-icon ${window.location.pathname === item.url ? "active" : ""}`}>
                                            <i className={`fa-sharp fa-solid ${item.icon}`}></i>
                                        </div>
                                        <h5>{item.title}</h5>
                                    </li>
                                </div>
                            </div>
                        ))
                    }
                </div>
            }
            <button
                className="logout"
                onClick={() => {
                    localStorage.clear();
                    sessionStorage.clear();
                    window.location.href = "/"
                }}
            >
                Logout
            </button>
        </div>
    )
}

export function filterBtns(userInfo: { role: string }, setNewButton: React.Dispatch<React.SetStateAction<urlProps[]>>, buttons: urlProps[]) {

    const filteredButtons = buttons.filter((item: urlProps) => {
        if (item && item.roles && item.roles.includes(userInfo.role)) {
            return item
        }
    })
    setNewButton(filteredButtons)
}
export function checkIfSelected(buttons: urlProps[]) {
    for (let i = 0; i < buttons.length; i++) {
        if (window.location.pathname === buttons[i].url) {
            return true
        }
    }
    return false
}
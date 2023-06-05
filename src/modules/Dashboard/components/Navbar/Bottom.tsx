import { buttons, urlProps, getCurrentPageTitle } from "../../utils/navbarUtils"
import { useNavigate } from "react-router-dom"
import './BottomTab.scss'
import React, { useEffect } from "react";
import { fetchUserInfo } from "../api";



export const BottomTab = () => {
    /**
     * Renders a bottom tab component.
     * @return {JSX.Element} The bottom tab component.
     */
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
        <div className="bottom-tab-container">
            <div className="tab-nav">
                {/* Renders the title of the current page */}

                <div className="tab-nav-container">
                    <div className="tab-adjust-container">
                        {/* Renders navigation links */}
                        {newButton.map((button: urlProps, index: number) => {
                            if (button.title === 'Users' || button.title === 'Legislative Assembly' || button.title === 'Block') {
                                return (
                                    <>
                                        {button.title === 'Users' && <div key={index} onClick={() => setOpen((prev: boolean) => !prev)} >
                                            <div
                                                className={`tab ${window.location.pathname === '/user'

                                                    || window.location.pathname === '/legislative-assembly' || window.location.pathname === '/block'
                                                    ? "active" : ""}`}
                                            >
                                                <i className={`fa-sharp fa-solid ${button.icon}`}></i>
                                                <h3 className={`tab-text ${window.location.pathname === '/user'

                                                    || window.location.pathname === '/legislative-assembly' || window.location.pathname === '/block'
                                                    ? "visible" : ""}`} >
                                                    Admin Management
                                                </h3>
                                            </div>
                                        </div>}
                                        {open && <div key={index} onClick={() => navigate(button.url)} >
                                            <div
                                                className={`tab ${window.location.pathname === button.url ? "active" : ""} `}
                                            >
                                                <i className={`fa-sharp fa-solid ${button.icon}`}></i>
                                                <h3 className={`tab-text ${window.location.pathname === button.url ? "visible " : ""}`} >
                                                    {button.title}
                                                </h3>
                                            </div>
                                        </div>}
                                    </>
                                )
                            }
                            else {
                                return (
                                    <div key={index} onClick={() => navigate(button.url)} >
                                        <div
                                            className={`tab ${window.location.pathname === button.url ? "active" : ""} `}
                                        >
                                            <i className={`fa-sharp fa-solid ${button.icon}`}></i>
                                            <h3 className={`tab-text ${window.location.pathname === button.url ? "visible " : ""}`} >
                                                {button.title}
                                            </h3>
                                        </div>
                                    </div>
                                )
                            }
                        }

                            // (
                            //     <div key={index} onClick={() => navigate(button.url)} >
                            //         <div
                            //             className={`tab ${window.location.pathname === button.url ? "active" : ""} `}
                            //         >
                            //             <i className={`fa-sharp fa-solid ${button.icon}`}></i>
                            //             <h3 className={`tab-text ${window.location.pathname === button.url ? "visible " : ""}`} >
                            //                 {button.title}
                            //             </h3>
                            //         </div>
                            //     </div>
                            // )
                        )}
                        {/* Renders logout button */}
                        <div className="tab">
                            <a
                                href="/"
                                className="fa-solid fa-right-from-bracket"
                                onClick={() => {
                                    localStorage.removeItem("accessToken")
                                    window.location.href = "/"
                                }}
                            ></a>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

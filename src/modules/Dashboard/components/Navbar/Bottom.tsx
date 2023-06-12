import { buttons, urlProps, getCurrentPageTitle, managementButtons } from "../../utils/navbarUtils"
import { useNavigate } from "react-router-dom"
import './BottomTab.scss'
import React, { useContext, useEffect } from "react";
import { fetchUserInfo } from "../api";
import { checkIfSelected, filterBtns } from "./LeftDrawer";
import { ThreeDots } from "react-loader-spinner";
import { GlobalContext } from "../../../../utils/GlobalVariable";



export const BottomTab = () => {
    /**
     * Renders a bottom tab component.
     * @return {JSX.Element} The bottom tab component.
     */
    const { userInfo } = useContext(GlobalContext)

    const navigate = useNavigate();
    const [newButton, setNewButton] = React.useState(buttons)
    const [management, setManagement] = React.useState(managementButtons)
    const [open, setOpen] = React.useState(false)
    const [selection, setSelection] = React.useState((managementButtons[0].url))
    useEffect(() => {
        filterBtns(userInfo, setNewButton, buttons)
        filterBtns(userInfo, setManagement, managementButtons)
    }, [userInfo])

    return (
        <div className="bottom-tab-container">
            <div className="tab-nav">
                {/* Renders the title of the current page */}

                <div className="tab-nav-container">
                    <div className="tab-adjust-container">
                        {/* Renders navigation links */}
                        <ThreeDots
                            height="50"
                            width="50"
                            radius="9"
                            color="#59b3fa"
                            ariaLabel="three-dots-loading"
                            wrapperStyle={{}}
                            visible={newButton.length === 0}
                        />
                        {newButton.map((button: urlProps, index: number) => {


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
                        )}
                        {
                            management.length > 0 &&
                            <>
                                {
                                    <div onClick={() => {
                                        setOpen(!open)
                                        navigate(selection)
                                    }} >
                                        <div
                                            className={`tab ${checkIfSelected(management) ? "active" : ""} `}
                                        >
                                            <i className={`fa-sharp fa-solid fa-cogs`}></i>
                                        </div>
                                    </div>
                                }
                                {open &&
                                    management.map((button: urlProps, index: number) => (
                                        <div key={index} onClick={() => {
                                            setSelection(button.url)
                                            navigate(button.url)
                                        }} >
                                            <div
                                                className={`tab ${window.location.pathname === button.url ? "active" : ""} `}
                                            >
                                                <i className={`fa-sharp fa-solid ${button.icon}`}></i>
                                                <h3 className={`tab-text ${window.location.pathname === button.url ? "visible " : ""}`} >
                                                    {button.title}
                                                </h3>
                                            </div>
                                        </div>
                                    ))
                                }
                            </>
                        }
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

import React, { useContext } from "react"
import "./LeftDrawer.scss"
import YIPlogo from "../../assets/logo.png"
import { useState } from "react"
import { Link } from "react-router-dom"
import './BottomTab.scss'
import { getCurrentPageUtils, link, urlProps } from "../../utils/utils"
export const LeftDrawer = () => {
    return (
        <div className="left-menu">
            <img src={YIPlogo} alt="logo" />
            <div className="menu-items">
                {
                    link.map((item: urlProps, index: number) =>
                        <div className="menu-item-container " key={index}>
                            <Link className="link-item" to={item.path}>
                                <li className="menu-item">
                                    <div className={`menu-icon ${getCurrentPageUtils().content === item.content ? "active" : ""}`}>
                                        <i className={`fa-sharp fa-solid ${item.icon}`}></i>
                                    </div>
                                    <h5>{item.content}</h5>
                                </li>
                            </Link>
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

export const BottomTab = () => {
    return (
        <div className="bottom-tab-container">
            <div className="tab-nav">
                <div className="tab-nav-container visible-mob">
                    {getCurrentPageUtils().content}
                </div>
                <div className="tab-nav-container">
                    {link.map((item: urlProps, index) =>
                        <Link to={item.path} key={index}>
                            <div
                                className={`tab ${getCurrentPageUtils().content === item.content ? "active" : ""} `}
                            >
                                <i className={`fa-sharp fa-solid ${item.icon}`}></i>
                                <h3 className={`tab-text ${getCurrentPageUtils().content === item.content ? "visible " : ""}`} >{item.content}</h3>
                            </div>
                        </Link>
                    )
                    }
                    <div className="tab red">
                        <a href="/" className="fa-solid fa-right-from-bracket" onClick={() => {
                            localStorage.removeItem('accessToken')
                            window.location.href = "/"
                        }}></a>
                        <p>Logout</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
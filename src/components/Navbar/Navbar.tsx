import React, { useContext } from "react"
import "./LeftDrawer.scss"
import YIPlogo from "../../assets/logo.png"
import { useState } from "react"
import { Link } from "react-router-dom"
import { link, urlProps } from "../../service/RouteLink"
import { handleItemClick, removeAccesstoken } from "../../service/navbarSevice"
import './BottomTab.scss'
import { DashboardContext } from "../../utils/DashboardContext"
import { getCurrentPageUtils } from "../../utils/utils"
export const LeftDrawer = () => {
  const { setCurrentOption, currentOption } = useContext(DashboardContext)
  const [activeItem, setActiveItem] = useState(currentOption)
  return (
    <div className="left-menu">
      <img src={YIPlogo} alt="logo" />
      <div className="menu-items">
        {
          link.map((item: urlProps, index: number) =>
            <div className="menu-item-container " key={index}
              onClick={() => handleItemClick(item.content, setActiveItem, setCurrentOption)}>
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
        onClick={removeAccesstoken}
      >
        Logout
      </button>
    </div>
  )
}

export const BottomTab = () => {
  const { setCurrentOption, currentOption } = useContext(DashboardContext)
  const [activeItem, setActiveItem] = useState(currentOption)
  return (
    <div className="bottom-tab-container">
      <div className="tab-nav">
        <div className="tab-nav-container">
          {link.map((item: urlProps, index) =>
            <Link to={item.path} key={index}>
              <div
                className={`tab ${getCurrentPageUtils().content === item.content ? "active" : ""} `}
                onClick={() => handleItemClick(item.content, setActiveItem, setCurrentOption)}>
                <i className={`fa-sharp fa-solid ${item.icon}`}></i>
                <h3 className={`tab-text ${getCurrentPageUtils().content === item.content ? "visible" : ""}`} >{item.content}</h3>
              </div>
            </Link>
          )
          }
          <div className="tab red">
            <a href="/" className="fa-solid fa-right-from-bracket" onClick={removeAccesstoken}></a>
            <p>Logout</p>
          </div>
        </div>
      </div>
    </div>
  )
}
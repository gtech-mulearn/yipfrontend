import React, { useContext } from "react"
import "./LeftDrawer.scss"
import YIPlogo from "../../assets/logo.png"
import { useState } from "react"
import { Link } from "react-router-dom"
import { handleItemClick, navMenu, navMenuProps, removeAccesstoken, drawerProps } from "../../service/navbarSevice"
import './BottomTab.scss'
import { DashboardContext } from "../../utils/DashboardContext"
export const LeftDrawer = () => {
  const { setCurrentOption, currentOption } = useContext(DashboardContext)
  const [activeItem, setActiveItem] = useState(currentOption)
  return (
    <div className="left-menu">
      <img src={YIPlogo} alt="logo" />
      <div className="menu-items">
        {
          navMenu.map((item: navMenuProps, index: number) =>
            <div className="menu-item-container " key={index}
              onClick={() => handleItemClick(item.name, setActiveItem, setCurrentOption)}>
              <Link className="link-item" to={item.link}>
                <li className="menu-item">
                  <div className={`menu-icon ${activeItem === item.name ? "active" : ""}`}>
                    <i className={`fa-sharp fa-solid ${item.icon}`}></i>
                  </div>
                  <h5>{item.name}</h5>
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
          {navMenu.map((item: navMenuProps, index) =>
            <Link to={item.link} key={index}>
              <div
                className={`tab ${activeItem === item.name ? "active" : ""} `}
                onClick={() => handleItemClick(item.name, setActiveItem, setCurrentOption)}>
                <i className={`fa-sharp fa-solid ${item.icon}`}></i>
                <h3 className={`tab-text ${activeItem === item.name ? "visible" : ""}`} >{item.name}</h3>
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
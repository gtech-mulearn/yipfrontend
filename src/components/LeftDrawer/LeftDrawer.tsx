import React from "react"
import "./LeftDrawer.scss"
import YIPlogo from "../../assets/logo.png"
import { useState } from "react"
import { Link } from "react-router-dom"

interface MenuItemProps {
  item_icon: string
  item_name: string
  onItemClick: () => void
  isActive: boolean
}

interface LeftDrawerProps {
  onValueChange: (value: string) => void
}

const LeftDrawer: React.FC<LeftDrawerProps> = ({ onValueChange }) => {
  const [activeItem, setActiveItem] = useState("Model School")

  const handleItemClick = (itemName: string) => {
    setActiveItem(itemName)
    onValueChange(itemName)
  }

  return (
    <div className="left-menu">
      <img src={YIPlogo} alt="logo" />
      <div className="menu-items">
        {/* <MenuItem
          item_icon="fa-solid fa-user"
          item_name="Users"
          onItemClick={() => handleItemClick("Users")}
          isActive={activeItem === "Users"}
        /> */}
        <MenuItem
          item_icon="fa-sharp fa-solid fa-school"
          item_name="Model School"
          onItemClick={() => handleItemClick("Model School")}
          isActive={activeItem === "Model School"}
        />
        <MenuItem
          item_icon="fa-solid fa-people-group"
          item_name="YIP Club"
          onItemClick={() => handleItemClick("YIP Club")}
          isActive={activeItem === "YIP Club"}
        />
        {/* <MenuItem
          item_icon="fa-solid fa-people-group"
          item_name="Block Management"
          onItemClick={() => handleItemClick("Block")}
          isActive={activeItem === "Block"}
        />
        <MenuItem
          item_icon="fa-solid fa-people-group"
          item_name="Legislative Assembly Management"
          onItemClick={() => handleItemClick("Legislative Assembly")}
          isActive={activeItem === "Legislative Assembly"}
        /> */}
      </div>
      {/* <a className="logout" href="/yip/"> */}
      <button
        className="logout"
        onClick={() => {
          localStorage.removeItem("accessToken")
          window.location.href = "/"
        }}
      >
        Logout
      </button>
      {/* <i className="fa-solid fa-right-from-bracket"></i> Logout</a> */}
    </div>
  )
}

const MenuItem: React.FC<MenuItemProps> = ({
  item_name,
  item_icon,
  onItemClick,
  isActive,
}) => {
  let linkitem: string = ""
  if (item_name == "Model School") {
    linkitem = "/school-dashboard"
  } else if (item_name == "YIP Club") {
    linkitem = "/club-dashboard"
  }
  // }else if(item_name == 'Users'){
  //     linkitem = '/yip/user'
  // }else if (item_name == "Block Management"){
  //     linkitem = '/yip/block-management'
  // }else if (item_name == "Legislative Assembly Management"){
  //     linkitem = '/yip/legislative-assembly-management'
  // }
  return (
    <div className="menu-item-container" onClick={onItemClick}>
      <Link className="link-item" to={linkitem}>
        <li className="menu-item">
          <div className={`menu-icon ${isActive ? "active" : ""}`}>
            <i className={item_icon}></i>
          </div>
          <h5>{item_name}</h5>
        </li>
      </Link>
    </div>
  )
}

export default LeftDrawer

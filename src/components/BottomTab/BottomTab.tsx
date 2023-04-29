import React, { useState } from 'react'
import './BottomTab.scss'
import { Link } from 'react-router-dom'
import yip from '../../service/dataHandler'
interface BottomDrawerProps {
    onValueChange: (value: string) => void
    currentOption: string
}

const BottomTab: React.FC<BottomDrawerProps> = ({ onValueChange, currentOption }) => {
    const [activeItem, setActiveItem] = useState(currentOption)

    const handleItemClick = (itemName: string) => {
        setActiveItem(itemName)
        onValueChange(itemName)
    }
    return (
        <div className="tab-nav">
            <div className="tab-nav-container">
                <Link to='/school-dashboard'>
                    <div
                        className={`tab ${activeItem === "Model School" ? "active" : ""} `}
                        onClick={() => { handleItemClick('Model School') }}
                    >
                        <i className="fa-sharp fa-solid fa-school"></i>
                        <h3 className={`tab-text ${activeItem === "Model School" ? "visible" : ""}`} >Model School</h3>
                    </div>
                </Link>
                <Link to={'/club-dashboard'}>
                    <div
                        className={`tab ${activeItem === "YIP Club" ? "active" : ""} `}
                        onClick={() => { handleItemClick('YIP Club') }}
                    >
                        <i className="fa-solid fa-people-group"></i>
                        <h3 className={`tab-text ${activeItem === "YIP Club" ? "visible" : ""}`} >YIP Club</h3>
                    </div>
                </Link>
                <div className="tab red">
                    <a href="/" className="fa-solid fa-right-from-bracket" onClick={() => {
                        localStorage.removeItem("accessToken")
                    }}></a>
                    <p>Logout</p>
                </div>
            </div>
        </div>
    )
}

export default BottomTab

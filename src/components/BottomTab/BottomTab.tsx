import React, { useState } from 'react'
import './BottomTab.scss'
import { Link } from 'react-router-dom'

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
                {/* <Link to={'/yip/user'}>
                    <div 
                        className={`tab ${activeItem === "User" ? "active" : ""} `}
                        onClick = {()=>{handleItemClick('User')}}
                    >
                        <i className="fa-solid fa-user"></i>
                        <h3 className={`tab-text ${activeItem === "User" ? "visible" : ""}`} >User</h3>
                    </div>
                </Link> */}
                <Link to=''>
                    <div
                        className={`tab ${activeItem === "Model School" ? "active" : ""} `}
                        onClick={() => { handleItemClick('Model School') }}
                    >
                        <i className="fa-sharp fa-solid fa-school"></i>
                        <h3 className={`tab-text ${activeItem === "Model School" ? "visible" : ""}`} >Model School</h3>
                    </div>
                </Link>
                <Link to={''}>
                    <div
                        className={`tab ${activeItem === "YIP Club" ? "active" : ""} `}
                        onClick={() => { handleItemClick('YIP Club') }}
                    >
                        <i className="fa-solid fa-people-group"></i>
                        <h3 className={`tab-text ${activeItem === "YIP Club" ? "visible" : ""}`} >YIP Club</h3>
                    </div>
                </Link>
                {/* <Link to={'/yip/block-management'}>
                    <div 
                        className={`tab ${activeItem === "Block Management" ? "active" : ""} `}
                        onClick = {()=>{handleItemClick('Block')}}
                    >
                        <i className="fa-solid fa-people-group"></i>
                        <h3 className={`tab-text ${activeItem === "Block" ? "visible" : ""}`} >Block</h3>
                    </div>
                </Link> */}
                <div className="tab red">
                    <a href="/" className="fa-solid fa-right-from-bracket"></a>
                    <p>Logout</p>
                </div>
            </div>
        </div>
    )
}

export default BottomTab

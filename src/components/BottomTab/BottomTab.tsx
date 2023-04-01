import React from 'react'
import './BottomTab.css'

const BottomTab = () => {
    return (
        <div className="tab-nav">
            <div className="tab-nav-container">
                <div className="tab blue">
                    <i className="fa-solid fa-people-group"></i>
                    <p>Club</p>
                </div>
                <div className="tab blue">
                    <i className="fa-sharp fa-solid fa-school"></i>
                    <p>School</p>
                </div>
                <div className="tab red blue">
                    <a href="/logout" className="fa-solid fa-right-from-bracket"></a>
                    <p>Logout</p>
                </div>
            </div>
        </div>
    )
}

export default BottomTab

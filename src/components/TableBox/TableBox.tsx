import React from 'react'
import './TableBox.css'

const TableBox = () => {
    return (
        <div className='white-container'>
            <h3>Table List</h3> 
            <div id="table-container" className="table-container">
                <div className="table-list">
                    <div className="table-title">
                        <ul>
                            <li className="title">SL</li>
                            <li className="title">Center</li>
                            <li className="title">Region</li>
                            <li className="title">City</li>
                            <li className="title">Status</li>
                        </ul>
                    </div>
                    <div className="table-content">
                        <ul id="clubs_listed">
                            <li className="value">1</li>
                            <li id="club_id" className="value" value="{{club.id}}">Hello</li>
                            <li className="value" value="{{club.district.id}}">Kozhikode</li>
                            <li className="value">City</li>
                            <li className="value editable">
                                <a className="table-btn completed" href="#">Edit</a>
                                <a id="edit">
                                    <i className="fa-solid fa-pen-to-square"></i>Edit</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TableBox

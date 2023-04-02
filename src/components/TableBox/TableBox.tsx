import React from 'react'
import './TableBox.css'
import fakeData from './fakeData.json'

// interface Item {
//     place_name: string;
//     region: string;
//     city: string;
//     status: string;
// }

// interface ListProps {
//     fakeData: Item[]
// }


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
                            {
                                fakeData.map((item:any,i:number)=>{
                                    return(
                                        <>
                                            <ul id="clubs_listed">
                                                <li className="value">{i+1}</li>
                                                <li id="club_id" className="value" value="{{club.id}}">{item.place_name}</li>
                                                <li className="value" value="{{club.district.id}}">{item.region}</li>
                                                <li className="value">{item.city}</li>
                                                <li className="value editable">
                                                    <a className="table-btn completed" href="#">{item.status}</a>
                                                    <a id="edit">
                                                    <i className="fa-solid fa-pen-to-square"></i>Edit</a>
                                                </li>
                                            </ul>
                                        </>
                                    )
                                })
                            }
                            {/* <li className="value">1</li>
                            <li id="club_id" className="value" value="{{club.id}}">Hello</li>
                            <li className="value" value="{{club.district.id}}">Kozhikode</li>
                            <li className="value">City</li>
                            <li className="value editable">
                                <a className="table-btn completed" href="#">Edit</a>
                                <a id="edit">
                                    <i className="fa-solid fa-pen-to-square"></i>Edit</a>
                            </li> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TableBox

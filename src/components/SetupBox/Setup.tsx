import React from 'react'
import './Setup.css'
import setupImg from '../../assets/Kindergarten student-bro 1.png'

const Setup = ({activeItem}: {activeItem: string})=> {
  return (
      <div className="white-container">
                <h3>Setup a new {activeItem}</h3>
                <div className="setup-club">
                    <div className="setup-filter">
                        <div className="select-container club">
                            <div className="setup-item" id="district">
                                <p>District</p>
                                <select id="district_select">
                                    <option value="{{district.id}}">Select District</option>
                                </select>
                            </div>
                            <div className="setup-item hidden" id="panchayath">
                                <p>Panchayath</p>
                                <select id="panchayath_select">
                                    <option >Select Panchayath</option>
                                </select>
                            </div>

                            <div className="setup-item" id="college">
                                <p id="institute">College</p>
                                <select name="" id="college_school_select">
                                    <option value="">Select College</option>
                                </select>
                            </div>
                            <div className="setup-item">
                                <p>Status</p>
                                <select name="" id="status_select">
                                    <option value="">Select Status</option>
                                </select>
                            </div>
                            <button id="create_btn" className="black-btn" >Create</button>       
                        </div>
                    </div>
                    <div className="setup-img">
                            <img src={setupImg} alt="HI" />
                    </div>
                </div> 
            </div>
  )
}

export default Setup

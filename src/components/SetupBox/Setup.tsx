import React from 'react'
import './Setup.css'
import setupImg from '../../assets/Kindergarten student-bro 1.png'

const schoolItems = ['D1','D2','D3','D4']
const club = ['C1','C2','C3','C4','C5']

interface SelectItemProps{
    item: string 
}

const SelectItem: React.FC<SelectItemProps> = ({ item }) => {
    return (
        <div className="setup-item" id="district">
            <p>{item}</p>
            <select id="district_select">
                <option value="{{district.id}}">Select Value</option>
            </select>
        </div>
    );
};

const Setup = ({ activeItem }: { activeItem: string }) => {
    let itemsToRender: string[] = [];
    console.log("this is ",activeItem)
    if (activeItem === "Model School") {
        itemsToRender = schoolItems
    }else{
        itemsToRender = club
    }
    return (
        <div className="white-container">
            <h3>Setup a new {activeItem}</h3>
            <div className="setup-club">
                <div className="setup-filter">
                    <div className="select-container club">
                    {itemsToRender.map((school, i) => (
                            <SelectItem item={school} />
                        ))}
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

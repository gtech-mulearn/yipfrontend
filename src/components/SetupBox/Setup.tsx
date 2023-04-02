import React from 'react'
import Select from 'react-select';
import './Setup.css'
import setupImg from '../../assets/Kindergarten student-bro 1.png'

const schoolItems = ['D1','D2','D3','D4']
const club = ['C1','C2','C3','C4','C5']

interface SelectItemProps{
    item: string 
}

const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
    { value: 'option4', label: 'Option 4' },
    { value: 'option5', label: 'Option 5' },
  ];
  
const SelectItem: React.FC<SelectItemProps> = ({ item }) => {
    return (
      <div className="setup-item" id="district">
        <p>{item}</p>
        <Select
          options={options}
          isSearchable={true}
          isClearable={true}
          placeholder={`Select a ${item}`}
        />
      </div>
    );
  };

const Setup = ({ activeItem }: { activeItem: string }) => {
    let itemsToRender: string[] = [];
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
                            <SelectItem key={i} item={school} />
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

import React from 'react'
import './LeftDrawer.css'
import YIPlogo from '../../assets/logo.png'
import { useState } from 'react'

interface MenuItemProps{
    item_icon: string;
    item_name: string;
    onItemClick: () => void;
    isActive: boolean;
}

interface LeftDrawerProps {
    onValueChange: (value: string) => void;
  }

const LeftDrawer:React.FC<LeftDrawerProps> = ({onValueChange})=> {
    const [activeItem, setActiveItem] = useState('Model School')

    const handleItemClick = (itemName: string) => {
        setActiveItem(itemName);
        onValueChange(itemName)
      }

    return (
        <div className='left-menu'>
            <img src={YIPlogo} alt="logo" />
            <div className="menu-items">
                <MenuItem 
                    item_icon='fa-sharp fa-solid fa-school' 
                    item_name='Model School'
                    onItemClick={() => handleItemClick('Model School')}
                    isActive={activeItem === 'Model School'}
                />
                <MenuItem 
                    item_icon='fa-solid fa-people-group' 
                    item_name='YIP Club'
                    onItemClick={() => handleItemClick('YIP Club')}
                    isActive={activeItem === 'YIP Club'}
                />
            </div>
            <a className="logout" href="/logout">
                <i className="fa-solid fa-right-from-bracket"></i> Logout</a>
        </div>
    )
}

const MenuItem:React.FC<MenuItemProps> = ({item_name,item_icon,onItemClick,isActive}) => {
    return (
        <div className='menu-item-container' onClick={onItemClick}>
            <li className="menu-item">
                <div className={`menu-icon ${isActive ? 'active' : ''}`}>
                    <i className={item_icon}></i>
                </div>
                <a href="#">{item_name}</a>
            </li>
        </div>
    )
}

export default LeftDrawer

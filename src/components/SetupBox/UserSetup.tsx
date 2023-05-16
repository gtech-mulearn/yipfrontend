import React, { useState, useEffect, useContext } from 'react'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import Select from 'react-select';
import './Setup.scss'
import setupImg from '../../assets/Kindergarten student-bro 1.png'
import { addUser, getRoles } from '../../utils/utils';
import { DashboardContext } from '../../utils/DashboardContext';

const UserSetup = () => {
    const [roles, setRoles] = useState<string[]>([])

    useEffect(() => {
        getRoles(setRoles).then(() => console.log(roles))
    }, [])
    const { setUpdateData, setCreate } = useContext(DashboardContext)
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState<any>()
    const [role, setRole] = useState("")
    const [password, setPassword] = useState("")

    const sendData = (): any => {
        const postData: any = {
            name: username,
            email: email,
            phone: phone,
            role: role,
            password: password
        }
        addUser(postData).then(() => {
            setCreate((prev: boolean) => !prev)
            setUpdateData((prev: any) => !prev)
        })
    }

    return (
        <div className="white-container">
            <h3>Setup a new User</h3>
            <div className="setup-club">
                <div className="setup-filter">
                    <div className="select-container club">
                        <div className="setup-item" id="district">
                            <p>Name</p>
                            <input
                                type="text"
                                name="name"
                                placeholder='Type User Name'
                                id="username"
                                onChange={(e) => {
                                    setUsername(e.target.value)
                                }} />
                        </div>
                        <div className="setup-item" id="district">
                            <p>Email</p>
                            <input
                                type="email"
                                name="email"
                                placeholder='Type Email Address'
                                id="email"
                                onChange={(e) => {
                                    setEmail(e.target.value)
                                }} />
                        </div>
                        <div className="setup-item" id="district">
                            <p>Phone Number</p>
                            <PhoneInput
                                placeholder="Enter phone number"
                                defaultCountry='IN'
                                value={phone}
                                onChange={setPhone} />
                        </div>
                        <div className="setup-item" id="district">
                            <p>Role</p>
                            <Select
                                options={roles}
                                isSearchable={true}
                                isClearable={true}
                                placeholder={`Select a Role`}
                                getOptionValue={(option: any) => option.value}
                                getOptionLabel={(option: any) => option.label}
                                onChange={(data) => {
                                    setRole(data.label)
                                }}
                            />
                        </div>
                        <div className="setup-item" id="district">
                            <p>Password</p>
                            <input
                                type="password"
                                name="password"
                                placeholder='Type Password'
                                id="password"
                                onChange={(e) => {
                                    setPassword(e.target.value)
                                }} />
                        </div>
                        <button
                            id="create_btn"
                            className="black-btn"
                            onClick={() => {
                                sendData();
                            }} >Create</button>
                    </div>
                </div>
                <div className="setup-img">
                    <img src={setupImg} alt="HI" />
                </div>
            </div>
        </div>
    )
}

export default UserSetup

import React, { useState, useEffect } from 'react'
import Select from 'react-select';
import './Setup.scss'
import setupImg from '../../assets/Kindergarten student-bro 1.png'
const roles = [
    [
        "SA",
        "Super Admin"
    ],
    [
        "AD",
        "Admin"
    ],
    [
        "HQ",
        "Hq Staff"
    ],
]

// interface SelectItemProps {
//   item: string;
//   list: any;
// }

// interface DistrictProps {
//   id: string;
//   name: string;
// }

// interface CollegeProps {
//   id: string;
//   title: string;
// }

const UserSetup = () => {

    const [username, setUsername] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [phone, setPhone] = useState<any>()
    const [role, setRole] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const sendData = (): any => {
        const postData: any = {
            username: username,
            email: email,
            phone: phone,
            role: role,
            password: password
        }
        const postOptions = {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(postData)
        };

        const createData = async () => {
            try {
                console.log(postOptions)
                const response = await fetch(
                    `https://dev.mulearn.org/api/v1/yip/create-user/`, postOptions
                );
                const data = await response.json();
                console.log("user response : ", data)
            } catch (error) {
                console.error(error);
            }
        };
        createData();
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
                            {/* <input 
                            type='number' 
                            name="phone" 
                            placeholder='Type Phone Number' 
                            id="phone"
                            onChange={(e)=>{
                                setPhone(e.target.value)
                            }} /> */}
                            {/* <PhoneInput
                                placeholder="Enter phone number"
                                country="US"
                                value={phone}
                                onChange={setPhone} /> */}
                        </div>
                        <div className="setup-item" id="district">
                            <p>Role</p>
                            <Select
                                options={roles}
                                isSearchable={true}
                                isClearable={true}
                                placeholder={`Select a Role`}
                                getOptionValue={(option: any) => option[0]}
                                getOptionLabel={(option: any) => option[1]}
                                onChange={(data) => {
                                    setRole(data[0])
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

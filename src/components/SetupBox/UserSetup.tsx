import React, { useState, useEffect, useContext } from 'react'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import Select from 'react-select';
import './Setup.scss'
import setupImg from '../../assets/Kindergarten student-bro 1.png'
import { addUser, getRoles } from '../../utils/utils';
import { DashboardContext } from '../../utils/DashboardContext';
import { postDataUserProps } from '../../utils/utils';
import apiGateway from '../../service/apiGateway';

const UserSetup = () => {
    const [roles, setRoles] = useState<string[]>([])
    const [error, setError] = useState<string>("")
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        getRoles(setRoles)
    }, [])
    const { setUpdateData, setCreate } = useContext(DashboardContext)
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState<any>()
    const [role, setRole] = useState("")
    const [password, setPassword] = useState("")

    const sendData = (): any => {
        if (isEvaluated()) {
            const postData: any = {
                name: username,
                email: email,
                phone: phone,
                role: role,
                password: password
            }
            const addUser = async (postData: postDataUserProps) => {
                apiGateway.post('/api/v1/yip/create-user/', postData)
                    .then(() => {
                        setUsername("")
                        setEmail("")
                        setPhone("")
                        setRole("")
                        setPassword("")

                        setSuccess(true)
                    })
                    .catch((err) => setError(err.response.data.message.general))
            }
            addUser(postData)

        }
    }
    useEffect(() => {
        
            setError("")
       
    }, [error])
    useEffect(() => {
        
            setSuccess(false)
            setCreate((prev: boolean) => !prev)
            setUpdateData((prev: boolean) => !prev)
        
    }, [success])
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
                                    if (hasWhitespace(e.target.value))
                                        setError("Username cannot have whitespace")
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
                                isClearable={true}
                                isSearchable={false}
                                placeholder={`Select a Role`}
                                getOptionValue={(option: any) => option.value}
                                getOptionLabel={(option: any) => option.label}
                                onChange={(data) => {
                                    try {
                                        setRole(data.label)
                                    } catch (error) {
                                        setRole('')
                                    }
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
            {error && <p className="error">{error}</p>}
            {success && <p className="success">User Added Successfully</p>}
        </div>
    )
    function isEvaluated() {
        if (!username) {
            setError('Enter Username')
            return false
        }
        if (hasWhitespace(username)) {
            setError('Username cannot have whitespace')
            return false
        }
        if (!email) {
            setError('Enter Email')
            return false
        }
        if (!phone) {
            setError('Enter Phone Number')
            return false
        }
        if (!role) {

            setError('Select a Role')
            return false
        }
        if (!password) {
            setError('Enter Password')
            return false
        }
        return true
    }
    function hasWhitespace(text: string): boolean {
        const whitespaceRegex = /\s/;
        return whitespaceRegex.test(text);
    }

}

export default UserSetup

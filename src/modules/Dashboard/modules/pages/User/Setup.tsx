import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import setupImg from '../../../../../assets/Kindergarten student-bro 1.png'
import { CustomInput } from '../../../components/CustomInput/CustomInput'
import { CustomSelect } from '../../../components/CustomSelect/CustomSelect'
import { privateGateway } from '../../../../../services/apiGateway'
import { setupRoutes } from '../../../../../services/urls'
import '../../components/Setup.scss'
interface roleProps {
    id: string
    name: string
}
const Setup: FC<{ title: string }> = ({ title }) => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState<string>('')
    const [password, setPassword] = useState("")
    const [role, setRole] = useState({ id: '', name: '' })
    const [roleList, setRoleList] = useState<roleProps[]>([])
    const reset = () => {
        setName("")
        setEmail("")
        setPhone("")
        setPassword("")
        setRole({ id: '', name: '' })
    }
    useEffect(() => {
        fetchUserRoles(setRoleList)
    }, [])
    function handleCreate() {
        createUser(name, email, phone, role.id, password)
    }
    return (
        <div className="white-container">
            <h3>Setup a new {title}</h3>
            <div className="setup-club">
                <div className="setup-filter">
                    <div className="select-container club">
                        <CustomInput value="Username" setData={setName} data={name} />
                        <CustomInput value="Email" setData={setEmail} data={email} />
                        <CustomInput value="Mobile number" setData={setPhone} data={phone} />
                        <CustomSelect
                            option={roleList}
                            value="Role"
                            setData={setRole}
                        />
                        <CustomInput value="Password" setData={setPassword} data={password} />
                        <div className="create-btn-container">
                            <button className="black-btn"
                                onClick={handleCreate}>Create</button>
                            <button className="black-btn"
                                onClick={reset}
                            >Cancel</button>
                        </div>
                    </div>
                </div>
                <div className="setup-img">
                    <img src={setupImg} alt="HI" />
                </div>
            </div>
        </div>
    )
}
function fetchUserRoles(setData: Dispatch<SetStateAction<roleProps[]>>) {
    privateGateway.get(setupRoutes.userSetup)
        .then(res => res.data.response.club_status)
        .then(data => {
            setData(data.map((value: string, index: number) =>
                ({ id: index.toString(), name: value })
            ))
        })
        .catch(err => console.log(err))
}
function createUser(
    name: string,
    email: string,
    phone: string,
    role: string,
    password: string
) {
    const postData = {
        name: name,
        email: email,
        phone: phone,
        role: role,
        password: password
    }
    privateGateway.post(setupRoutes.userCreate, postData)
        .then(res => console.log(res.data.response))
        .catch(err => console.log(err.response))
}

export default Setup 
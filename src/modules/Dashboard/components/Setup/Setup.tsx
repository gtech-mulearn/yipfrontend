import { useEffect, useState, memo } from "react"
import setupImg from '../../assets/Kindergarten student-bro 1.png'
import { dummy, dummyProps } from "../../utils/setupUtils"
import './Setup.scss'
import { buttons, urlProps } from "../../utils/navbarUtils"
import { CustomInput } from "../CustomInput/CustomInput"
import { CustomSelect, intialState } from "../CustomSelect/CustomSelect"

const currentPage = (): urlProps => {
    for (let i in buttons) {
        if (window.location.pathname === buttons[i].url) {
            return buttons[i]
        }
    }
    return {} as urlProps
}

const Setup = () => {
    return (
        <div className="white-container">
            <h3>Setup a new {currentPage().title}</h3>
            <div className="setup-club">
                <div className="setup-filter">
                    <div className="select-container club">
                        <SetupSelector content={currentPage().title} />
                    </div>
                </div>
                <div className="setup-img">
                    <img src={setupImg} alt="HI" />
                </div>
            </div>
        </div>
    )
}



const SetupSelector: React.FC<{ content: string }> = ({ content }) => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState<string>('')
    const [password, setPassword] = useState("")
    const [districtList, setDistrictList] = useState(intialState)
    const [schoolList, setSchoolList] = useState<dummyProps>(intialState)
    const [assemblyList, setAssemblyList] = useState<dummyProps>(intialState)
    const [blockList, setBlockList] = useState<dummyProps>(intialState)
    const reset = () => {
        setName("")
        setEmail("")
        setPhone("")
        setPassword("")
        setDistrictList(intialState)
        setSchoolList(intialState)
        setAssemblyList(intialState)
        setBlockList(intialState)
    }
    useEffect(() => {
        reset()
    }, [content])
    return (<>
        {
            content === 'Users' && <>
                <CustomInput value="Username" setData={setName} data={name} />
                <CustomInput value="Email" setData={setEmail} data={email} />
                <CustomInput value="Mobile number" setData={setPhone} data={phone} />
                <CustomSelect option={dummy} value="Role" setData={setDistrictList} />
                <CustomInput value="Password" setData={setPassword} data={password} />
            </>
        }
        {
            (content === 'YIP Club' || content === 'Model School') &&
            <>
                <CustomSelect option={dummy} value="District" setData={setDistrictList} />
                {districtList.id &&
                    <>
                        {
                            content === 'Model School' &&
                            <>
                                <CustomSelect option={dummy} value="Legislative Assembly" setData={setAssemblyList} />
                                <CustomSelect option={dummy} value="Block" setData={setBlockList} />
                            </>
                        }
                        <CustomSelect option={dummy} value="School" setData={setSchoolList} />
                    </>
                }
            </>
        }
        {
            (content === 'Block' || content === 'Legislative Assembly') &&
            <>
                <CustomInput value={`${content} Name`} setData={setName} data={name} />
                <CustomSelect option={dummy} value="District" setData={setDistrictList} />
            </>
        }
        <div className="create-btn-container">
            <button className="black-btn"
                onClick={() => { }}>Create</button>
            <button className="black-btn"
                onClick={reset}
            >Cancel</button>
        </div>
    </>)
}
export default Setup


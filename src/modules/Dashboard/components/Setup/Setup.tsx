import { useEffect, useState, memo } from "react"
import setupImg from '../../assets/Kindergarten student-bro 1.png'
import { dummy, dummyProps } from "../../utils/setupUtils"
import './Setup.scss'
import { buttons, urlProps } from "../../utils/navbarUtils"
import { CustomInput } from "../CustomInput/CustomInput"
import { CustomSelect, intialState } from "../CustomSelect/CustomSelect"
import { Buttons } from "./componets/Buttons"

const currentPage = (): urlProps => {
    for (let i in buttons) {
        if (window.location.pathname === buttons[i].url) {
            return buttons[i]
        }
    }
    return {} as urlProps
}
const Setup = memo(() => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState<string>('')
    const [password, setPassword] = useState("")
    const [districtList, setDistrictList] = useState(intialState)
    const [schoolList, setSchoolList] = useState<dummyProps>(intialState)
    const [assemblyList, setAssemblyList] = useState<dummyProps>(intialState)
    const [blockList, setBlockList] = useState<dummyProps>(intialState)
    const resetState = () => {
        setName("");
        setEmail("");
        setPhone("");
        setPassword("");
        setDistrictList(intialState);
        setSchoolList(intialState);
        setAssemblyList(intialState);
        setBlockList(intialState);
    };
    useEffect(() => {
        resetState()
    }, [currentPage().title])
    return (
        <div className="white-container">
            <h3>Setup a new {currentPage().title}</h3>
            <div className="setup-club">
                <div className="setup-filter">
                    <div className="select-container club">
                        <Buttons create={() => { }} cancel={resetState} />
                    </div>
                </div>
                <div className="setup-img">
                    <img src={setupImg} alt="HI" />
                </div>

            </div>
        </div>
    )
})
export default Setup


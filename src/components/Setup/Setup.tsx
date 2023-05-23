import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { getCurrentPageUtils } from "../../utils/utils"
import Select from 'react-select'
import setupImg from '../../assets/High School-amico.png'
export interface dummyProps {
    id: string
    name: string
}
export const dummy: dummyProps[] = [
    { id: "1", name: 'Dummy1' },
    { id: "2", name: 'Dummy i need a long long and long' },
    { id: "3", name: 'Dummy3' },
    { id: "4", name: 'Dummy4' },
    { id: "5", name: 'Dummy5' },

]
import './Setup.scss'

const Setup = () => {
    return (
        <div className="white-container">
            <h3>Setup a new {getCurrentPageUtils().content}</h3>
            <div className="setup-club">
                <div className="setup-filter">
                    <div className="select-container club">
                        <All content={getCurrentPageUtils().content} />
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

function Buttons() {
    return (
        <div className="create_btn_cntr">
            <button className="black-btn" >Create</button >
            <button className="black-btn" >Cancel</button>
        </div>
    )
}
export function NewSelect({ option, value, setData = () => { setData(intialState) }, setValue = () => { setValue('All') }, requiredHeader = true, requiredLabel = false }: newSelectProps) {
    return (
        <div className="setup-item">
            {requiredHeader && <p>{value}</p>}
            <Select
                options={option}
                isSearchable={true}
                isClearable={true}
                placeholder={`Select a ${value}`}
                getOptionValue={(option: dummyProps) => option.id}
                getOptionLabel={(option: dummyProps) => option.name}
                onChange={(data) => {
                    if (requiredLabel) {
                        if (data === null) setValue('All')
                        else setValue(data.name)
                    }
                    else {
                        if (data === null) setData(intialState)
                        else setData(data)
                    }
                }}
            />
        </div>
    )
}
interface newInputProps {
    value: string
    setData: Dispatch<SetStateAction<string>>
}
function NewInput({ value, setData }: newInputProps) {
    return (
        <div className="setup-item" >
            <p>{value}</p>
            <input
                type="text"
                name="name"
                placeholder={`Enter ${value}`}
                id="username"
                onChange={(e) => { setData(e.target.value) }} />
        </div>
    )
}
interface newSelectProps {
    option: dummyProps[]
    value: string
    setData?: Dispatch<SetStateAction<dummyProps>>
    setValue?: Dispatch<SetStateAction<string>>
    requiredHeader?: boolean
    requiredLabel?: boolean
}
export const intialState = { id: '', name: '' }


const All: React.FC<{ content: string }> = ({ content }) => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState<string>('')
    const [password, setPassword] = useState("")
    const [districtList, setDistrictList] = useState(intialState)
    const [schoolList, setSchoolList] = useState<dummyProps>(intialState)
    const [assemblyList, setAssemblyList] = useState<dummyProps>(intialState)
    const [blockList, setBlockList] = useState<dummyProps>(intialState)
    useEffect(() => {
        setName("")
        setEmail("")
        setPhone("")
        setPassword("")
        setDistrictList(intialState)
        setSchoolList(intialState)
        setAssemblyList(intialState)
        setBlockList(intialState)
    }, [content])
    return (<>
        {
            content === 'Users' && <>
                <NewInput value="Username" setData={setName} />
                <NewInput value="Email" setData={setEmail} />
                <NewInput value="Mobile number" setData={setPhone} />
                <NewSelect option={dummy} value="Role" setData={setDistrictList} />
                <NewInput value="Password" setData={setPassword} />
            </>
        }
        {
            (content === 'YIP Club' || content === 'Model School') &&
            <>
                <NewSelect option={dummy} value="District" setData={setDistrictList} />
                {districtList.id &&
                    <>
                        {
                            content === 'Model School' &&
                            <>
                                <NewSelect option={dummy} value="Legislative Assembly" setData={setAssemblyList} />
                                <NewSelect option={dummy} value="Block" setData={setBlockList} />
                            </>
                        }
                        <NewSelect option={dummy} value="School" setData={setSchoolList} />
                    </>
                }
            </>
        }
        {
            (content === 'Block' || content === 'Legislative Assembly') &&
            <>
                <NewInput value={`${content} Name`} setData={setName} />
                <NewSelect option={dummy} value="District" setData={setDistrictList} />
            </>
        }
        <Buttons />
    </>)
}
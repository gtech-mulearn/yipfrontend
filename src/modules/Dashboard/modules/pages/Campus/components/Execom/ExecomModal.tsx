import React, { useState } from 'react'
import { CustomInput } from '../../../../../components/CustomInput/CustomInput'
import { CustomSelect } from '../../../../../components/CustomSelect/CustomSelect'
import { selectProps } from '../../../../utils/setupUtils'
import { privateGateway } from '../../../../../../../services/apiGateway'

const ExecomModal = ({ cancel }: { cancel: () => void }) => {
    const [roleList, setRoleList] = useState<selectProps[]>([])
    const [role, setRole] = useState<selectProps>({} as selectProps)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [mobile, setMobile] = useState('')

    return (
        <div className='secondary-box'>
            <div className="data-box">
                <div className="content">
                    <CustomSelect
                        option={roleList}
                        header={'Designation'}
                        placeholder={'Select Designation'}
                        customCSS={{
                            className: "react-select-container",
                            classNamePrefix: "react-select"
                        }}
                        setData={setRole}
                    />
                </div>
            </div>
            <div className="data-box">
                <div className="content">
                    <CustomInput value={'Name'} data={name} setData={setName} customCSS={'setup-item'} />
                </div>
            </div>
            <div className="data-box">
                <div className="content">
                    <CustomInput value={'Email'} data={email} setData={setEmail} customCSS={'setup-item'} />
                </div>
            </div>
            <div className="data-box">
                <div className="content">
                    <CustomInput value={'Mobile Number'} data={mobile} setData={setMobile} customCSS={'setup-item'} />
                </div>
            </div>
            <div className='last-container'>
                <div className="modal-buttons">
                    <button className='btn-update ' onClick={() => { }}>Add Member</button>
                    <button className="cancel-btn " onClick={cancel}>Cancel</button>
                </div>
            </div>
        </div>
    )
}
function getExecomRoles(setData: React.Dispatch<React.SetStateAction<selectProps[]>>) {
    privateGateway.get(`/api/v1/yip/execom/roles`)
        .then((res) => {
            setData(res.data.response)
        })
        .catch((err) => {
            console.error(err)
        })
}
export default ExecomModal

import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { CustomSelect } from '../../../../../components/CustomSelect/CustomSelect'
import { privateGateway } from '../../../../../../../services/apiGateway'
import { selectProps } from '../../../../utils/setupUtils'
import { CustomInput } from '../../../../../components/CustomInput/CustomInput'
import '../CampusModal/CampusModal.scss'
const ConnectionModal = ({ cancel }: { cancel: () => void }) => {
    const [designationList, setDesignationList] = useState<selectProps[]>([])
    const [designation, setDesignation] = useState<selectProps>({} as selectProps)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [mobile, setMobile] = useState('')
    useEffect(() => {
        listpocchoices(setDesignationList)
    }, [])
    return (
        <div className='secondary-box'>
            <div className="data-box">
                <div className="content">
                    <CustomSelect
                        option={designationList}
                        header={'Designation'}
                        placeholder={'Select Designation'}
                        customCSS={{
                            className: "react-select-container",
                            classNamePrefix: "react-select"
                        }}
                        setData={setDesignation}
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
                    <button className='btn-update ' onClick={() => assignpoc(designation.name as string, name, email, mobile)}>Add Facilitator</button>
                    <button className="cancel-btn " onClick={cancel}>Cancel</button>
                </div>
            </div>
        </div>

    )
}
function listpocchoices(setDesignationList: Dispatch<SetStateAction<selectProps[]>>) {
    privateGateway.get('/api/v1/yip/list-poc-choices/')
        .then((res) => (res.data.response.poc_types))
        .then((data) =>
            setDesignationList(
                data.map((item: selectProps, index: string) => ({ id: index, name: item }))
            ))
}
function assignpoc(designation: string, name: string, email: string, mobile: string) {
    privateGateway.post('/api/v1/yip/assign-poc/', {
        type: designation,
        name: name,
        email: email,
        mobile: mobile
    }).then((res) => {
        console.log(res)
    }).catch((err) => {
        console.log(err)
    })
}
export default ConnectionModal
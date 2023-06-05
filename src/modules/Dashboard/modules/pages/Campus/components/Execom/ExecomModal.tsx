import React, { useEffect, useState } from 'react'
import { CustomInput } from '../../../../../components/CustomInput/CustomInput'
import { CustomSelect } from '../../../../../components/CustomSelect/CustomSelect'
import { selectProps } from '../../../../utils/setupUtils'
import { privateGateway } from '../../../../../../../services/apiGateway'
import { campusRoutes, tableRoutes } from '../../../../../../../services/urls'
import { errorCheck, errorMessage, success } from '../../../../../components/Toastify/ToastifyConsts'

const ExecomModal = ({ cancel, campusId }: { cancel: () => void, campusId: string }) => {
    const [roleList, setRoleList] = useState<selectProps[]>([])
    const [role, setRole] = useState<selectProps>({} as selectProps)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [mobile, setMobile] = useState('')
    useEffect(() => {
        getExecomRoles(setRoleList)
    }, [])
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
                    <button className='btn-update ' onClick={() => assignExecom(campusId, role.id, name, email, mobile, cancel)}>Add Member</button>
                    <button className="cancel-btn " onClick={cancel}>Cancel</button>
                </div>
            </div>
        </div>
    )
}
function getExecomRoles(setData: React.Dispatch<React.SetStateAction<selectProps[]>>) {
    privateGateway.get(campusRoutes.designation.list.execom)
        .then((res) => {
            setData(res.data.response.sub_user_roles.map((item: any) => {
                console.log(item)
                return {
                    name: item.label,
                    id: item.value
                }
            }))
        })
        .catch((err) => {
            console.error(err)
        })
}
export default ExecomModal
function assignExecom(id: string, designation: string, name: string, email: string, mobile: string, cancel: () => void) {
    const postData = {
        clubId: id,
        type: 'Execom',
        name: name,
        email: email,
        phone: mobile,
        role: designation,
    }
    console.log(postData)
    privateGateway.post(campusRoutes.subUser.create, postData).then((res) => {
        privateGateway.put(tableRoutes.status.update, { clubId: id, clubStatus: 'Execom Formed' })
            .then(res => {
                success();
            })
        console.log(res)
        cancel()
    }).catch((err) => {
        errorCheck(err.response)
        errorMessage(err.response)
    })
}
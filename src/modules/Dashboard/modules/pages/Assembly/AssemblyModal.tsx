import { AssemblyTableProps } from './AssemblyTable'
import { selectProps } from '../../utils/setupUtils'
import { Dispatch, FC, SetStateAction, useState } from 'react'
import { CustomSelect } from '../../../components/CustomSelect/CustomSelect'
import { privateGateway } from '../../../../../services/apiGateway'
import { tableRoutes } from '../../../../../services/urls'
import '../../components/Modal.scss'
interface AssemblyModalProps {
    assembly: AssemblyTableProps
    setAssembly: Dispatch<SetStateAction<AssemblyTableProps>>
    update: Function
}
const Modal: FC<AssemblyModalProps> = ({ assembly, setAssembly, update }) => {
    const [deleteAssembly, setDeleteAssembly] = useState(false)

    return (
        <div className="modal-overlay">
            <div className='modal'>
                <div className='heading'>
                    <div className="title">Manage Model assembly</div>
                    <div className="close-btn" onClick={() => setAssembly({} as AssemblyTableProps)}><i className="fa fa-close"></i>
                    </div>
                </div>
                <div className='secondary-box'>
                    <div className="data-box">
                        <div className="title">Name</div>
                        <div className="content">{assembly.name}</div>
                    </div>

                    <div className="data-box">
                        <div className="title">District</div>
                        <div className="content">{assembly.district}</div>
                    </div>
                    <div className='last-container'>
                        {deleteAssembly && <p>Are you sure you want to delete this item?</p>}
                        <div className="modal-buttons">
                            {deleteAssembly && <button className="confirm-delete" onClick={() => {
                                deleteModelAssembly(assembly.id, update)
                                setAssembly({} as AssemblyTableProps)
                            }}>Confirm Delete</button>}
                            {!deleteAssembly && <button className="confirm-delete" onClick={() => setDeleteAssembly(true)}>Delete</button>}
                            <button className="cancel-delete" onClick={() => { setAssembly({} as AssemblyTableProps) }}>Cancel</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
function deleteModelAssembly(id: string, updateAssemblyStatus: Function) {
    privateGateway.delete(`${tableRoutes.assembly.delete}${id}/`)
        .then(res => {
            updateAssemblyStatus()
            console.log('Success :', res?.data?.message?.general[0])
        })
        .catch(err => console.log('Error :', err?.response?.data?.message?.general[0]))
}

export default Modal
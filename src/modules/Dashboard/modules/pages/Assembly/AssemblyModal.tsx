import { AssemblyTableProps } from './AssemblyTable'
import { Dispatch, FC, SetStateAction, useState } from 'react'
import { privateGateway } from '../../../../../services/apiGateway'
import { tableRoutes } from '../../../../../services/urls'
import '../../components/Modal.scss'
import { Error, Success } from '../../../components/Error/Alerts'

interface AssemblyModalProps {
    assembly: AssemblyTableProps
    setAssembly: Dispatch<SetStateAction<AssemblyTableProps>>
    update: Function
}
const Modal: FC<AssemblyModalProps> = ({ assembly, setAssembly, update }) => {
    const [deleteAssembly, setDeleteAssembly] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [successMessage, setSuccessMessage] = useState("")

    return (
        <div className="modal-overlay">
            <div className='modal'>
                <div className='heading'>
                    <div className="title">Manage assembly</div>
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
                                deleteModelAssembly(assembly.id, update, setSuccessMessage, setErrorMessage, setAssembly)
                            }}>Confirm Delete</button>}
                            {!deleteAssembly && <button className="confirm-delete" onClick={() => setDeleteAssembly(true)}>Delete</button>}
                            <button className="cancel-delete" onClick={() => { setAssembly({} as AssemblyTableProps) }}>Cancel</button>
                        </div>
                    </div>
                </div>
                {errorMessage && <Error error={errorMessage} />}
                {successMessage && <Success success={successMessage} />}
            </div>
        </div>
    )
}
function deleteModelAssembly(id: string, updateAssemblyStatus: Function,
    setSuccessMessage: Dispatch<SetStateAction<string>>,
    setErrorMessage: Dispatch<SetStateAction<string>>,
    setAssembly: Dispatch<SetStateAction<AssemblyTableProps>>
) {
    privateGateway.delete(`${tableRoutes.assembly.delete}${id}/`)
        .then(res => {
            setSuccessMessage(res?.data?.message?.general[0])
            setTimeout(() => {
                updateAssemblyStatus()
                setAssembly({} as AssemblyTableProps)
            }, 1000)
        })
        .catch(err => console.log('Error :', err?.response?.data?.message?.general[0]))
}

export default Modal
import { BlockTableProps } from './BlockTable'
import { Dispatch, FC, SetStateAction, useState } from 'react'
import { privateGateway } from '../../../../../services/apiGateway'
import { tableRoutes } from '../../../../../services/urls'
import '../../components/Modal.scss'
import { Error, Success } from '../../../components/Error/Alerts'

interface BlockModalProps {
    block: BlockTableProps
    setBlock: Dispatch<SetStateAction<BlockTableProps>>
    update: Function
}
const Modal: FC<BlockModalProps> = ({ block, setBlock, update }) => {
    const [deleteBlock, setDeleteBlock] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [successMessage, setSuccessMessage] = useState("")

    return (
        <div className="modal-overlay">
            <div className='modal'>
                <div className='heading'>
                    <div className="title">Manage Block</div>
                    <div className="close-btn" onClick={() => setBlock({} as BlockTableProps)}><i className="fa fa-close"></i>
                    </div>
                </div>
                <div className='secondary-box'>
                    <div className="data-box">
                        <div className="title">Name</div>
                        <div className="content">{block.name}</div>
                    </div>

                    <div className="data-box">
                        <div className="title">District</div>
                        <div className="content">{block.district}</div>
                    </div>
                    <div className='last-container'>
                        {deleteBlock && <p>Are you sure you want to delete this item?</p>}
                        <div className="modal-buttons">
                            {deleteBlock && <button className="confirm-delete" onClick={() => {
                                deleteModelBlock(block.id, update, setSuccessMessage, setErrorMessage, setBlock)
                            }}>Confirm Delete</button>}
                            {!deleteBlock && <button className="confirm-delete" onClick={() => setDeleteBlock(true)}>Delete</button>}
                            <button className="cancel-delete" onClick={() => { setBlock({} as BlockTableProps) }}>Cancel</button>
                        </div>
                    </div>
                </div>
                {errorMessage && <Error error={errorMessage} />}
                {successMessage && <Success success={successMessage} />}
            </div>
        </div>
    )
}
function deleteModelBlock(id: string, updateBlockStatus: Function,
    setSuccessMessage: Dispatch<SetStateAction<string>>,
    setErrorMessage: Dispatch<SetStateAction<string>>,
    setBlock: Dispatch<SetStateAction<BlockTableProps>>
) {
    privateGateway.delete(`${tableRoutes.block.delete}${id}/`)
        .then(res => {
            setSuccessMessage(res?.data?.message?.general[0])
            setTimeout(() => {
                updateBlockStatus()
                setBlock({} as BlockTableProps)
            }, 1000)
        })
        .catch(err => console.log('Error :', err?.response?.data?.message?.general[0]))
}

export default Modal
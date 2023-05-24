import { BlockTableProps } from './BlockTable'
import { selectProps } from '../../utils/setupUtils'
import { Dispatch, FC, SetStateAction, useState } from 'react'
import { CustomSelect } from '../../../components/CustomSelect/CustomSelect'
import { privateGateway } from '../../../../../services/apiGateway'
import { tableRoutes } from '../../../../../services/urls'
import '../../components/Modal.scss'
interface BlockModalProps {
    block: BlockTableProps
    setBlock: Dispatch<SetStateAction<BlockTableProps>>
    update: Function
}
const Modal: FC<BlockModalProps> = ({ block, setBlock, update }) => {
    const [deleteBlock, setDeleteBlock] = useState(false)

    return (
        <div className="modal-overlay">
            <div className='modal'>
                <div className='heading'>
                    <div className="title">Manage Model block</div>
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
                                deleteModelBlock(block.id, update)
                                setBlock({} as BlockTableProps)
                            }}>Confirm Delete</button>}
                            {!deleteBlock && <button className="confirm-delete" onClick={() => setDeleteBlock(true)}>Delete</button>}
                            <button className="cancel-delete" onClick={() => { setBlock({} as BlockTableProps) }}>Cancel</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
function deleteModelBlock(id: string, updateBlockStatus: Function) {
    privateGateway.delete(`${tableRoutes.block.delete}${id}/`)
        .then(res => {
            updateBlockStatus()
            console.log('Success :', res?.data?.message?.general[0])
        })
        .catch(err => console.log('Error :', err?.response?.data?.message?.general[0]))
}

export default Modal
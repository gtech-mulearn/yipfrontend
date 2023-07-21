import { Dispatch, SetStateAction, useState } from "react"
import { CustomInput } from "../../../../../components/CustomInput/CustomInput"
import { CustomSelect } from "../../../../../components/CustomSelect/CustomSelect"
import SmallStatus from "../SmallBox/SmallStatus"
import './Modal.css'
import Form from "../../../../components/Form/Form"
export interface listElementProps {
    id: string
    name: string
}
interface Layer1Props {
    header: string
    close: (props: any) => void
    DeleteBtn?: boolean
}

interface Layer3Props {
    functionName?: string
}
export interface ModalProps extends Layer1Props, Layer3Props {
    children: JSX.Element
    onSubmit: (props: any) => void
}

const Modal = ({ ...props }: ModalProps) => {
    return (
        <div className="campus-modal">
            <div className="modal-overlay">
                <div className='modal'>
                    <Layer1 {...props} />
                    <Form onSubmit={props.onSubmit}>
                        <div className="input-box">
                            {props.children}
                        </div>
                        <Layer3  {...props} />
                    </Form>
                </div>
            </div>
        </div>
    )
}
export default Modal

const Layer1 = ({ ...props }: Layer1Props) => {
    return (
        <div className='heading'>
            <div className="title">{props.header}</div>
            <div className="close" onClick={props.close}><i className="fa fa-close"></i>
            </div>
        </div>
    )
}
const Layer3 = ({ close, header, functionName, DeleteBtn }: ModalProps) => {
    return (
        <div className="modal-buttons">
            <SmallStatus
                value={functionName ? functionName : header}
                style={DeleteBtn ? 'button-alert' : 'button'}
                type={'submit'}
            />
            <SmallStatus
                value='Cancel'
                style={"button"}
                run={close}
            />
        </div>
    )
}
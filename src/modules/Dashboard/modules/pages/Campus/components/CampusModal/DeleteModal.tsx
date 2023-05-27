import React, { Dispatch, SetStateAction, useState } from 'react'
import SchoolModal from '../../../School/SchoolModal'
import { SchoolTableProps } from '../../../School/SchoolTable'
import { privateGateway } from '../../../../../../../services/apiGateway'
import { tableRoutes } from '../../../../../../../services/urls'
import './CampusModal.scss'
const DeleteModal = ({ id, cancel }: { id: string, cancel: () => void }) => {
    return (
        <div className="modal-overlay">
            <div className='modal'>
                <div className="secondary-box">
                    <div className='last-container'>
                        <p>Are you sure you want to delete this campus?</p>
                        <div className="modal-buttons">
                            <button className="confirm-delete" onClick={() => {
                                deleteModelSchool(id)
                            }}>Confirm Delete</button>
                            <button className="cancel-delete" onClick={cancel}>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export function deleteModelSchool(id: string) {
    privateGateway.delete(`${tableRoutes.school.delete}${id}/`)
        .then(res => {
            console.log(res?.data?.message?.general[0])
        })
        .catch(err => console.log(err?.response?.data?.message?.general[0]))
}
export default DeleteModal
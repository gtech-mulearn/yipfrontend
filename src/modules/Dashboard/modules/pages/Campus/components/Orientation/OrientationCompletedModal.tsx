import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { CustomSelect } from '../../../../../components/CustomSelect/CustomSelect'
import { privateGateway } from '../../../../../../../services/apiGateway'
import { selectProps } from '../../../../utils/setupUtils'
import { CustomInput } from '../../../../../components/CustomInput/CustomInput'
import '../CampusModal/CampusModal.scss'
import { campusRoutes } from '../../../../../../../services/urls'
import { errorCheck, errorMessage, success } from '../../../../../components/Toastify/ToastifyConsts'
import { updateCampusStatus } from '../Connection/ConnectionModal'


const OrientationCompletedModal = ({ cancel, eventId, campusId }: { cancel: () => void, eventId: string, campusId: string }) => {
    const [groupFormed, setGroupFormed] = useState<selectProps>({} as selectProps)
    const [nop, setNop] = useState('')
    const [remarks, setRemark] = useState('')
    const [date, setDate] = useState('')
    const [maxDate, setMaxDate] = useState('');

    useEffect(() => {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
        const yyyy = today.getFullYear();
        const formattedDate = `${yyyy}-${mm}-${dd}T23:59`;
        setMaxDate(formattedDate);
    }, []);
    return (
        <div className='secondary-box'>
            <div className="data-box">
                <div className="content">
                    <CustomInput value={'No of Participants'} data={nop} setData={setNop} customCSS={'setup-item'} />
                </div>
            </div>
            <div className="data-box">
                <div className="content">
                    <div className={'setup-item'}>
                        <p>Date</p>
                        <input
                            type='datetime-local'
                            name={`name-Date`}
                            id={`id-date`}
                            onChange={(e) => { setDate(e.target.value) }}
                            max={maxDate}
                        />
                    </div>
                </div>
            </div>
            <div className="data-box">
                <div className="content">
                    <CustomInput value={'Remarks'} data={remarks} setData={setRemark} customCSS={'setup-item'} />
                </div>
            </div>



            <div className='last-container'>
                <div className="modal-buttons">
                    <button className='btn-update ' onClick={() => updateEvent(eventId, nop, date, remarks, cancel, campusId)}>Add Orientation Details</button>
                    <button className="cancel-btn " onClick={cancel}>Cancel</button>
                </div>
            </div>
        </div>

    )
}
function updateEvent(eventId: string, nop: string, date: string, remarks: string, cancel: () => void, campusId: string) {
    try {
        if (!isDateTimeValid(date)) {
            throw new Error(JSON.stringify({
                status: 400,
                data: { message: { general: ['Date of completion cannot be a future date',] } }
            }))
        }
        else {
            privateGateway
                .put(`${campusRoutes.updateEvent}${eventId}/`, {
                    no_of_participants: nop,
                    remarks: remarks,
                    completed_date: date,
                    status: "Completed",
                })
                .then((res) => {
                    updateCampusStatus(campusId, "Orientation Completed", cancel);
                    success();
                    cancel();
                })
                .catch((err) => {
                    errorCheck(err.response);
                    errorMessage(err.response);
                });
        }
    } catch (err: any) {
        const errorObject = JSON.parse(err.message);

        errorCheck(errorObject)
    }

}
const isDateTimeValid = (dateTime: string) => {
    const selectedDateTime = new Date(dateTime).getTime()
    const currentDateTime = new Date().getTime()
    return selectedDateTime < currentDateTime
}
export default OrientationCompletedModal

const calenderTillNowOnly = (): string => {
    const today = new Date();
    const dd = today.getDate();
    const mm = today.getMonth() + 1; // January is 0!
    const yyyy = today.getFullYear();
    const hours = today.getHours();
    const minutes = today.getMinutes();
    let formattedDate = '';

    if (dd < 10) {
        formattedDate += '0' + dd;
    } else {
        formattedDate += dd;
    }

    if (mm < 10) {
        formattedDate += '-0' + mm;
    } else {
        formattedDate += '-' + mm;
    }

    formattedDate += '-' + yyyy;

    const formattedTime = `${hours}:${minutes}`;
    return formattedDate + 'T' + formattedTime
}
import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react'
import { CustomSelect } from '../../../../../components/CustomSelect/CustomSelect'
import { privateGateway } from '../../../../../../../services/apiGateway'
import { selectProps } from '../../../../utils/setupUtils'
import { CustomInput } from '../../../../../components/CustomInput/CustomInput'
import '../Modals/CampusModal.scss'
import { campusRoutes } from '../../../../../../../services/urls'
import { errorCheck, errorMessage, success } from '../../../../../components/Toastify/ToastifyConsts'
import { updateCampusStatus } from '../Connection/ConnectionModal'
import * as yup from "yup";
import { toast } from 'react-toastify'
import { listEvent } from './OrientationScheduleModal'
import { OrientationCompleteProps } from './Orientation'
import { GlobalContext } from '../../../../../../../utils/GlobalVariable'

const OrientationCompletedModal = ({ cancel, eventId, campusId, campusStatus }: { cancel: () => void, eventId?: string, campusId: string, campusStatus: string }) => {
    const [nop, setNop] = useState('')
    const [remarks, setRemark] = useState('')
    const [date, setDate] = useState('')
    const [checkDate, setCheckDate] = useState<Date | null>(null)
    const [maxDate, setMaxDate] = useState('');
    const [eventIds, setEventIds] = useState<OrientationCompleteProps>({} as OrientationCompleteProps)
    const [list, setList] = useState<OrientationCompleteProps[]>([])
    const [disableBtn, setDisableBtn] = useState(false)
    const { clubEvents } = useContext(GlobalContext)

    useEffect(() => {
        if (clubEvents.length) {
            let event = clubEvents.find((item: any) => item.status === 'Scheduled')
            if (event)
                setEventIds(event)
        }
    }, [clubEvents])
    function validateSchema() {
        const validationSchema = yup.object().shape({
            nop: yup.number().required("No of Participants is required").typeError("Please enter a valid number"),
            remarks: yup.string().required("Remarks is required").test('only-spaces', 'Only spaces are not allowed for user name', value => {
                // Check if the value consists only of spaces
                return !(/^\s+$/.test(value));
            }),
            date: yup.date().required('Date is required').max(new Date(), 'Date and time must be before the current time'),
            status: yup.string().test('Valid Status', 'Schedule an Event first !!!', value => {
                // console.log(value)
                if (value === 'Identified' || value === 'Confirmed' || value === 'Connection Established') {
                    return false
                }
                return true
            })
        })
        return validationSchema.validate(
            {
                nop: nop,
                remarks: remarks,
                date: checkDate || date,
                status: campusStatus
            },
            { abortEarly: false }
        )
    }
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
            {<>
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
                                onChange={(e) => {
                                    setDate(e.target.value)
                                    setCheckDate(e.target.valueAsDate)
                                }}
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
                        <button className='btn-update '
                            onClick={() => {
                                setDisableBtn(true)
                                validateSchema().then(() => {
                                    updateEvent(eventIds.id, nop, date, remarks, cancel, campusId, () => setDisableBtn(false))
                                }).catch(err => {
                                    err.errors.map((error: string) => toast.error(error))
                                    setDisableBtn(false)
                                })

                            }}
                        >Add Orientation Details</button>
                        <button className="cancel-btn " onClick={cancel}>Cancel</button>
                    </div>
                </div>
            </>}
        </div>

    )
}
function updateEvent(eventId: string, nop: string, date: string, remarks: string, cancel: () => void, campusId: string,
    enableBtn: () => void
) {
    let x = new Date(date)
    toast.info('Updating', {
        toastId: 'Updating'
    })
    try {
        if (!isDateTimeValid(date)) {
            enableBtn()
            toast.dismiss('Updating')

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
                    completed_date: x,
                    status: "Completed",
                })
                .then(() => {
                    toast.dismiss('Updating')
                    updateCampusStatus(campusId, "Orientation Completed", cancel);
                })
                .catch((err) => {
                    toast.dismiss('Updating')

                    errorCheck(err.response);
                    errorMessage(err.response);
                    enableBtn()
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
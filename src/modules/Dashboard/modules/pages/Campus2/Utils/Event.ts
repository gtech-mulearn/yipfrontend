import { toast } from "react-toastify";
import { privateGateway } from "../../../../../../services/apiGateway";
import { campusRoutes } from "../../../../../../services/urls";
import { errorCheck, errorMessage, success } from "../../../../components/Toastify/ToastifyConsts";
import { Dispatch, SetStateAction } from "react";
import { formatDate, isNotFutureDate } from "./Date";
interface EventPostDataProps {
    id: string
    place: string
    mode_of_delivery: string
    districtCordinator: string
    no_of_participants: string
    scheduled_date: string
    remarks: string
    status: string
    completed_date: string
    description: string
    planned_date: string
}
export function deleteEvent(eventId: string, close: () => void) {
    {
        privateGateway.delete(`${campusRoutes.deleteEvent}${eventId}/`)
            .then((res) => {
                toast.info(res?.data?.message?.general[0])
                close()
            })
            .catch((err) => {
                errorCheck(err.response)
                errorMessage(err.response)
            })
    }
}
export function listEvent(campusId: string, setData: Dispatch<SetStateAction<EventPostDataProps[]>>) {
    const eventController = new AbortController();
    privateGateway.get(`${campusRoutes.listEvent}${campusId}/`, { signal: eventController.signal })
        .then(res => res.data.response)
        .then(data => {
            console.log('event listed in function');
            setData(data.map((item: any) => (
                {
                    ...item,
                    scheduled_date: formatDate(item.scheduled_date),
                    planned_date: formatDate(item.planned_date), completed_date: formatDate(item.completed_date)
                })))
        })
        .catch(err => console.error(err))
    return () => {
        eventController.abort()
    }
}
export function createEvent(date: string, place: string, mod: string, coordinatorId: string, campusId: string, cancel: () => void, enableBtn: () => void) {
    console.log(date, place, mod, coordinatorId, campusId)
    const now = new Date();
    toast.info('Updating', {
        toastId: 'Updating'
    })
    const planned_date = new Date(date);
    privateGateway.post(campusRoutes.createEvent, {
        planned_date: planned_date,
        scheduled_date: now,
        mode_of_delivery: mod,
        place: place,
        description: 'Orientation Scheduling',
        status: 'Scheduled',
        districtCordinator: coordinatorId,
        clubId: campusId
    })
        .then(res => {
            success()
            toast.dismiss('Updating')
            cancel()
        }
        ).catch(err => {
            errorCheck(err.response);
            errorMessage(err.response);
            enableBtn()
        })

}

export function updateEvent(
    eventId: string,
    nop: string,
    date: string,
    remarks: string,
    place: string,
    cancel: () => void,
    enableBtn: () => void,
    edit: boolean = false
) {
    const payload: EventPostDataProps | any = {
        id: eventId,
    }
    if (remarks !== '')
        payload.remarks = remarks
    if (edit) {
        if (date !== '') {
            payload.completed_date = new Date(date)
            payload.status = "Completed"
        }
        if (nop !== '')
            payload.no_of_participants = nop
        if (place !== '')
            payload.place = place
    }
    else {
        payload.no_of_participants = nop
        payload.completed_date = new Date(date)
        payload.status = "Completed"
    }

    toast.info('Updating', {
        toastId: 'Updating'
    })
    try {
        if (!isNotFutureDate(date)) {
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
                    ...payload
                })
                .then(() => {
                    toast.dismiss('Updating')
                    cancel()
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
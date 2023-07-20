import { toast } from "react-toastify"
import { privateGateway } from "../../../../../../../services/apiGateway"
import { tableRoutes } from "../../../../../../../services/urls"
import { errorCheck, errorMessage, success } from "../../../../../components/Toastify/ToastifyConsts"
export interface VisitDataProps {
    clubId: string
    clubStatus: string
    visited_date: string
    visited_remarks: string
}

export function AddVisit(postData: VisitDataProps, close: () => void, updateCampus: () => void) {
    toast.loading('Updating', {
        toastId: 'Updating'
    })

    privateGateway.put(tableRoutes.status.update, postData)
        .then(() => {
            toast.dismiss('Updating')
            success()
            close()
            updateCampus()
        })
        .catch(err => {
            toast.dismiss('Updating')
            errorMessage(err.response);
            errorCheck(err.response);
        })
}
export default AddVisit
export function getVisitPostData(campusId: string): VisitDataProps {
    return ({
        clubId: campusId,
        clubStatus: 'Visited',
        visited_date: '',
        visited_remarks: ''
    })
}
export function getVisitModalData(
    { ...props }
) {
    console.log('visiting...')

    return (
        {
            title: props.confirmed,
            run: () => {
                props.openSetModal(true)
                props.setButtons('Visit')
            },
            list: {
                title: 'Add Visit',
                close: {
                    run: () => {
                        props.openSetModal(false)
                        props.setButtons('')
                    }
                },
                list: [
                    {
                        title: 'Remarks',
                        selected: props.values?.visit?.visited_remarks,
                        setSelected: (remarks: string) => {
                            props.setValues({ ...props.values, visit: { ...props.values.visit, visited_remarks: remarks } })
                        },
                        type: 'text',
                    },
                    {
                        title: 'Date',
                        selected: props.values?.visit?.visited_date,
                        setSelected: (date: string) => {
                            props.setValues({ ...props.values, visit: { ...props.values.visit, visited_date: date } })
                        },
                        type: 'date',
                    }
                ],
                run: () => {
                    const updatedData = { ...props.values.visit as VisitDataProps, visited_date: new Date(props.values.visit.visited_date).toISOString() }
                    AddVisit(updatedData, () => props.openSetModal(false), props.updateCampus)
                }
            }
        }
    )
}
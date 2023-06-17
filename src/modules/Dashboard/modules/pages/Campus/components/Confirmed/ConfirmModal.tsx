import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import * as yup from 'yup'
import { privateGateway } from '../../../../../../../services/apiGateway';
import { errorCheck, errorMessage, success } from '../../../../../components/Toastify/ToastifyConsts';
import { CustomInput } from '../../../../../components/CustomInput/CustomInput';
import { tableRoutes } from '../../../../../../../services/urls';
const ConfirmModal = ({
    cancel,
    campusId,
    campusStatus,
}: {
    cancel: () => void;
    campusId: string;
    campusStatus: string;
}) => {
    const [date, setDate] = useState("");
    const [remarks, setRemarks] = useState("");
    const [checkDate, setCheckDate] = useState<Date | null>(null)
    const [maxDate, setMaxDate] = useState('');
    const [disableBtn, setDisableBtn] = useState(false)
    function validateSchema() {
        const validationSchema = yup.object().shape({
            date: yup.date().required('Date is required').max(new Date(), 'Date and time must be before the current time'),
            remarks: yup.string().required("Remarks is required").max(500, "Remarks cannot be more than 500 characters"),
        })
        return validationSchema.validate(
            {
                date: date || checkDate,
                remarks: remarks
            }, { abortEarly: false }
        )
    }
    useEffect(() => {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
        const yyyy = today.getFullYear();
        const formattedDate = `${yyyy}-${mm}-${dd}`;
        setMaxDate(formattedDate);
    }, []);
    return (
        <div className="secondary-box">
            <div className="data-box">
                <div className="content">
                    <CustomInput value={'Remarks'} data={remarks} setData={setRemarks} customCSS={'setup-item'} />
                </div>
            </div>
            <div className="data-box">
                <div className="content">
                    <div className={'setup-item'}>
                        <p>Date</p>
                        <input
                            type='date'
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
            <div className="modal-buttons">
                <button
                    disabled={disableBtn}
                    className="btn-update "
                    onClick={() => {
                        setDisableBtn(true)
                        validateSchema().then(() => {
                            addVisited({
                                clubId: campusId,
                                clubStatus: 'Visited',
                                visited_date: date,
                                visited_remarks: remarks
                            }, campusId, cancel, () => setDisableBtn(false))
                        }).catch(err => {
                            err.errors.map((error: string) => toast.error(error))
                            setDisableBtn(false)
                        })
                    }
                    }
                >
                    Update
                </button>
                <button className="cancel-btn " onClick={cancel}>
                    Cancel
                </button>
            </div>
        </div>
    )
}
interface visitedPostProps {
    clubId: string
    clubStatus: string
    visited_date: string
    visited_remarks: string
}
function addVisited(postData: visitedPostProps, campusId: string, cancel: () => void, enableBtn: () => void) {
    toast.info('Updating', {
        toastId: 'Updating'
    })
    privateGateway.put(tableRoutes.status.update, postData)
        .then(() => {
            toast.dismiss('Updating')
            success()
            cancel()
        })
        .catch(err => {
            toast.dismiss('Updating')

            errorMessage(err.response);
            errorCheck(err.response);
            enableBtn()
        })
}
export default ConfirmModal
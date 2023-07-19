import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import './Layout.css'

import { CampusPageProps, getCampusInfo } from '../../Campus/utils'
import { Category } from '../Utils/CategoryChecker'
import Layer1 from '../Layers/Layer1/Layer1'
import Layer2 from '../Layers/Layer2/Layer2'
import Layer3 from '../Layers/Layer3_Connect/Layer3'
import Loading from '../Components/Loading/Loading'
import Layer4 from '../Layers/Layer4_Events/Layer4'
import Layer5 from '../Layers/Layer5_Execom/Layer5'
export interface CampusModalProps {
    openSetModal: Dispatch<SetStateAction<boolean>>,
    setButtons: Dispatch<SetStateAction<string>>,
    values: any,
    setValues: Dispatch<SetStateAction<any>>,
    updateCampus: () => void
}
const Layout = () => {
    const { campusId, type } = useParams()
    const [campus, setCampus] = useState<CampusPageProps>({} as CampusPageProps)
    const [update, setUpdate] = useState(false)

    function updateCampus() {
        getCampusInfo(campusId as string, setCampus)
    }
    const firstCall = useRef(false)
    useEffect(() => {
        updateCampus()
    }, [update])

    useEffect(() => {
        if (campus.campus && !firstCall.current) {
            setCampus({
                ...campus,
                identified: campus?.identified,
                confirmed: campus?.confirmed,
                connection: campus?.connection,
                execom: campus?.execom
            })
            firstCall.current = true
        }
    }, [campus])
    const layer3 = {
        campusId: campusId as string,
        category: Category(type as string),
        visit: campus.confirmed,
        updateCampus: updateCampus
    }
    const { campus: campusName } = campus
    return (
        <div className='dash-container'>
            <div className='white-container'>
                <Layer1 {...campus} {...layer3} />
                <div className="campus-title">{campus.campus ? campusName : <Loading />}</div>
                <Layer2 {...campus} {...layer3} />
            </div>
            <div className='white-container'>
                <Layer3 {...layer3} />
                <Layer4 {...campus} {...layer3} />
                <Layer5  {...campus} {...layer3} />
            </div>
        </div>
    )
}
export default Layout







import { Dispatch, SetStateAction, useEffect, useMemo, useRef, useState } from 'react'
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
import { listEvent } from '../Utils/Event'
import listSubUser, { FacilitatorProps } from '../Utils/ListSubUser'

const Layout = () => {
    const { campusId, type } = useParams()
    const [isUpdate, setIsUpdate] = useState(false)
    const [campus, setCampus] = useState<CampusPageProps>({} as CampusPageProps)
    const [eventList, setEventList] = useState<any>([])
    const [pocList, setPocList] = useState<FacilitatorProps[]>([])
    const [ptaList, setPtaList] = useState<FacilitatorProps[]>([])
    const [alumniList, setAlumniList] = useState<FacilitatorProps[]>([])
    const [execomList, setExecomList] = useState<FacilitatorProps[]>([])
    function updateCampus() {
        getCampusInfo(campusId as string, setCampus, setIsUpdate)
    }
    function updateEvent() {
        listEvent(campusId as string, setEventList)
    }
    function updateSubUserList(setList: Dispatch<SetStateAction<FacilitatorProps[]>>, campusId: string, type: string) {
        listSubUser(setList, campusId as string, type)
    }
    useEffect(() => {
        updateCampus()
        updateEvent()
        updateSubUserList(setPocList, campusId as string, 'POC')
        updateSubUserList(setPtaList, campusId as string, 'PTA')
        updateSubUserList(setAlumniList, campusId as string, 'ALUMNI')
        updateSubUserList(setExecomList, campusId as string, 'EXECOM')
    }, [false])

    const layer3 = {
        updateSubUserList: updateSubUserList,
        pocState: { list: pocList, setList: setPocList },
        ptaState: { list: ptaList, setList: setPtaList },
        alumniState: { list: alumniList, setList: setAlumniList },
        execomState: { list: execomList, setList: setExecomList },
        campusId: campusId as string,
        category: Category(type as string),
        visit: campus.confirmed,
        updateCampus: updateCampus,
        isUpdate: isUpdate,
        eventList: eventList,
        eventUpdate: updateEvent
    }
    return (
        <div className='dash-container'>
            <div className='white-container'>
                <Layer1 {...campus} {...layer3} />
                <div className="campus-title">{campus.name ? campus.name : <Loading />}</div>
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







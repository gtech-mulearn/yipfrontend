import React, { useState, useEffect, SetStateAction, Dispatch, FC, useContext } from 'react'
import BannerImg from "../../../../../assets/Study abroad-pana.webp"
import './Banner.scss'
import { privateGateway } from '../../../../../services/apiGateway'
import { bannerRoutes } from '../../../../../services/urls'
import { fetchInstitutionStatusCount } from './clubAPI'
import { GlobalContext } from '../../../../../utils/GlobalVariable'
import roles from '../../../../../utils/roles'
const ClubBanner: FC<{ updated: boolean }> = ({ updated }) => {
    const [count, setCount] = useState<CountResponse>(initialState)
    const { userInfo } = useContext(GlobalContext)
    useEffect(() => {
        fetchInstitutionStatusCount(setCount)
    }, [location.pathname, updated])
    return (
        <>
            {userInfo.role !== roles.INTERN &&
                <div className="banner-container">
                    <div className="welcome-banner">
                        <div className="statistics">
                            {
                                Object.entries(count).slice(0, 5).map(([key, value], index: number) => (
                                    <div className={`box ${index < 3 ? '' : 'light-'}blue-box`} key={index}>
                                        <h3>{value}<div className="count"><div className="count-in">{count.total}</div></div></h3>
                                        <p>{handleStatus(key)}</p>
                                    </div>))
                            }
                        </div>
                    </div>
                </div>
            }
        </>
    )
}
const initialState: CountResponse = {
    Identified: 0,
    Confirmed: 0,
    "Connection established": 0,
    "Orientation Scheduled": 0,
    "Orientation Completed": 0,
    total: 0,
};
export interface CountResponse {
    Identified: number;
    Confirmed: number;
    "Connection established": number;
    "Orientation Scheduled": number;
    "Orientation Completed": number;
    total: number;
}
function handleStatus(status: string) {
    if (status === 'Orientation Scheduled')
        return "Event Scheduled"
    else if (status === 'Orientation Completed')
        return "Event Completed"
    return status
}

export default ClubBanner
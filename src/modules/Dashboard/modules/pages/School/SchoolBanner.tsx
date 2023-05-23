import React, { useState, useEffect, SetStateAction, Dispatch } from 'react'
import BannerImg from "../../../../../assets/Study abroad-pana.png"
import './Banner.scss'
import { privateGateway } from '../../../../../services/apiGateway'
import { bannerRoutes } from '../../../../../services/urls'
const SchoolBanner = () => {
    const [count, setCount] = useState<CountResponse>(initialState)
    useEffect(() => {
        fetchInstitutionStatusCount(setCount)
    }, [location.pathname])
    return (
        <div className="banner-container">
            <div className="welcome-banner">
                <div className="statistics">
                    {
                        Object.entries(count).slice(0, 6).map(([key, value], index: number) => (
                            <div className={`box ${index < 3 ? '' : 'light-'}blue-box`} key={index}>
                                <h3>{value}<div className="count"><div className="count-in">{count.total}</div></div></h3>
                                <p>{key}</p>
                            </div>))
                    }
                </div>
                <div className="welcome-image-container">
                    <img id="banner-img" src={BannerImg} alt="" />
                </div>
            </div>
        </div>
    )
}
const initialState: CountResponse = {
    Identified: 0,
    Confirmed: 0,
    "Connection established": 0,
    "Orientation Scheduled": 0,
    "Orientation Completed": 0,
    "Execom Formed": 0,
    total: 0,
};
interface CountResponse {
    Identified: number;
    Confirmed: number;
    "Connection established": number;
    "Orientation Scheduled": number;
    "Orientation Completed": number;
    "Execom Formed": number;
    total: number;
}
const fetchInstitutionStatusCount = async (setCount: Dispatch<SetStateAction<CountResponse>>) => {
    privateGateway.get(`${bannerRoutes.schoolBanner}`)
        .then(res => res.data.response)
        .then(res => setCount(res))
        .catch(err => console.log(err))
}


export default SchoolBanner
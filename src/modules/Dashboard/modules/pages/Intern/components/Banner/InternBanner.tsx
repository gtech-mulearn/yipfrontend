import React, { useState, useEffect, Dispatch, SetStateAction } from 'react'
import { CustomSelect } from '../../../../../components/CustomSelect/CustomSelect'
import './InternBanner.scss'
import { privateGateway } from '../../../../../../../services/apiGateway'
import { campusRoutes, yip5Routes } from '../../../../../../../services/urls'
import { selectProps } from '../../../../utils/setupUtils'
const InternBanner = () => {
    const [banner, setBanner] = useState<any>({})
    const [district, setDistrict] = useState<selectProps>({} as selectProps)
    const [districtList, setDistrictList] = useState<selectProps[]>([])
    const [zone, setZone] = useState<selectProps>({} as selectProps)
    const [zoneList, setZoneList] = useState<selectProps[]>([])
    const [college, setCollege] = useState<selectProps>({} as selectProps)
    const [collegeList, setCollegeList] = useState<selectProps[]>([])
    useEffect(() => {
        fetchZone(setZoneList)
        fetchBannerData(setBanner as any, 'state', 'state')
    }, [])
    useEffect(() => {
        if (zone.id) {
            fetchDistricts(zone.name, setDistrictList)
            fetchBannerData(setBanner as any, 'zone', zone.name)
        }
    }, [zone, district])
    useEffect(() => {
        if (district.id) {
            fetchCollege(district.name, setCollegeList)
            fetchBannerData(setBanner as any, 'district', district.name)
        }
    }, [district, college])
    useEffect(() => {
        if (college.id) {
            fetchBannerData(setBanner as any, 'institute', college.id)
        }
    }, [college])
    return (
        <div className='white-container'>
            <div className="filter-container">
                <div className="filter-box">
                    <CustomSelect option={zoneList} header={'Zone'} requiredHeader={false} setData={setZone} />
                    {zone.id && <CustomSelect option={districtList} header={'District'} requiredHeader={false} setData={setDistrict} />}
                    {district.id && <CustomSelect option={collegeList} header={'College'} requiredHeader={false} setData={setCollege} />}
                </div >
            </div>
            <div className="statistics">
                {/* <div className={`box blue-box`} >
                    <h3>{100}<div className="count"><div className="count-in">{ }</div></div></h3>
                    <p>Total Strength</p>
                </div> */}
                <div className={`box blue-box`} >
                    <h3>{banner.preRegistration}<div className="count"><div className="count-in">{ }</div></div></h3>
                    <p>{'Pre-registration'}</p>

                </div>
                <div className={`box blue-box`} >
                    <h3>{(Number(banner.vos) / (Number(banner.preRegistration) === 0 ? 1 : Number(banner.preRegistration)) * 100)}%<div className="count"><div className="count-in">{ }</div></div></h3>
                    <p className='count-of'>{Number(banner.vos)} Stakeholders</p>
                    <p>{'Voice Of Stakeholder '}</p>
                </div>
                <div className={`box blue-box`} >
                    <h3>{showDecimal((Number(banner.groupFormation) / (Number(banner.vos) === 0 ? 1 : Number(banner.vos))) * 100)}%<div className="count"><div className="count-in">{ }</div></div></h3>
                    <p className='count-of'>{Number(banner.groupFormation)} Groups Formed</p>
                    <p>{'Group Formation'}</p>
                </div>
                <div className={`box blue-box`} >
                    <h3>{showDecimal((Number(banner.ideaSubmission) / (Number(banner.groupFormation) === 0 ? 1 : Number(banner.groupFormation))) * 100)}%<div className="count"><div className="count-in">{ }</div></div></h3>
                    <p className='count-of'>{Number(banner.ideaSubmission)} Submissions</p>
                    <p>{'Idea Submission'}</p>
                </div>
            </div>
        </div>
    )
}

export default InternBanner

function showDecimal(num: number) {
    var decimalPart = parseFloat(num.toFixed(2));
    return decimalPart;
}
function fetchBannerData(setBanner: Dispatch<SetStateAction<any>>, type: string, value: string) {
    let url = ''
    if (type !== 'state')
        url = `?${type}=${value}`
    privateGateway.get(`${yip5Routes.bannerData}${url}`)
        .then((res: any) => {
            setBanner(res.data.response)
        })
        .catch((err: any) => {
            console.log(err)
        })
}
function fetchZone(setData: Dispatch<SetStateAction<selectProps[]>>) {
    privateGateway.get(yip5Routes.zoneList)
        .then(res => setData(res.data.response))
        .catch(err => console.log(err))
}
function fetchDistricts(zone: string, setData: Dispatch<SetStateAction<selectProps[]>>) {
    privateGateway.get(`${campusRoutes.listDistrict}${zone}/`)
        .then(res => {
            setData(res.data.response.districts)
        })
        .catch(err => console.log(err))
}
function fetchCollege(district: string, setData: Dispatch<SetStateAction<selectProps[]>>) {
    privateGateway.get(`${campusRoutes.listInstitutes}${district}/`)
        .then(res => setData(res.data.response.map((item: any) => ({
            id: item.id,
            name: item.name
        }))))
        .catch(err => console.log(err))
}

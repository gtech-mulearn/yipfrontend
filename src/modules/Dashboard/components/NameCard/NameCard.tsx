import React, { useEffect } from 'react'

import YIPlogo from '../../../../assets/logo.webp'

import './NameCard.scss'
import { fetchUserInfo, userInfoProps } from '../api'
import { useNavigate } from 'react-router-dom'
// import { Engagespot } from "@engagespot/react-component";
const theme = {
    notificationButton: {
        iconFill: 'black',
        hoverBackground: '#59b3fa'
    },
    colors: {
        brandingPrimary: '#59b3fa',
    },
}
const NameCard = ({ open, setOpen }: { open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const [data, setData] = React.useState<userInfoProps>({} as userInfoProps)
    const navigate = useNavigate()
    useEffect(() => {
        fetchUserInfo(setData)
    }, [])
    return (
        <>
            <div className={`name-card`} onClick={() => { navigate('/institute-management') }}>
                <div className="logo-img" ><img src={YIPlogo} alt="logo" />
                </div>
                {/* {data?.email && <Engagespot apiKey='wu018c6r6debp2oxphzpua' userId={data.email} theme={theme} />} */}
                <div className={'open-color'} onClick={() => { setOpen(!open) }}>
                    <i className={`fas fa-user`} ></i>
                </div>
            </div>
            {open &&
                <div className="open">
                    <h2>Role : {data?.role}</h2>
                    <h1>{data?.name}</h1>
                </div>
            }
        </>
    )
}

export default NameCard
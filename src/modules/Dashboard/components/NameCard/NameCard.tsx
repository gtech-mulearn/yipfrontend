import React, { useContext, useEffect } from 'react'

import YIPlogo from '../../../../assets/logo.webp'

import './NameCard.scss'
import { fetchUserInfo, userInfoProps } from '../api'
import { useNavigate } from 'react-router-dom'
import { GlobalContext } from '../../../../utils/GlobalVariable'
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
    // const [userInfo, setuserInfo] = React.useState<userInfoProps>({} as userInfoProps)
    const navigate = useNavigate()
    const { userInfo } = useContext(GlobalContext)
    return (
        <>
            <div className={`name-card`} >
                <div className="logo-img" onClick={() => { navigate('/intern-dashboard') }}><img src={YIPlogo} alt="logo" />
                </div>
                {/* {userInfo?.email && <Engagespot apiKey='wu018c6r6debp2oxphzpua' userId={userInfo.email} theme={theme} />} */}
                <div className={'open-color'} onClick={() => { setOpen(!open) }}>
                    <i className={`fas fa-user`} ></i>
                </div>
            </div>
            {open &&
                <div className="open">
                    <h2>Role : {userInfo?.role}</h2>
                    <h1>{userInfo?.name}</h1>
                </div>
            }
        </>
    )
}

export default NameCard
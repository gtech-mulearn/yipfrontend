import React, { useEffect } from 'react'


import './NameCard.scss'
import { fetchUserInfo, userInfoProps } from '../api'
import { Engagespot } from "@engagespot/react-component";
const theme = {
    notificationButton: {
        iconFill: 'black',
        hoverBackground: '#59b3fa'
    },
    colors: {
        brandingPrimary: '#59b3fa',
    },
}
const NameCard = () => {
    const [open, setOpen] = React.useState(false)
    const [data, setData] = React.useState<userInfoProps>({} as userInfoProps)
    useEffect(() => {
        fetchUserInfo(setData)

    }, [])
    return (
        <>

            <div className={`name-card`} >
                {data?.email && <Engagespot apiKey='wu018c6r6debp2oxphzpua' userId={data.email} theme={theme} />}

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
import React, { useEffect } from 'react'


import './NameCard.scss'
import { fetchUserInfo } from '../api'

const NameCard = () => {
    const [open, setOpen] = React.useState(false)
    const [data, setData] = React.useState<{ name: string, role: string }>({ name: '', role: '' })
    useEffect(() => {
        fetchUserInfo(setData)
    }, [])
    return (
        <>
            {
                <div className={`name-card ${open ? ' open' : ''}`} onClick={() => { setOpen(!open) }}>
                    {<i className={`fas ${open ? 'fa-times' : 'fa-user'}`} ></i>}
                    {open &&
                        <div className="name-card-content">
                            <h2>{data?.role}</h2>
                            <h1>{data?.name}</h1>
                        </div>
                    }
                </div>
            }
        </>
    )
}

export default NameCard
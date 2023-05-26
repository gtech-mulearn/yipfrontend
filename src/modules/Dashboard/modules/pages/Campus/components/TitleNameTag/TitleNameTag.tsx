import React, { FC } from 'react'
import './TitleNameTag.scss'
interface TitleNameTagProps {
    title: string
    name: string
}
const TitleNameTag: FC<TitleNameTagProps> = ({ title, name }) => {
    return (
        <div className='title-name-tag'>
            <div className='title-tag'>{title}</div>
            <div className='name-tag'>{name}</div>
        </div>
    )
}

export default TitleNameTag
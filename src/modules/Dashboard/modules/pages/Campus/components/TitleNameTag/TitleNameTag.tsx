import React, { FC } from 'react'
import './TitleNameTag.scss'
export interface TitleNameTagProps {
    title: string
    name: string
    customClassName?: string[]
}
const TitleNameTag: FC<TitleNameTagProps> = ({ title, name, customClassName }) => {
    return (
        <div className={`title-name-tag ${customClassName?.join(' ')}`} >
            <div className='title-tag'>{title}</div>
            <div className='name-tag'>{name}</div>
        </div>
    )
}

export default TitleNameTag
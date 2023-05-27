import React, { useState } from 'react'
import { CustomSelect } from '../../../../../components/CustomSelect/CustomSelect'
import './InternBanner.scss'
const InternBanner = () => {

    return (
        <div className='white-container'>
            <div className="filter-container">
                <div className="filter-box">
                    <CustomSelect option={[]} header={'Zone'} requiredHeader={false} />
                    <CustomSelect option={[]} header={'District'} requiredHeader={false} />
                    <CustomSelect option={[]} header={'College'} requiredHeader={false} />
                </div >
            </div>
            <div className="statistics">
                <div className={`box blue-box`} >
                    <h3>{100}<div className="count"><div className="count-in">{ }</div></div></h3>
                    <p>Total Strength</p>
                </div>
                <div className={`box blue-box`} >
                    <h3>{75}%<div className="count"><div className="count-in">{ }</div></div></h3>
                    <p>{'Pre-registration'}</p>
                </div>
                <div className={`box blue-box`} >
                    <h3>{50}%<div className="count"><div className="count-in">{ }</div></div></h3>
                    <p>{'Voice Of Stakeholder '}</p>
                </div>
                <div className={`box blue-box`} >
                    <h3>{25}%<div className="count"><div className="count-in">{ }</div></div></h3>
                    <p>{'Group Formation'}</p>
                </div>
                <div className={`box blue-box`} >
                    <h3>{12}%<div className="count"><div className="count-in">{ }</div></div></h3>
                    <p>{'Idea Submission'}</p>
                </div>
            </div>
        </div>
    )
}

export default InternBanner
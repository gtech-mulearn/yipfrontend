import React from 'react'
import { CustomSelect } from '../../../../../components/CustomSelect/CustomSelect'

const InternSetup = ({ close }: { close: () => void }) => {
    return (
        <div className="white-container">
            <h3>Assign Campus   </h3>
            <div className="setup-club">
                <div className="setup-filter">
                    <div className="select-container club">
                        <CustomSelect option={[]} header={'District'} />
                        <CustomSelect option={[]} header={'Campus'} />
                        <CustomSelect option={[]} header={'Designation'} placeholder={'Select Designation'} />
                        <CustomSelect option={[]} header={'Assignee'} placeholder={'Select Assignee'} />
                        <div className="create-btn-container">
                            <button className="black-btn"
                                onClick={() => { }}>Assign</button>
                            <button className="black-btn"
                                onClick={() => close()}
                            >Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InternSetup
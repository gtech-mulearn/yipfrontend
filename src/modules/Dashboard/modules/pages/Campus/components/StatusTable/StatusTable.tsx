import React, { Dispatch, FC, SetStateAction } from 'react'
import TitleNameTag from '../TitleNameTag/TitleNameTag'
import CustomTable, { CustomTableProps } from '../../../../components/CustomTable/CustomTable'
import './StatusTable.scss'
interface StatusTableProps<TableProps> extends CustomTableProps<TableProps> {
    title1: string
    name: string
    title2: string
    date: string
    setAdd: Dispatch<SetStateAction<boolean>>
    AddOption?: string
    TableHeading: string
    headingSwitch?: boolean
}

function StatusTable<TableProps>({ title1, name, title2, date, setAdd, TableHeading, AddOption, headingSwitch = true, ...props }: StatusTableProps<TableProps>) {
    return (
        <div>
            <div className='status-table'>
                <TitleNameTag title={title1} name={name} />
                <TitleNameTag title={title2} name={date} />
            </div>
            <div>
                <div className='top-bar'>
                    <p>{TableHeading}</p>
                    {AddOption && headingSwitch && <div className='add-button' onClick={() => {
                        setAdd((prev: boolean) => !prev)
                    }}>
                        <i className='fas fa-add'></i>
                        <p >{AddOption}</p>
                    </div>}
                </div>
                <CustomTable<TableProps>
                    {...props}
                    pagination={false}
                    filter={false}
                />
            </div>
        </div >

    )
}

export default StatusTable
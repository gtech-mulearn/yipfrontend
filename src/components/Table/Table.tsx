import React from 'react'
import { getCurrentPageUtils } from '../../utils/utils'
import './Table.scss'
import { NewSelect, dummy, intialState } from '../Setup/Setup'
const Table = () => {
    const [value, setValue] = React.useState('All')

    return (
        <>
            <div className='white-container'>

                {/* Table top */}

                <div className="table-top">
                    <div className='table-header'>
                        <h3>{getCurrentPageUtils().content} List</h3>
                        <div className='table-header-btn'>
                            <li className="fas fa-bars"></li>
                        </div>
                    </div>

                    <div className='table-fn'>
                        <div className='search-bar'>
                            <input className='search-bar-item' type="text" placeholder={`Search ${getCurrentPageUtils().content}`} />
                            <li className='fas fa-close'></li>
                        </div>
                        <div className="table-fn-btn" >
                            <i className="fa-solid fa-plus"></i>
                            <p>Add {getCurrentPageUtils().content}</p>
                        </div>
                        <button className="table-fn-btn show-in-500">Show Banner</button>
                        <div className="table-fn-btn">
                            <i className="fa-solid fa-filter"></i>
                            <p>Filter</p>
                        </div>
                    </div>
                </div>

                {/* Filters */}

                <div className="filter-container">
                    <div className="filter-box">
                        <div className="table-white-btn">
                            <i className="fa-solid fa-repeat"></i>
                            <p>{`Filter By Assembly`}</p>
                        </div>
                        <NewSelect option={dummy} value='District' setValue={setValue} requiredHeader={false} requiredLabel={true} />
                        <NewSelect option={dummy} value='District' setValue={setValue} requiredHeader={false} requiredLabel={true} />
                        <NewSelect option={dummy} value='District' setValue={setValue} requiredHeader={false} requiredLabel={true} />
                    </div >
                </div>

                {/*  Table  */}


            </div>
        </>
    )
}

export default Table
import { useContext } from "react";
import yip from "../../../../service/dataHandler";
import Search from './Search'
import { TableContext } from "../../../../utils/TableContext";
import { DashboardContext } from "../../../../utils/DashboardContext";
import { getCurrentPageUtils } from "../../../../utils/utils";
const FilterHeader = (props: any) => {
    const { showFilterBox, setShowFilterBox, setFilterItem, setStatusFilter } = useContext(TableContext)
    const { setCreate } = useContext(DashboardContext)
    return (
        <div className="table-top">
            <h3>{getCurrentPageUtils().content} List</h3>

            <div className='table-fn'>
                <Search />
                <div className="table-fn-btn" onClick={() => { setCreate(true) }}>
                    <i className="fa-solid fa-plus"></i>
                    <p>Add {getCurrentPageUtils().content}</p>
                </div>
                <div className="table-fn-btn" onClick={props.handleFilterClick}>
                    <i className="fa-solid fa-filter"></i>
                    <p>Filter</p>
                </div>
                {showFilterBox && <i
                    className='table-fn-btn fa fa-close '
                    onClick={() => {
                        setShowFilterBox(false);
                        setFilterItem("All")
                        setStatusFilter("All")
                        yip.assemblyFilter = 'All'
                        yip.blockFilter = 'All'
                        yip.updateTable()
                    }}
                ></i>}
            </div>
        </div>
    )
}
export default FilterHeader
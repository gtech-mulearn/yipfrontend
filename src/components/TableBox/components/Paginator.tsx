import { useContext } from "react"
import { TableContext } from "../../../utils/TableContext"

const Paginator = () => {

    const { setPagination, page, tableData } = useContext(TableContext)
    return (
        <div className='paginator'>
            <div>
                <div onClick={() => { setPagination(1) }}>
                    <i   >{"|<<"}</i>
                </div>
                <div onClick={() => { setPagination(page > 1 ? page - 1 : 1) }}>
                    <i >{"|<"}</i>
                </div>

                <input type="text" value={`${page} / ${Math.trunc(tableData.length / 10) + (tableData.length % 10 ? 1 : 0)}`} min={1} max={tableData.length / 10 + (tableData.length % 10 ? 0 : 1)} onChange={(e) => {
                    setPagination(Number(e.target.value))
                }} />
                <div onClick={() => { if (page < Math.trunc(tableData.length / 10) + (tableData.length % 10 ? 1 : 0)) setPagination(page + 1) }}>
                    <i >{">|"}</i></div>
                <div onClick={() => { setPagination(Math.trunc(tableData.length / 10) + (tableData.length % 10 ? 1 : 0)) }}>
                    <i >{">>|"}</i>
                </div>
            </div>
        </div>
    )
}
export default Paginator
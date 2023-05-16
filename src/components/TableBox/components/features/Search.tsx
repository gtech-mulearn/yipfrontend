import { useState, useEffect } from "react"
import yip from "../../../../service/dataHandler"
import { getCurrentPageUtils } from "../../../../utils/utils"
const Search = () => {
    const [search, setSearch] = useState("")
    useEffect(() => {
        yip.collegeSearch(search)
    }, [search])
    return (
        <div className='search-box'>
            <input className='search-bar' type="text" value={search} placeholder={`Search ${getCurrentPageUtils().content}`} onChange={e => {
                setSearch(e.target.value)
            }} />
            {search && <li className='fas fa-close' onClick={() => {
                setSearch('')
            }}></li>}
        </div>
    )
}
export default Search
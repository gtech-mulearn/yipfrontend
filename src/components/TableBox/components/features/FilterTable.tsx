import { useContext, useEffect, useState } from "react"
import yip from "../../../../service/dataHandler"
import Select from 'react-select'
import { getCurrentPageUtils, getRoles, toSentenceCase } from "../../../../utils/utils"
import { DashboardContext } from "../../../../utils/DashboardContext"

const FilterTable = (props: any) => {
    const [assemblyFilter, setAssemblyFilter] = useState('All')
    const [switchAssembly, setSwitchAssembly] = useState(true)
    const [roleFilter, setRoleFilter] = useState('All')
    const { setUpdateData } = useContext(DashboardContext)
    const [roles, setRoles] = useState<string[]>([])
    useEffect(() => {
        getRoles(setRoles)
    }, [getCurrentPageUtils().content])
    useEffect(() => {
        setUpdateData((prev: any) => !prev)
    }, [roleFilter])
    return (
        <div className="filter-container">
            <div className="filter-box">
                {yip.currentPage === 'Model School' && <>
                    <div className="table-fn-btn" onClick={() => {
                        if (switchAssembly)
                            yip.assemblyFilter = "All"
                        else
                            yip.blockFilter = "All"
                        setSwitchAssembly((prev: boolean) => !prev)
                        yip.updateTable()
                    }}>
                        <i className="fa-solid fa-repeat"></i>
                        <p>{`Filter By ${switchAssembly ? 'block' : 'Assembly'}`}</p>
                    </div>
                    {switchAssembly && <Select
                        styles={{
                            control: (baseStyles, state) => ({
                                ...baseStyles,
                                minWidth: "230px",
                            }),
                        }}
                        options={yip.filteredAssembly}
                        isSearchable={true}
                        isClearable={true}
                        placeholder={`Select a Legislative Assembly`}
                        getOptionValue={(option: any) => option.id}
                        getOptionLabel={(option: any) => option.name}
                        onChange={(data: any) => {
                            try {
                                yip.assemblyFilter = data.name
                            } catch (error) {
                                yip.assemblyFilter = "All"
                            }
                            yip.updateTable()
                        }}
                    />}
                    {!switchAssembly && <Select
                        styles={{
                            control: (baseStyles, state) => ({
                                ...baseStyles,
                                minWidth: "230px",
                            }),
                        }}
                        options={yip.filteredBlocks}
                        isSearchable={true}
                        isClearable={true}
                        placeholder={`Select a Block`}
                        getOptionValue={(option: any) => option.id}
                        getOptionLabel={(option: any) => toSentenceCase(option.name)}
                        onChange={(data: any) => {
                            try {
                                yip.blockFilter = data.name

                            } catch (error) {
                                yip.blockFilter = "All"
                            }
                            yip.updateTable()
                        }}
                    />}
                </>}
                {getCurrentPageUtils().content === 'Users' && <Select
                    styles={{
                        control: (baseStyles, state) => ({
                            ...baseStyles,
                            minWidth: "200px",
                        }),
                    }}
                    options={yip.roles}
                    isSearchable={true}
                    isClearable={true}
                    placeholder={`Select a Role`}
                    getOptionValue={(option: any) => option.value}
                    getOptionLabel={(option: any) => option.label}
                    onChange={(data: any) => {
                        try {
                            setRoleFilter(data.label)
                            yip.roleFilter = data.label
                        } catch (error) {
                            setRoleFilter("All")
                            yip.roleFilter = "All"
                        }
                    }}
                />}
                {getCurrentPageUtils().content !== 'Users' && <Select
                    styles={{
                        control: (baseStyles, state) => ({
                            ...baseStyles,
                            minWidth: "200px",
                        }),
                    }}
                    options={yip.district}
                    isSearchable={true}
                    isClearable={true}
                    placeholder={`Select a District`}
                    getOptionValue={(option: any) => option.id}
                    getOptionLabel={(option: any) => option.name}
                    onChange={(data: any) => {
                        try {
                            props.setFilterItem(data.name)
                        } catch (error) {
                            props.setFilterItem("All")
                        }
                    }}
                />}
                {getCurrentPageUtils().content !== 'Users' && getCurrentPageUtils().content !== 'Block' && getCurrentPageUtils().content !== 'Legislative Assembly' && <Select
                    styles={{
                        control: (baseStyles) => ({
                            ...baseStyles,
                            minWidth: "200px",
                        }),
                    }}
                    options={yip.clubStatus}
                    isSearchable={true}
                    isClearable={true}
                    placeholder={`Select a Status`}
                    getOptionValue={(option: any) => option.id}
                    getOptionLabel={(option: any) => option.name}
                    onChange={(data: any) => {
                        try {
                            props.setStatusFilter(data.name)
                        } catch (error) {
                            props.setStatusFilter("All")
                        }
                    }}
                />}

            </div>

        </div >
    )
}
export default FilterTable
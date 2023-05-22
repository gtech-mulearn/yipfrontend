import React, { useEffect, useContext } from "react"
import "./Dashboard.scss"
import { LeftDrawer, BottomTab } from "../../components/Navbar/Navbar"

import TableBox from "../../components/TableBox/TableBox"
import yip from "../../service/dataHandler"
import { fetchInstitutions, fetchData } from '../../service/dashboardService'
import Banner from "../../components/Banner/Banner"
import { DashboardContext } from "../../utils/DashboardContext"
import { TableContextProvider } from "../../utils/TableContext"
import { fetchBlocks, fetchLegislativeAssemblies, fetchUserList, getCurrentPageUtils } from "../../utils/utils"
import Setup from "../../components/SetupBox/Setup"



const Dashboard = () => {
  const { currentOption, dataUpdate, setUpdateData, create, setInstitutions } = useContext(DashboardContext)
  yip.currentPage = getCurrentPageUtils().content
  const content = getCurrentPageUtils().content
  const update = () => {
    setUpdateData(prev => !prev)
  }
  useEffect(() => {
    fetchData()

  }, [])


  useEffect(() => {
    switch (getCurrentPageUtils().content) {
      case 'Users': fetchUserList(setInstitutions)
        break
      case 'Model School': fetchInstitutions(content, setInstitutions)
        break
      case 'YIP Club': fetchInstitutions(content, setInstitutions)
        break
      case 'Legislative Assembly': fetchLegislativeAssemblies(setInstitutions)
        break
      case 'Block': fetchBlocks(setInstitutions)
        break
    }

  }, [getCurrentPageUtils().content, dataUpdate])

  return (
    <>
      <LeftDrawer />
      <div className="dash-container">
        {(getCurrentPageUtils().content === 'YIP Club' || getCurrentPageUtils().content === 'Model School') && <Banner />}
        {create && <Setup />}
        <TableContextProvider>
          <TableBox update={update} />
        </TableContextProvider>
      </div>
      <BottomTab />

    </>
  )
}

export default Dashboard

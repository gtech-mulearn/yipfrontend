import React, { useEffect, useContext } from "react"
import "./Dashboard.scss"
import { LeftDrawer, BottomTab } from "../../components/Navbar/Navbar"
import ClubSetup from "../../components/SetupBox/ClubSetup"
import SchoolSetup from "../../components/SetupBox/SchoolSetup"
import TableBox from "../../components/TableBox/TableBox"
import yip from "../../service/dataHandler"
import { dashboardProps } from "../../service/RouteLink"
import { fetchInstitutions, fetchData } from '../../service/dashboardService'
import Banner from "../../components/Banner/Banner"
import { DashboardContext } from "../../utils/DashboardContext"
import { TableContextProvider } from "../../utils/TableContext"
import { fetchUserList, getCurrentPageUtils } from "../../utils/utils"
import Setup from "../../components/SetupBox/Setup"
const Dashboard: React.FC<dashboardProps> = ({ content }) => {
  const { currentOption, dataUpdate, setUpdateData, create, setInstitutions } = useContext(DashboardContext)
  yip.currentPage = content
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
    }

  }, [currentOption, dataUpdate])

  return (
    <>
      <LeftDrawer />
      <div className="dash-container">
        {getCurrentPageUtils().content !== 'Users' && <Banner />}
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

import React, { useState, useEffect, useContext } from "react"
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
const Dashboard: React.FC<dashboardProps> = ({ content }) => {
  const { currentOption, dataUpdate, setUpdateData, create, setCreate, institutions, setInstitutions } = useContext(DashboardContext)
  yip.currentPage = content
  const update = () => {
    setUpdateData(prev => !prev)
  }
  useEffect(() => {
    fetchData()

  }, [])
  useEffect(() => {
    fetchInstitutions(content, setInstitutions)
  }, [currentOption, dataUpdate])

  return (
    <>
      <LeftDrawer />
      <div className="dash-container">
        <Banner />
        {create && (currentOption === "Model School" ? <SchoolSetup /> : <ClubSetup />)
        }
        <TableContextProvider>
          <TableBox update={update} />
        </TableContextProvider>
      </div>

      <BottomTab />

    </>
  )
}

export default Dashboard

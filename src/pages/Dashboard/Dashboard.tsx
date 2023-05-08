import React, { useState, useEffect } from "react"
import "./Dashboard.scss"
import { LeftDrawer, BottomTab } from "../../components/Navbar/Navbar"
import ClubSetup from "../../components/SetupBox/ClubSetup"
import SchoolSetup from "../../components/SetupBox/SchoolSetup"
import TableBox from "../../components/TableBox/TableBox"
import yip from "../../service/dataHandler"
import { dashboardProps } from "../../service/RouteLink"
import { fetchInstitutions, fetchData } from '../../service/dashboardService'
import Banner from "../../components/Banner/Banner"

const Dashboard: React.FC<dashboardProps> = ({ content }) => {
  const [currentOption, setCurrentOption] = useState<string>(content)
  const [dataUpdate, setUpdateData] = useState(true)
  const [create, setCreate] = useState(false)
  const [institutions, setInstitutions] = useState([])

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
      <LeftDrawer setCurrentOption={setCurrentOption} currentOption={currentOption} />
      <div className="dash-container">
        <Banner currentOption={currentOption} dataUpdate={dataUpdate} />
        {create &&
          currentOption === "Model School" ? <SchoolSetup setUpdateData={setUpdateData} dataUpdate={dataUpdate} create={create} setCreate={setCreate} /> :
          <ClubSetup setUpdateData={setUpdateData} dataUpdate={dataUpdate} create={create} setCreate={setCreate} />
        }
        <TableBox current_option={currentOption} institutions={institutions} update={update} dataUpdate={dataUpdate} setCreate={setCreate} setUpdateData={setUpdateData} />
      </div>

      <BottomTab setCurrentOption={setCurrentOption} currentOption={currentOption} />

    </>
  )
}

export default Dashboard

import React, { useState, useEffect } from "react"
import "./Dashboard.scss"
import LeftDrawer from "../../components/LeftDrawer/LeftDrawer"
import BannerImg from "../../assets/Study abroad-pana.png"
import ClubSetup from "../../components/SetupBox/ClubSetup"
import SchoolSetup from "../../components/SetupBox/SchoolSetup"
import TableBox from "../../components/TableBox/TableBox"
import BottomTab from "../../components/BottomTab/BottomTab"
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
  fetchData()
  useEffect(() => {
    fetchInstitutions(content, setInstitutions)
  }, [currentOption, dataUpdate])

  return (
    <>
      <LeftDrawer setCurrentOption={setCurrentOption} currentOption={currentOption} />
      <div className="dash-container">
        <Banner currentOption={currentOption} dataUpdate={dataUpdate} />
        {
          currentOption === "Model School" ? <SchoolSetup setUpdateData={setUpdateData} dataUpdate={dataUpdate} create={create} setCreate={setCreate} /> :
            <ClubSetup setUpdateData={setUpdateData} dataUpdate={dataUpdate} create={create} setCreate={setCreate} />
        }
        <TableBox current_option={currentOption} institutions={institutions} update={update} dataUpdate={dataUpdate} setCreate={setCreate} setUpdateData={setUpdateData} />
      </div>
      <div className="bottom-tab-container">
        <BottomTab setCurrentOption={setCurrentOption} currentOption={currentOption} />
      </div>
    </>
  )
}

export default Dashboard

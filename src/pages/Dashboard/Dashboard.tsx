import React, { useState, useEffect } from "react"
import "./Dashboard.scss"
import LeftDrawer from "../../components/LeftDrawer/LeftDrawer"
import BannerImg from "../../assets/Study abroad-pana.png"

import SchoolSetup from "../../components/SetupBox/SchoolSetup"
import TableBox from "../../components/TableBox/TableBox"
import BottomTab from "../../components/BottomTab/BottomTab"
import UserTableBox from "../../components/TableBox/UserTablebox"

const Dashboard = (props: any) => {
  const [currentOption, setCurrentOption] = useState<string>("Model School")
  const [isUser, setIsUser] = useState(false)
  const [modelSchool, setModelSchool] = useState([])
  const handleOptionChange = (value: string) => {
    setCurrentOption(value)
    if (value == "User") {
      setIsUser(true)
    } else if (value == "Block") {
      setIsUser(false)
    }

    console.log("current selected: ", value)
  }
  useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        "Content-Type": "application/json"
      }
    };
    const fetchData = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_BACKEND_URL + `/api/v1/yip/get-model-schools/`, requestOptions);
        const data = await response.json();
        setModelSchool(data.response.clubs);
      } catch (error) {
        console.error("this is error", error);
      }
    };
    fetchData();
  }, [])
  return (
    <>
      <LeftDrawer onValueChange={handleOptionChange} />
      <div className="dash-container">
        <Banner />
        {props.children}
        {isUser ? (
          <UserTableBox current_option={currentOption} />
        ) : (
          <TableBox current_option={currentOption} />
        )}
      </div>
      <div className="bottom-tab-container">
        <BottomTab onValueChange={handleOptionChange} />
      </div>
    </>
  )
}

const Banner = () => {
  const [count, setCount]: any = useState([])
  useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        "Content-Type": "application/json"
      }
    };
    const fetchData = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_BACKEND_URL + `/api/v1/yip/get-clubs-count/School/`, requestOptions);
        const data = await response.json();
        setCount(data.response);
      } catch (error) {
        console.error("this is error", error);
      }
    };
    fetchData();
  }, [])
  return (
    <div className="banner-container">
      <div className="welcome-banner">
        <div className="statistics">
          <div className="box blue-box">
            <h3>{count["Identified"]}<div className="count"><div className="count-in">140</div></div></h3>
            <p>Identified</p>
          </div>
          <div className="box blue-box">
            <h3>{count["Confirmed"]}<div className="count"><div className="count-in">140</div></div></h3>
            <p>Confirmed</p>
          </div>
          <div className="box blue-box">
            <h3>{count["Connection established"]}<div className="count"><div className="count-in">140</div></div></h3>
            <p>Connected</p>
          </div>
          <div className="box light-blue-box">
            <h3>{count["Orientation Scheduled"]}<div className="count"><div className="count-in">140</div></div></h3>
            <p>Orientation Scheduled</p>
          </div>
          <div className="box light-blue-box">
            <h3>{count["Orientation Completed"]}<div className="count"><div className="count-in">140</div></div></h3>
            <p>Orientation Completed </p>
          </div>
          <div className="box light-blue-box">
            <h3>{count["Execom Formed"]}<div className="count"><div className="count-in">140</div></div></h3>
            <p>Execom Formed</p>
          </div>
        </div>
        <div className="welcome-image-container">
          <img id="banner-img" src={BannerImg} alt="" />
        </div>
      </div>
    </div>
  )
}

export default Dashboard

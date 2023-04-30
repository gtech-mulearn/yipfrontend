import React, { useState, useEffect } from "react"
import "./Dashboard.scss"
import LeftDrawer from "../../components/LeftDrawer/LeftDrawer"
import BannerImg from "../../assets/Study abroad-pana.png"

import SchoolSetup from "../../components/SetupBox/SchoolSetup"
import TableBox from "../../components/TableBox/TableBox"
import BottomTab from "../../components/BottomTab/BottomTab"
import UserTableBox from "../../components/TableBox/UserTablebox"
import apiGateway from "../../service/apiGateway"
import yip from "../../service/dataHandler"
const Dashboard = (props: any) => {
  const [currentOption, setCurrentOption] = useState<string>(props.Content)
  const [updateOption, setUpdate] = useState(true)
  const [data, setData] = useState([])
  const [districts, setDistricts] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      apiGateway.get(`/api/v1/yip/district/`)
        .then(({ data }) => {
          const { districts } = data.response;
          setDistricts(districts);
        })
        .catch(error => console.error(error));
    }
    fetchData()
  }, [])
  const handleOptionChange = (value: string) => {
    setCurrentOption(value)
  }
  const update = () => {
    setUpdate(prev => !prev)
  }
  useEffect(() => {
    const fetchData = async () => {
      apiGateway.get(`/api/v1/yip/${props.Content === "Model School" ? "get-model-schools" : "get-colleges"}/`)
        .then(res => {
          setData(res.data.response.clubs)
        }).catch(error => console.log(error))
    }
    fetchData()
  }, [currentOption, updateOption, props.dataUpdate])
  return (
    <>
      <LeftDrawer onValueChange={handleOptionChange} currentOption={currentOption} />
      <div className="dash-container">
        <Banner currentOption={currentOption} updateOption={updateOption} dataUpdate={props.dataUpdate} />
        {props.children}
        <TableBox current_option={currentOption} institutions={data} update={update} dataUpdate={props.dataUpdate} setCreate={props.setCreate} setUpdateData={props.setUpdateData} />
      </div>
      <div className="bottom-tab-container">
        <BottomTab onValueChange={handleOptionChange} currentOption={currentOption} />
      </div>
    </>
  )
}

const Banner = (props: any) => {
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
        const response = await fetch(import.meta.env.VITE_BACKEND_URL + `/api/v1/yip/get-clubs-count/${props.currentOption === "Model School" ? "School" : "College"}/`, requestOptions);
        const data = await response.json();
        setCount(data.response);
      } catch (error) {
        console.error("this is error", error);
      }
    };
    fetchData();
  }, [props.currentOption, props.updateOption, props.dataUpdate])
  return (
    <div className="banner-container">
      <div className="welcome-banner">
        <div className="statistics">
          <div className="box blue-box">
            <h3>{count["Identified"]}<div className="count"><div className="count-in">{count.total}</div></div></h3>
            <p>Identified</p>
          </div>
          <div className="box blue-box">
            <h3>{count["Confirmed"]}<div className="count"><div className="count-in">{count.total}</div></div></h3>
            <p>Confirmed</p>
          </div>
          <div className="box blue-box">
            <h3>{count["Connection established"]}<div className="count"><div className="count-in">{count.total}</div></div></h3>
            <p>Connected</p>
          </div>
          <div className="box light-blue-box">
            <h3>{count["Orientation Scheduled"]}<div className="count"><div className="count-in">{count.total}</div></div></h3>
            <p>Orientation Scheduled</p>
          </div>
          <div className="box light-blue-box">
            <h3>{count["Orientation Completed"]}<div className="count"><div className="count-in">{count.total}</div></div></h3>
            <p>Orientation Completed </p>
          </div>
          <div className="box light-blue-box">
            <h3>{count["Execom Formed"]}<div className="count"><div className="count-in">{count.total}</div></div></h3>
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

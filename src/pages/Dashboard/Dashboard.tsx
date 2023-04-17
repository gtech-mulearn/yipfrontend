import React,{useState,useEffect} from 'react'
import './Dashboard.scss'
import LeftDrawer from '../../components/LeftDrawer/LeftDrawer'
import BannerImg from '../../assets/Study abroad-pana.png'

import SchoolSetup from '../../components/SetupBox/SchoolSetup'
import TableBox from '../../components/TableBox/TableBox'
import BottomTab from '../../components/BottomTab/BottomTab'
import UserTableBox from '../../components/TableBox/UserTablebox'




const Dashboard = (props:any)=> {

  const[currentOption,setCurrentOption] = useState<string>("Model School")
  const[isUser,setIsUser] = useState(false)
  
  const handleOptionChange = (value:string) => {
    setCurrentOption(value);
    if (value == "User"){
      setIsUser(true)
    }else if(value == "Block"){
      setIsUser(false)
    }

    console.log("current selected: ",value)
  };

  return (
    <>
      <LeftDrawer onValueChange={handleOptionChange}/>
      <div className="dash-container">
        <Banner/>
        {props.children}
       <h1>het</h1>
      </div>
      <div className="bottom-tab-container">
        <BottomTab onValueChange={handleOptionChange}/>
      </div>
    </>
  )
}

const Banner = ()=>{
  return (
    <div className="banner-container">
      <div className="welcome-banner">
        <div className="statistics">
          <div className="box blue-box">
            <h3>30</h3>
            <p>Active</p>
          </div>
          <div className="box light-blue-box">
            <h3>370</h3>
            <p>Pending</p>
          </div>
        </div>
        <div className="welcome-image-container">
          <div className="welcome-text">
            <h1>Welcome Back !</h1>
          </div>
          <img id="banner-img" src={BannerImg} alt=""/>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

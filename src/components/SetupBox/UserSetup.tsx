import React,{useState,useEffect} from 'react'
import Select from 'react-select';
import './Setup.scss'
import setupImg from '../../assets/Kindergarten student-bro 1.png'

const roles = [
  [
      "SA",
      "Super Admin"
  ],
  [
      "AD",
      "Admin"
  ],
  [
      "HQ",
      "Hq Staff"
  ],
]

// const club = ['District','College']

// interface SelectItemProps {
//   item: string;
//   list: any;
// }

// interface DistrictProps {
//   id: string;
//   name: string;
// }

// interface CollegeProps {
//   id: string;
//   title: string;
// }

const UserSetup = () => {

    // useEffect(() => {
    //   const fetchData = async () => {
    //     try {
    //       const response = await fetch(
    //         'https://dev.mulearn.org/api/v1/yip/district/'
    //       )
    //       const data = await response.json()
    //       const dataItems = data.response.districts.map(
    //         (item: any) => ({
    //           id:item.id,
    //           name: item.name,
    //         })
    //       )
    //       setDistricts(dataItems)
    //       console.log(dataItems)
    //     } catch (error) {
    //       console.error(error)
    //     }
    //   };
    //   fetchData();
    // }, []);

    // useEffect(() => {
    //   const reqData:any = {
    //     district: districtName
    //   }
    //   console.log(districtSelected)
    //   if (districtSelected) {
    //     console.log("req data : ",JSON.stringify(reqData))
    //     const requestOptions = {
    //       method: "POST",
    //       headers: { "Content-Type": "application/json" },
    //       body: JSON.stringify(reqData)
    //     };
    //     const fetchSchool = async () => {
    //       try {
    //         const response = await fetch(
    //           `https://dev.mulearn.org/api/v1/organisation/institutes/College/`,requestOptions
    //         );
    //         const data = await response.json();
    //         console.log("college: ",data)
    //         console.log(data.response.institutions);
    //         setCollege(data.response.institutions);
    //       } catch (error) {
    //         console.error(error);
    //       }
    //     };
    //     fetchSchool();
    //   }
    // }, [districtSelected]);

    // const sendData = ():any =>{
    //   const postData:any = {
    //     club_name: collegeName,
    //     institute_type : "College",
    //     institute_id : collegeSelected,
    //     district_id: districtSelected,
    //   }
    //   const postOptions = {
    //     method: "POST",
    //     headers: {"Content-Type": "application/json"},
    //     body: JSON.stringify(postData)
    //   };
      
    //   const createData = async () => {
    //     try {
    //       console.log(postOptions)
    //       const response = await fetch(
    //         `https://dev.mulearn.org/api/v1/yip/create-college-club/`,postOptions
    //       );
    //       console.log(response)
    //       const data = await response.json();
    //       console.log("response : ",data)   
    //     } catch (error) {
    //       console.error(error);
    //     }
    //   };
    //   createData();
    //   console.log("data send!!")
    // }

    // const handleDistrict = (data:any) => {
    //   setDistrictSelected(data.id);
    //   console.log("dist selected : ",data)
    //   setDistrictName(data.name)   
    // };

    return (
        <div className="white-container">
            <h3>Setup a new User</h3>
            <div className="setup-club">
                <div className="setup-filter">
                    <div className="select-container club">
                    <div className="setup-item" id="district">
                        <p>Name</p>
                        <input type="text" name="name" placeholder='Type User Name' id="username" />
                    </div>
                    <div className="setup-item" id="district">
                        <p>Email</p>
                        <input type="email" name="email" placeholder='Type Email Address' id="email" />
                    </div>
                    <div className="setup-item" id="district">
                        <p>Phone Number</p>
                        <input type='number' name="phone" placeholder='Type Phone Number' id="phone" />
                    </div>
                    <div className="setup-item" id="district">
                        <p>Role</p>
                        <Select
                          options={roles}
                          isSearchable={true}
                          isClearable={true}
                          placeholder={`Select a District`}
                          getOptionValue={(option:any) => option[0]}
                          getOptionLabel={(option:any) => option[1]}
                        />
                    </div>
                    <div className="setup-item" id="district">
                        <p>Password</p>
                        <input type="password" name="password" placeholder='Type Password' id="password" />
                    </div>
                        <button 
                          id="create_btn" 
                          className="black-btn"
                          onClick={()=>{
                            // sendData();
                          }} >Create</button>
                    </div>
                </div>
                <div className="setup-img">
                    <img src={setupImg} alt="HI" />
                </div>
            </div>
        </div>
    )
}

export default UserSetup

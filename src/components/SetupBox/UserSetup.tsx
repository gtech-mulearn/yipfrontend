import React, { useState, useEffect } from "react"
import Select from "react-select"
import "./Setup.scss"
import setupImg from "../../assets/Kindergarten student-bro 1.png"

const roles = [
  {
    value: "SA",
    label: "Super Admin",
  },
  {
    value: "AD",
    label: "Admin",
  },
  {
    value: "HQ",
    label: "Hq Staff",
  },
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
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [role, setRole] = useState("")
  const [password, setPassword] = useState("")

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(
  //         'https://dev.mulearn.org/api/v1/district/'
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
  //         `https://dev.mulearn.org/api/v1/create-college-club/`,postOptions
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
  const onNameChange = (e: any) => {
    setName(e.target.value)
  }

  const onEmailChange = (e: any) => {
    setEmail(e.target.value)
  }

  const onPhoneNumberChange = (e: any) => {
    setPhoneNumber(e.target.value)
  }

  const onRoleChange = (e: any) => {
    console.log(e[1])
    setRole(e[1])
  }

  const onPasswordChange = (e: any) => {
    setPassword(e.target.value)
  }

  const [errorStatus, setErrorStatus] = useState<boolean>(false)

  const sendData = (): any => {
    const postData: any = {
      name: name,
      email: email,
      phone: phoneNumber,
      role: role,
      password: password,
    }
    const postOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    }

    const createData = async () => {
      try {
        const response = await fetch(
          import.meta.env.VITE_BACKEND_URL + `/api/v1/create-user/`,
          postOptions
        )
        console.log(response)
        const data = await response.json()
        if (data.statusCode == 400) {
          setErrorStatus(true)
        } else {
          setErrorStatus(false)
        }
        console.log("response : ", data)
      } catch (error) {
        console.error(error)
      }
    }
    createData()
    console.log("data send!!")
  }

  return (
    <div className="white-container">
      <h3>Create a new User</h3>
      {errorStatus ? <ErrorBox /> : <></>}
      <div className="setup-club">
        <div className="setup-filter">
          <div className="select-container club">
            <div className="setup-item" id="district">
              <p>Name</p>
              <input
                type="text"
                name="name"
                placeholder="Name"
                id="name"
                onChange={onNameChange}
              />
            </div>
            <div className="setup-item" id="district">
              <p>Email</p>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                id="email"
                onChange={onEmailChange}
              />
            </div>
            <div className="setup-item" id="district">
              <p>Phone Number</p>
              <input
                type="number"
                name="phone"
                placeholder="Phone Number"
                id="phone"
                onChange={onPhoneNumberChange}
              />
            </div>
            <div className="setup-item" id="district">
              <p>Role</p>
              <Select
                options={roles}
                isSearchable={true}
                isClearable={true}
                placeholder="Select a Role"
                getOptionValue={(option: any) => option.value}
                getOptionLabel={(option: any) => option.label}
                onChange={onRoleChange}
              />
            </div>
            <div className="setup-item" id="district">
              <p>Password</p>
              <input
                type="password"
                name="password"
                placeholder="Password"
                id="password"
                onChange={onPasswordChange}
              />
            </div>
            <button
              id="create_btn"
              className="black-btn"
              onClick={() => {
                sendData()
              }}
            >
              Create
            </button>
          </div>
        </div>
        <div className="setup-img">
          <img src={setupImg} alt="HI" />
        </div>
      </div>
    </div>
  )
}

const ErrorBox = () => {
  return (
    <div id="login-error" className="login-error">
      <p>Error: Email Already Exists!</p>
    </div>
  )
}

export default UserSetup

import React from "react";
import Select from "react-select/dist/declarations/src/Select";

let statusOptions = ["Orientation Scheduled","Connection established","Identified"]

const sendData = (club_id: string, club_status: string): any => {
  const postData: any = {
      club_id: club_id,
      club_status: club_status
  }
  const postOptions = {
      method: "PUT",
      headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
  }

  const updateStatus = async () => {
      try {
          const response = await fetch(
              import.meta.env.VITE_BACKEND_URL + `/api/v1/yip/update-club/`,
              postOptions
          )
          console.log(response)
          const data = await response.json()
          // if (data.statusCode == 400) {
          //     setErrorStatus(true)
          // } else {
          //     setErrorStatus(false)
          // }
          console.log("response : ", data)
      } catch (error) {
          console.error(error)
      }
  }
  updateStatus()
  console.log("data send!!")
}

  export const UserTableData = (data:any)=> {
    return(
        <ul>
        <li  className="value">1</li>
        <li  className="value">{data.data.name}</li>
        <li  className="value">{data.data.email}</li>
        <li  className="value">{data.data.phone}</li>
        <li  className="value">{data.data.role}</li>
        <li className="value editable">
            <select name="" id="">
                {statusOptions.map((item:string):any=>{
                    return <option value={item}>{item}</option>;
                })}
            </select>
          <a id="edit">
            <i className="fa-solid fa-pen-to-square"></i>Edit
          </a>
        </li>
      </ul>
    )
  }

  export const LegislativeTableData = (data:any)=> {
    return (
        <ul>
        <li  className="value">1</li>
        <li  className="value">{data.data.name}</li>
        <li  className="value">{data.data.district}</li>
        <li className="value editable">
          <a id="edit">
            <i className="fa-solid fa-pen-to-square"></i>Edit
          </a>
        </li>
      </ul>
    )
  }

  export const BlockTableData = (data:any)=> {
    return (
        <ul>
        <li  className="value">1</li>
        <li  className="value">{data.data.name}</li>
        <li  className="value">{data.data.district}</li>
        <li className="value editable">
          <a id="edit">
            <i className="fa-solid fa-pen-to-square"></i>Edit
          </a>
        </li>
      </ul>
    )
  }

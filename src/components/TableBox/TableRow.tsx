import React from "react";
import Select from "react-select/dist/declarations/src/Select";

let statusOptions = ["Orientation Scheduled","Connection established","Identified"]

export const ClubTableData = (data:any,key:number) => {
    return (
      <ul id="clubs_listed">
        <li id="sl_no" className="value">1</li>
        <li id="club_id" className="value">{data.data.name}</li>
        <li id="district" className="value">{data.data.district}</li>
        <li className="value editable">
          <a className="table-btn completed" href="#">
            {data.data.club_status}
          </a>
          <a id="edit">
            <i className="fa-solid fa-pen-to-square"></i>Edit
          </a>
        </li>
      </ul>
    );
  };

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

import React, { useState, useEffect } from 'react'
import './TableBox.scss'
import fakeData from './fakeData.json'
import Select from 'react-select';

const schoolTableTitle = ["SL","Name","District","Legislative Assembly","Block","Status"]
const clubTableTitle = ["SL","Name","District","Status"]
const userTableTitle = ["SL","Name","Email","Phone","Role","Status"]

// interface Item {
//     place_name: string;
//     region: string;
//     city: string;
//     status: string;
// }

// interface ListProps {
//     fakeData: Item[]
// }

// identified
// confirmation
// connection
// execom-formation


interface tableProps {
    current_option:string
}

interface tableBoxProps{
    id : string,
    name : string,
    institute_type : string,
    legislative_assembly : string,
    status: boolean,
  }


const TableBox: React.FC<tableProps> = ({current_option}) => {
    const [showFilterBox, setShowFilterBox] = useState(false);
    const [filterItem,setFilterItem] = useState("all")
    const [showSortBox, setShowSortBox] = useState(false);
    const [districts,setDistricts] = useState([])
    const [tableData,setTableData] = useState<tableBoxProps[]>([])

    let tableTitle = []
    if(current_option === "Model School"){
        tableTitle = schoolTableTitle
    }else if(current_option === "YIP Club"){
        tableTitle = clubTableTitle
    }else{
        tableTitle = userTableTitle
    }

    useEffect(()=>{

        console.log(current_option)

        let link_item = ""
        
        if(current_option === "Model School"){
            link_item = "get-model-schools"
        }else if(current_option === "YIP Club"){
            link_item = "get-colleges"
        }else{
            link_item = "get-users"
        }


    
        const requestOptions = {
          method: "GET",
          headers: { 
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            "Content-Type": "application/json" }
        };
    
        const fetchData = async () => {
          try {
            const response = await fetch(import.meta.env.VITE_BACKEND_URL+`/api/v1/yip/${link_item}/`,requestOptions);
            const data = await response.json();
            setTableData(data.response.clubs);
          } catch (error) {
            console.error("this is error",error);
          }
        };
        fetchData();
      },[current_option])

    useEffect(()=>{ 
        const requestOptions = {
            method: "GET",
            headers: { 
              'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
              "Content-Type": "application/json" }
          };
        const fetchData = async () => {
          try {
            const response = await fetch(import.meta.env.VITE_BACKEND_URL+`/api/v1/yip/district/`,requestOptions);
            const data = await response.json();
            console.log("districts for filter:",data.response.districts);
            setDistricts(data.response.districts)
          } catch (error) {
            console.error("this is error",error);
          }
        };
        fetchData();
      },[])

    const handleFilterClick = () => {
        setShowFilterBox(!showFilterBox);
        setShowSortBox(false);
    }

    const handleSortClick = () => {
        setShowSortBox(!showSortBox);
        setShowFilterBox(false);
    }
    return (
        <div className='white-container'>
            <div className="table-top">
                <h3>Table List</h3>
                <div className='table-fn'>
                    <div className="table-fn-btn" onClick={handleFilterClick}>
                        <i className="fa-solid fa-filter"></i>
                        <p>Filter</p>
                    </div>
                    {/* <div className="table-fn-btn">
                        <i className="fa-solid fa-sort" onClick={handleSortClick}></i>
                        <p>Sort</p>
                    </div> */}
                </div>
            </div>
            <div className="filter-container">
                {showFilterBox && ( 
                    <div className="filter-box">
                        <Select
                            options={districts}
                            isSearchable={true}
                            isClearable={true}
                            placeholder={`Select a District`}
                            getOptionValue={(option: any) => option.id}
                            getOptionLabel={(option: any) => option.name}
                            onChange={(data:any)=>{
                                setFilterItem(data.name)
                                console.log(data.name)
                            }}
                        />
                        <button 
                            className='black-btn'
                            onClick={()=>{
                                setShowFilterBox(false);
                                setFilterItem("all")
                            }}
                            >Close</button>
                    </div>
                )}
                {/* {showSortBox && (
                            <div className="sort-box">
                                <div className="sort">
                                    <input type="checkbox" name="sort-item" id="identified"/><label>Identified</label>
                                    <input type="checkbox" name="sort-item" id="identified"/><label>Identified</label>
                                    <input type="checkbox" name="sort-item" id="identified"/><label>Identified</label>
                                </div>
                            </div>
                        )} */}
            </div>
            <div id="table-container" className="table-container">
                <div className="table-list">
                    <div className="table-title">
                        <ul>
                            {
                                tableTitle.map((item:any,index:number)=>{
                                    return <li key={index}>{item}</li>
                                })
                            }
                        </ul>
                    </div>
                    <div className="table-content">
                        {
                            filterItem === "all"
                            ? tableData && tableData
                                  .map((item: any, i: number) => {
                                      return (
                                        <>
                                        <ul id="clubs_listed">
                                            <li id="sl_no" className="value">{i + 1}</li>
                                            <li id="club_id" className="value" value="{{club.id}}">{item.name}</li>
                                            <li className="value" value="{{club.id}}">{item.district}</li>
                                            {item.legislative_assembly && <li className="value" value="{{club.district.id}}">{item.legislative_assembly}</li>}
                                            {item.block && <li className="value">{item.block}</li>}
                                            {item.club_status && <li className="value editable">
                                                <a className="table-btn completed" href="#">{item.club_status}</a>
                                                <a id="edit">
                                                    <i className="fa-solid fa-pen-to-square"></i>Edit</a>
                                            </li>}
                                        </ul>
                                    </>
                                      );
                                  })
                            : tableData
                            .filter((item: any) => {
                                return item.district === filterItem;
                            })
                            .map((item: any, i: number) => {
                                  return (
                                    <>
                                    <ul id="clubs_listed">
                                        <li id="sl_no" className="value">{i + 1}</li>
                                        <li id="club_id" className="value" value="{{club.id}}">{item.name}</li>
                                        <li className="value" value="{{club.id}}">{item.district}</li>
                                        {item.legislative_assembly && <li className="value" value="{{club.district.id}}">{item.legislative_assembly}</li>}
                                        {item.block && <li className="value">{item.block}</li>}
                                        {item.club_status && <li className="value editable">
                                            <a className="table-btn completed" href="#">{item.club_status}</a>
                                            <a id="edit">
                                                <i className="fa-solid fa-pen-to-square"></i>Edit</a>
                                        </li>}
                                    </ul>
                                </>
                                  );
                              })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TableBox

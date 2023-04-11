import React, { useEffect, useState } from 'react'
import Select from 'react-select';
import './Setup.scss'
import setupImg from '../../assets/Kindergarten student-bro 1.png'
import axios from 'axios';
import legData from './leg-test.json'

const schoolItems = ['District','Legislative Assembly', 'School']

interface SelectItemProps {
  item: string;
  list: any;
  onData: (data: string) => void;
}

interface SchoolList {
  id: string;
  title: string;
}

interface DistrictProps {
  id: string;
  name: string;
  response: any;
}

interface LegislativeAssemblyProps {
  id: string;
  name: string;
}

const SelectItem: React.FC<SelectItemProps> = ({ item,list,onData }) => {
  const [selectedDistrict, setSelectedDistrict] = useState("04906c30-0d57-4e93-a09e-3931aaf78e3d");
  const [renderList,setRenderList] = useState([])
  const handleChange = (e:any)=> {
    setSelectedDistrict(e.id);
    console.log(e.id);
    onData(e.id)
  }

  // const filteredList = list.filter((option: any) => {
  //   if (item === "District") {
  //     return true
  //   } else if (item === "Legislative Assembly") {
  //     return option.district === selectedDistrict;
  //   }
  //   return false;
  // });

  return (
    <div className="setup-item" id="district">
      <p>{item}</p>
      <Select
        options={list}
        isSearchable={true}
        isClearable={true}
        placeholder={`Select a ${item}`}
        getOptionValue={(option: any) => option.id}
        getOptionLabel={(option: any) => option.name}
        onChange={handleChange}
      />
    </div>
  );
};

const SchoolSetup = () => {
  // let itemsToRender: string[] = [];
  // if (activeItem === "Model School") {
  //     itemsToRender = schoolItems
  // }else{
    //     itemsToRender = club
    // }

    const [districts, setDistricts] = useState<DistrictProps[]>([])
    const [legislativeAssemblies, setLegislativeAssemblies] = useState<LegislativeAssemblyProps[]>([]);
    const [districtSelected, setDistrictSelected] = useState("");

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch("https://dev.mulearn.org/api/v1/yip/district/");
          const data = await response.json();
          console.log("districts:",data);
          setDistricts(data.response.districts);
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }, []);

    useEffect(() => {
      if (districtSelected) {
        // const requestBody = {
        //   district_id: districtSelected,
        // };
        // const requestOptions = {
        //   method: "GET",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify(requestBody),
        // };
        // console.log(JSON.stringify(requestBody))
        // const fetchLegislativeAssemblies = async () => {
        //   try {
        //     const response = await fetch(
        //       "https://dev.mulearn.org/api/v1/yip/get-legislative-assembly/",
        //       requestOptions
        //     );
        //     const data = await response.json();
        //     console.log("leg: ",data);
        //     setLegislativeAssemblies(data.response.legislative_assemblies);
        //   } catch (error) {
        //     console.error(error);
        //   }
        // };
        // fetchLegislativeAssemblies();
        // console.log(legData.response.legislativeAssembly)
        setLegislativeAssemblies([]);
        legData.response.legislativeAssembly.map((item:any)=>{
          setLegislativeAssemblies(value => [...value,item]);
        })
        console.log("leg: ",legislativeAssemblies)
      }

    }, [districtSelected]);

    const handleDistrict = (data: string) => {
      setDistrictSelected(data);
    };
    return (
      <div className="white-container">
      <h3>Setup a new School</h3>
      <div className="setup-club">
        <div className="setup-filter">
          <div className="select-container club">
              <SelectItem item={"District"} list={districts} onData={handleDistrict} />
              <SelectItem item={"Legislative Assembly"} list={legislativeAssemblies} onData={handleDistrict} />
              <SelectItem item={"School"} list={districts} onData={handleDistrict} />
            <button id="create_btn" className="black-btn" >Create</button>
          </div>
        </div>
        <div className="setup-img">
          <img src={setupImg} alt="HI" />
        </div>
      </div>
    </div>
  )
}

export default SchoolSetup

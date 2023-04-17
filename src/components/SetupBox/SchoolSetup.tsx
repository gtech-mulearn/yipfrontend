import React, { useEffect, useState } from "react"
import Select from "react-select"
import "./Setup.scss"
import setupImg from "../../assets/Kindergarten student-bro 1.png"
import axios from "axios"

interface SelectItemProps {
  item: string
  list: any
  onData: (data: string) => void
}

interface SchoolList {
  id: string
  title: string
}

interface DistrictProps {
  id: string
  name: string
  response: any
}

interface LegislativeAssemblyProps {
  id: string
  name: string
}

interface SchoolProps {
  id: string
  title: string
}

const SelectItem: React.FC<SelectItemProps> = ({ item, list, onData }) => {
  const [selectedDistrict, setSelectedDistrict] = useState("")
  const [renderList, setRenderList] = useState([])
  const handleChange = (e: any) => {
    setSelectedDistrict(e.id)
    console.log(e.id)
    const handleData: any = {
      id: e.id,
      name: e.name,
    }
    console.log(handleData)
    onData(handleData)
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
        getOptionLabel={(option: any) =>
          item === "School" ? option.title : option.name
        }
        onChange={handleChange}
      />
    </div>
  )
}

const SchoolSetup = () => {
  const [districts, setDistricts] = useState<DistrictProps[]>([])
  const [legislativeAssemblies, setLegislativeAssemblies] = useState<
    LegislativeAssemblyProps[]
  >([])
  const [school, setSchool] = useState<SchoolProps[]>([])
  const [blocks, setBlocks] = useState<SchoolProps[]>([])
  const [districtSelected, setDistrictSelected] = useState("")
  const [districtName, setDistrictName] = useState("")
  const [legSelectedId, setLegSelectedId] = useState("")
  const [blockSelectedId, setBlockSelectedId] = useState("")
  const [schoolSelectedId, setSchoolSelectedId] = useState("")
  const [schoolSelectedName, setSchoolSelectedName] = useState("")

  useEffect(() => {
    const requestOptions = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "application/json",
      },
      method: "GET",
    }
    const fetchData = async () => {
      try {
        const response = await fetch(
          import.meta.env.VITE_BACKEND_URL + `/api/v1/yip/district/`,
          requestOptions
        )
        const data = await response.json()
        console.log("districts:", data)
        setDistricts(data.response.districts)
      } catch (error) {
        console.error("this is error", error)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    console.log("dist selected:", districtSelected)
    const requestOptions = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "application/json",
      },
      method: "GET",
    }
    if (districtSelected) {
      const fetchLegislativeAssemblies = async () => {
        try {
          const response = await fetch(
            import.meta.env.VITE_BACKEND_URL +
              `/api/v1/yip/get-legislative-assembly/${districtSelected}/`,
            requestOptions
          )
          const data = await response.json()
          console.log(data)
          console.log(data.response.legislativeAssembly)
          setLegislativeAssemblies(data.response.legislativeAssembly)
        } catch (error) {
          console.error(error)
        }
      }
      fetchLegislativeAssemblies()
    }
  }, [districtSelected])

  useEffect(() => {
    console.log("block selected:", blockSelectedId)
    const requestOptions = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "application/json",
      },
      method: "GET",
    }
    if (districtSelected) {
      const fetchBRC = async () => {
        try {
          const response = await fetch(
            import.meta.env.VITE_BACKEND_URL +
              `/api/v1/yip/get-blocks/${districtSelected}/`,
            requestOptions
          )
          const data = await response.json()
          console.log(data)
          console.log(data.response.block)
          setBlocks(data.response.block)
        } catch (error) {
          console.error(error)
        }
      }
      fetchBRC()
    }
  }, [districtSelected])

  useEffect(() => {
    const reqData: any = {
      district: districtName,
    }
    if (districtSelected) {
      console.log("req data : ", JSON.stringify(reqData))
      const requestOptions = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reqData),
      }

      const fetchSchool = async () => {
        try {
          const response = await fetch(
            import.meta.env.VITE_BACKEND_URL +
              `/api/v1/yip/list-model-schools/`,
            requestOptions
          )
          const data = await response.json()
          console.log("school: ", data)
          console.log(data.response.institutions)
          setSchool(data.response.institutions)
        } catch (error) {
          console.error(error)
        }
      }
      fetchSchool()
    }
  }, [districtSelected])

  const handleDistrict = (data: any) => {
    setDistrictSelected(data.id)
    console.log("dist selected : ", data)
    setDistrictName(data.name)
  }

  const sendData = (): any => {
    const postData: any = {
      club_name: schoolSelectedName,
      institute_type: "School",
      institute_id: schoolSelectedId,
      legislative_assembly_id: legSelectedId,
      district_id: districtSelected,
      block_id: blockSelectedId,
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
          import.meta.env.VITE_BACKEND_URL + `/api/v1/yip/create-club/`,
          postOptions
        )
        console.log(response)
        const data = await response.json()
        window.location.reload()
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
      <h3>Setup a new School</h3>
      <div className="setup-club">
        <div className="setup-filter">
          <div className="select-container club">
            <div className="setup-item">
              <p>District</p>
              <Select
                options={districts}
                isSearchable={true}
                isClearable={true}
                placeholder={`Select a District`}
                getOptionValue={(option: any) => option.id}
                getOptionLabel={(option: any) => option.name}
                onChange={handleDistrict}
                required
              />
            </div>
            <div className="setup-item">
              <p>Legislative Assembly</p>
              <Select
                options={legislativeAssemblies}
                isSearchable={true}
                isClearable={true}
                placeholder={`Select a Legislative Assembly`}
                getOptionValue={(option: any) => option.id}
                getOptionLabel={(option: any) => option.name}
                onChange={(data: any) => {
                  setLegSelectedId(data.id)
                }}
                required
              />
            </div>
            <div className="setup-item">
              <p>BRC</p>
              <Select
                options={blocks}
                isSearchable={true}
                isClearable={true}
                placeholder={`Select a Block`}
                getOptionValue={(option: any) => option.id}
                getOptionLabel={(option: any) => option.name}
                onChange={(data: any) => {
                  setBlockSelectedId(data.id)
                }}
                required
              />
            </div>
            <div className="setup-item">
              <p>School</p>
              <Select
                options={school}
                isSearchable={true}
                isClearable={true}
                placeholder={`Select a School`}
                getOptionValue={(option: any) => option.id}
                getOptionLabel={(option: any) => option.title}
                onChange={(data: any) => {
                  setSchoolSelectedId(data.id)
                  setSchoolSelectedName(data.title)
                }}
                required
              />
            </div>
            <button id="create_btn" className="black-btn" onClick={sendData}>
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

export default SchoolSetup

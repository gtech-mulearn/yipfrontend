import React, { useEffect, useState } from "react"
import Select from "react-select"
import "./Setup.scss"
import apiGateway from "../../service/apiGateway"

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

const SchoolSetup = (props: any) => {
  const [districts, setDistricts] = useState<DistrictProps[]>([])
  const [legislativeAssemblies, setLegislativeAssemblies] = useState<LegislativeAssemblyProps[]>([])
  const [school, setSchool] = useState<SchoolProps[]>([])
  const [blocks, setBlocks] = useState<SchoolProps[]>([])
  const [districtSelected, setDistrictSelected] = useState("")
  const [districtName, setDistrictName] = useState("")
  const [legSelectedId, setLegSelectedId] = useState("")
  const [blockSelectedId, setBlockSelectedId] = useState("")
  const [schoolSelectedId, setSchoolSelectedId] = useState("")
  const [schoolSelectedName, setSchoolSelectedName] = useState("")


  const handleDistrict = (data: any) => {
    setDistrictSelected(data.id)
    //console.log("dist selected : ", data)
    setDistrictName(data.name)
  }



  // Fetch District Data
  useEffect(() => {
    const fetchData = async () => {
      apiGateway.get(`/api/v1/yip/district/`)
        .then(({ data }) => {
          const { districts } = data.response;
          //console.log("districts-axios :", districts);
          setDistricts(districts);
        })
        .catch(error => console.error(error));
    }
    fetchData()
  }, [])

  // Fetch Legislative Assembly Data
  useEffect(() => {
    //console.log("dist selected:", districtSelected)
    if (districtSelected) {
      const fetchData = async () => {
        apiGateway.get(`/api/v1/yip/get-legislative-assembly/${districtSelected}/`)
          .then(({ data }) => {
            const { legislativeAssembly } = data.response;
            //console.log("leg-axios :", legislativeAssembly);
            setLegislativeAssemblies(legislativeAssembly)
          })
          .catch(error => console.error(error));
      }
      fetchData()
    }
  }, [districtSelected])

  // Fetch Block Data
  useEffect(() => {
    if (districtSelected) {
      const fetchData = async () => {
        apiGateway.get(`/api/v1/yip/get-blocks/${districtSelected}/`)
          .then(({ data }) => {
            const { block } = data.response;
            //console.log("block-axios :", block);
            setBlocks(block)
          })
          .catch(error => console.error(error));
      }
      fetchData()
    }
  }, [districtSelected])

  // Fetch Institute Data
  useEffect(() => {
    const reqData: any = {
      district: districtName,
    }
    if (districtSelected) {
      const fetchData = async () => {
        apiGateway.post(`/api/v1/yip/list-model-schools/`, reqData)
          .then(({ data }) => {
            const { institutions } = data.response;
            //console.log("school-axios :", institutions);
            setSchool(institutions)
          })
          .catch(error => console.error(error));
      }
      fetchData()
    }
  }, [districtSelected])



  // Function for sending Data
  const sendData = (): any => {
    const postData: any = {
      club_name: schoolSelectedName,
      institute_type: "School",
      institute_id: schoolSelectedId,
      legislative_assembly_id: legSelectedId,
      district_id: districtSelected,
      block_id: blockSelectedId,
    }
    const createData = async () => {
      apiGateway.post(`/api/v1/yip/create-club/`, postData)
        .then((response) => {
          props.setUpdateData((prev: any) => !prev)

        })
        .catch(error => console.error(error));
    }
    createData()
    //console.log("data send!!")
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
            <div className="create_btn_cntr">
              <button id="create_btn" className="black-btn" onClick={sendData}>
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SchoolSetup

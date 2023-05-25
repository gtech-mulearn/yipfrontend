import React, { useContext, useEffect, useState } from "react"
import Select from "react-select"
import "./Setup.scss"
import apiGateway from "../../service/apiGateway"
import yip from "../../service/dataHandler"
import { DashboardContext } from "../../utils/DashboardContext"
import { toSentenceCase } from "../../utils/utils"

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
  create: boolean
  setCreate: (data: boolean) => void
  setUpdateData: (data: boolean) => void
}

const SchoolSetup = (props: any) => {
  const { dataUpdate, setUpdateData, setCreate } = useContext(DashboardContext)

  const [legislativeAssemblies, setLegislativeAssemblies] = useState<LegislativeAssemblyProps[]>([])
  const [school, setSchool] = useState<SchoolProps[]>([])
  const [blocks, setBlocks] = useState<SchoolProps[]>([])
  const [districtSelected, setDistrictSelected] = useState("")
  const [districtName, setDistrictName] = useState("")
  const [legSelectedId, setLegSelectedId] = useState("")
  const [blockSelectedId, setBlockSelectedId] = useState("")
  const [schoolSelectedId, setSchoolSelectedId] = useState("")
  const [schoolSelectedName, setSchoolSelectedName] = useState("")
  const [visible, setVisible] = useState(false)

  const handleDistrict = (data: any) => {
    setDistrictSelected(data.id)
    setDistrictName(data.name)
  }

  useEffect(() => {
    if (districtSelected) {
      const fetchData = async () => {
        apiGateway.get(`/api/v1/yip/get-legislative-assembly/${districtSelected}/`)
          .then(({ data }) => {
            const { legislativeAssembly } = data.response;
            setLegislativeAssemblies(legislativeAssembly)
          })
          .catch(error => console.log(error))
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
      yip.createInstitution(postData, setUpdateData)
        .then((res) => { setVisible(true) }).catch(err => { })
        .finally(() => {
          setDistrictSelected("")
          setDistrictName("")
          setLegSelectedId("")
          setBlockSelectedId("")
          setSchoolSelectedId("")
          setSchoolSelectedName("")
          setTimeout(() => {
            setCreate(false)
            setVisible(false)
          }, 3000)
        })
    }
    createData()
  }

  const [error, setError] = useState("");
  return (

    <div className="white-container">
      <h3>Setup a new School</h3>
      {error && <div className="setup-error">
        {error}
      </div>}
      {
        visible && <div className="setup-filter">
          Club Created Successfully
        </div>
      }
      {!visible && <div className="setup-club">
        <div className="setup-filter">
          <div className="select-container club">
            <>
              <div className="setup-item">
                <p>District</p>
                <Select
                  options={yip.district}
                  isSearchable={true}
                  isClearable={true}
                  placeholder={`Select a District`}
                  getOptionValue={(option: any) => option.id}
                  getOptionLabel={(option: any) => option.name}
                  onChange={(data: any) => {
                    try {
                      handleDistrict(data)
                    } catch (error) {
                      handleDistrict({ id: "", name: "" })
                    }
                  }}
                  required
                />
              </div>
              {districtName && <div className="setup-item">
                <p>Legislative Assembly</p>
                <Select
                  options={legislativeAssemblies}
                  isSearchable={true}
                  isClearable={true}
                  placeholder={`Select a Legislative Assembly`}
                  getOptionValue={(option: any) => option.id}
                  getOptionLabel={(option: any) => option.name}
                  onChange={(data: any) => {
                    try {
                      setLegSelectedId(data.id)

                    } catch (error) {
                      setLegSelectedId("")
                    }
                  }}
                  required
                />
              </div>}
              {districtName && <div className="setup-item">
                <p>BRC</p>
                <Select
                  options={blocks}
                  isSearchable={true}
                  isClearable={true}
                  placeholder={`Select a Block`}
                  getOptionValue={(option: any) => option.id}
                  getOptionLabel={(option: any) => toSentenceCase(option.name)}
                  onChange={(data: any) => {
                    try {
                      setBlockSelectedId(data.id)

                    } catch (error) {
                      setBlockSelectedId("")
                    }
                  }}
                  required
                />
              </div>}
              {districtName && legSelectedId && blockSelectedId && <div className="setup-item">
                <p>School</p>
                <Select
                  options={school}
                  isSearchable={true}
                  isClearable={true}
                  placeholder={`Select a School`}
                  getOptionValue={(option: any) => option.code}
                  getOptionLabel={(option: any) => option.title}
                  onChange={(data: any) => {
                    try {
                      setSchoolSelectedId(data.code)
                      setSchoolSelectedName(data.title)
                    } catch (error) {
                      setSchoolSelectedId("")
                      setSchoolSelectedName('')
                    }
                  }}
                  required
                />
              </div>}
            </>

            <div className="create_btn_cntr">
              <button id="create_btn" className={`${blockSelectedId ? 'black-btn' : 'grey-btn'}`}
                onClick={() => {
                  if (!districtName) {
                    setError("Select a District")
                  }
                  else if (!legSelectedId) {
                    setError("Select a Legislative Assembly")
                  }
                  else if (!blockSelectedId) {
                    setError("Select a Block")
                  }
                  else if (!schoolSelectedName) {
                    setError("Select a School")
                  }
                  else {
                    sendData()
                  }
                  setTimeout(() => {
                    setError("")
                  }, 3000)
                }
                }>Create
              </button >
              <button className="black-btn" onClick={() => setCreate(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>}
    </div >
  )
}

export default SchoolSetup

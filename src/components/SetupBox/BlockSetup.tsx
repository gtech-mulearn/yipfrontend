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

interface DistrictProps {
    id: string;
    name: string;
    response: any;
  }

const BlockSetup = () => {
    console.log('heyyy')
    const [name, setName] = useState("")
    const [districtId, setDistrictId] = useState("")
    const [errorStatus,setErrorStatus] = useState<boolean>(false)
    const [districts, setDistricts] = useState<DistrictProps[]>([])
    const [districtSelected, setDistrictSelected] = useState("");
    const [districtName,setDistrictName] = useState("")

    const sendData = ():any =>{
        const postData:any = {
            name: name,
            districtId : districtId,

        }
        const postOptions = {
          method: "POST",
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            "Content-Type": "application/json"},
          body: JSON.stringify(postData)
        };
        
        const createData = async () => {
          try {
            const response = await fetch(
              import.meta.env.VITE_BACKEND_URL+`/api/v1/yip/create-block/`,postOptions
            );
            console.log(response)
            const data = await response.json();
            if(data.statusCode == 400){
                setErrorStatus(true)
            }else{
                setErrorStatus(false)
            }
            console.log("response : ",data)
            
          } catch (error) {
            console.error(error);
          }
        };
        createData();
        console.log("data send!!")
      }

    const handleDistrict = (data:any) => {
    setDistrictSelected(data.id);
    console.log("dist selected : ",data)
    setDistrictName(data.name)   
    };

    const onNameChange = (data:any) =>{
        console.log(data)
    }



    return (
        <div className="white-container">
            <h3>Create a Block</h3>
            {errorStatus? <ErrorBox/> : <></>}
            <div className="setup-club">
                <div className="setup-filter">
                    <div className="select-container club">
                        
                        <div className="setup-item" id="district">
                            <p>Name</p>
                            <input type="text" name="name" placeholder='Name' id="name" onChange={onNameChange}/>
                        </div>
                        
                        <div className="setup-item" id="district">
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
                    
                        <button 
                          id="create_btn" 
                          className="black-btn"
                          onClick={()=>{
                            sendData();
                          }} >Create
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

const ErrorBox = ()=>{
    return(
      <div id="login-error" className="login-error"><p>Error: Email Already Exists!</p></div>
    )
  }

export default BlockSetup

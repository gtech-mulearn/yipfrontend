import React,{useState,useEffect} from 'react'
import Select from 'react-select';
import './Setup.scss'
import setupImg from '../../assets/Kindergarten student-bro 1.png'

// const club = ['District','College']

// interface SelectItemProps {
//   item: string;
//   list: any;
// }

interface DistrictProps {
  id: string;
  name: string;
}

// interface CollegeProps {
//   id: string;
//   title: string;
// }

const LegislativeSetup = () => {

    const [districts, setDistricts] = useState<DistrictProps[]>([])
    const [districtSelected, setDistrictSelected] = useState("");
    const [districtName, setDistrictName] = useState("")

    useEffect(() => {
        const requestOptions = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                'Content-Type': 'application/json'
            },
            method: 'GET'
        };
        const fetchData = async () => {
            try {
                const response = await fetch(`https://dev.mulearn.org/api/v1/yip/district/`, requestOptions);
                const data = await response.json();
                console.log("districts:", data);
                setDistricts(data.response.districts);
            } catch (error) {
                console.error("this is error", error);
            }
        };
        fetchData();
    }, []);

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

    const handleDistrict = (data:any) => {
      setDistrictSelected(data.id);
      console.log("dist selected : ",data)
      setDistrictName(data.name)   
    };

    return (
        <div className="white-container">
            <h3>Setup a new User</h3>
            <div className="setup-club">
                <div className="setup-filter">
                    <div className="select-container club">
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
                    <div className="setup-item" id="district">
                        <p>Legislative Assembly Name</p>
                        <input type="text" name="name" placeholder='Type Legislative Assembly Name' id="username" />
                    </div>
                        <button 
                          id="create_btn" 
                          className="black-btn"
                          onClick={()=>{
                            // sendData();
                          }} >Create</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LegislativeSetup

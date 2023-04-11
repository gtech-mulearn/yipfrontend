import React,{useState,useEffect} from 'react'
import Select from 'react-select';
import './Setup.scss'
import setupImg from '../../assets/Kindergarten student-bro 1.png'

const club = ['District','College']

interface SelectItemProps {
  item: string;
  list: any;
}

interface DistrictProps {
  id: string;
  name: string;
}



const ClubItem: React.FC<SelectItemProps> = ({ item,list }) => {
    const [selectedValue, setSelectedValue] = useState("helo");

    const handleChange = (e:any)=> {
      setSelectedValue(e.id);
    }
    return (
      <div className="setup-item" id="district">
        <p>{item}</p>
        <Select
          options={item == 'District' ? list : []}
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

const ClubSetup = () => {
    // let itemsToRender: string[] = [];
    // if (activeItem === "Model School") {
    //     itemsToRender = schoolItems
    // }else{
    //     itemsToRender = club
    // }
    const [districts, setDistricts] = useState<DistrictProps[]>([])

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(
            'https://dev.mulearn.org/api/v1/yip/district/'
          )
          const data = await response.json()
          const dataItems = data.response.districts.map(
            (item: any) => ({
              id:item.id,
              name: item.name,
            })
          )
          setDistricts(dataItems)
          console.log(dataItems)
        } catch (error) {
          console.error(error)
        }
      };
      fetchData();
    }, []);
    return (
        <div className="white-container">
            <h3>Setup a new School</h3>
            <div className="setup-club">
                <div className="setup-filter">
                    <div className="select-container club">
                    {club.map((club, i) => (
                            <ClubItem key={i} item={club} list={districts} />
                        ))}
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

export default ClubSetup

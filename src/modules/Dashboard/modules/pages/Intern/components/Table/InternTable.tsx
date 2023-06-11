import React, {
  ChangeEvent,
  useEffect,
  useRef,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { CustomSelect } from "../../../../../components/CustomSelect/CustomSelect";
import CustomTable from "../../../../components/CustomTable/CustomTable";
import "./InternTable.scss";
import exportFromJSON from 'export-from-json';

import axios, { AxiosRequestConfig } from "axios";
import {
  campusRoutes,
  setupRoutes,
  tableRoutes,
  yip5Routes,
} from "../../../../../../../services/urls";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchUserInfo } from "../../../../../components/api";
import roles from "../../../../../../../utils/roles";
import { privateGateway } from "../../../../../../../services/apiGateway";
import { selectProps } from "../../../../utils/setupUtils";
import { CentralZone, Districts, NorthZone, SouthZone } from "../../../../../../../utils/Locations";
import { errorCheck, loading } from "../../../../../components/Toastify/ToastifyConsts";

interface commonViewProps {
  pre_registrations: string;
  pre_registration: string;
  vos: string;
  group_formation: string;
  idea_submission: string;
}

interface zoneViewProps extends commonViewProps {
  name: string
  zone: string;
}
interface districtViewProps extends zoneViewProps {
  district: string;
  pre_registration: string;
  zone: string;
}
interface AssignViewProps extends districtViewProps {
  district: string;
}
interface CampusViewProps extends commonViewProps {
  institute: string;
  district: string;
  id: string;
  intern: string;
  zone: string;
}
interface InternViewProps extends zoneViewProps {
  district: string[];
  districtName: string;
}

const views = [
  { id: "0", name: "Intern" },
  { id: "1", name: "Campus" },
  { id: "2", name: "District" },
  { id: "3", name: "Zone" },
  { id: "4", name: "State" },
];
const InternTable = ({ openSetup, update }: { openSetup: () => void, update: () => void }) => {
  const [search, setSearch] = useState<string>("");
  const [filterBtn, setFilterBtn] = useState<boolean>(false);
  const [view, setView] = useState<string>("Campus");
  const [assigneeList, setAssigneeList] = useState<AssignViewProps[]>([]);

  const [campusTableList, setCampusTableList] = useState<CampusViewProps[]>([]);
  const [internTableList, setInternTableList] = useState<InternViewProps[]>([]);
  const [districttable, setDistricttable] = useState<districtViewProps[]>([]);
  const [assigneetable, setAssigneetable] = useState<AssignViewProps[]>([]);
  const [csvData, setCsvData] = useState<any>();

  const [zoneList, setZoneList] = useState<zoneViewProps[]>([]);
  const [zonetable, setZonetable] = useState<zoneViewProps[]>([]);
  const [stateTable, setStateTable] = useState<commonViewProps[]>([]);

  const [districtList, setDistrictList] = useState<districtViewProps[]>([]);
  const [campusList, setCampusList] = useState<CampusViewProps[]>([]);

  const [menu, setMenu] = useState<boolean>(window.innerWidth > 768);
  const [districtFilterList, setDistrictFilterList] = useState<selectProps[]>(
    []
  );
  const [districtFilter, setDistrictFilter] = useState<selectProps>(
    {} as selectProps
  );
  const [zoneFilterList, setZoneFilterList] = useState<selectProps[]>([]);
  const [zoneFilter, setZoneFilter] = useState<selectProps>({} as selectProps);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [internList, setInternList] = useState<InternViewProps[]>([]);
  const [dataUploaded, setDataUploaded] = useState<boolean>(false);
  const styleHead = {
    unOrder: 'fa-sort',
    asc: ' fa-sort-amount-desc',
    desc: 'fa-sort-amount-asc',
  }
  const customStyles = {
    headerStyle: [
      {
        title: 'pre_registrations',
        ...styleHead
      },
      {
        title: 'pre_registration',
        ...styleHead
      },
      {
        title: 'vos',
        ...styleHead
      },
      {
        title: 'group_formation',
        ...styleHead
      },
      {
        title: 'idea_submission',
        ...styleHead
      }
    ],
    alignNumbersCenter: [{
      name: "pre_registrations",
      css: 'center-align'
    },
    {
      name: "pre_registration",
      css: 'center-align'
    },
    {
      name: "vos",
      css: 'center-align'
    },
    {
      name: "group_formation",
      css: 'center-align'
    },
    {
      name: "idea_submission",
      css: 'center-align'
    }]
  }
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [count, setCount] = useState(0)
  useEffect(() => {


    fetchCampus(setCampusList, setCampusTableList);
    fetchZoneFilter(setZoneFilterList);
    fetchDistrictFilter(zoneFilter.name, setDistrictFilterList);
  }, []);
  useEffect(() => {
    setDistrictFilter({} as selectProps)
    fetchDistrictFilter(zoneFilter.name, setDistrictFilterList);

  }, [zoneFilter])
  useEffect(() => {
    if (view === "Campus")
      setCampusTableList(
        filterCampus(campusList, search, districtFilter.name, zoneFilter.name)
      );
    if (view === "Intern") setInternTableList(filterIntern(internList, search, districtFilter.name, zoneFilter.name));
    if (view === "District Coordinator" || view === "Programme Executive")
      setAssigneetable(
        filterCoordinator(
          assigneeList,
          search,
          districtFilter.name,
          zoneFilter.name
        )
      );
    if (view === "District")
      setDistricttable(
        filterDistrict(
          districtList,
          search,
          districtFilter.name,
          zoneFilter.name
        )
      );
    if (view === "Zone")
      setZonetable(
        filterZone(
          zoneList,
          search
        )
      );
  }, [search, districtFilter, zoneFilter]);
  useEffect(() => {


    if (view === "Campus") fetchCampus(setCampusList, setCampusTableList);
    if (view === "Intern") fetchIntern(setInternList, setInternTableList);
    if (view === "District") fetchDistrict(setDistrictList, setDistricttable);
    if (view === "Zone") fetchZone(setZoneList, setZonetable);
    if (view === 'State') fetchState(setStateTable);
    setSearch("");
    setFilterBtn(false);
  }, [view, dataUploaded]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    const allowedTypes: string[] = ["text/csv"]; // Specify the allowed file types here

    if (file && allowedTypes.includes(file.type)) {
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
      console.log("Invalid file type. Please upload a CSV file.");
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  useEffect(() => {
    handleDownloadCSV();
    // downloadCSV();
  }, [campusTableList, internTableList, assigneetable, districttable]);

  const handleDownloadCSV = () => {
    //check the view value and dowload the data in the corresponding state variable as a csv
    let csvData1: any = [];
    if (view === "Campus") {
      csvData1 = campusTableList;
    } else if (view === "Intern") {
      csvData1 = internTableList;
    } else if (view === "District Coordinator") {
      csvData1 = assigneeList;
    } else if (view === "Programme Executive") {
      csvData1 = assigneetable;
      console.log(csvData1);
    } else if (view === "District") {
      csvData1 = districttable;
    }

    const updatedData = csvData1.map((item: any) => {
      const { id, ...rest } = item;
      return rest;
    });
    setCsvData(updatedData);
  };
  const downloadCSV = () => {
    const fileName = 'data';
    const fields = Object.keys(csvData[0]);

    exportFromJSON({
      data: csvData,
      fileName,
      fields,
      exportType: 'csv',
    });
  };
  const handleUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const config: AxiosRequestConfig = {
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      };

      axios
        .post(
          `${import.meta.env.VITE_BACKEND_URL}\\${tableRoutes.user.uploadSubmissions
          }`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((response) => {
          // console.log(response);
          toast.success("File Uploaded Successfully");
          setDataUploaded(!dataUploaded);
          setSelectedFile(null);
          update()
        })
        .catch((error) => {
          toast.error(error.response.status === 500 ? 'Wrong format' : error.response.data.message.general[0]);
          toast.error(error.response.data.message.general[0]);
        });
    }
  };

  const [userInfo, setUserInfo] = React.useState({ role: "", name: "" });
  const [viewUpload, setViewUpload] = useState(false);
  useEffect(() => {
    if (userInfo.role === "") {
      fetchUserInfo(setUserInfo);
    }

    if (
      [roles.SUPER_ADMIN, roles.ADMIN, roles.HQ_STAFF, roles.ZONAL_COORDINATOR].includes(userInfo.role)
    ) {
      setViewUpload(true);
    }
  }, [userInfo]);

  return (
    <>
      <div className="white-container-header">
        <CustomSelect
          option={views}
          setValue={setView}
          defaultValue={views[0]}
          requiredLabel={true}
          header={"Views"}
          placeholder={view}
          requiredData={false}
          isClearable={false}
        />
        <div className="btns-upper">
          {viewUpload && (
            <div className="upload-btns">
              {!selectedFile &&
                <>
                  <button className="table-fn-btn cursor" onClick={handleButtonClick}>
                    <i className="fa-solid fa-upload"></i>
                    <input
                      type="file"
                      accept=".csv"
                      onChange={handleFileChange}
                      ref={fileInputRef}
                      style={{ display: "none" }}
                    />
                    <p>Upload File</p>
                  </button>
                  <a
                    href="https://docs.google.com/spreadsheets/d/1VBshPUI1uLd5HQbjeSJOZ1dIHFTjBGaDpS_oCV0PH10/"
                    className="table-fn-btn "
                    target="_blank"
                  >View Upload Sheet Template</a>
                </>
              }
              {selectedFile && (<>
                <button className="table-fn-btn cursor" onClick={handleUpload}>
                  File: {selectedFile.name.split(".")[0]} :
                  <p>
                    <i className="fa-solid fa-upload"></i>
                    {' Upload'}</p>
                </button>
                <button className="table-fn-btn cursor cancel-upload" onClick={() => setSelectedFile(null)}>
                  <p>
                    Cancel Upload
                  </p>
                  <i className="fa-solid fa-close"></i>
                </button>
              </>
              )}
            </div>
          )}
        </div>

      </div>
      {/* //table box */}

      <div className="white-container">
        <div className="table-top">
          <div className="table-header">
            <h3>{view} View</h3>
            <div className="table-header-btn">
              <li className="fas fa-bars " onClick={() => setMenu(!menu)}></li>
            </div>
          </div>
          {/* Filter Opener */}
          {menu && (
            <div className="table-fn">
              {view !== 'State' && <div className="search-bar">
                <input
                  className="search-bar-item"
                  id="search"
                  name="search"
                  type="text"
                  value={search}
                  placeholder={`Search`}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <li className="fas fa-close cursor" onClick={() => setSearch("")}></li>
              </div>}
              {/* <div
                                className="table-fn-btn cursor"
                                onClick={openSetup}
                            >
                                <i className="fa-solid fa-plus"></i>
                                <p>Assign Campus </p>
                            </div> */}
              {
                (view !== "Zone" && view !== "State") &&
                (
                  <button
                    className="table-fn-btn cursor"
                    style={{ cursor: "pointer" }}
                    onClick={() => setFilterBtn(!filterBtn)}
                  >
                    <i className="fa-solid fa-filter"></i>
                    <p>Filter</p>
                  </button>
                )}
              {filterBtn
                //  && view !== "Intern" 
                && (
                  <button
                    className="table-fn-btn  cursor"
                    onClick={() => setFilterBtn(!filterBtn)}
                  >
                    <p></p>
                    <i className="fa-solid fa-close  "></i>
                    <p></p>
                  </button>
                )}
            </div>
          )}
        </div>
        {/* Filters */}

        {filterBtn
          // && view !== "Intern" 
          && (
            <div className="filter-container">
              <div className="filter-box">
                <CustomSelect
                  option={zoneFilterList}
                  header=""
                  placeholder={"Filter By Zone"}
                  requiredHeader={false}
                  setData={setZoneFilter}
                />
                {
                  <CustomSelect
                    option={districtFilterList}
                    header=""
                    placeholder={"Filter By District"}
                    requiredHeader={false}
                    setData={setDistrictFilter}
                    value={districtFilterList.filter((item) => item.name !== '' && item.id === districtFilter.id)}
                  />
                }
              </div>
            </div>
          )}
        {/* Table */}
        {view === "Campus" && (
          <CustomTable<CampusViewProps>
            tableHeadList={[
              "Name",
              "Intern",
              "District",
              "Zone",
              "Pre-registration",
              "Voice of Stakeholder",
              "Group Formation",
              "Idea Submission",
            ]}
            tableData={campusTableList}
            orderBy={[
              "institute",
              "intern",
              "district",
              "zone",
              "pre_registrations",
              "vos",
              "group_formation",
              "idea_submission",
            ]}
            capitalize={false}
            customCSS={customStyles.alignNumbersCenter}
            customHeaderCssSort={customStyles.headerStyle as any}
          />
        )}
        {view === "District Coordinator" && (
          <CustomTable<AssignViewProps>
            tableHeadList={[
              "Name",
              "District",
              "Zone",
              "Pre-registration",
              "Voice of Stakeholder",
              "Group Formation",
              "Idea Submission",
            ]}
            tableData={assigneetable}
            orderBy={[
              "name",
              "district",
              "zone",
              "pre_registrations",
              "vos",
              "group_formation",
              "idea_submission",
            ]}
            capitalize={false}
            customCSS={customStyles.alignNumbersCenter}
            customHeaderCssSort={customStyles.headerStyle as any}
          />
        )}
        {view === "Programme Executive" && (
          <CustomTable<AssignViewProps>
            tableHeadList={[
              "Name",
              "District",
              "Zone",
              "Pre-registration",
              "Voice of Stakeholder",
              "Group Formation",
              "Idea Submission",
            ]}
            tableData={assigneetable}
            orderBy={[
              "name",
              "district",
              "zone",
              "pre_registrations",
              "vos",
              "group_formation",
              "idea_submission",
            ]}
            capitalize={false}
            customCSS={customStyles.alignNumbersCenter}
            customHeaderCssSort={customStyles.headerStyle as any}
          />
        )}
        {view === "District" && (
          <CustomTable<districtViewProps>
            tableHeadList={[
              "Name",
              "Zone",
              "Pre-registration",
              "Voice of Stakeholder",
              "Group Formation",
              "Idea Submission",
            ]}
            tableData={districttable}
            orderBy={[
              "district",
              "zone",
              "pre_registration",
              "vos",
              "group_formation",
              "idea_submission",
            ]}
            capitalize={false}
            customCSS={customStyles.alignNumbersCenter}
            customHeaderCssSort={customStyles.headerStyle as any}
          />
        )}
        {view === "Intern" && (
          <CustomTable<InternViewProps>
            tableHeadList={[
              "Name",
              "District",
              "Pre-registration",
              "Voice of Stakeholder",
              "Group Formation",
              "Idea Submission",
            ]}
            tableData={internTableList}
            orderBy={[
              "name",
              "districtName",
              "pre_registrations",
              "vos",
              "group_formation",
              "idea_submission",
            ]}
            capitalize={false}
            customCSS={customStyles.alignNumbersCenter}
            customHeaderCssSort={customStyles.headerStyle as any}
          />
        )}
        {view === "Zone" && (
          <CustomTable
            tableHeadList={[
              "Name",
              "Pre-registration",
              "Voice of Stakeholder",
              "Group Formation",
              "Idea Submission",
            ]}
            tableData={zonetable}
            orderBy={[
              "zone",
              "pre_registration",
              "vos",
              "group_formation",
              "idea_submission",
            ]}
            capitalize={false}
            customCSS={customStyles.alignNumbersCenter}
            customHeaderCssSort={customStyles.headerStyle as any}
            pagination={false}

          />
        )}
        {view === "State" && (
          <CustomTable
            tableHeadList={[
              "Pre-registration",
              "Voice of Stakeholder",
              "Group Formation",
              "Idea Submission",
            ]}
            tableData={stateTable}
            orderBy={[
              "pre_registration",
              "vos",
              "group_formation",
              "idea_submission",
            ]}
            capitalize={false}
            customCSS={customStyles.alignNumbersCenter}
            customHeaderCssSort={customStyles.headerStyle as any}
            pagination={false}
            filter={false}
          />
        )}
      </div>
    </>
  );
};

function fetchCampus(
  setData: Dispatch<SetStateAction<CampusViewProps[]>>,
  setData2: Dispatch<SetStateAction<CampusViewProps[]>>
) {
  privateGateway
    .get(yip5Routes.campusList)
    .then((res) => {
      setData(res.data.response);
      setData2(res.data.response);

    })
    .catch((err) => {
      console.log(err);
    });
}
function fetchDistrictCoordinator(
  setData: Dispatch<SetStateAction<AssignViewProps[]>>,
  setData2: Dispatch<SetStateAction<AssignViewProps[]>>
) {
  privateGateway
    .get(yip5Routes.listDC)
    .then((res) => {
      // console.log(res)
      setData(res.data.response);
      setData2(res.data.response);
    })
    .catch((err) => {
      console.log(err);
    });
}
function fetchDistrict(
  setDistrictFilter: Dispatch<SetStateAction<districtViewProps[]>>,
  setDistricttable: Dispatch<SetStateAction<districtViewProps[]>>
) {
  privateGateway
    .get(yip5Routes.listDistrict)
    .then((res) => {
      setDistrictFilter(res.data.response);
      setDistricttable(res.data.response);

    })
    .catch((err) => {
      errorCheck(err);
      console.log(err);
    });
}
function fetchProgrammeExecutive(
  setData: Dispatch<SetStateAction<AssignViewProps[]>>,
  setData2: Dispatch<SetStateAction<AssignViewProps[]>>
) {
  privateGateway
    .get(yip5Routes.listPE)
    .then((res) => {
      setData(res.data.response);
      setData2(res.data.response);
    })
    .catch((err) => {
      console.log(err);
    });
}
function fetchIntern(
  setData: Dispatch<SetStateAction<InternViewProps[]>>,
  setData2: Dispatch<SetStateAction<InternViewProps[]>>
) {
  privateGateway
    .get(yip5Routes.internList)
    .then((res) => {
      setData(
        res.data.response.map((intern: InternViewProps) => {
          return {
            ...intern,
            districtName: intern?.district?.join(",") || intern?.district || '',
          };
        })
      );
      setData2(
        res.data.response.map((intern: InternViewProps) => {
          return { ...intern, districtName: intern.district.join(",") };
        })
      );

    })
    .catch((err) => console.log(err));
}
const filterIntern = (internList: InternViewProps[], search: string, district: string, zone: string) => {
  let list = internList;
  if (search) {
    list = searchIntern(list, search);
  }
  if (district) {
    list = list.filter((club) => {
      for (let value of club.district) {
        if (value === district) {
          return true;
        }
      }
    });
  }
  if (zone) {
    let districts: string[] = []
    switch (zone) {
      case "North": districts = NorthZone
        break
      case "South": districts = SouthZone
        break
      case "Central": districts = CentralZone
        break
      default:
        districts = Districts
    }
    list = list.filter((club) => {
      for (let value of club.district) {
        if (districts.includes(value)) {
          return true;
        }
      }
    });
  }
  return list;
};
const filterCoordinator = (
  coordinatorList: AssignViewProps[],
  search: string,
  district: string,
  zone: string
) => {
  let list = coordinatorList;
  if (search) {
    list = searchCoordinator(list, search);
  }
  if (zone) {
    list = list.filter((club) => club.zone === zone);
  }
  if (district) {
    list = list.filter((club) => club.district === district);
  }
  return list;
};
const filterDistrict = (
  districtList: districtViewProps[],
  search: string,
  district: string,
  zone: string
) => {
  let list = districtList;
  if (search) {
    list = searchDistrict(list, search);
  }
  if (zone) {
    list = list.filter((club) => club.zone === zone);
  }
  if (district) {
    list = list.filter((club) => club.district === district);
  }
  return list;
};
function searchDistrict(districtList: districtViewProps[], search: string) {
  return districtList.filter(
    (district: districtViewProps) =>
      rawString(district.district).includes(rawString(search)) ||
      rawString(district.zone).includes(rawString(search))
  );
}

function searchIntern(internList: InternViewProps[], search: string) {
  return internList.filter(
    (intern: InternViewProps) =>
      rawString(intern.name).includes(rawString(search)) ||
      rawString(intern.districtName).includes(rawString(search))
  );
}
function searchCoordinator(coordinatorList: AssignViewProps[], search: string) {
  return coordinatorList.filter(
    (coordinator: AssignViewProps) =>
      rawString(coordinator.name).includes(rawString(search)) ||
      rawString(coordinator.district).includes(rawString(search)) ||
      rawString(coordinator.zone).includes(rawString(search))
  );
}
function filterCampus(
  clubList: CampusViewProps[],
  search: string,
  district: string,
  zone: string
) {
  let list = clubList;
  if (search) {
    list = searchCampus(list, search);
  }
  if (zone) list = list.filter((club) => club.zone === zone);
  if (district) {
    list = list.filter((club) => club.district === district);
  }
  return list;
}
function fetchZoneFilter(setData: Dispatch<SetStateAction<selectProps[]>>) {
  privateGateway
    .get(yip5Routes.zoneList)
    .then((res) => setData(res.data.response))
    .catch((err) => console.log(err));
}
function searchCampus(clubList: CampusViewProps[], search: string) {
  return clubList.filter(
    (club: CampusViewProps) =>
      rawString(club.institute).includes(rawString(search)) ||
      rawString(club.district).includes(rawString(search)) ||
      rawString(club.zone).includes(rawString(search)) ||
      rawString(club.intern).includes(rawString(search))
  );
}
function rawString(str: string) {
  if (str === null || str === undefined || str === '') return "";
  str = str?.toLowerCase();
  str = str.replace(/[^a-zA-Z0-9 ]/g, "");
  str = str.replaceAll(" ", "");
  return str;
}
export function fetchDistrictFilter(
  zone: string,
  setData: Dispatch<SetStateAction<selectProps[]>>
) {
  const getDistrictByZone = zone ? `${campusRoutes.listDistrict}${zone}/` : setupRoutes.district.list
  privateGateway.get(getDistrictByZone)
    .then((res) => res.data.response.districts)
    .then((data) => setData(data))
    .catch((err) => console.error(err));
}
export default InternTable;
function fetchZone(setZoneList: React.Dispatch<React.SetStateAction<zoneViewProps[]>>, setZonetable: React.Dispatch<React.SetStateAction<zoneViewProps[]>>) {
  privateGateway.get(yip5Routes.zoneBasedData)
    .then((res) => {
      setZoneList(res.data.response);
      setZonetable(res.data.response);

    })
    .catch((err) => {

      toast.error(err.response.data.message || err.message)
      console.log(err)
    });
}

function filterZone(zoneList: zoneViewProps[], search: string) {
  let list = zoneList;
  if (search) {
    list = searchZone(list, search);
  }
  return list
}

function searchZone(list: zoneViewProps[], search: string): zoneViewProps[] {
  return list.filter(
    (zone: zoneViewProps) =>
      rawString(zone.zone).includes(rawString(search))
  );
}

function fetchState(setStateTable: React.Dispatch<React.SetStateAction<commonViewProps[]>>) {
  privateGateway.get(yip5Routes.stateBasedData)
    .then((res) => {
      setStateTable([res.data.response])


    })
    .catch((err) => console.log(err));
}


import React, { ChangeEvent, useEffect, useRef, useState, Dispatch, SetStateAction } from "react";
import { CustomSelect } from "../../../../../components/CustomSelect/CustomSelect";
import CustomTable from "../../../../components/CustomTable/CustomTable";
import "./InternTable.scss";
import { uploadSubmissions } from "../../InternApi";
import axios, { AxiosRequestConfig } from "axios";
import { setupRoutes, tableRoutes, yip5Routes } from "../../../../../../../services/urls";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchUserInfo } from "../../../../../components/api";
import roles from "../../../../../../../utils/roles";
import { privateGateway } from "../../../../../../../services/apiGateway";
import { selectProps } from "../../../../utils/setupUtils";
import { fetchDistrictSchools } from "../../../School/SchoolAPI";
interface commonViewProps {
    pre_registrations: string,
    vos: string,
    group_formation: string,
    idea_submission: string
}
interface viewsSingleProps {
    title: string;
    columns: string[];
    order: string[];
}
interface zoneViewProps extends commonViewProps {
    name: string;
}
interface districtViewProps extends zoneViewProps {
    zone: string;
}
interface AssignViewProps extends districtViewProps {
    district: string;
}
interface CampusViewProps extends commonViewProps {
    institute: string,
    district: string,
    id: string,
    zone: string,
}
const views = [
    { id: "0", name: "Intern" },
    { id: "1", name: "Campus" },
    // { id: "2", name: "Designation" },
    // { id: "3", name: "District" },
    // { id: "4", name: "Zone" },
];
const InternTable = ({ openSetup }: { openSetup: () => void }) => {
    const [search, setSearch] = useState<string>("");
    const [filterBtn, setFilterBtn] = useState<boolean>(false);
    const [view, setView] = useState<string>("Campus");
    const [assigneeList, setAssigneeList] = useState<AssignViewProps[]>([]);
    const [assigneetable, setAssigneetable] = useState<AssignViewProps[]>([]);
    const [districtList, setDistrictList] = useState<districtViewProps[]>([]);
    const [campusList, setCampusList] = useState<CampusViewProps[]>([]);
    const [campusTableList, setCampusTableList] = useState<CampusViewProps[]>([])
    const [districttable, setDistricttable] = useState<districtViewProps[]>([]);
    const [zoneList, setZoneList] = useState<zoneViewProps[]>([]);
    const [zonetable, setZonetable] = useState<zoneViewProps[]>([]);
    const [menu, setMenu] = useState<boolean>(window.innerWidth > 768);
    const [districtFilterList, setDistrictFilterList] = useState<selectProps[]>([]);
    const [districtFilter, setDistrictFilter] = useState<selectProps>({} as selectProps);
    const [zoneFilterList, setZoneFilterList] = useState<selectProps[]>([]);
    const [zoneFilter, setZoneFilter] = useState<selectProps>({} as selectProps);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        fetchCampus(setCampusList, setCampusTableList);
        fetchZoneFilter(setZoneFilterList)
        fetchDistrictFilter(setDistrictFilterList)
    }, [])
    useEffect(() => {
        setCampusTableList(filterCampus(campusList, search, districtFilter.name, zoneFilter.name));
    }, [search, districtFilter, zoneFilter, filterBtn])
    useEffect(() => {
        if (view === 'Campus')
            fetchCampus(setCampusList, setCampusTableList);
        if (view === 'Intern')
            fetchIntern(setZoneList, setZonetable);
    }, [view]);


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
                            Authorization: `Bearer ${localStorage.getItem(
                                "accessToken"
                            )}`,
                            "Content-Type": "multipart/form-data",
                        },
                    }
                )
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => {
                    console.log(error);
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
            [roles.SUPER_ADMIN, roles.ADMIN, roles.HQ_STAFF].includes(
                userInfo.role
            )
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
                    header={view}
                    placeholder={view}
                    requiredData={false}
                />

                {viewUpload && (
                    <>
                        <div
                            className="table-fn-btn cursor"
                            onClick={handleButtonClick}
                        >
                            <i className="fa-solid fa-plus"></i>
                            <input
                                type="file"
                                accept=".csv"
                                onChange={handleFileChange}
                                ref={fileInputRef}
                                style={{ display: "none" }}
                            />
                            <p>Upload File</p>
                        </div>
                        {selectedFile && (
                            <div
                                className="table-fn-btn cursor"
                                onClick={handleUpload}
                            >
                                Selected File: {selectedFile.name}
                                <p>Upload</p>
                            </div>
                        )}
                    </>
                )}
            </div>
            <div className="white-container">
                <div className="table-top">
                    <div className="table-header">
                        <h3>{view} View</h3>
                        <div className="table-header-btn">
                            <li
                                className="fas fa-bars "
                                onClick={() => setMenu(!menu)}
                            ></li>
                        </div>
                    </div>
                    {/* Filter Opener */}
                    {menu && (
                        <div className="table-fn">
                            <div className="search-bar">
                                <input
                                    className="search-bar-item"
                                    id="search"
                                    name="search"
                                    type="text"
                                    value={search}
                                    placeholder={`Search`}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                                <li
                                    className="fas fa-close cursor"
                                    onClick={() => { }}
                                ></li>
                            </div>
                            {/* <div
                                className="table-fn-btn cursor"
                                onClick={openSetup}
                            >
                                <i className="fa-solid fa-plus"></i>
                                <p>Assign Campus </p>
                            </div> */}
                            <div
                                className="table-fn-btn cursor"
                                onClick={() => setFilterBtn(!filterBtn)}
                            >
                                <i className="fa-solid fa-filter"></i>
                                <p>Filter</p>
                            </div>
                            {filterBtn && (
                                <div
                                    className="table-fn-btn  cursor"
                                    onClick={() => setFilterBtn(!filterBtn)}
                                >
                                    <p></p>
                                    <i className="fa-solid fa-close  "></i>
                                    <p></p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
                {/* Filters */}

                {filterBtn && (
                    <div className="filter-container">
                        <div className="filter-box">
                            <CustomSelect
                                option={zoneFilterList}
                                header=""
                                placeholder={"Filter By Zone"}
                                requiredHeader={false}
                                setData={setZoneFilter}
                            />
                            <CustomSelect
                                option={districtFilterList}
                                header=""
                                placeholder={"Filter By District"}
                                requiredHeader={false}
                                setData={setDistrictFilter}
                            />
                        </div>
                    </div>
                )}
                {/* Table */}
                {(
                    view === "Campus" ||
                    view === "Designation") && (
                        <CustomTable<CampusViewProps>
                            tableHeadList={[
                                "Name",
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
                                "district",
                                "zone",
                                "pre_registrations",
                                "vos",
                                "group_formation",
                                "idea_submission",
                            ]}
                            capitalize={false}
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
                            "name",
                            "zone",
                            "pre_registrations",
                            "vos",
                            "group_formation",
                            "idea_submission",
                        ]}
                    />
                )}
                {view === "Intern" && (
                    <CustomTable<zoneViewProps>
                        tableHeadList={[
                            "Name",
                            "Pre-registration",
                            "Voice of Stakeholder",
                            "Group Formation",
                            "Idea Submission",
                        ]}
                        tableData={zonetable}
                        orderBy={[
                            "name",
                            "pre_registrations",
                            "vos",
                            "group_formation",
                            "idea_submission",
                        ]}
                    />
                )}
            </div>
        </>
    );
};

function fetchCampus(setData: Dispatch<SetStateAction<CampusViewProps[]>>
    ,
    setData2: Dispatch<SetStateAction<CampusViewProps[]>>
) {
    privateGateway.get(yip5Routes.campusList)
        .then(res => {
            setData(res.data.response)
            setData2(res.data.response)
        })
        .catch(err => {
            console.log(err);
        })
}
function fetchIntern(setData: Dispatch<SetStateAction<zoneViewProps[]>>, setData2: Dispatch<SetStateAction<zoneViewProps[]>>) {
    privateGateway.get(yip5Routes.internList)
        .then(res => {
            setData(res.data.response)
            setData2(res.data.response)
        })
        .catch(err => console.log(err))
}
const filterIntern = (internList: zoneViewProps[], search: string) => {
    let list = internList
    if (search) {
        list = searchIntern(list, search)
    }
    return list
}
function searchIntern(internList: zoneViewProps[], search: string) {
    return internList.filter((intern: zoneViewProps) =>
        rawString(intern.name).includes(rawString(search))
    )
}
function filterCampus(clubList: CampusViewProps[], search: string, district: string, zone: string) {
    let list = clubList
    if (search) {
        list = searchCampus(list, search)
    }
    if (zone) {
        list = list.filter(club => club.zone === zone)
    }
    if (district) {
        list = list.filter(club => club.district === district)
    }
    return list
}
function fetchZoneFilter(setData: Dispatch<SetStateAction<selectProps[]>>) {
    privateGateway.get(yip5Routes.zoneList)
        .then(res => setData(res.data.response))
        .catch(err => console.log(err))
}
function searchCampus(clubList: CampusViewProps[], search: string) {
    return clubList.filter((club: CampusViewProps) =>
        rawString(club.institute).includes(rawString(search)) ||
        rawString(club.district).includes(rawString(search)) ||
        rawString(club.zone).includes(rawString(search)))
}
function rawString(str: string) {
    str = str.toLowerCase();
    str = str.replace(/[^a-zA-Z0-9 ]/g, "");
    str = str.replaceAll(" ", "");
    return str;
}
export function fetchDistrictFilter(setData: Dispatch<SetStateAction<selectProps[]>>) {
    privateGateway.get(setupRoutes.district.list)
        .then(res => res.data.response.districts)
        .then(data => setData(data))
        .catch(err => console.error(err))
}
export default InternTable;

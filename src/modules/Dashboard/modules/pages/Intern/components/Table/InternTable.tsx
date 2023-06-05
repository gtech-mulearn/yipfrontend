import React, { ChangeEvent, useRef, useState } from "react";
import { CustomSelect } from "../../../../../components/CustomSelect/CustomSelect";
import CustomTable from "../../../../components/CustomTable/CustomTable";
import "./InternTable.scss";
import { uploadSubmissions } from "../../InternApi";
import axios, { AxiosRequestConfig } from "axios";
import { tableRoutes } from "../../../../../../../services/urls";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
interface commonViewProps {
    preRegister: string;
    voiceOfStakeholder: string;
    groupFormation: string;
    submission: string;
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
const views = [
    { id: "0", name: "Intern" },
    { id: "1", name: "Campus" },
    { id: "2", name: "Designation" },
    { id: "3", name: "District" },
    { id: "4", name: "Zone" },
];
const InternTable = ({ openSetup }: { openSetup: () => void }) => {
    const [search, setSearch] = useState<string>("");
    const [filterBtn, setFilterBtn] = useState<boolean>(false);
    const [view, setView] = useState<string>("Intern");
    const [assigneeList, setAssigneeList] = useState<AssignViewProps[]>([]);
    const [assigneetable, setAssigneetable] = useState<AssignViewProps[]>([]);
    const [districtList, setDistrictList] = useState<districtViewProps[]>([]);
    const [districttable, setDistricttable] = useState<districtViewProps[]>([]);
    const [zoneList, setZoneList] = useState<zoneViewProps[]>([]);
    const [zonetable, setZonetable] = useState<zoneViewProps[]>([]);
    const [menu, setMenu] = useState<boolean>(window.innerWidth > 768);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    function searchTable() {
        if (view === "Intern" || view === "Campus" || view === "Designation") {
        }
    }

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
                    `${import.meta.env.VITE_BACKEND_URL}\\${
                        tableRoutes.user.uploadSubmissions
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

    return (
        <>
            <div className="white-container-header">
                <CustomSelect
                    option={views}
                    setValue={setView}
                    defaultValue={views[0]}
                    requiredLabel={true}
                    header={"Intern"}
                    placeholder={"Intern"}
                    requiredData={false}
                />
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
                    <div className="table-fn-btn cursor" onClick={handleUpload}>
                        Selected File: {selectedFile.name}
                        <p>Upload</p>
                    </div>
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
                                    onClick={() => {}}
                                ></li>
                            </div>
                            <div
                                className="table-fn-btn cursor"
                                onClick={openSetup}
                            >
                                <i className="fa-solid fa-plus"></i>
                                <p>Assign Campus </p>
                            </div>
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
                                option={[]}
                                header=""
                                placeholder={"Filter By Zone"}
                                requiredHeader={false}
                            />
                            <CustomSelect
                                option={[]}
                                header=""
                                placeholder={"Filter By District"}
                                requiredHeader={false}
                            />
                        </div>
                    </div>
                )}
                {/* Table */}
                {(view === "Intern" ||
                    view === "Campus" ||
                    view === "Designation") && (
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
                            "preRegister",
                            "voiceOfStakeholder",
                            "groupFormation",
                            "submission",
                        ]}
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
                            "preRegister",
                            "voiceOfStakeholder",
                            "groupFormation",
                            "submission",
                        ]}
                    />
                )}
                {view === "Zone" && (
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
                            "preRegister",
                            "voiceOfStakeholder",
                            "groupFormation",
                            "submission",
                        ]}
                    />
                )}
            </div>
        </>
    );
};

function rawString(str: string) {
    str = str.toLowerCase();
    str = str.replace(/[^a-zA-Z0-9 ]/g, "");
    str = str.replaceAll(" ", "");
    return str;
}

export default InternTable;

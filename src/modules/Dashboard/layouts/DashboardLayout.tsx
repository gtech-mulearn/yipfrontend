import { LeftDrawer } from "../components/Navbar/LeftDrawer"
import { BottomTab } from "../components/Navbar/Bottom"
import { Outlet } from "react-router-dom";
import NameCard from "../components/NameCard/NameCard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.min.css";
import React, { useEffect } from "react";
import { fetchUserInfo } from "../components/api";
const DashboardLayout = () => {
    const [open, setOpen] = React.useState(false)
    const [userInfo, setUserInfo] = React.useState({ role: '', name: '' })

    useEffect(() => {
        fetchUserInfo(setUserInfo)
    }, [])
    return (
        <>
            <NameCard open={open} setOpen={setOpen} userInfo={userInfo} />
            {
                <div onClick={() => setOpen(false)}>
                    <LeftDrawer userInfo={userInfo} />
                    <Outlet />
                    <ToastContainer
                        position="bottom-center"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="colored"

                    />
                    <BottomTab userInfo={userInfo} />
                </div>
            }
        </>
    );
}
export default DashboardLayout 

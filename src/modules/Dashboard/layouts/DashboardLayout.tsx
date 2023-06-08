import { LeftDrawer } from "../components/Navbar/LeftDrawer"
import { BottomTab } from "../components/Navbar/Bottom"
import { Outlet } from "react-router-dom";
import NameCard from "../components/NameCard/NameCard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.min.css";
import React from "react";
const DashboardLayout = () => {
    const [open, setOpen] = React.useState(false)

    return (
        <>
            <NameCard open={open} setOpen={setOpen} />
            {
                <div onClick={() => setOpen(false)}>
                    <LeftDrawer />
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
                    <BottomTab />
                </div>
            }
        </>
    );
}
export default DashboardLayout 

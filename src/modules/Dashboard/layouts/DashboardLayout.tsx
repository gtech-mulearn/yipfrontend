import { LeftDrawer } from "../components/Navbar/LeftDrawer"
import { BottomTab } from "../components/Navbar/Bottom"
import { Outlet } from "react-router-dom";
const DashboardLayout = () => {

    return (
        <>
            <LeftDrawer />
            <Outlet />
            <BottomTab />
        </>
    )
}
export default DashboardLayout 

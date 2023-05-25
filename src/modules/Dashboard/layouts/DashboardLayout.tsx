import { LeftDrawer } from "../components/Navbar/LeftDrawer"
import { BottomTab } from "../components/Navbar/Bottom"
import { Outlet } from "react-router-dom";
import NameCard from "../components/NameCard/NameCard";
const DashboardLayout = () => {

    return (
        <>
            <LeftDrawer />
            <NameCard />
            <Outlet />
            <BottomTab />
        </>
    )
}
export default DashboardLayout 

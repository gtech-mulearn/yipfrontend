import { LeftDrawer } from "../components/Navbar/LeftDrawer"
import { BottomTab } from "../components/Navbar/Bottom"
import { Outlet } from "react-router-dom";
import NameCard from "../components/NameCard/NameCard";
const DashboardLayout = () => {

    return (
        <>
            <NameCard />
            <LeftDrawer />
            <Outlet />
            <BottomTab />
        </>
    )
}
export default DashboardLayout 

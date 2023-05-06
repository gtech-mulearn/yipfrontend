import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes: React.FC = () => {
    let accessToken = localStorage.getItem("accessToken");
    return accessToken ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;

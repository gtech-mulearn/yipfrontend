import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoutes: React.FC = () => {
    let accessToken = localStorage.getItem("accessToken");
    return accessToken ? <Outlet /> : <Navigate to="/" />;
};
export const PublicRoutes: React.FC = () => {
    let accessToken = localStorage.getItem("accessToken");
    return accessToken ? <Navigate to="/school-dashboard" /> : <Outlet />;
}

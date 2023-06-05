import { Navigate, Outlet } from "react-router-dom";
import jwtDecode, { JwtPayload } from "jwt-decode";
export const PrivateRoutes: React.FC = () => {
    let accessToken = localStorage.getItem("accessToken");
    return accessToken ? <Outlet /> : <Navigate to="/" />;
};
export const PublicRoutes: React.FC = () => {
    let accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
        try {
            const { expiry }: { expiry: string } = jwtDecode(accessToken)
            const currentDate = new Date();
            if (convertExpiryStringToDate(expiry) >= currentDate) {
                localStorage.removeItem("accessToken");
                accessToken = null;
            }
        }
        catch (error) {
            console.log(error)
        }
    }
    return accessToken ? <Navigate to="/intern-dashboard" /> : <Outlet />;
}

function convertExpiryStringToDate(expiryString: string): Date {
    const [day, month, year, hour, minute, second] = expiryString.split(/[/: ]/);

    // Note: Months in JavaScript's Date object are 0-indexed, so we subtract 1 from the month value
    const expiryDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day), parseInt(hour), parseInt(minute), parseInt(second));

    return expiryDate;
}
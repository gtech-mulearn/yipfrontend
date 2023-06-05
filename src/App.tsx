import { BrowserRouter as Router, Routes, Route, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './modules/Login/pages/Login';
import { PrivateRoutes, PublicRoutes } from './utils/RoutePrivacy';
import DashboardLayout from './modules/Dashboard/layouts/DashboardLayout';

import SchoolLayout from './modules/Dashboard/modules/pages/School/SchoolLayout';
import ClubLayout from './modules/Dashboard/modules/pages/Club/ClubLayout';
import UserLayout from './modules/Dashboard/modules/pages/User/UserLayout';
import AssemblyLayout from './modules/Dashboard/modules/pages/Assembly/AssemblyLayout';
import BlockLayout from './modules/Dashboard/modules/pages/Block/BlockLayout';
import InternLayout from './modules/Dashboard/modules/pages/Intern/layout/InternLayout';
import CampusLayout from './modules/Dashboard/modules/pages/Campus/layout/CampusLayout';
import InstituteSetup from './modules/Dashboard/modules/pages/InstituteManagement/InstituteSetup';
import Reset from './modules/Login/pages/Reset'
import ResetReq from './modules/Login/pages/ResetReq';

const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicRoutes />,
    children: [
      {
        path: '',
        element: <Login />
      },
      {
        path: 'reset-req-password',
        element: <ResetReq />
      },
      {
        path: 'reset-password',
        element: <Reset />
      }
    ]
  },
  {
    path: '',
    element: <PrivateRoutes />,
    children: [
      {
        path: '',
        element: <DashboardLayout />,

        children: [
          { path: 'school-dashboard', element: <SchoolLayout /> },
          { path: 'club-dashboard', element: <ClubLayout /> },
          { path: 'user', element: <UserLayout /> },
          { path: 'legislative-assembly', element: <AssemblyLayout /> },
          { path: 'block', element: <BlockLayout /> },
          { path: 'intern-dashboard', element: <InternLayout /> },
          { path: 'campus-dashboard/:type/:campusId', element: <CampusLayout /> },
          { path: 'institute-management', element: <InstituteSetup /> }
        ]
      }
    ]
  }
])

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;


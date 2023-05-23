import { BrowserRouter as Router, Routes, Route, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './modules/Login/pages/Login';
import { PrivateRoutes, PublicRoutes } from './utils/RoutePrivacy';
import { link } from './utils/utils';
import DashboardLayout from './modules/Dashboard/layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Table from './components/Table/Table';
import './pages/Dashboard.scss'
import SchoolLayout from './modules/Dashboard/modules/pages/School/SchoolLayout';
import ClubLayout from './modules/Dashboard/modules/pages/Club/ClubLayout';
import UserLayout from './modules/Dashboard/modules/pages/User/UserLayout';
import AssemblyLayout from './modules/Dashboard/modules/pages/Assembly/AssemblyLayout';
import BlockLayout from './modules/Dashboard/modules/pages/Block/BlockLayout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicRoutes />,
    children: [
      {
        path: '',
        element: <Login />
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


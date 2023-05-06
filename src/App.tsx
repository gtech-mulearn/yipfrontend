import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/LoginPage/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import SchoolSetup from './components/SetupBox/SchoolSetup';
import ClubSetup from './components/SetupBox/ClubSetup';
import UserSetup from './components/SetupBox/UserSetup';
import BlockSetup from './components/SetupBox/BlockSetup';
import LegislativeSetup from './components/SetupBox/LegislativeSetup';
import { useEffect, useState } from 'react';
import yip from './service/dataHandler';
import PrivateRoutes, { PublicRoutes } from './utils/PrivateRoutes';
import { link } from './service/routeHandler'

function App() {
  const [dataUpdate, setUpdateData] = useState(true)
  const [create, setCreate] = useState(false)


  return (
    <Router>
      <Routes>
        <Route element={<PublicRoutes />}>
          <Route path='/' element={<Login />} />
        </Route>
        <Route element={<PrivateRoutes />}>
          {
            link.map((item, index) => {
              return <Route key={index} path={item.path}
                element={<Dashboard content={item.content} dataUpdate={dataUpdate} setCreate={setCreate} create={create} setUpdateData={setUpdateData} />} />
            })}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;


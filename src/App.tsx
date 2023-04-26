import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/LoginPage/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import SchoolSetup from './components/SetupBox/SchoolSetup';
import ClubSetup from './components/SetupBox/ClubSetup';
import UserSetup from './components/SetupBox/UserSetup';
import BlockSetup from './components/SetupBox/BlockSetup';
import LegislativeSetup from './components/SetupBox/LegislativeSetup';
import { useEffect, useState } from 'react';
function App() {
  const [dataUpdate, setUpdateData] = useState(true)
  const [create, setCreate] = useState(false)

  return (
    <Router>
      <Routes>
        <Route path='/yip' element={<Login />} />
        {/* <Route path='/yip/user' element={<Dashboard><UserSetup/></Dashboard>}/> */}
        <Route path='/yip/school-dashboard' element={<Dashboard Content="Model School" dataUpdate={dataUpdate}><SchoolSetup setUpdateData={setUpdateData} dataUpdate={dataUpdate} /></Dashboard>} />
        <Route path='/yip/club-dashboard' element={<Dashboard Content="YIP Club" dataUpdate={dataUpdate}><ClubSetup setUpdateData={setUpdateData} dataUpdate={dataUpdate} /></Dashboard>} />
        {/* <Route path='/yip/block' element={<Dashboard><BlockSetup/></Dashboard>}/> */}
        {/* <Route path='/yip/legislative-assembly' element={<Dashboard><LegislativeSetup/></Dashboard>}/> */}
      </Routes>
    </Router>
  );
}

export default App;


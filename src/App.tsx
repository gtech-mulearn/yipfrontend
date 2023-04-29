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

function App() {
  const [dataUpdate, setUpdateData] = useState(true)
  const [create, setCreate] = useState(false)
  useEffect(() => {
    yip.fetchStatus()
    yip.fetchDistrict()
  }, [])

  useEffect(() => { yip.fetchModelSchools() }, [yip.modelSchools.length === 0])
  useEffect(() => { yip.fetchYIPClubs() }, [yip.yipClubs.length === 0])

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />

        <Route path='/school-dashboard' element={
          <Dashboard Content="Model School" dataUpdate={dataUpdate} setCreate={setCreate} setUpdateData={setUpdateData}>
            <SchoolSetup setUpdateData={setUpdateData} dataUpdate={dataUpdate} create={create} setCreate={setCreate} /></Dashboard>} />
        <Route path='/club-dashboard' element={
          <Dashboard Content="YIP Club" dataUpdate={dataUpdate} setCreate={setCreate} setUpdateData={setUpdateData} >
            <ClubSetup setUpdateData={setUpdateData} dataUpdate={dataUpdate} create={create} setCreate={setCreate} />
          </Dashboard>} />
        {/* <Route path='/yip/block' element={<Dashboard><BlockSetup/></Dashboard>}/> */}
        {/* <Route path='/yip/legislative-assembly' element={<Dashboard><LegislativeSetup/></Dashboard>}/> */}
      </Routes>
    </Router>
  );
}

export default App;


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/LoginPage/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import SchoolSetup from './components/SetupBox/SchoolSetup';
import ClubSetup from './components/SetupBox/ClubSetup';
import UserSetup from './components/SetupBox/UserSetup';
import BlockSetup from './components/SetupBox/BlockSetup';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/'  element={<Login />} />
        <Route path='/user' element={<Dashboard><UserSetup/></Dashboard>}/>
        <Route path='/school-dashboard' element={<Dashboard><SchoolSetup/></Dashboard>}/>
        <Route path='/club-dashboard' element={<Dashboard><ClubSetup/></Dashboard>}/>
        <Route path='/block-management' element={<Dashboard><BlockSetup/></Dashboard>}/>
      </Routes>
    </Router>
  );
}

export default App;


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/LoginPage/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import SchoolSetup from './components/SetupBox/SchoolSetup';
import ClubSetup from './components/SetupBox/ClubSetup';
import UserSetup from './components/SetupBox/UserSetup';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/yip'  element={<Login />} />
        <Route path='/yip/user' element={<Dashboard><UserSetup/></Dashboard>}/>
        <Route path='/yip/school-dashboard' element={<Dashboard><SchoolSetup/></Dashboard>}/>
        <Route path='/yip/club-dashboard' element={<Dashboard><ClubSetup/></Dashboard>}/>
      </Routes>
    </Router>
  );
}

export default App;


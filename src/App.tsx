import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/LoginPage/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import PrivateRoutes, { PublicRoutes } from './utils/PrivateRoutes';
import { link } from './service/RouteLink'
import { DashboardContextProvider } from './utils/DashboardContext';

function App() {

  return (
    <Router>
      <Routes>
        <Route element={<PublicRoutes />}>
          <Route path='/' element={<Login />} />
        </Route>
        <Route element={<PrivateRoutes />}>
          {link.map((item, index) => {
            return <Route key={index} path={item.path}
              element={
                <DashboardContextProvider>
                  <Dashboard content={item.content} />
                </DashboardContextProvider>
              } />
          })}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;


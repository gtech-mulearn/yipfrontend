import { BrowserRouter as Router, Routes, Route, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './modules/Login/pages/Login';
import Dashboard from './pages/Dashboard';
import { PrivateRoutes, PublicRoutes } from './utils/RoutePrivacy';
import { link } from './utils/utils';

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
    path: 'dashboard/',
    element: <PrivateRoutes />,
    children: [
      {
        path: '',
        element: <Dashboard />
      }
    ]
  }
])
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
                <Dashboard />
              } />
          })}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;


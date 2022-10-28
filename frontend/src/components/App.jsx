import {
  BrowserRouter as Router, Routes, Route, Navigate, Outlet,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Login from './LoginPage/Login.jsx';
import Navbar from './Navbar/Navbar.jsx';
import Registration from './RegistrationPage/Registration.jsx';
import ChatPage from './ChatPage/ChatPage.jsx';
import NotFoundPage from './NotFoundPage/NotFoundPage.jsx';
import useAuth from '../hooks/useAuth.jsx';

import routes from '../assets/utils/routes.js';

const PrivateOutlet = () => {
  const auth = useAuth();
  return auth.user ? <Outlet /> : <Navigate to={routes.loginPagePath()} />;
};

const App = () => (
  <Router>
    <div className="d-flex flex-column h-100">
      <Navbar />
      <Routes>
        <Route path={routes.loginPagePath()} element={<Login />} />
        <Route path={routes.signupPagePath()} element={<Registration />} />
        <Route path={routes.chatPagePath()} element={<PrivateOutlet />}>
          <Route path="" element={<ChatPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
    <ToastContainer />
  </Router>
);

export default App;

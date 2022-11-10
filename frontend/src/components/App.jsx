import React from 'react';
import { ToastContainer } from 'react-toastify';
import {
  BrowserRouter as Router, Routes, Route, Navigate, Outlet,
} from 'react-router-dom';

import Navbar from './Navbar/Navbar.jsx';
import Login from './LoginPage/Login.jsx';
import Registration from './RegistrationPage/Registration.jsx';
import ChatPage from './ChatPage/Chat.jsx';
import NotFoundPage from './NotFoundPage/NotFound.jsx';
import { useAuth } from '../hooks/index.js';
import routes from '../utils/routes.js';

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

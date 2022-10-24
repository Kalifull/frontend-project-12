import {
  BrowserRouter as Router, Routes, Route, Navigate,
} from 'react-router-dom';

import Login from './Login.jsx';
import Navbar from './Navbar.jsx';
import Registration from './Registration.jsx';
import NotFoundPage from './NotFoundPage.jsx';

import routes from '../routes.js';

const PrivateOutlet = () => <Navigate to={routes.loginPagePath()} />;

const App = () => (
  <Router>
    <div className="d-flex flex-column h-100">
      <Navbar />
      <Routes>
        <Route path={routes.loginPagePath()} element={<Login />} />
        <Route path={routes.signupPagePath()} element={<Registration />} />
        <Route path={routes.chatPagePath()} element={<PrivateOutlet />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  </Router>
);

export default App;

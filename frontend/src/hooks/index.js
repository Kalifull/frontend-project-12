import { useContext } from 'react';

import { ApiContext } from '../contexts/ApiContext.jsx';
import { AuthContext } from '../contexts/AuthContext.jsx';

const useApi = () => useContext(ApiContext);
const useAuth = () => useContext(AuthContext);

export { useApi, useAuth };

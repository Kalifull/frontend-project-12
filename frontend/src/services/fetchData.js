import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import routes from '../utils/routes.js';

const fetchData = createAsyncThunk('channels/fetchData', async (authHeader) => {
  const { data } = await axios.get(routes.dataPath(), { headers: authHeader });
  return data;
});

export default fetchData;

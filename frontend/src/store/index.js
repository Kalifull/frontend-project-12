import { configureStore } from '@reduxjs/toolkit';

import channelsReduces from './slices/channelsSlice.js';
import messagesReducer from './slices/messagesSlice.js';

export default configureStore({
  reducer: {
    channelsInfo: channelsReduces,
    messagesInfo: messagesReducer,
  },
});

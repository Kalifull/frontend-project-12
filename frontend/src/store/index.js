import { configureStore } from '@reduxjs/toolkit';

import channelsReduces from './slices/channelsSlice.js';
import messagesReducer from './slices/messagesSlice.js';
import modalReducer from './slices/modalSlice.js';

export default configureStore({
  reducer: {
    channelsInfo: channelsReduces,
    messagesInfo: messagesReducer,
    modalInfo: modalReducer,
  },
});

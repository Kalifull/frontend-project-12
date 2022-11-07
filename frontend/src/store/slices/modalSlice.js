import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpened: false,
  type: null,
  channelId: null,
};

export const modalSlice = createSlice({
  name: 'modalInfo',
  initialState,
  reducers: {
    openModal(state, { payload: { type, channelId } }) {
      state.isOpened = true;
      state.type = type;
      state.channelId = channelId ?? null;
    },
    closeModal(state) {
      state.isOpened = false;
      state.type = null;
      state.channelId = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;

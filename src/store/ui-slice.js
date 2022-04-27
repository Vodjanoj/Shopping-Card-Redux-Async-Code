import { createSlice } from "@reduxjs/toolkit";

const initialUiSlice = { isShowCart: false, notification: null };

const uiSlice = createSlice({
  name: "toogleCart",
  initialState: initialUiSlice,
  reducers: {
    toggleCart(state) {
      state.isShowCart = !state.isShowCart;
    },
    showNotification(state, action) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
  },
});

export const uiActions  = uiSlice.actions;
export default uiSlice;

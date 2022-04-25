import { createSlice } from '@reduxjs/toolkit';


const initialCartToggleState = { isShowCart: false };

const toogleCartSlice = createSlice({
  name: "toogleCart",
  initialState: initialCartToggleState,
  reducers: {
    toggleCart(state) {
      state.isShowCart = !state.isShowCart;
    },
  },
});

export const toggleCartActions = toogleCartSlice.actions;
export default toogleCartSlice;
import { configureStore } from "@reduxjs/toolkit";
import toogleCartSlice from "./ui-slice";
import cartSlice from "./cart-slice";

const store = configureStore({
  reducer: { showCart: toogleCartSlice.reducer, cart: cartSlice.reducer },
});

export default store;

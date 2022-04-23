import { configureStore, createSlice } from "@reduxjs/toolkit";

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

const defaultCartState = {
  items: [],
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: defaultCartState,
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          title: newItem.title,
          quantity: 1,
          totalPrice: newItem.price,
          price: newItem.price,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
    },
    removeItemFromCart(state, action) {
      // const existingItem = state.items.find((item) => item.id === action.payload.id)
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalQuantity--;

      if (existingItem.quantity === 1) {
        //filtering out that one item that we wanna remove, that overwrites the array of items
        // with a new array where this item which we wanna remove will be missing.
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
        existingItem.quantity--;
      }
    },
    addItemToCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalQuantity++;

      existingItem.totalPrice = existingItem.totalPrice + existingItem.price;
      existingItem.quantity++;
    },
  },
});

const store = configureStore({
  reducer: { showCart: toogleCartSlice.reducer, cart: cartSlice.reducer },
});

export const toggleCartActions = toogleCartSlice.actions;
export const cartActions = cartSlice.actions;

export default store;

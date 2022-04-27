import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./ui-slice";

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

// A thunk is simply a function, that delays an action until later, until something else finished.
// And we could write an action creator as a thunk, to write an action creator, which does not immediately return the action object,
// but which instead, returns another function which eventually returns the action. So that we can run some other code before we then dispatch the actual action object
// that we did want to create.
// sendCartData is a Thunk

// ***we're creating a function sendCartData

// **** What we dispatched before  always were action creators so functions that return an action object with a type and so on.
// Now in cart-slice, we are instead dispatching a function that returns another function,
// but great thing about Redux when using Redux toolkit, is that it is prepared for that. It does not just accept action objects
// with a type property, instead it also does accept action creators that return functions!!! And if it sees that you're dispatching
// an action which is actually a function, instead of action object, Redux will execute that function for you. And with that function,
// I mean this function here (dispatch) => {} , it will give us that dispatch argument automatically so that in that executed function
// we can dispatch again because this a such a common pattern that we wanna have action creators that can perform side effects
// and that can then dispatch other actions, which eventually reach the reducers as part of a flow of side-effects or as a flow of steps
// that should be taken. So we can use a function that returns another function as an action as well. That is built into Redux when using Redux toolkit.
export const sendCartData = (cart) => {
  // ***which immediately, without doing anything else, returns another function, a async function.
  // We don't know yet who will execute that function, but we will soon know it.
  return async (dispatch) => {
    // we can then therefore, dispatch the actual action we wanna perform.
    // But before we call dispatch, we can of course do other things, before we call dispatch,
    // we can perform any asynchronous code, any side effects, because we will not yet, have reached our reducer.
    // We're not running this code in a reducer. It's a separate standalone JavaScript function instead.

    /// ***in that function we then dispatch a notification  action
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending cart data!",
      })
    );

    // this extra nesting here is required because of how to fetch API works. **

    // *** Then we create a new function, so yet another nested function, which we create on the fly, which is also async
    // in there we send the request.
    const sendRequest = async () => {
      const response = await fetch(
        "https://react-http-version-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );

      if (!response.ok) {
        throw new Error("Sending cart data failed");
      }
    };
    // ** now we can wrap, try catch around this await block here, and catch any errors that might be thrown from anywhere inside of this function.

    //*** This function is then called by us, inside of try-catch, simply to handle any errors.
    try {
      await sendRequest();

      //*** If we don't have an error, we dispatch the success notification.
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Sending cart seccessfully!",
        })
      );
      // *** If we do  have an error, we dispatch an error notification.
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Sending cart  data failed!",
        })
      );
    }
  };
};

export const cartActions = cartSlice.actions;
export default cartSlice;

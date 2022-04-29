import { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";

import Notification from "./components/UI/Notification";
import { sendCartData, fetchCartData } from "./store/cart-actions";

// we define isInitial it outside of my component function so that this does not change.
// And it's not re-initialized if the component renders again, instead this will be initialized when this file is parsed for the first time.
// So when the application started therefore and that's exactly what I want
let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const isShowCart = useSelector((state) => state.ui.isShowCart);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  // we wanna stick to the existing approach. We wanna dispatch the addItemToCart action
  // and do all this heavy work inside of the Reducer function. But if we now wanna sync our new state to the server,
  // so if we wanna update the server with that new state which we derived on the front end, we can simply switch the order.
  // We can first do the work on the front end and let Redux update its store and then in a second step thereafter we send the request to the server,
  // but we don't necessarily need to do that inside of the Reducer function where we wouldn't be allowed to do it. Instead, we can, for example
  // do it in the ProductItem.js file or in a totally different file. Let's say here in App.js as our root component.
  // Here we can simply get hold of our overall cart by basically using useSelector and listening to changes to our cart state.
  // And whenever our cart state does change we can send the Http request.

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    if (cart.changed) {
      dispatch(sendCartData(cart));
    }
  }, [cart, dispatch]);

  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {isShowCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;

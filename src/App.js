import { useEffect } from "react";
import { useSelector } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";

function App() {
  const isShowCart = useSelector((state) => state.showCart.isShowCart);
  const cart = useSelector((state) => state.cart);

  // we wanna stick to the existing approach. We wanna dispatch the addItemToCart action
  // and do all this heavy work inside of the Reducer function. But if we now wanna sync our new state to the server,
  // so if we wanna update the server with that new state which we derived on the front end, we can simply switch the order.
  // We can first do the work on the front end and let Redux update its store and then in a second step thereafter we send the request to the server,
  // but we don't necessarily need to do that inside of the Reducer function where we wouldn't be allowed to do it. Instead, we can, for example
  // do it in the ProductItem.js file or in a totally different file. Let's say here in App.js as our root component.
  // Here we can simply get hold of our overall cart by basically using useSelector and listening to changes to our cart state.
  // And whenever our cart state does change we can send the Http request.

  useEffect(() => {
    // And we wanna send a POST request because that will tell Firebase to store new data
    // or to be precise, actually here, I wanna send a PUT request. That's also allowed by a Firebase.
    // And if we send a PUT request we also do store data on Firebase. But the difference to POST is
    // that the new data will not be added in a list of data so to say, but that it will override existing data.
    fetch("https://react-http-version-default-rtdb.firebaseio.com/cart.json", {
      method: "PUT",
      body: JSON.stringify(cart),
    });
    // Since we're using cart in above we should add it as a dependency to useEffect
    // so that this Effect function re-executes whenever our cart changes, which is exactly that we want
    // Now, the great thing is that useSelector sets up a subscription to Redux.
    // So whenever our Redux store does change this component function will be re-executed and we will get to the latest state.
    // So in this case, the latest cart. So that means that effect will also be re-evaluated and it will re-execute if our carts did change
    // and that is exactly what we need.
  }, [cart]);

  //We face one problem when using useEffect the way we currently do it: It will execute when our app starts.
  //Why is this an issue?
  //It's a problem because this will send the initial (i.e. empty) cart to our backend and overwrite any data stored there.
  //We'll fix this over the next lectures, I just wanted to point it out here!
  return (
    <Layout>
      {isShowCart && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;

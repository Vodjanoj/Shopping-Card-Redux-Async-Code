import { useSelector, useDispatch } from "react-redux";
import classes from "./CartButton.module.css";
import { toggleCartActions } from "../../store/ui-slice";

const CartButton = () => {
  const dispatch = useDispatch();

  const quantityOfCartItems = useSelector((state) => state.cart.totalQuantity);

  const toggleCartHandler = () => {
    dispatch(toggleCartActions.toggleCart());
  };

  return (
    <button className={classes.button} onClick={toggleCartHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{quantityOfCartItems}</span>
    </button>
  );
};

export default CartButton;

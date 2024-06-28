import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import { Fragment, useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import CheckoutForm from "./CheckoutForm";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [isCheckOut, setIsCheckOut] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const [requestWentWrong, setRequestWentWrong] = useState(false);

  const totalAmount = `₹${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const onAddCartItem = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const onRemoveCartItem = (id) => {
    cartCtx.removeItem(id);
  };

  const onCheckoutHandler = () => {
    setIsCheckOut(true);
  };

  const onConfirmHandler = async (userData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch(
        "https://food-buddy-app-89d1d-default-rtdb.firebaseio.com/records.json",
        {
          method: "POST",
          body: JSON.stringify({
            user: userData,
            orderedItems: cartCtx.items,
          }),
        }
      );
      if (!response.ok) {
        setRequestWentWrong(true);
        throw new Error("Something went wrong while submitting the form");
      }
    } catch (error) {
      console.log(error.message);
    }
    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
  };

  const CartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          price={item.price}
          amount={item.amount}
          onAdd={onAddCartItem.bind(null, item)}
          onRemove={onRemoveCartItem.bind(null, item.id)}
        />
      ))}
    </ul>
  );

  const ModalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onHideCart}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={onCheckoutHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <Fragment>
      {CartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckOut && (
        <CheckoutForm onConfirm={onConfirmHandler} onClick={props.onHideCart} />
      )}
      {!isCheckOut && ModalActions}
    </Fragment>
  );

  const isSubmittingModalContent = (
    <p className={classes.submitting}>Sending order data...</p>
  );

  const didSubmittedModalContent = (
    <Fragment>
      <p className={classes.submitted}>Order sent succesfully! 🎉</p>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onHideCart}>
          Close
        </button>
      </div>
    </Fragment>
  );

  const requestFailedModalContent = (
    <Fragment>
      <p className={classes.requestFailed}>
        Something went wrong while sending your order! ⚠️
      </p>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onHideCart}>
          Close
        </button>
      </div>
    </Fragment>
  );

  return (
    <Modal onHideCart={props.onHideCart}>
      {!isSubmitting && !didSubmit && !requestWentWrong && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {requestWentWrong && requestFailedModalContent}
      {!isSubmitting &&
        didSubmit &&
        !requestWentWrong &&
        didSubmittedModalContent}
    </Modal>
  );
};

export default Cart;

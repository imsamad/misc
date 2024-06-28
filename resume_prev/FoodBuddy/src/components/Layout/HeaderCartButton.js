import React, { useContext, useEffect, useState } from "react";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";
import CartContext from "../../store/cart-context";

const HeaderCartButton = (props) => {
  const cartCtx = useContext(CartContext);
  const [isButtonHighlighted, setIsButtonHighlighted] = useState(false);

  const numberOfCartItems = cartCtx.items.reduce((curNumb, item) => {
    return curNumb + item.amount;
  }, 0);

  const buttonClasses = `${classes.button} ${
    isButtonHighlighted ? classes.bump : ""
  }`;

  useEffect(() => {
    if (cartCtx.items.length === 0) {
      return;
    }

    setIsButtonHighlighted(true);

    const timer = setTimeout(() => {
      setIsButtonHighlighted(false)
    }, 300);

    //clean up function
    return () => {
      clearTimeout(timer)
    }

  }, [cartCtx.items]);

  return (
    <button className={buttonClasses} onClick={props.onShowCart}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Card</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;

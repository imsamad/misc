import React, { useState } from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";


function App() {

  const [cardIsShow, setCardIsShown] = useState(false)

  const cartShowHandler = () => {
    setCardIsShown(true)
  }

  const cartHideHandler = () => {
    setCardIsShown(false)
  }

  return (
    <CartProvider>
      {cardIsShow && <Cart onHideCart={cartHideHandler}/>}
      <Header onShowCart={cartShowHandler}/>
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;

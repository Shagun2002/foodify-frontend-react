import React, {useState} from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./context/CartProvider";
import MainImage from "./components/Layout/MainImage";
import classes from './components/Layout/Header.module.css';
import Navbar from "./components/Layout/Navbar";



const Home= () => {
    const [cartIsShown, setCartIsShown] = useState(false);

    const showCartHandler = () => {
      setCartIsShown(true);
    };
  
    const hideCartHandler = () => {
      setCartIsShown(false);
    };
  return (
    <>

      <CartProvider>
        {cartIsShown && <Cart onHideCart={hideCartHandler} />}
        <Header onShowCart={showCartHandler} />
        <MainImage/>
        <main className={classes.mainn}>
          <Meals />
        </main>
      </CartProvider>
      
    </>
  );
};

export default Home;

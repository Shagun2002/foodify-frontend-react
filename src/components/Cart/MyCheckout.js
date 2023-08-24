import { useContext, useRef, useState,useEffect } from "react";
import classes from "./Checkout.module.css";
import CartContext from "../context/CartContext";
import BASE_URL from "../../api/api";
import { useNavigate } from "react-router-dom";
import pageBanner from '../..//assets/page-banner.jpg'

const isEmpty = (value) => value.trim() === "";
const isFiveChars = (value) => value.trim().length === 5;

const MyCheckout = (props) => {
  const navigate= useNavigate();
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    city: true,
    postalCode: true,
  });
  const cartCtx= useContext(CartContext);

  const cancelBtnHandler=()=>{
    navigate('/');
  }

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalCodeInputRef = useRef();
  const cityInputRef = useRef();

  const handleFormSubmit = async (event) => {
    event.preventDefault();
  
    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;
  
    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPostalCodeIsValid = isFiveChars(enteredPostalCode);
  
    setFormInputsValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      city: enteredCityIsValid,
      postalCode: enteredPostalCodeIsValid,
    });
  
    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredCityIsValid &&
      enteredPostalCodeIsValid;
  
    if (!formIsValid) {
      return;
    }
  
    const placeOrder = async (updatedItems) => {
      try {
        const data = {
          user_info: {
            name: enteredName,
            street: enteredStreet,
            city: enteredCity,
            postal_code: enteredPostalCode,
          },
          ordered_items: updatedItems,
        };
  
        const response = await fetch(`${BASE_URL}/api/orders/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
  
        if (response.ok) {
          alert('Order placed successfully!');
          cartCtx.updateItems([]);
          cartCtx.clearCart();
          resetFormFields();

          navigate('/')
        } else {
          console.error('Failed to place order.');
        }
      } catch (error) {
        console.error('Error placing order:', error);
      }
    };
  
    const updatedItems = cartCtx.items;
    console.log('cart updatedItems=', updatedItems);
    cartCtx.updateItems(updatedItems);
  
    // Call the separate function to make the POST request
    placeOrder(updatedItems);
  };

  const resetFormFields = () => {
    nameInputRef.current.value = '';
    streetInputRef.current.value = '';
    postalCodeInputRef.current.value = '';
    cityInputRef.current.value = '';
  };
  


  const nameControlClasses = `${classes.control} ${
    formInputsValidity.name ? "" : classes.invalid
  }`;

  const streetControlClasses = `${classes.control} ${
    formInputsValidity.street ? "" : classes.invalid
  }`;
  const postalCodeControlClasses = `${classes.control} ${
    formInputsValidity.postalCode ? "" : classes.invalid
  }`;
  const cityControlClasses = `${classes.control} ${
    formInputsValidity.city ? "" : classes.invalid
  }`;

  return (
    <>
     <img className={classes.image} src={pageBanner} alt="page-banner-img" />
    <div className={classes.orderContainer}>
      <div className={classes.orderformcontainer}>
        <h3>Checkout Page</h3>
        <form className={classes.form} method="post" onSubmit={handleFormSubmit}>
          <div className={nameControlClasses}>
            <label htmlFor="name">Your Name</label>
            <input type="text" id="name" ref={nameInputRef} />
            {!formInputsValidity.name && <p>Please enter a valid name!</p>}
          </div>

          <div className={streetControlClasses}>
            <label htmlFor="street">Street</label>
            <input type="text" id="street" ref={streetInputRef} />
            {!formInputsValidity.street && <p>Please enter a valid street!</p>}
          </div>

          <div className={postalCodeControlClasses}>
            <label htmlFor="postal">Postal Code</label>
            <input type="text" id="postal" ref={postalCodeInputRef} />
            {!formInputsValidity.postalCode && (
              <p>Please enter a valid postal code (5 characters long)!</p>
            )}
          </div>

          <div className={cityControlClasses}>
            <label htmlFor="city">City</label>
            <input type="text" id="city" ref={cityInputRef} />
            {!formInputsValidity.city && <p>Please enter a valid city!</p>}
          </div>

          <div className={classes.actions}>
            <button type="button" onClick={cancelBtnHandler}>
              Cancel
            </button>
            <button className={classes.submit} >Confirm</button>
            
          </div>
        </form>
      </div>
    </div>
   
    </>
  );
        }
      
    
        

export default MyCheckout;

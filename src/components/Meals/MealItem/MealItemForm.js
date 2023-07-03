import { useRef, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../../context/AuthContext";
import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";
import { Helmet } from 'react-helmet';

const pageTitle= 'Home'
const MealItemForm = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const amountInputRef = useRef();

  const { user, role } = useContext(AuthContext);
  const isAdmin = user && role === "Admin";
  const isLoggedIn = !!user;
  const navigate= useNavigate();

  const handleAddClick = () => {
    if (!isLoggedIn) {
      navigate('/login');
    } else {
      // Handle add button
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setAmountIsValid(false);
      return;
    }

    props.onAddToCart(enteredAmountNumber);
  };

  return (
    <>
     <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />

        <button  onClick={handleAddClick} > + Add</button>
      
      {!amountIsValid && <p>Please enter a valid amount (1-5).</p>}
    </form>
    </>
  );
};

export default MealItemForm;

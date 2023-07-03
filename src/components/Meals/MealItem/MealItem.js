import { useContext } from "react";

import MealItemForm from "./MealItemForm";
import classes from "./MealItem.module.css";
import CartContext from "../../../context/CartContext";
import BASE_URL from "../../../api/api";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import MealsDetailsPage from "../MealDetailsFolder/MealsDetailsPage";

const pageTitle = "MealItems";
const MealItem = (props) => {
  const cartCtx = useContext(CartContext);
  const price = `$${props.price.toFixed(2)}`;

  const addToCartHandler = (amount) => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
      image: props.image,
    });
  };

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
      <li className={classes.meal}>
        <div className={classes.mealimage}>
          <img
            src={BASE_URL + props.image}
            className={classes.image}
            alt="Meals Uploaded Image"
          />
        </div>

        <div>
          <h3>{props.name}</h3>
          <div className={classes.description}>{props.description}</div>
          <div className={classes.price}>{price}</div>
        </div>
        <div>
          <MealItemForm id={props.id} onAddToCart={addToCartHandler} />
        </div>
      </li>
    </>
  );
};

export default MealItem;

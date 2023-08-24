import React, { useContext, useEffect, useState } from "react";
import BASE_URL from "../../api/api";
import { useParams } from "react-router-dom";
import CartContext from "../context/CartContext";
import classes from "./MealsDetailsPage.module.css";
import MealItemForm from "./MealItem/MealItemForm";
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Form, Button } from "react-bootstrap";

const MealsDetailsPage = () => {
  const [meal, setMeal] = useState(null);
  const [isDataFetch, setIsDataFetch] = useState(false);
  const cartCtx = useContext(CartContext);
  const { id } = useParams();

  const addToCartHandler = (amount) => {
    let obj = {
      id: meal?.id,
      name: meal?.name,
      amount: amount,
      price: meal?.price.toFixed(2),
    };
    cartCtx.addItem(obj);
  };

  useEffect(() => {
    const fetchMeal = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/meals/${id}`);
        const data = await response.json();
        setMeal(data?.data);
        setIsDataFetch(true);
      } catch (error) {
        console.error("Error fetching meal:", error);
      }
    };

    if (!isDataFetch) {
      fetchMeal();
    }
  }, [isDataFetch]);

  const detailPage = (
    <>
      <div  className="row flex mt-3">
        <div className="col ">
          <div className="row " style={{width: "-1%"}} >
            <img className="meal-left-image" src={BASE_URL + meal?.image} alt="MealDetails image" />
          </div>
        </div>

        <div className="col">
          <h1>{meal?.name}</h1>
          <p>Price: {meal?.price}</p>
          <p>Description: {meal?.description}</p>
          <br/>
          <MealItemForm id={meal?.id} onAddToCart={addToCartHandler} />
        </div>
      </div>
    </>
  );

  return (
    <>
     <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>
      {!isDataFetch && <>Loading</>}
      {isDataFetch && detailPage}
    </>
  );
};

export default MealsDetailsPage;

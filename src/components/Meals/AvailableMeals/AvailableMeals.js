import { useEffect, useState } from "react";
import Card from "../../UI/Card";
import MealItem from "../MealItem/MealItem";
import classes from "./AvailableMeals.module.css";
import BASE_URL from "../../../api/api";
import { Helmet } from 'react-helmet';

const pageTitle= 'Available Meals'
const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);


  useEffect(() => {
    const fetchMeals = async () => {
      // console.log('BASE_URL =', BASE_URL)
      const response = await fetch(`${BASE_URL}/api/meals/`);
      // console.log("response = ", response);
      const responseData = await response.json();
      // console.log("Meals responseData=", responseData);

      if (!response.ok) {
        throw new Error("Something went wrong http error!");
      }
      console.log("responseData = ", responseData)
      setMeals(responseData);
      setIsLoading(false);
    };

    fetchMeals().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  if (isLoading) {
    return (
      <section className={classes.MealsLoading}>
        <h3>Loading...</h3>
      </section>
    );
  }
  if (httpError) {
    return (
      <section className={classes.MealsError}>
        <h3>Restaurant Closed</h3>
      </section>
    );
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
      image={meal.image}
    />
  ));

  return (
    <>
     <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
    </>
  );
};

export default AvailableMeals;

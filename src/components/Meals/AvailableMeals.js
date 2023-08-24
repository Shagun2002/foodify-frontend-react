import { useEffect, useState } from "react";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";
import BASE_URL from "../../api/api";


const AvailableMeals = () => {
  document.title="Available Meals";
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);


  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(`${BASE_URL}/api/meals/`);
      const responseData = await response.json();
  
      if (!response.ok) {
        throw new Error("Something went wrong in fetching Meals!");
      }
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
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
    </>
  );
};

export default AvailableMeals;

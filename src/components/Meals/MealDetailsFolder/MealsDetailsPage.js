import React, { useEffect, useState } from "react";
import classes from "./MealsDetailsPage.module.css";
import BASE_URL from "../../../api/api";
import { useParams } from "react-router-dom";
// import classes from "../MealItem/MealDetails.module.css";

const MealsDetailsPage = () => {
  const [meal, setMeal] = useState(null);
  const [isDataFetch, setIsDataFetch] = useState(false);
  const { id } = useParams();
  console.log("id - ", id)

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

  // const currentUrl = window.location.href;
  // const urlParts = currentUrl.split("/");
  // const mealId = urlParts[urlParts.length - 1];

  const detailPage = (
    <>
      <div className={classes.mealdetails}>
        <h1>{meal?.name}</h1>
        <p>Price: {meal?.price}</p>
        <p>Description: {meal?.description}</p>
        <img src={BASE_URL + meal?.image} alt={meal?.name} />
      </div>
    </>
  );

  return (
    <div>
      {!isDataFetch && <>Loading</>}
      {isDataFetch && detailPage}
    </div>
  );
};

export default MealsDetailsPage;

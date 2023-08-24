import {useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import "./ShowMealsCard.css";
import BASE_URL from "../../api/api";
import { Link } from "react-router-dom";

const ShowMealsCard = () => {
  const [meals, setMeals] = useState([]);

  const fetchMeals = async (e) => {
    const response = await fetch(`${BASE_URL}/api/meals/`);
    const data = await response.json();

    if (response.ok) {
      setMeals(data);
    } else {
      console.log("Failed to fetch meals.");
    }
  };

  useEffect(() => {
    fetchMeals();
  }, []);

  return (
    <>
      <div className="show-meal-section">
        <div className="card-grid">
          {meals.map((meal) => (
            <Card key={meal.id} style={{ width: "22rem" }}>
              <Link to={`/meals-details/${meal.id}`}>
                <div className = 'card__overlay'>
                      <div className = "card__overlay-content">
                        <p className = "card__overlay-title">{meal.name}</p>  
                        <div className = "card__overlay-line"></div>      
                        <p className = "card__overlay-paragraph">{meal.description}</p>
                      </div>                      
                    </div>
                <Card.Img
                  variant="top"
                  className="content-image"
                  src={BASE_URL + meal.image}
                  alt="Meal Image"
                />
              </Link>
            </Card>
          ))}
        </div>
      </div>
      <br/>
      <br/>
    </>
  );
};

export default ShowMealsCard;

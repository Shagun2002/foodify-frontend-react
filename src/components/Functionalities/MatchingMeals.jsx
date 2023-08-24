import React, { useContext, useEffect } from "react";
import BASE_URL from "../../api/api";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import "./MatchingMeals.css";
import {Row, Col, Card } from "react-bootstrap";

const MatchingMeals = () => {
  const { searchData } = useContext(AuthContext);

  useEffect(() => {
    console.log("data in matching meals = ", searchData);
  }, [searchData]);

  const renderMealCard = (meal) => (
    // <Row>
      //  <Col key={meal.id} sm={12} md={6} lg={4} xl={3}>
    <Card key={meal.id}  >
      <Link to={`/meals-details/${meal.id}`}>
        <div className="card__overlay">
          <div className="card__overlay-content">
            <p className="card__overlay-title">{meal.name}</p>
            <div className="card__overlay-line"></div>
            <p className="card__overlay-paragraph">{meal.description}</p>
          </div>
        </div>
        <Card.Img variant="top" className="content-image" src={BASE_URL + meal.image} alt="Meal Image" />
      </Link>
    </Card>
    // </Col>
    // </Row>
  );  

  return (
    <>
      <br/>
      <br/>
      <div className="show-meal-section">
        <div className="card-grid">
        {searchData.length > 0 ? (
        searchData.map((meal) => renderMealCard(meal))
      ) : (
        <center>
          {!searchData ? (
            <h4>No meals to show!<br />Search some meals first...</h4>
          ) : (
            <h4>No similar meals found.</h4>
          )}
        </center>
      )}

        </div>
      </div>
    </>
  );
};

export default MatchingMeals;

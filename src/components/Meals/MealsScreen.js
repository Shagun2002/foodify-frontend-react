import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Row, Col, Image, ListGroup, Button, Form } from "react-bootstrap";
import BASE_URL from "../../api/api";
import CartContext from "../context/CartContext";
import MealItemForm from "./MealItem/MealItemForm";
import AuthContext from "../context/AuthContext";
import Rating, { RatingInput } from "../Functionalities/Rating";
import classes from './MealsSummary.module.css';



import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
  EmailShareButton,
  EmailIcon,
  LinkedinShareButton,
  LinkedinIcon,
  PinterestShareButton,
  PinterestIcon,
} from "react-share";

function MealsScreen() {
  const [meal, setMeal] = useState(null);
  const [isDataFetch, setIsDataFetch] = useState(false);
  const cartCtx = useContext(CartContext);
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");

  const { id } = useParams();
  const { fetchMealDetails, reviewRatingForm } = useContext(AuthContext);
  const ratingsData = useContext(AuthContext)?.ratingsData || [];

  const addToCartHandler = (amount) => {
    if (meal) {
      const item = {
        id: meal.id,
        name: meal.name,
        amount: amount,
        price: meal.price.toFixed(2),
      };
      cartCtx.addItem(item);
    }
  };

  useEffect(() => {
    const fetchMeal = async () => {
      const mealData = await fetchMealDetails(id);
      if (mealData) {
        setMeal(mealData);
        setIsDataFetch(true);
      }
    };

    if (!isDataFetch) {
      fetchMeal();
    }
  }, [isDataFetch, id]);

  const handleRatingSelect = (selectedRating) => {
    setRating(selectedRating);
  };

  const submitReviewHandler = (e) => {
    e.preventDefault();
    if (rating !== "") {
      const formData = {
        meals: meal.id,
        comment: comment,
        rate: rating,
      };
      reviewRatingForm(formData);
    } else {
      alert("Please select a rating before submitting the review");
    }
  };

  const detailPage = (
    <>
      <div className="py-5 container">
        <Row>
          <Col md={6}>
            <Link to="/">
              <Image
                src={BASE_URL + meal?.image}
                alt="MealDetails image"
                // fluid
                height={200}
                width={500}
              />
            </Link>
          </Col>

          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{meal?.name}</h3>
              </ListGroup.Item>

              <ListGroup.Item>
                <Rating value={meal?.rate} color={"#f8e825"} />
              </ListGroup.Item>

              <ListGroup.Item>
                Price: <strong> Rs.{meal?.price}</strong>
              </ListGroup.Item>
              <ListGroup.Item>Description: {meal?.description}</ListGroup.Item>
              <ListGroup.Item>
                <MealItemForm id={meal?.id} onAddToCart={addToCartHandler} />
              </ListGroup.Item>

              <ListGroup.Item>
              <ul className={classes.floatingShareButtons}>
                <FacebookShareButton
                  url="https://github.com/Shagun2002/foodify-django-react.git"
                  quote={"Sharing full stack foodify web app"}
                  hashtag="#foodify"
                >
                  <FacebookIcon  round={true} size={40} />
                </FacebookShareButton>

                <WhatsappShareButton
                  url="https://github.com/Shagun2002/foodify-django-react.git"
                  title="Sharing full stack foodify web app"
                >
                  <WhatsappIcon  round={true} size={40} />
                </WhatsappShareButton>

                <EmailShareButton
                  subject="Foodify email share"
                  body="Sharing full stack foodify web app"
                >
                  <EmailIcon  round={true} size={40} />
                </EmailShareButton>

                <LinkedinShareButton
                url="https://github.com/Shagun2002/foodify-django-react.git"
                  title="Foodify Linkedin share"
                  summary="Sharing full stack foodify web app"
                  source="https://github.com/Shagun2002/foodify-django-react.git"
                >
                  <LinkedinIcon  round={true} size={40} />
                </LinkedinShareButton>

                <PinterestShareButton
                  url="https://github.com/Shagun2002/foodify-django-react.git"
                  media="https://raw.githubusercontent.com/Shagun2002/foodify-frontend-react/main/src/assets/foodify-removebg.png"
                  description="Sharing full stack foodify web app"
                >
                  <PinterestIcon  round={true} size={40} />
                </PinterestShareButton>
                </ul>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <hr />
            <h4>Reviews</h4>
            {ratingsData.length === 0 && <p>No reviews available.</p>}

            <ListGroup variant="flush">
              {ratingsData
                .filter((review) => review.meals === meal?.id)
                .map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.user}</strong>
                    <Rating value={review.rate} color="#f8e825" />
                    <p>
                      {new Date(review.created_at).toLocaleDateString("en-GB")}
                    </p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
            </ListGroup>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h4>Write a Review</h4>
                <Form onSubmit={submitReviewHandler}>
                  <Form.Group controlId="rating">
                    <Form.Label>Rating</Form.Label>
                    <RatingInput
                      value={rating}
                      color="#f8e825"
                      onSelect={handleRatingSelect}
                    />
                  </Form.Group>

                  <Form.Group controlId="comment">
                    <Form.Label>Review</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows="3"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    ></Form.Control>
                  </Form.Group>

                  <Button type="submit" variant="primary">
                    Submit Review
                  </Button>
                </Form>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </div>
    </>
  );

  return (
    <div>
      {!isDataFetch && <>Loading the meals...</>}
      {isDataFetch && detailPage}
    </div>
  );
}

export default MealsScreen;

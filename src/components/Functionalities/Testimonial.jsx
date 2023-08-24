import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Testimonial.css";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import AuthContext from "../context/AuthContext";
import BASE_URL from "../../api/api";

const PreviousBtn = (props) => {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <ArrowBackIos style={{ color: "gray", fontSize: "45px" }} />
    </div>
  );
};
const NextBtn = (props) => {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <ArrowForwardIos style={{ color: "gray", fontSize: "45px" }} />
    </div>
  );
};

const Testimonial = () => {
  const { role, testimonials, deleteTestimonial } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleEditClick = (testimonial) => {
    console.log("handleEDIT btn clicked!", testimonial.id);
    return navigate(`admin/edit-testimonial/${testimonial.id}`);
  };
  
  const handleAddClick = () => {
    console.log("handleADD btn clicked!");
    navigate('admin/add-testimonial')
  };
  const handleDeleteClick = (id) => {
    console.log("handleDELETE btn clicked!");
    if (window.confirm("Are you sure you want to delete this testimonial?")) {
      deleteTestimonial(id);
    }
  };

  const testimonialItems = testimonials?.data?.map((testimonial) => (
    <div key={testimonial.id}>
      <div className="row">
        <div className="col">
          <img
            src={BASE_URL + testimonial.image}
            className="avatar-img"
            alt={testimonial.name}
          />
        </div>

        {role === "Admin" && (
          <div className="col">
            <div className="card-buttons">
              <button onClick={() => handleAddClick()}>
                <i className="fas fa-plus"></i>
              </button>
              <button
                className="edit-button"
                onClick={() => handleEditClick(testimonial)}
              >
                <i className="fas fa-pen"></i>
              </button>
              <button
                className="delete-button"
                onClick={() => handleDeleteClick(testimonial.id)}
              >
                <i className="fas fa-trash"></i>
              </button>
            </div>
          </div>
        )}
      </div>

      <p className="card-description">{testimonial.description}</p>
      <p className="card-name">
        <span className="green-name">{testimonial.name}</span>
      </p>
    </div>
  ));

  const testimonialsExist = testimonials?.data?.length > 0;

  return (
    <div className="testimonial-container">
      <div className="testimonial-content">
        <h1 className="testimonial-heading">TESTIMONIALS</h1>
        <Slider prevArrow={<PreviousBtn />} nextArrow={<NextBtn />} dots>
          {testimonialsExist ? (
            testimonialItems
          ) : (
            <div className="testimonial-container">
              <div className="testimonial-content">No testimonials to show</div>
            </div>
          )}
        </Slider>
      </div>
    </div>
  );
};

export default Testimonial;

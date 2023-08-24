import React, { useState, useContext, useEffect } from "react";
import "./TestimonialForm.css";
import AuthContext from "../context/AuthContext";
import pageBanner from "../../assets/page-banner.jpg";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../api/api";

const AddTestimonialForm = () => {
  const {authTokens, addTestimonialForm } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const navigate = useNavigate();

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const handleAddButton = () =>{
   navigate('/')
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("image", image);
  
    try {
      const response = await fetch(`${BASE_URL}/api/testimonials/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authTokens.access}`,
        },
        body: formData,
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log("Testimonial added successfully:", data);
        alert("New testimonial ADDED successfully!")
        setName("");
        setDescription("");
        setImage("");
      } else {
        const errorData = await response.json();
        console.error("Error adding testimonial:", errorData);
      }
    } catch (error) {
      console.error("An error occurred in add testimonial:", error);
    }
  };
  

  return (
    <>
      <article className="article">
        <img className="image" src={pageBanner} alt="page-banner-img" />
      </article>

      <div className="addMenuContainer">
        <div className="control">
          <h2>ADD Testimonials  <i className="fas fa-plus"></i></h2>
          <hr />
          <form onSubmit={handleSubmit} className="form">
            <label>
              Name:
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                required
              />
            </label>

            <label htmlFor="image">
              Image:
              <input
                id="image"
                type="file"
                onChange={handleImageUpload}
                accept="image/*"
              />
            </label>

            <label>
              Description:
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                required
              />
            </label>
            <button className="button" type="submit" onClick={handleAddButton}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddTestimonialForm;

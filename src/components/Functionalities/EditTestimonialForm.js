import React, { useState, useContext, useEffect } from "react";
import "./TestimonialForm.css";
import AuthContext from "../context/AuthContext";
import pageBanner from "../../assets/page-banner.jpg";
import { useParams } from "react-router-dom";
import BASE_URL from "../../api/api";

const EditTestimonialForm = () => {
  const { id } = useParams();
  const { authTokens, testimonials } = useContext(AuthContext);

  const selectedTestimonial = testimonials?.data.find(
    (testimonial) => testimonial.id === parseInt(id)
  );
  
  useEffect(() => {
    console.log("id from params = ",id)
    console.log("selectedTestimonial = ", selectedTestimonial)
  }, []);
  

  const initialValues = {
    name: selectedTestimonial ? selectedTestimonial.name : "",
    description: selectedTestimonial ? selectedTestimonial.description : "",
    image: selectedTestimonial ? selectedTestimonial.image : null,
  };

  const [testimonialData, setTestimonialData] = useState(initialValues);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTestimonialData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setTestimonialData((prevData) => ({ ...prevData, image: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", testimonialData.name);
    formData.append("description", testimonialData.description);
    formData.append("image", testimonialData.image);

    try {
      const response = await fetch(`${BASE_URL}/api/testimonials/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${authTokens.access}`,
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Testimonial UPDATED successfully:", data);
        alert("Testimonial UPDATED successfully!")
        setTestimonialData({
          name: "",
          description: "",
          image: null,
        });
      } else {
        const errorData = await response.json();
        console.error("Error Updating testimonial:", errorData);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <>
      <article className="article">
        <img className="image" src={pageBanner} alt="page-banner-img" />
      </article>

      <div className="addMenuContainer">
        <div className="control">
          <h2>EDIT Testimonial <i className="fas fa-pen"></i> </h2>
          <hr />
          <form onSubmit={handleSubmit} className="form">
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={testimonialData.name}
                onChange={handleInputChange}
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
                name="description"
                value={testimonialData.description}
                onChange={handleInputChange}
                placeholder="Description"
                required
              />
            </label>
            <button className="button" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditTestimonialForm;

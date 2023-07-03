import React, { useState } from "react";
import classes from "./AddMeals.module.css";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import BASE_URL from "../../api/api";

const pageTitle = "Add Meals";
const AddMealsForm = (props) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const [visible, setVisible] = useState(true);

  const navigate = useNavigate();

  const handleImageUpload = (event) => {
    console.log("event = ", event);
    const file = event.target.files[0];
    setImage(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("image", image);
    fetch(`${BASE_URL}/api/meals/`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("meals added :", data);
        // alert("meals added successfully!");
      })

      .catch((error) => {
        console.error("Error:", error);
        // alert("Could not add meals! Something went wrong!");
      });
    // navigate("/");
  };

  //   const handleClose = () => {
  //     setVisible(false);
  //     navigate("/");
  //   };

  if (!visible) {
    return null; // Render nothing when the component is not visible
  }

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
      <div className={classes.control}>
        <h2>Add Your Meals</h2>
        <form onSubmit={handleSubmit} className={classes.form}>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>

          <label>
            Price:
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </label>

          <label>
            Description:
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>

          <label htmlFor="image">
            Image:
            <input id="image" type="file" onChange={handleImageUpload} />
          </label>
          {/* {image && <img src={image} alt="Selected image" />} */}

          <button className={classes.button} type="submit">
            Submit
          </button>
          {/* <button className={classes.button} onClick={handleClose}>
          Close
        </button> */}
        </form>
      </div>
    </>
  );
};

export default AddMealsForm;

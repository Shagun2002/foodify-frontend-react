import React, { useContext, useEffect, useState } from "react";
import classes from "./PageStyles.module.css";
import AuthContext from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { Helmet } from 'react-helmet';

const pageTitle= 'Contact Us'
const ContactUsForm = (e) => {
  const { user, role, contactForm } = useContext(AuthContext);
  const isAdmin = user && role === "Admin";


  return (
    <>
     <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
      <div className={classes.backgroundImage}></div>
      <div className={classes.outside}>
        <div className={classes.loginContainer}></div>
        <div className={classes.loginFormContainer}>
          <form className={classes.form} method="post" onSubmit={contactForm}>
            <h1> Contact Us</h1>
            <div>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                // value={name}
                required
              />
            </div>

            <div>
              <label htmlFor="message">Message:</label>
              <textarea
                id="message"
                name="message"
                // value={message}
                required
              ></textarea>
            </div>

            <div>
              <label htmlFor="ratings">Ratings:</label>
              <select id="ratings" name="ratings" required>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>

            <div className={classes.actions}>
              <button type="submit">Submit</button>{" "}
            </div>
          </form>
        </div>
      </div>

      {isAdmin && <Navigate to="/contact">Contact</Navigate>}
    </>
  );
};

export default ContactUsForm;

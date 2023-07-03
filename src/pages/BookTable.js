import React, { useContext, useState } from "react";
import classes from "./PageStyles.module.css";
import AuthContext from "../context/AuthContext";
import { Helmet } from 'react-helmet';


const pageTitle= 'Book Table'
const getCurrentDate = () => {
  const today = new Date();
  let month = String(today.getMonth() + 1).padStart(2, '0');
  let day = String(today.getDate()).padStart(2, '0');
  const year = today.getFullYear();

  return `${year}-${month}-${day}`;
};

const BookTableForm = () => {
  const {bookTableForm}= useContext(AuthContext);
  

  return (
    <>
     <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
      <div className={classes.backgroundImageBookTable}></div>
      <div className={classes.outside}>
        <div className={classes.loginContainer}></div>
        <div className={classes.loginFormContainer}>
          <form className={classes.form} method="post" onSubmit={bookTableForm} >
            <h1> Book Table</h1>
            <div>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                name="name"
                required
              />
            </div>

            <div>
              <label htmlFor="numberOfPersons">Number of Persons: </label>
              <select
                name="numberOfPersons"
                required
              >
                <option value="1">1 person</option>
                <option value="2">2 persons</option>
                <option value="3">3 persons</option>
                <option value="4">4 persons</option>
                <option value="5">5 persons</option>
                <option value="6">6 persons</option>
                <option value="7">7 persons</option>
                <option value="8">8 persons</option>
              </select>
            </div>

            <div>
              <label htmlFor="date">Date:</label>
              <input
                type="date"
                name="date"
                required
                min={getCurrentDate()}
              />
            </div>

            <div>
              <label>Time: </label>
              <select name="time"required>
                <option value="06:00 pm">06:00 pm</option>
                <option value="07:00 pm">07:00 pm</option>
                <option value="08:00 pm">08:00 pm</option>
                <option value="09:00 pm">09:00 pm</option>
                <option value="10:00 pm">10:00 pm</option>
              </select>
            </div>

            <div className={classes.actions}>
              <button type="submit">Submit</button>{" "}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default BookTableForm;

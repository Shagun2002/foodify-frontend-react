import classes from "./PageStyles.module.css";
import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import { Helmet } from 'react-helmet';
import Card from "../components/UI/Card";

const pageTitle= 'Feedbacks'
const Feedbacks = () => {
  const { contactData} = useContext(AuthContext);

  // console.log(contactData);
  // useEffect(() => {
  //   console.log("happen")
  //   setIsContactBtnClicked(true);
  // }, []);

  return (
    <>
     <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
      {/* <div className={classes.backgroundImage}></div> */}
      <div className={classes.outside}>
        <div className={classes.loginContainer}></div>
        {contactData && (
          <>
            <h2>
              <center>All the feedbacks here!</center>
            </h2>
            <section className={classes.feedbacks}>
           <Card>
           {contactData.map((contact) => (
              <div key={contact.id} className={classes.eachFeedback}>
                <p>Name: {contact.name}</p>
                <p>Message: {contact.message}</p>
                <p>Ratings: {contact.ratings}</p>
              </div>
            ))} 
            </Card>
            </section>
          </>
        )};
        
       <center> {!contactData && <h4>No feedbacks</h4>} </center> 

      </div>
    </>
  );
};

export default Feedbacks;

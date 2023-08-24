import classes from "./PageStyles.module.css";
import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Helmet } from 'react-helmet';
import Card from "../UI/Card";
import pageBanner from "../../assets/page-banner.jpg";

const pageTitle= 'Feedbacks'
const Feedbacks = () => {
  const { contactData} = useContext(AuthContext);
  return (
    <>
     <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
      {/* <div className={classes.backgroundImage}></div> */}
      <img className={classes.image} src={pageBanner} alt="page-banner-img" />
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

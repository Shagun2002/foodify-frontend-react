import React from 'react';
import AddMealsForm from './AddMealsForm';
import classes from './AddMeals.module.css';
import { Helmet } from 'react-helmet';
import pageBanner from "../../assets/page-banner.jpg";

const pageTitle= 'Add Menu'
const AddMenu = () => {
  return (
    <>
     <Helmet>
        <title>{pageTitle}</title>
      </Helmet>

      <article className={classes.article}>
      <img className={classes.image} src={pageBanner} alt="page-banner-img" />
      </article>

    <div className={classes.addMenuContainer}>
      <div className={classes.addMealsformcontainer}>
        <AddMealsForm />
      </div>
    </div>
    </>
  );
}

export default AddMenu;

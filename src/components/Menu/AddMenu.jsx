import React from 'react';
import AddMealsForm from './AddMealsForm';
import classes from './AddMeals.module.css';
import { Helmet } from 'react-helmet';

const pageTitle= 'Add Menu'
const AddMenu = () => {
  return (
    <>
     <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
    <div className={classes.addMenuContainer}>
      <div className={classes.addMealsformcontainer}>
        <AddMealsForm />
      </div>
    </div>
    </>
  );
}

export default AddMenu;

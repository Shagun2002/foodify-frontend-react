import React from 'react'
import mealsImage from '../../assets/1.jpg';
import classes from './Header.module.css';

const MainImage = () => {
  return (
    <>
     <div className={classes['main-image']}>
     <img src={mealsImage} alt='A table full of foods' />
    </div>
    </>
  )
}

export default MainImage
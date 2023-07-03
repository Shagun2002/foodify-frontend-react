import React from 'react'
import error404 from '../assets/error-404.jpeg'
// import classes from '../components/Layout/Header.module.css';


const ErrorPage = () => {
  return (
    <>
     {/* <div className={classes['main-image']}> */}
     <div>
     <img src={error404} alt='Error 404' />
    </div>
    </>
  )
}

export default ErrorPage
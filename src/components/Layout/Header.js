import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";
import logo from "../../assets/foodify-removebg.png";

const Header = (props) => {
  const { user, logoutUser, role } = useContext(AuthContext);
  const isAdmin = user && role === "Admin";
  const isLoggedIn = !!user;

  return (
    <header className={classes.header}>
      <img className={classes.logo} src={logo} alt="website logo" />

      {/* <div className="collapse navbar-collapse">
    <ul className="navbar-nav mr-auto" id="wbnav">
    <li className="nav-item active">
    <Link to="/" className={classes.button}>
        Home</Link>
    </li>
    <li className="nav-item">
    <Link to="/book-table" className={classes.button}>
        Book Table</Link>
    </li>
    <li className="nav-item ">
    <Link to="/contact-us" className={classes.button}>
       Contact Us</Link>
    </li>
    </ul>
    </div> */}

      {isAdmin && (
        <Link to="/admin/add-menu" className={classes.button}>
          AddMenu
        </Link>
      )}

      {isAdmin && (
        <Link to="/admin/feedbacks" className={classes.button}>
          Feedbacks
        </Link>
      )}

      {!isLoggedIn && (
        <Link to="/login" className={classes.button}>
          Login
        </Link>
      )}

      {!isLoggedIn && (
        <Link to="/register" className={classes.button}>
          SignUp
        </Link>
      )}

      {isLoggedIn && (
        <Link to="/" className={classes.button}>
          Home
        </Link>
      )}

      {isLoggedIn && (
        <Link to="/book-table" className={classes.button}>
          Book Table
        </Link>
      )}

      {isLoggedIn && !isAdmin && (
        <Link to="/contact-us" className={classes.button}>
          Contact Us
        </Link>
      )}

      {isLoggedIn && (
        <div className={classes.button} onClick={logoutUser}>
          Logout
        </div>
      )}

      {isLoggedIn && <HeaderCartButton onClick={props.onShowCart} />}

      {isLoggedIn && <div className={classes.button}>
        Hello: {user.email}!
        </div>}
    </header>
  );
};

export default Header;

import React, { useContext } from "react";
import { Link } from "react-router-dom";

import classes from "./LoginPage.module.css";
import AuthContext from "../../context/AuthContext";
import { Helmet } from 'react-helmet';

const pageTitle= 'Login'
const LoginPage = () => {
  let { user, loginUser } = useContext(AuthContext);

  return (
    <>
     <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
      <div className={classes.backgroundImage}></div>
      <div className={classes.outside}>
        <div className={classes.loginContainer}>
          <div className={classes.loginFormContainer}>
            {!user && (
              <form method="post" onSubmit={loginUser} className={classes.form}>
                <h1>Login Page</h1>
                <div>
                  <label htmlFor="email">Email</label>
                  <input id="email" type="email" name="email" required />
                </div>
                <div>
                  <label htmlFor="password">Password</label>
                  <input
                    id="password"
                    type="password"
                    name="password"
                    required
                  />
                </div>

                <div className={classes.actions}>
                  <h6 className={classes.h6}>
                    <Link to="/register">Create an account?</Link>
                  </h6>
                  <button>Login</button>
                </div>

                <div>
                  <p className={classes.forgot}>
                    <Link to="/reset-password">Forgot Password?</Link>
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;

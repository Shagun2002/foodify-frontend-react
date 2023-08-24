import React, { useContext, useState } from "react";

import classes from "./LoginPage.module.css";
import BASE_URL from "../../api/api";
import AuthContext from "../context/AuthContext";

const ResetPassword = () => {
  document.title = "Foodify|Reset Password";
  const { authTokens } = useContext(AuthContext);
  const [oldPassword, setOldPassword] = useState("");

  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
  
      const formData = {
        old_password: oldPassword,
        new_password: newPassword,
      };
      console.log("formData = ", formData)
      const response = await fetch(`${BASE_URL}/api/reset-password/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens.access}`,
        },

        body: JSON.stringify(formData),
      });
      console.log("response = ", response);
      const data = await response.json();
      console.log("resetpassword data=", data);

      if (response.ok) {
        alert("Password Changes Succesfully.");
        setOldPassword("");
        setNewPassword("");
      } else {
        alert("Some error occured while resetting password .Please try again.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className={classes.outside}>
        <div className={classes.loginContainer}></div>
        <div className={classes.loginFormContainer}>
          <center>
            {" "}
            <h1>Reset Password</h1>
          </center>

          <form className={classes.form} onSubmit={handleSubmit} method="post">
            <div>
              <label htmlFor="old-password">Old Password</label>
              <input
                type="password"
                id="old-password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="new-password">New Password</label>

              <input
                type="password"
                id="new-password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            <button type="submit">Reset Password</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;

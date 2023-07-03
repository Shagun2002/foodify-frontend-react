import React, { useContext } from 'react'
import { Link,Navigate,useActionData} from 'react-router-dom';
import classes from './LoginPage.module.css';
import AuthContext from '../../context/AuthContext';
import { Helmet } from 'react-helmet';

const pageTitle= 'Register'
const RegisterPage = () => {
    let {user, registerUser}=useContext(AuthContext);
    // const data= useActionData();
    const registerHandler=()=>{
        return <Navigate to ='/login' />
    }
  return (
   <>
    <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
   {/* <div className={classes.backgroundImageRegister}></div> */}
   <div className={classes.outside}>
     <div className={classes.loginContainer}>
  {!user && <form method="post" onSubmit={registerUser} className={classes.form}>
        <h1>Register Page</h1>
          
        {/* {data && data.errors &&(
           <ul>
          {Object.values(data.errors).map(err=>(
            <li key={err}> 
            {err}  </li>
          ))}
        </ul> )}

        {data &&  data.message && <p>{data.message}</p>} */}

        <p>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" required />
        </p>
        <p>
          <label htmlFor="image">Password</label>
          <input id="password1" type="password" name="password1" required />
        </p>
        <p>
          <label htmlFor="image">Confirm Password</label>
          <input id="password2" type="password" name="password2" required />
        </p>

        <div className={classes.actions}>
          <Link to='/login'> Already have an account? </Link>
          <button onClick={registerHandler}>Register </button>
        </div>
      </form>}
      </div>
      </div>
   </>
  )
}

export default RegisterPage
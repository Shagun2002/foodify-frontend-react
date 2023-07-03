import React, { useState, useEffect } from "react";

import AddMenu from "./components/Menu/AddMenu";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import ErrorPage from "./pages/ErrorPage";
import PrivateAdminRoute from "./utils/PrivateAdminRoute";
import PrivateUserRoute from "./utils/PrivateUserRoute";
import Header from "./components/Layout/Header";
import LoginPage from "./components/accounts/LoginPage";
import RegisterPage from "./components/accounts/RegisterPage";
import Checkout from "./components/Cart/Checkout";
import Order from "./components/Cart/Order";
import ContactUsForm from "./pages/ContactUs";
import BookTable from "./pages/BookTable";
import Feedbacks from "./pages/Feedbacks";
import Footer from "./components/Layout/Footer";
import "./App.css";
import Navbar from "./components/Layout/Navbar";
import ResetPassword from "./components/accounts/ResetPassword";
import { Helmet } from 'react-helmet';
import BookTableForm from "./pages/BookTable";
import MealsDetailsPage from "./components/Meals/MealDetailsFolder/MealsDetailsPage";

function App() {
//   useEffect(() => {
//     document.title = "Foodify"
//  }, []); 

const pageTitle = 'Foodify';


  const [cartIsShown, setCartIsShown] = useState(false);
  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const PUBLIC_ROUTES = [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/register",
      element: <RegisterPage />,
    },
    
    {
      path: "/*",
      element: <ErrorPage />,
    },
  ];

  const USER_ROUTES = [
    {
      path: "/reset-password",
      element: <ResetPassword />,
    },
    {
      path: "/order",
      element: <Order />,
    },
    {
      path: "/contact-us",
      element: <ContactUsForm />,
    },
    {
      path: "/book-table",
      element: <BookTableForm />,
    },
    {
      path:'/meals-details/:id',
      element:<MealsDetailsPage/>,
    }
  ];

  const ADMIN_ROUTES = [
    {
      path: "/add-menu",
      element: <AddMenu />,
    },
    {
      path: "/feedbacks",
      element: <Feedbacks />,
    },
  ];
  return (
    <>
     <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
      {/* <Navbar onShowCart={showCartHandler}/> */}
      <Header />
      <main className="main">
        <Routes>
          {PUBLIC_ROUTES.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}

          {USER_ROUTES.map(({ path, element }) => (
            <Route
              key={path}
              path={path}
              element={<PrivateUserRoute>{element}</PrivateUserRoute>}
            />
          ))}

          {ADMIN_ROUTES.map(({ path, element }) => (
            <Route
              key={path}
              path={`/admin${path}`}
              element={<PrivateAdminRoute>{element}</PrivateAdminRoute>}
            />
          ))}
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;

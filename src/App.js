import React, { useContext } from "react";
import AddMenu from "./components/Menu/AddMenu";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import ErrorPage from "./components/pages/ErrorPage";
import PrivateAdminRoute from "./utils/PrivateAdminRoute";
import PrivateUserRoute from "./utils/PrivateUserRoute";
import LoginPage from "./components/accounts/LoginPage";
import RegisterPage from "./components/accounts/RegisterPage";
import ContactUsForm from "./components/pages/ContactUs";
import Feedbacks from "./components/pages/Feedbacks";
import Footer from "./components/Layout/Footer";
import "./App.css";
import ResetPassword from "./components/accounts/ResetPassword";
import { Helmet } from "react-helmet";
import BookTableForm from "./components/pages/BookTable";
import MyCheckout from "./components/Cart/MyCheckout";
import Cart from "./components/Cart/Cart";
import CartContext from "./components/context/CartContext";
import MyNavbar from "./components/Layout/MyNavbar";
import MatchingMeals from "./components/Functionalities/MatchingMeals";
import MealsScreen from "./components/Meals/MealsScreen";
import AddTestimonialForm from "./components/Functionalities/AddTestimonialForm";
import EditTestimonialForm from "./components/Functionalities/EditTestimonialForm";

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
    path: "/meals-details/:id",
    element: <MealsScreen />,
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
    path: "/checkout",
    element: <MyCheckout />,
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
    path: "meals",
    element: <MatchingMeals />,
  },
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
  {
    path: "/add-testimonial",
    element: <AddTestimonialForm />,
  },
  {
    path: "/edit-testimonial/:id",
    element: <EditTestimonialForm />,
  },
];
const PAGE_TITLE = "Foodify";

function App() {
  const { hideCartHandler, showCartHandler, cartIsShown } =
    useContext(CartContext);

  return (
    <>
      <Helmet>
        <title>{PAGE_TITLE}</title>
      </Helmet>

      {cartIsShown && <Cart onHideCart={hideCartHandler} />}
      <MyNavbar onShowCart={showCartHandler} />

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

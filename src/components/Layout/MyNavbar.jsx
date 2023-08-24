import { useContext } from "react";
import "./MyNavbar.css";
import { Link } from "react-router-dom";
import logo from "../../assets/logo1.png";
import AuthContext from "../context/AuthContext";
import HeaderCartButton from "./HeaderCartButton";
import SearchBar from "../Functionalities/SearchBar";
import UserSettings from "./UserSettings";
import { Navbar ,Container } from "react-bootstrap";

const MyNavbar = ({ onShowCart}) => {
  const { user, logoutUser, role } = useContext(AuthContext);
  const isAdmin = user && role === "Admin";
  const isLoggedIn = !!user;
  return (
    <Navbar>
    <Container fluid>
        <Navbar.Collapse id="navbarScroll">
    <nav>
      <Link to="/" className="link">
        <img
          src={logo}
          alt="Logo "
          className="logo"
        />
      </Link>

      <div className="menu-items">
        <Link to="/" className="link">
          Home
        </Link>

        {isAdmin && (
          <Link to="/admin/add-menu" className="link">
            AddMenu
          </Link>
        )}

        {isAdmin && (
          <Link to="/admin/feedbacks" className="link">
            Feedbacks
          </Link>
        )}

        {!isLoggedIn && (
          <Link to="/login" className="link">
            Login
          </Link>
        )}

        {!isLoggedIn && (
          <Link to="/register" className="link">
            SignUp
          </Link>
        )}
        {isLoggedIn && (
          <Link to="/book-table" className="link">
            Book Table
          </Link>
        )}

        {isLoggedIn && !isAdmin && (
          <Link to="/contact-us" className="link">
            Contact Us
          </Link>
        )}

        {isLoggedIn && (
          <Link to="/" className="link" onClick={logoutUser}>
            Logout
          </Link>
        )}

        {isLoggedIn && <HeaderCartButton onClick={onShowCart} />}
        {isLoggedIn && <SearchBar />}

        <UserSettings/>

       
      </div>
    </nav>
    </Navbar.Collapse>
    </Container>
    </Navbar>
  );
};

export default MyNavbar;

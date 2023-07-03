import React from "react";
import { ListGroup } from "react-bootstrap";
import logo from "../../assets/foodify-removebg.png"
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__logo">
        <img src={logo} alt="logo" />
        <h5>The foodify</h5>
        {/* <p>The foodify Delivers you the delicious food varities.All our meals are cooked with high-quality ingredients, just-in-time and
        of course by experienced chefs!</p> */}
        
      </div>
      <div className="'single-footer">
       <h5>Contact Us</h5>
       <p><strong>Email:</strong><br/>example@gmail.com</p>
       <p><strong>Phone:</strong><br/>0123456789</p>
      </div>
      <div>
        <h5 className="footer__title mb-3">Delivery Time</h5>
        <ListGroup>
          <div className="delivery__time-item border-0 ps-0">
            <span>Friday - Tuesday</span>
            <p>10:00am - 11:00pm</p>
          </div>
          <div className="delivery__time-item border-0 ps-0">
            <span>Wednesday - Thursday</span>
            <p>Off day</p>
          </div>
        </ListGroup>
      </div>
    </footer>
  );
};

export default Footer;
import { React } from "react";
import ShowMealsCard from "./components/Meals/ShowMealsCard";
import mainImage from "./assets/mainImage.jpg";
import styles from './Home.module.css';
import Testimonial from "./components/Functionalities/Testimonial";
import MealsSummary from "./components/Meals/MealsSummary";
import Features from './components/Functionalities/Features';


const Home = () => {
  return (
    <>
    <div className={styles.home}>
      <article className={styles.article}>
      <img className={styles.image} src={mainImage} alt="mainImage" />
          <h4 className={styles.header}>Tastes Like a Paradise <br/> Good food made easy</h4>
      </article>

      <MealsSummary />
      <div>
       <h3 className={styles.heading} >Choose your favorite meals with Foodify!</h3>
      </div>

      <ShowMealsCard />
      <Features/>
      <Testimonial/>
      
     
      </div>
    </>
  );
};

export default Home;

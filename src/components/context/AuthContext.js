import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../api/api";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  let [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  let [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwt_decode(localStorage.getItem("authTokens"))
      : null
  );
  let [role, setRole] = useState(null);
  let [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  // console.log("User = ", user);
  const navigate = useNavigate();

  /**
   * & LOGIN API
   */

  let loginUser = async (e) => {
    e.preventDefault();

    let response = await fetch(`${BASE_URL}/api/token/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: e.target.email.value,
        password: e.target.password.value,
      }),
    });
    let data = await response.json();
    // console.log("Login access & refresh=", data);

    if (response.status === 200) {
      setAuthTokens(data);
      let decoded = jwt_decode(data.access);
      setUser(decoded);
      setRole(decoded.role);
      setEmail(decoded.email);
      localStorage.setItem("authTokens", JSON.stringify(data));
      navigate("/");
    } else {
      alert("Something went wrong while login!");
    }
  };

  let registerUser = async (e) => {
    e.preventDefault();

    let password1 = e.target.password1.value;
    let password2 = e.target.password2.value;
    if (password1 !== password2) {
      alert("Password did not match!");
    } else {
      let response = await fetch(`${BASE_URL}/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: e.target.email.value,
          password: e.target.password1.value,
        }),
      });
      let data = await response.json();
      console.log("register data=", data);
      if (response.status === 201) {
        navigate("/login");
      } else {
        alert("Something went wrong while register!");
      }
    }
  };

  let logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
  };

  /**
   * & Refresh access Token API
   */

  let updateToken = async () => {
    let response = await fetch(`${BASE_URL}/api/token/refresh/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh: authTokens?.refresh }),
    });

    let data = await response.json();
    if (response.status === 200) {
      setAuthTokens(data);
      setUser(jwt_decode(data.access));
      setRole(jwt_decode(data.access).role);
      localStorage.setItem("authTokens", JSON.stringify(data));
    } else {
      logoutUser();
    }

    if (loading) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loading) {
      updateToken();
    }

    let fourteenMinutes = 1000 * 60 * 14;
    let interval = setInterval(() => {
      if (authTokens) {
        updateToken();
      }
    }, fourteenMinutes);

    return () => clearInterval(interval);
  }, [authTokens, loading]);

  /**
   * & Contact POST API
   */
  let contactForm = async (e) => {
    e.preventDefault();
    let response = await fetch(`${BASE_URL}/api/contact-us/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens.access}`,
      },
      body: JSON.stringify({
        name: e.target.name.value,
        message: e.target.message.value,
        ratings: e.target.ratings.value,
      }),
    });
    console.log(response);
    let data = await response.json();
    console.log("Contact form data=", data);
    if (response.status === 201) {
      alert("contact form submitted, ThankYou!");

      navigate("/");
    } else {
      alert("Something went wrong!");
    }
  };

  /* 
  & Contact GET API: FEEDBACKS
  */
  const [contactData, setContactData] = useState(null);

  const fetchContactData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/contact-us/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens.access}`,
        },
      });

      if (response.status === 200) {
        const data = await response.json();
        setContactData(data);
      } else {
        console.log("Failed to fetch contact data Status:", response.status);
        const errorData = await response.json();
        console.log("Error data:", errorData);
      }
    } catch (error) {
      console.error("Error fetching contact data:", error);
    }
  };

  useEffect(() => {
    fetchContactData();
  }, []);

  /*
  & BookTable POST API 
  */
  let bookTableForm = async (e) => {
    e.preventDefault();
    const formData = {
      name: e.target.name.value,
      number_of_persons: e.target.numberOfPersons.value,
      date: e.target.date.value,
      time: e.target.time.value,
    };
    console.log("formData = ", formData);
    let response = await fetch(`${BASE_URL}/api/book-table/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens.access}`,
      },
      body: JSON.stringify(formData),
    });
    let data = await response.json();
    console.log("BookTable data=", data);

    if (response.status === 201) {
      alert("BookTable Form submitted, ThankYou!");
      navigate("/");
    } else {
      alert("Something went wrong!");
    }
  };

  /**
   * & SEARCH MEALS API
   */
  const [searchInput, setSearchInput] = useState("");
  const [searchData, setSearchData] = useState([]);

  let fetchSearchMeals = async () => {
    if (searchInput.trim().length === 0) {
      alert("Search field is empty!!");
      return null;
    }
    try {
      const response = await fetch(`${BASE_URL}/api/meals/${searchInput}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens.access}`,
        },
      });

      if (response.status === 200) {
        const data = await response.json();
        if (data?.data) {
          setSearchData(data?.data);
        }
      } else {
        alert("NO similar meal FOUND");
        console.log("NO similar meal FOUND", response.status);
      }
    } catch (error) {
      console.error("Error fetching searchMeals data:", error);
    }
  };

  /*
  &  Fetch MealDetails with id API 
  */
  let fetchMealDetails = async (mealId) => {
    try {
      const response = await fetch(`${BASE_URL}/api/meals/${mealId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authTokens.access}`,
        },
      });
      const data = await response.json();
      return data?.data;
    } catch (error) {
      console.error("Error fetching meal:", error);
      return null;
    }
  };

  /*
  & ReviewRating POST API 
  */
  let reviewRatingForm = async (formData) => {
    const response = await fetch(`${BASE_URL}/api/ratings/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens.access}`,
      },
      body: JSON.stringify(formData),
    });

    if (response.status === 201) {
      console.log("formData=", formData);
      alert("Thank you for your review!");
    } else {
      alert("Failed to submit review!");
    }
  };

  /*
  & ReviewRating GET API 
  */
  const [ratingsData, setRatingsData] = useState(null);
  const fetchRatingsData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/ratings/`, {
        method: "GET",
      });

      if (response.status === 200) {
        const data = await response.json();
        setRatingsData(data);
      } else {
        console.log("No reviews fetched!", response.status);
      }
    } catch (error) {
      console.error("Error! Failed to fetch review Ratings:", error);
    }
  };

  useEffect(() => {
    fetchRatingsData();
  }, []);

  /* 
  & Testimonials GET API  */
  const [testimonials, setTestimonials] = useState([]);

  const fetchTestimonials = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/testimonials/`, {
        method: "GET",
      });

      if (response.status === 200) {
        const data = await response.json();
        setTestimonials(data);
      } else {
        console.log("Failed to fetch TESTIMONIALS Status:", response.status);
      }
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  /*
  & addTestimonial POST API 
  */
  let addTestimonialForm = async (formData) => {
    const response = await fetch(`${BASE_URL}/api/testimonials/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens.access}`,
      },
      body: formData,
    });
    let data = await response.json();
    console.log("addTestimonialForm data=", data);

    if (response.status === 201) {
      alert("addTestimonial Form submitted, ThankYou!");
    } else {
      alert("Something went wrong while ADD testimonial!");
    }
  };

  /*
 & updateTestimonial PUT API 
 */
  let updateTestimonialForm = async (formData, id) => {
    try {
      let response = await fetch(`${BASE_URL}/api/testimonials/${id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens.access}`,
        },
        body: JSON.stringify(formData),
      });

      let data = await response.json();
      console.log("updateD data=", data);

      if (response.status === 200) {
        console.log("formData PUT=", formData);
        alert("Testimonial updated successfully!");
      } else {
        alert("Something went wrong!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong while EDIT testimonial!");
    }
  };

  /*
 & deleteTestimonial DELETE API 
 */
  let deleteTestimonial = async (id) => {
    try {
      let response = await fetch(`${BASE_URL}/api/testimonials/${id}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${authTokens.access}`,
        },
      });

      if (response.status === 204) {
        alert(`Testimonial ${id} deleted successfully!`);
      } else {
        alert("Something went wrong!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong while DELETE testimonial!");
    }
  };

  let contextData = {
    user: user,
    authTokens: authTokens,
    role: role,
    email: email,
    loginUser: loginUser,
    logoutUser: logoutUser,
    registerUser: registerUser,

    contactData: contactData,
    contactForm: contactForm,
    bookTableForm: bookTableForm,
    fetchSearchMeals: fetchSearchMeals,
    searchData: searchData,
    searchInput: searchInput,
    setSearchInput: setSearchInput,

    ratingsData: ratingsData,
    reviewRatingForm: reviewRatingForm,
    fetchMealDetails: fetchMealDetails,

    testimonials: testimonials,
    setTestimonials: setTestimonials,
    addTestimonialForm: addTestimonialForm,
    updateTestimonialForm: updateTestimonialForm,
    deleteTestimonial: deleteTestimonial,

  };
  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};

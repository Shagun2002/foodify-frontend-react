import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../api/api";

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
      localStorage.setItem("authTokens", JSON.stringify(data));
      navigate("/");
    } else {
      alert("Something went wrong!");
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
        alert("Something went wrong!");
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
  const [isContactBtnClicked, setIsContactBtnClicked] = useState(false);

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
        setIsContactBtnClicked(false);
      } else {
        alert("Failed to fetch contact data.");
      }
    } catch (error) {
      console.error("Error fetching contact data:", error);
      alert("An error occurred while fetching contact data.");
    }
  };

  useEffect(() => {
    // if (isContactBtnClicked) {
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
    console.log("formData = ", formData)
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

  let contextData = {
    user: user,
    authTokens: authTokens,
    role: role,
    loginUser: loginUser,
    logoutUser: logoutUser,
    registerUser: registerUser,

    contactData: contactData,
    contactForm: contactForm,
    bookTableForm: bookTableForm,
  };
  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};

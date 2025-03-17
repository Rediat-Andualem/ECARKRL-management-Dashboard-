import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../Utility/urlInstance";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./SignUp.module.css";

function SignUp() {
  const [formData, setFormData] = useState({
    user_first_name: "",
    user_last_name: "",
    user_email: "",
    user_password: "",
  });
const [response, setResponse] =useState('')
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post("/add-user", formData);
      console.log(response)
      if (response.status === 200) {
        toast.success(response.data.messageToTheFront || "Registration successful!", {
          position: "top-right",
          autoClose: 3000,
        });
        setResponse(response.data.messageToTheFront)
        // if (response.data.navigation) {
        //   setTimeout(() => navigate(response.data.navigation), 2000);
        // }
      }
    } catch (error) {
      let errorMessage = "Something went wrong.";
      if (error.response) {
        errorMessage = error.response.data.message || errorMessage;
      } else {
        errorMessage = "Network error, please try again.";
      }

      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="">
      <div className={`${styles.background}`}>
        <form className={`${styles.forForm}`} onSubmit={handleSubmit}>
          {response && <span style={{color :"#f09819",fontWeight:"bold"}}>{response}</span>}
          <h3 className={`${styles.title}`}>Sign Up</h3>

          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            name="user_first_name"
            placeholder="First Name"
            value={formData.user_first_name}
            onChange={handleChange}
            required
          />

          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            name="user_last_name"
            placeholder="Last Name"
            value={formData.user_last_name}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="user_email"
            placeholder="Email"
            value={formData.user_email}
            onChange={handleChange}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="user_password"
            placeholder="Password"
            value={formData.user_password}
            onChange={handleChange}
            required
          />

          <button className={`${styles.button}`} type="submit">
            Create Account
          </button>

          <h6 className={`${styles.space}`}>
            Already have an account?{" "}
            <Link className={`${styles.Link}`} to="/logIn">
              Log In
            </Link>
          </h6>
        </form>
      </div>
    </div>
  );
}

export default SignUp;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../Utility/urlInstance";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { jwtDecode } from "jwt-decode";
function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [response, setResponse] = useState("");
  const navigate = useNavigate();

  const signIn = useSignIn();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Reset error state

    try {
      const response = await axiosInstance.post("/login", { email, password });
      // console.log(response)
      if (!response.data.token) {
        setResponse("Incorrect email or password");
      } else {
        let token = response.data.token;
        const decodeToken = jwtDecode(token);
        // console.log(decodeToken)
        if (
          signIn({
            auth: { token, type: "Bearer", expiresIn: 4320 },
            userState: {
              displayName: decodeToken.display_name,
              userID: decodeToken.id,
              userRole:decodeToken.user_role,
              userEmail:decodeToken.user_email
            },
          })
        ) {
          navigate("/dashboard");
        }
      }
      // Store JWT token in localStorage
    } catch (err) {
      // Handle backend errors and set the error message
      if (err.response && err.response.data) {
        setError(
          err.response.data.messageToTheFront || "Login failed. Try again."
        );
      } else {
        setError("Server error. Please try again later.");
      }
    }
  };

  return (
    <div className={styles.background}>
      <form className={styles.forForm} onSubmit={handleLogin}>
        <h3 className={styles.title}>Log In</h3>

        {response && (
          <span style={{ color: "#f09819", fontWeight: "bold" }}>
            {response}
          </span>
        )}

        <label htmlFor="email">Email</label>
        <input
          type="text"
          placeholder="Email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="Password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Link className={styles.Forgot} to='/emailForPassword'>Forgot Password?</Link>

        <button className={styles.button} type="submit">
          Log In
        </button>

        <h6 className={styles.space}>
          Don't have an account?{" "}
          <Link className={styles.Link} to="/SignUp">
            Create Account
          </Link>
        </h6>
      </form>
    </div>
  );
}

export default LogIn;

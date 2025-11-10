"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import styles from "./Login.module.css"
import { Link } from "react-router-dom"
import { axiosInstance } from "../../Utility/urlInstance"
import useSignIn from "react-auth-kit/hooks/useSignIn"
import { jwtDecode } from "jwt-decode"

function LogIn() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [response, setResponse] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const signIn = useSignIn()

  const handleLogin = async (e) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const response = await axiosInstance.post("/login", { email, password })
      if (!response.data.token) {
        setResponse("Incorrect email or password")
      } else {
        const token = response.data.token
        const decodeToken = jwtDecode(token)
        if (
          signIn({
            auth: { token, type: "Bearer", expiresIn: 4320 },
            userState: {
              displayName: decodeToken.display_name,
              userID: decodeToken.id,
              userRole: decodeToken.user_role,
              userEmail: decodeToken.user_email,
            },
          })
        ) {
          navigate("/dashboard")
        }
      }
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.messageToTheFront || "Login failed. Try again.")
      } else {
        setError("Server error. Please try again later.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={styles.background}>
      <div className={styles.shape}></div>
      <div className={styles.shape}></div>

      <form className={styles.forForm} onSubmit={handleLogin}>
        <h3 className={styles.title}>Welcome Back</h3>
        <p className={styles.subtitle}>Sign in to your account</p>

        {response && (
          <div className={styles.messageBox}>
            <small className={styles.responseMessage}>{response}</small>
          </div>
        )}
        {error && (
          <div className={styles.errorBox}>
            <small className={styles.errorMessage}>{error}</small>
          </div>
        )}

        <div className={styles.formGroup}>
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            placeholder="you@example.com"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <Link className={styles.Forgot} to="/emailForPassword">
          Forgot Password?
        </Link>

        <button className={styles.button} type="submit" disabled={isLoading}>
          {isLoading ? "Signing in..." : "Sign In"}
        </button>

        <h6 className={styles.space}>
          Don't have an account?{" "}
          <Link className={styles.Link} to="/SignUp">
            Create Account
          </Link>
        </h6>
      </form>
    </div>
  )
}

export default LogIn

"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { axiosInstance } from "../../Utility/urlInstance"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import styles from "./SignUp.module.css"

function SignUp() {
  const [formData, setFormData] = useState({
    user_first_name: "",
    user_last_name: "",
    user_email: "",
    user_password: "",
  })
  const [response, setResponse] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await axiosInstance.post("/add-user", formData)
      if (response.status === 200) {
        setResponse(response.data.messageToTheFront)
        setFormData({
          user_first_name: "",
          user_last_name: "",
          user_email: "",
          user_password: "",
        })
      }
    } catch (error) {
      let errorMessage = "Something went wrong."
      if (error.response) {
        errorMessage = error.response.data.message || errorMessage
      } else {
        errorMessage = "Network error, please try again."
      }

      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 3000,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.background}>
        <div className={styles.shapeOne}></div>
        <div className={styles.shapeTwo}></div>
      </div>

      <form className={styles.formWrapper} onSubmit={handleSubmit}>
        <div className={styles.headerSection}>
          <h1 className={styles.title}>Create Account</h1>
          <p className={styles.subtitle}>Join us and start your journey</p>
        </div>

        {response && <div className={styles.successMessage}>{response}</div>}

        <div className={styles.inputGroup}>
          <label htmlFor="firstName" className={styles.label}>
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="user_first_name"
            placeholder="Anjali"
            value={formData.user_first_name}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="lastName" className={styles.label}>
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="user_last_name"
            placeholder="Garg"
            value={formData.user_last_name}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="email" className={styles.label}>
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="user_email"
            placeholder="you@example.com"
            value={formData.user_email}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="password" className={styles.label}>
            Password
          </label>
          <input
            type="password"
            id="password"
            name="user_password"
            placeholder="••••••••"
            value={formData.user_password}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>

        <button
          className={`${styles.submitButton} ${isLoading ? styles.loading : ""}`}
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Creating Account..." : "Create Account"}
        </button>

        <div className={styles.divider}>
          <span>Already have an account?</span>
        </div>

        <Link to="/logIn" className={styles.loginLink}>
          Log In
        </Link>
      </form>
    </div>
  )
}

export default SignUp

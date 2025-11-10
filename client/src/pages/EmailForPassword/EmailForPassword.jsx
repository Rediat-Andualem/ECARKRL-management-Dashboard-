// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
// import Spinner from 'react-bootstrap/Spinner'; // Import Spinner for the loading effect
// import styles from './EmailForPassword.module.css';
// import { axiosInstance } from '../../Utility/urlInstance';
// import { useState } from 'react';

// function EmailForPassword() {
//   const [response, setResponse] = useState('');
//   const [user_email, setEmail] = useState('');
//   const [isLoading, setIsLoading] = useState(false); 

//   const sendEmail = async (e) => {
//     e.preventDefault();
//     setIsLoading(true); 
//     setResponse('');

//     try {
//       const res = await axiosInstance.post('/update-Password', {user_email:user_email.email});
//       setResponse(res?.data?.message);
//     } catch (err) {
//       setResponse(err?.response?.data?.message);
//     } finally {
//       setIsLoading(false); 
//     }
//   };

//   const handleChange = (e) => {
//     switch (e.target.name) {
//       case 'email':
//         setEmail((pre) => ({ ...pre, email: e.target.value }));
//         break;
//       default:
//         break;
//     }
//   };

//   return (
//     <Form onSubmit={sendEmail} className={styles.passForm}>
//       <Form.Group className="mb-3" controlId="formBasicEmail">
//         <Form.Control
//           type="email"
//           name="email"
//           placeholder="Enter email"
//           onChange={handleChange}
//           required
//         />
//         <Form.Text className="text-muted">
//           Provide the email used upon registration...
//         </Form.Text>
//       </Form.Group>
//       <Button variant="primary" type="submit" disabled={isLoading}>
//         {isLoading ? (
//           <>
//             <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
//             {' '}Loading...
//           </>
//         ) : (
//           'Submit'
//         )}
//       </Button>
//       <h6 className={styles.h}>{response || ''}</h6>
//     </Form>
//   );
// }

// export default EmailForPassword;

"use client";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import styles from "./EmailForPassword.module.css";
import { axiosInstance } from "../../Utility/urlInstance";
import { useState } from "react";

function EmailForPassword() {
  const [response, setResponse] = useState("");
  const [user_email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sendEmail = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setResponse("");

    try {
      const res = await axiosInstance.post("/update-Password", {
        user_email: user_email.email,
      });
      setResponse(res?.data?.message);
    } catch (err) {
      setResponse(err?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    switch (e.target.name) {
      case "email":
        setEmail((pre) => ({ ...pre, email: e.target.value }));
        break;
      default:
        break;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.blob1}></div>
      <div className={styles.blob2}></div>

      <div className={styles.formWrapper}>
        <h1 className={styles.title}>Reset Your Password</h1>
        <div className={styles.divider}></div>

        <Form onSubmit={sendEmail} className={styles.passForm}>
          <Form.Group className={styles.formGroup} controlId="formBasicEmail">
            <Form.Label className={styles.label}>Registered Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter your email"
              onChange={handleChange}
              required
              className={styles.input}
            />
            <Form.Text className={styles.helperText}>
              Provide the email used upon registration.
            </Form.Text>
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            disabled={isLoading}
            className={styles.submitButton}
          >
            {isLoading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />{" "}
                Loading...
              </>
            ) : (
              "Send Reset Link"
            )}
          </Button>

          <h6 className={styles.response}>{response || ""}</h6>
        </Form>
      </div>
    </div>
  );
}

export default EmailForPassword;

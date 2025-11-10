// import React, { useEffect, useState } from "react";
// import { axiosInstance } from "../../Utility/urlInstance";
// import { MDBContainer, MDBCol, MDBRow } from "mdb-react-ui-kit";
// import image from "../../image/cylinderForConsumedPage.png";
// import { toast, ToastContainer } from "react-toastify";
// import { FaFaceSadTear } from "react-icons/fa6";
// import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
// function GasConsumed() {
//   const [formData, setFormData] = useState({
//     gas_cylinders_consumed: "",
//     gas_id: "",
//   });

//   const auth = useAuthUser();
// const userId = auth?.userID

//   const [cylinders, setCylinders] = useState([]);

//   useEffect(() => {
//     getCylinderLists();
//   }, []);

//   const getCylinderLists = async () => {
//     try {
//       const response = await axiosInstance.get("/getAllGases");
//       setCylinders(response.data);
//     } catch (error) {
//       console.error("Error fetching cylinders:", error.message);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axiosInstance.post("/gas-consumed", formData,  {
//           headers: { Authorization:  userId},
//         });
//       toast.success("Gas consumption recorded successfully!");
//       setFormData({ gas_cylinders_consumed: "", gas_id: "" });
//     } catch (error) {
//       toast.error(error?.response.data.message? error?.response.data.message : "Failed to submit gas consumption please try again");
//       // console.error(error?.response.data.message);
//     }
//   };

//   return (
//     <>
//       {!Array.isArray(cylinders) ||
//       cylinders.length === 0 ||
//       cylinders[0] === null ? (
//         <div style={{ textAlign: "center", marginTop: "2rem", color: "white" }}>
//           <h1>  No cylinder In Store</h1>
//         <FaFaceSadTear/>
//         </div>
//       ) : (
//         <MDBContainer fluid className="p-3 my-5 h-custom">
//           <MDBRow className="mx-3">
//             <MDBCol col="10" md="6">
//               <img src={image} className="img-fluid retouch d-none d-md-block" alt="Sample" />
//             </MDBCol>
//             <MDBCol col="3" md="5" className="mx-3">
//               <div className="d-flex flex-row align-items-center justify-content-center">
//                 <h3 className="stylingText text-white">
//                   ADD CONSUMED GAS CYLINDERS 
//                 </h3>
//               </div>
//               <div className="divider my-4"></div>
//               <form className="formContainerChemical" onSubmit={handleSubmit}>
//                 <div data-mdb-input-init className="form-outline mb-4">
//                   <select
//                     required
//                     className="select form-select select-custom"
//                     id="chemicalPriority"
//                     name="gas_id"
//                     value={formData.gas_id}
//                     onChange={handleInputChange}
//                   >
//                     <option value="">Select Gas</option>
//                     {cylinders.map((cylinder, i) => (
//                       <option key={i} value={cylinder.gas_id}>
//                         {cylinder.gas_name}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <div data-mdb-input-init className="form-outline mb-4">
//                   <input
//                     type="text"
//                     required
//                     name="gas_cylinders_consumed"
//                     id="chemicalManufacturer"
//                     className="form-control"
//                     placeholder="Amount of cylinder to deduct e.g 1"
//                     value={formData.gas_cylinders_consumed}
//                     onChange={handleInputChange}
//                   />
//                 </div>

//                 <div>
//                   <button
//                     type="submit"
//                     className="btn btn-primary btn-block mb-4"
//                   >
//                     Deduct Amount
//                   </button>
//                 </div>
//               </form>
//               <ToastContainer
//                 position="top-center"
//                 style={{ right: 0, left: "auto" }}
//               />
//             </MDBCol>
//           </MDBRow>
//         </MDBContainer>
//       )}
//     </>
//   );
// }

// export default GasConsumed;

"use client";

import React, { useEffect, useState } from "react";
import styles from "./GasConsumed.module.css";
import { axiosInstance } from "../../Utility/urlInstance";
import image from "../../image/cylinderForConsumedPage.png";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaFaceSadTear } from "react-icons/fa6";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

function GasConsumed() {
  const [formData, setFormData] = useState({
    gas_cylinders_consumed: "",
    gas_id: "",
  });

  const [cylinders, setCylinders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const auth = useAuthUser();
  const userId = auth?.userID;

  useEffect(() => {
    getCylinderLists();
  }, []);

  const getCylinderLists = async () => {
    try {
      const response = await axiosInstance.get("/getAllGases");
      setCylinders(response.data);
    } catch (error) {
      console.error("Error fetching cylinders:", error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axiosInstance.post("/gas-consumed", formData, {
        headers: { Authorization: userId },
      });
      toast.success("Gas consumption recorded successfully!");
      setFormData({ gas_cylinders_consumed: "", gas_id: "" });
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to submit gas consumption. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (!Array.isArray(cylinders) || cylinders.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.backgroundAnimation}>
          <div className={styles.blob1}></div>
          <div className={styles.blob2}></div>
        </div>
        <div className={styles.emptyState}>
          <h1>No Cylinder in Store</h1>
          <FaFaceSadTear size={48} color="#f09819" />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.backgroundAnimation}>
          <div className={styles.blob1}></div>
          <div className={styles.blob2}></div>
        </div>

        <div className={styles.contentWrapper}>
          <div className={styles.imageSection}>
            <img src={image} alt="Gas Cylinder" className={styles.image} />
          </div>

          <div className={styles.formSection}>
            <div className={styles.headerContainer}>
              <h2 className={styles.title}>ADD CONSUMED GAS CYLINDERS</h2>
            </div>

            <div className={styles.divider}></div>

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="gas_id" className={styles.label}>
                  Select Gas
                </label>
                <select
                  id="gas_id"
                  name="gas_id"
                  className={styles.select}
                  value={formData.gas_id}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Gas</option>
                  {cylinders.map((cylinder, i) => (
                    <option key={i} value={cylinder.gas_id}>
                      {cylinder.gas_name}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.formGroup}>
                <label
                  htmlFor="gas_cylinders_consumed"
                  className={styles.label}
                >
                  Amount to Deduct
                </label>
                <input
                  type="text"
                  id="gas_cylinders_consumed"
                  name="gas_cylinders_consumed"
                  placeholder="e.g. 1"
                  className={styles.input}
                  value={formData.gas_cylinders_consumed}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <button
                type="submit"
                className={styles.submitButton}
                disabled={isLoading}
              >
                {isLoading ? "Submitting..." : "Deduct Amount"}
              </button>
            </form>
          </div>
        </div>
      </div>

      <ToastContainer position="top-center" style={{ right: 0, left: "auto" }} />
    </>
  );
}

export default GasConsumed;




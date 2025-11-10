"use client"

import { useState, useRef } from "react"
import styles from "./AddGas.module.css"
import image from "../../image/cylinders_new.webp"
import { axiosInstance } from "../../Utility/urlInstance"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

function AddGas() {
  const [formData, setFormData] = useState({
    gas_name: "",
    gas_cylinders_amount: "",
    ordered_by: "",
    vendor_name: "",
    gas_receipt: null,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const fileInputRef = useRef(null)

  const handleChange = (e) => {
    const { name, value, files } = e.target
    if (name === "gassesReceipt") {
      setFormData((prev) => ({ ...prev, gas_receipt: files[0] }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    const data = new FormData()
    data.append("gas_name", formData.gas_name)
    data.append("gas_cylinders_amount", formData.gas_cylinders_amount)
    data.append("ordered_by", formData.ordered_by)
    data.append("vendor_name", formData.vendor_name)

    if (formData.gas_receipt) {
      data.append("gassesReceipt", formData.gas_receipt)
    }

    try {
      const response = await axiosInstance.post("/add-gas", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      toast.success(response.data.message || "Gas added successfully!")

      setFormData({
        gas_name: "",
        gas_cylinders_amount: "",
        ordered_by: "",
        vendor_name: "",
        gas_receipt: null,
      })

      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    } catch (error) {
      console.error(error)
      toast.error(error.response?.data?.message || "Error adding gas cylinders. Please try again!")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.blob1}></div>
      <div className={styles.blob2}></div>

      <div className={styles.contentWrapper}>
        <div className={styles.imageColumn}>
          <img src={image || "/placeholder.svg"} className={styles.heroImage} alt="Gas Cylinders" />
        </div>

        <div className={styles.formColumn}>
          <div className={styles.formContainer}>
            <h1 className={styles.title}>Add Gas Cylinders</h1>
            <div className={styles.divider}></div>

            <form onSubmit={handleSubmit} className={styles.form}>
              {/* Gas Name and Amount Row */}
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="gas_name" className={styles.label}>
                    Gas Name
                  </label>
                  <select
                    id="gas_name"
                    className={styles.select}
                    name="gas_name"
                    value={formData.gas_name}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Gas Type</option>
                    <option value="Hydrogen">Hydrogen</option>
                    <option value="Nitrogen">Nitrogen</option>
                    <option value="Oxygen">Oxygen</option>
                    <option value="Argon">Argon</option>
                    <option value="Ammonia">Ammonia</option>
                    <option value="Carbon Dioxide">Carbon Dioxide</option>
                    <option value="Carbon Monoxide">Carbon Monoxide</option>
                    <option value="Helium">Helium</option>
                    <option value="Zero Air">Zero Air</option>
                    <option value="Argon balanced Hydrogen">Argon balanced Hydrogen</option>
                    <option value="Helium balanced Hydrogen">Helium balanced Hydrogen</option>
                    <option value="Helium balanced Argon">Helium balanced Argon</option>
                    <option value="Helium balanced Nitrogen">Helium balanced Nitrogen</option>
                    <option value="Helium balanced Carbon dioxide">Helium balanced Carbon dioxide</option>
                    <option value="Methane">Methane</option>
                    <option value="Ethane">Ethane</option>
                    <option value="Propane">Propane</option>
                    <option value="Butane">Butane</option>
                    <option value="Acetylene">Acetylene</option>
                    <option value="Chlorine">Chlorine</option>
                    <option value="Nitrous Oxide">Nitrous Oxide</option>
                    <option value="Hydrogen Chloride">Hydrogen Chloride</option>
                    <option value="Ethylene">Ethylene</option>
                    <option value="Fluorine">Fluorine</option>
                    <option value="Krypton">Krypton</option>
                    <option value="Xenon">Xenon</option>
                    <option value="Neon">Neon</option>
                    <option value="Silane">Silane</option>
                    <option value="Phosphine">Phosphine</option>
                    <option value="Nitric Oxide">Nitric Oxide</option>
                    <option value="Diborane">Diborane</option>
                    <option value="Arsine">Arsine</option>
                    <option value="Sulfur Hexafluoride">Sulfur Hexafluoride</option>
                    <option value="Tetrafluoromethane">Tetrafluoromethane</option>
                    <option value="Dichlorosilane">Dichlorosilane</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="gas_cylinders_amount" className={styles.label}>
                    Cylinder Amount
                  </label>
                  <input
                    id="gas_cylinders_amount"
                    type="text"
                    name="gas_cylinders_amount"
                    value={formData.gas_cylinders_amount}
                    className={styles.input}
                    placeholder="Enter quantity"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Ordered By and Vendor Row */}
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="ordered_by" className={styles.label}>
                    Ordered By
                  </label>
                  <input
                    id="ordered_by"
                    type="text"
                    name="ordered_by"
                    value={formData.ordered_by}
                    className={styles.input}
                    placeholder="Enter name"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="vendor_name" className={styles.label}>
                    Vendor Name
                  </label>
                  <input
                    id="vendor_name"
                    type="text"
                    name="vendor_name"
                    value={formData.vendor_name}
                    className={styles.input}
                    placeholder="Enter vendor"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* File Upload */}
              <div className={styles.fileUploadGroup}>
                <label htmlFor="fileUpload" className={styles.uploadLabel}>
                  Attach Receipt (Optional)
                </label>
                {/* <div className={styles.fileInputWrapper}>
                  <input
                    ref={fileInputRef}
                    id="fileUpload"
                    className={styles.fileInput}
                    name="gassesReceipt"
                    autoComplete="new-password"
                    type="file"
                    accept="image/jpeg, image/png, image/gif, application/pdf"
                    onChange={handleChange}
                  />
                  <span className={styles.fileInputPlaceholder}>
                    {formData.gas_receipt ? formData.gas_receipt.name : "Click to upload or drag and drop"}
                  </span>
                </div> */}
              </div>

              {/* Submit Button */}
              <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
                {isSubmitting ? "Adding..." : "Add Gas Cylinders"}
              </button>
            </form>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  )
}

export default AddGas

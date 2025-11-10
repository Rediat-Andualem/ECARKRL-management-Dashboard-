"use client"

import { useState } from "react"
import styles from "./AddConsumable.module.css"
import image from "../../image/consumables_new.webp"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { axiosInstance } from "../../Utility/urlInstance"

function AddConsumables() {
  const [formData, setFormData] = useState({
    name: "",
    vendor: "",
    location: "",
    file: null,
  })

  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value, files } = e.target
    if (name === "file") {
      setFormData({ ...formData, file: files[0] })
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const { name, vendor, location, file } = formData

    if (!name || !vendor || !location || !file) {
      toast.error("Please fill out all fields.")
      return
    }

    setIsLoading(true)

    const payload = new FormData()
    payload.append("name", name)
    payload.append("vendor", vendor)
    payload.append("location", location)
    payload.append("consumableReceipt", file)

    try {
      const response = await axiosInstance.post("/add-consumables", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      toast.success(response.data.message || "Consumable added successfully!")
      setFormData({ name: "", vendor: "", location: "", file: null })
    } catch (error) {
      console.error("Error submitting form:", error)
      toast.error("Failed to submit the form. Please try again.")
    } finally {
      setIsLoading(false)
    }
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
            <img src={image || "/placeholder.svg"} alt="Consumables" className={styles.image} />
          </div>

          <div className={styles.formSection}>
            <div className={styles.headerContainer}>
              <h2 className={styles.title}>ADD CONSUMABLE ITEMS</h2>
            </div>

            <div className={styles.divider}></div>

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="consumableName" className={styles.label}>
                  Consumable Name
                </label>
                <input
                  type="text"
                  id="consumableName"
                  className={styles.input}
                  placeholder="Enter consumable name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="vendorName" className={styles.label}>
                  Vendor Name
                </label>
                <input
                  type="text"
                  id="vendorName"
                  className={styles.input}
                  placeholder="Enter vendor name"
                  name="vendor"
                  value={formData.vendor}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="location" className={styles.label}>
                  Consumable Location
                </label>
                <select
                  className={styles.select}
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                    Select location
                  </option>
                  <option value="Consumable Location One [C-L-1]">Consumable Location One [C-L-1]</option>
                  <option value="Consumable Location Two [C-L-2]">Consumable Location Two [C-L-2]</option>
                  <option value="Consumable Location Three [C-L-3]">Consumable Location Three [C-L-3]</option>
                  <option value="Consumable Location Four [C-L-4]">Consumable Location Four [C-L-4]</option>
                  <option value="Consumable Location Five [C-L-5]">Consumable Location Five [C-L-5]</option>
                  <option value="Consumable Location Six [C-L-6]">Consumable Location Six [C-L-6]</option>
                  <option value="Consumable Location Seven [C-L-7]">Consumable Location Seven [C-L-7]</option>
                  <option value="Consumable Location Eight [C-L-8]">Consumable Location Eight [C-L-8]</option>
                  <option value="Consumable Location Nine [C-L-9]">Consumable Location Nine [C-L-9]</option>
                  <option value="Consumable Location Ten [C-L-10]">Consumable Location Ten [C-L-10]</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="fileUpload" className={styles.label}>
                  Attach Receipt Picture
                </label>
                <div className={styles.fileInputWrapper}>
                  <input
                    id="fileUpload"
                    className={styles.fileInput}
                    name="file"
                    type="file"
                    accept="application/pdf"
                    onChange={handleChange}
                  />
                  <span className={styles.fileInputLabel}>
                    {formData.file ? formData.file.name : "Choose file or drag here"}
                  </span>
                </div>
              </div>

              <button type="submit" className={styles.submitButton} disabled={isLoading}>
                {isLoading ? "Adding..." : "Add Consumable"}
              </button>
            </form>
          </div>
        </div>
      </div>

      <ToastContainer position="top-center" style={{ right: 0, left: "auto" }} />
    </>
  )
}

export default AddConsumables

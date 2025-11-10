"use client"

import { useState } from "react"
import styles from "./AddChemcial.module.css"
import image from "../../image/chemcials2.webp"
import { axiosInstance } from "../../Utility/urlInstance"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

function AddChemical() {
  const [formData, setFormData] = useState({
    chemicalName: "",
    chemicalFormula: "",
    chemicalPurity: "",
    chemicalManufacturer: "",
    chemicalState: "",
    chemicalAmount: "",
    unitOfMeasurement: "",
    chemicalLocation: "",
    chemicalOrderedBy: "",
    vendorName: "",
    chemicalPackaging: "",
    chemicalExpireDate: "",
    chemicalPriority: "",
    receipt: null,
  })

  const [isLoading, setIsLoading] = useState(false)
  const [fileName, setFileName] = useState("")

  const handleChange = (e) => {
    const { id, value, type, files } = e.target
    if (type === "file") {
      setFormData({ ...formData, receipt: files[0] })
      setFileName(files[0]?.name || "")
    } else {
      setFormData({ ...formData, [id]: value })
    }
  }

  const handleSelectChange = (e) => {
    const { id, value } = e.target
    setFormData({ ...formData, [id]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const data = new FormData()

      for (const key in formData) {
        if (key !== "receipt") {
          data.append(key, formData[key])
        }
      }
      if (formData.receipt) {
        data.append("chemicalReceipt", formData.receipt)
      }

      const addedData = await axiosInstance.post("/add-chemicals", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      console.log("Chemical added successfully:", addedData.data)
      toast.success("Chemical added successfully!")

      setFormData({
        chemicalName: "",
        chemicalFormula: "",
        chemicalPurity: "",
        chemicalManufacturer: "",
        chemicalState: "",
        chemicalAmount: "",
        unitOfMeasurement: "",
        chemicalLocation: "",
        chemicalOrderedBy: "",
        vendorName: "",
        chemicalPackaging: "",
        chemicalExpireDate: "",
        chemicalPriority: "",
        receipt: null,
      })
      setFileName("")
      document.getElementById("fileUpload").value = ""
    } catch (error) {
      console.error(error.response.data)
      toast.error(error.response.data ? error.response.data.message : "Error adding chemical. Please try again!")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.imageSection}>
          <img src={image || "/placeholder.svg"} className={styles.chemicalImage} alt="Chemical management" />
        </div>

        <div className={styles.formSection}>
          <div className={styles.headerContainer}>
            <h2 className={styles.title}>Add Chemical</h2>
            <p className={styles.subtitle}>Manage your chemical inventory</p>
          </div>

          <div className={styles.divider}></div>

          <form className={styles.form} onSubmit={handleSubmit} encType="multipart/form-data">
            {/* Row 1: Chemical Name & Formula */}
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Chemical Name</label>
                <input
                  type="text"
                  required
                  id="chemicalName"
                  className={styles.input}
                  placeholder="Enter chemical name"
                  value={formData.chemicalName}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Chemical Formula</label>
                <input
                  type="text"
                  required
                  id="chemicalFormula"
                  className={styles.input}
                  placeholder="e.g., H2O"
                  value={formData.chemicalFormula}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* CAS Number */}
            <div className={styles.formGroup}>
              <label className={styles.label}>CAS Number</label>
              <input
                type="text"
                required
                id="casNumber"
                className={styles.input}
                placeholder="e.g., 86722-66-9"
                value={formData.casNumber}
                onChange={handleChange}
              />
            </div>

            {/* Row 2: Purity & Manufacturer */}
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Chemical Purity</label>
                <input
                  type="number"
                  required
                  id="chemicalPurity"
                  className={styles.input}
                  placeholder="e.g., 98"
                  value={formData.chemicalPurity}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Manufacturer</label>
                <input
                  type="text"
                  required
                  id="chemicalManufacturer"
                  className={styles.input}
                  placeholder="Manufacturer name"
                  value={formData.chemicalManufacturer}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Chemical State */}
            <div className={styles.formGroup}>
              <label className={styles.label}>Chemical State</label>
              <select
                className={styles.select}
                required
                id="chemicalState"
                value={formData.chemicalState}
                onChange={handleSelectChange}
              >
                <option value="">Select chemical state</option>
                <option value="SOLID">Solid</option>
                <option value="LIQUID">Liquid</option>
                <option value="GAS">Gas</option>
              </select>
            </div>

            {/* Row 3: Amount & Unit */}
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Amount</label>
                <input
                  type="text"
                  required
                  id="chemicalAmount"
                  className={styles.input}
                  placeholder="Enter amount"
                  value={formData.chemicalAmount}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Unit</label>
                <select
                  required
                  className={styles.select}
                  id="unitOfMeasurement"
                  value={formData.unitOfMeasurement}
                  onChange={handleSelectChange}
                >
                  <option value="">Select unit</option>
                  <option value="ml">ml</option>
                  <option value="L">L</option>
                  <option value="mg">mg</option>
                  <option value="g">g</option>
                  <option value="Kg">Kg</option>
                </select>
              </div>
            </div>

            {/* Row 4: Location, Ordered By, Vendor */}
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Location</label>
                <select
                  required
                  className={styles.select}
                  id="chemicalLocation"
                  value={formData.chemicalLocation}
                  onChange={handleSelectChange}
                >
                  <option value="">Select location</option>
                  <option value="ALCOHOL SECTION">Alcohol Section</option>
                  <option value="SOLID-A-B">Solid A-B</option>
                  <option value="SOLID-C-D">Solid C-D</option>
                  <option value="SOLID-E-F">Solid E-F</option>
                  <option value="SOLID-G-H">Solid G-H</option>
                  <option value="SOLID-I-J">Solid I-J</option>
                  <option value="SOLID-K-L">Solid K-L</option>
                  <option value="SOLID-M-N">Solid M-N</option>
                  <option value="SOLID-O-P">Solid O-P</option>
                  <option value="SOLID-Q-R">Solid Q-R</option>
                  <option value="SOLID-S-T">Solid S-T</option>
                  <option value="SOLID-U-V">Solid U-V</option>
                  <option value="SOLID-W-X">Solid W-X</option>
                  <option value="SOLID-Y-Z">Solid Y-Z</option>
                  <option value="LIQUID-A-B">Liquid A-B</option>
                  <option value="LIQUID-C-D">Liquid C-D</option>
                  <option value="LIQUID-E-F">Liquid E-F</option>
                  <option value="LIQUID-G-H">Liquid G-H</option>
                  <option value="LIQUID-I-J">Liquid I-J</option>
                  <option value="LIQUID-K-L">Liquid K-L</option>
                  <option value="LIQUID-M-N">Liquid M-N</option>
                  <option value="LIQUID-O-P">Liquid O-P</option>
                  <option value="LIQUID-Q-R">Liquid Q-R</option>
                  <option value="LIQUID-S-T">Liquid S-T</option>
                  <option value="LIQUID-U-V">Liquid U-V</option>
                  <option value="LIQUID-W-X">Liquid W-X</option>
                  <option value="LIQUID-Y-Z">Liquid Y-Z</option>
                  <option value="FRIDGE">Fridge</option>
                  <option value="EXPIRED-CHEMICAL">Expired Chemical</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Ordered By</label>
                <input
                  required
                  type="text"
                  id="chemicalOrderedBy"
                  className={styles.input}
                  placeholder="Person name"
                  value={formData.chemicalOrderedBy}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Vendor</label>
                <input
                  type="text"
                  id="vendorName"
                  className={styles.input}
                  placeholder="Vendor name"
                  value={formData.vendorName}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Row 5: Packaging & Expiry Date */}
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Packaging</label>
                <select
                  required
                  className={styles.select}
                  id="chemicalPackaging"
                  value={formData.chemicalPackaging}
                  onChange={handleSelectChange}
                >
                  <option value="">Select packaging</option>
                  <option value="GLASS">Glass</option>
                  <option value="PLASTIC">Plastic</option>
                  <option value="OTHER CONTAINER">Other Container</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Expiry Date</label>
                <input
                  required
                  type="text"
                  id="chemicalExpireDate"
                  className={styles.input}
                  placeholder="MM/YYYY"
                  value={formData.chemicalExpireDate}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Priority */}
            <div className={styles.formGroup}>
              <label className={styles.label}>Priority</label>
              <select
                required
                className={styles.select}
                id="chemicalPriority"
                value={formData.chemicalPriority}
                onChange={handleSelectChange}
              >
                <option value="">Select priority</option>
                <option value="High">High</option>
                <option value="Low">Low</option>
              </select>
            </div>

            {/* File Upload */}
            <div className={styles.formGroup}>
              <label className={styles.fileLabel}>
                <input
                  id="fileUpload"
                  className={styles.fileInput}
                  name="chemicalReceipt"
                  type="file"
                  accept="image/jpeg, image/png, image/gif, application/pdf"
                  onChange={handleChange}
                />
                <span className={styles.fileLabelText}>{fileName || "Attach Receipt (Optional)"}</span>
              </label>
            </div>

            {/* Submit Button */}
            <button type="submit" className={styles.submitBtn} disabled={isLoading}>
              {isLoading ? "Adding Chemical..." : "Add Chemical"}
            </button>
          </form>

          <ToastContainer position="top-center" style={{ right: 0, left: "auto" }} />
        </div>
      </div>
    </div>
  )
}

export default AddChemical



import React, { useState } from "react";
import "./AddConsumable.css";
import image from "../../image/consumables_new.webp";
import { MDBContainer, MDBCol, MDBRow } from 'mdb-react-ui-kit';
import { Input, Ripple, initMDB } from "mdb-ui-kit";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {axiosInstance} from "../../Utility/urlInstance"; 

initMDB({ Input, Ripple });

function AddConsumables() {
  const [formData, setFormData] = useState({
    name: "",
    vendor: "",
    location: "",
    file: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setFormData({ ...formData, file: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, vendor, location, file } = formData;

    if (!name || !vendor || !location || !file) {
      toast.error("Please fill out all fields.");
      return;
    }

    const payload = new FormData();
    payload.append("name", name);
    payload.append("vendor", vendor);
    payload.append("location", location);
    payload.append("consumableReceipt", file); // This must match multer's field name

    try {
      const response = await axiosInstance.post("/add-consumables", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success(response.data.message || "Consumable added successfully!");

      // Clear the form
      setFormData({ name: "", vendor: "", location: "", file: null });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  };

  return (
    <>
      <MDBContainer fluid className="p-3 my-5 h-custom">
        <MDBRow className='mx-3'>
          <MDBCol col='10' md='6'>
            <img src={image} className="img-fluid retouch d-none d-md-block " alt="Sample image" />
          </MDBCol>

          <MDBCol col='3' md='5' className='mx-3'>
            <div className="d-flex flex-row align-items-center justify-content-center">
              <h3 className="stylingText text-white text-center">ADD CONSUMABLE ITEMS</h3>
            </div>

            <div className="divider  my-4"></div>

            <form onSubmit={handleSubmit}>
              <div className="row mb-4">
                <div className="col">
                  <div data-mdb-input-init className="form-outline">
                    <input
                      type="text"
                      id="consumableName"
                      className="form-control"
                      placeholder="Consumable Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="row mb-4">
                <div className="col">
                  <div data-mdb-input-init className="form-outline">
                    <input
                      type="text"
                      id="vendorName"
                      className="form-control"
                      placeholder="Vendor Name"
                      name="vendor"
                      value={formData.vendor}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="row mb-4">
                <div className="col">
                  <div data-mdb-input-init className="form-outline">
                    <select
                      data-mdb-select-init
                      className="select form-select select-custom"
                      id="state"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      required
                    >
                      <option value="" disabled>Consumable Location</option>
                      <option value='Consumable Location One [C-L-1]'>Consumable Location One [C-L-1]</option>
                      <option value='Consumable Location Two [C-L-2]'>Consumable Location Two [C-L-2]</option>
                      <option value='Consumable Location Three [C-L-3]'>Consumable Location Three [C-L-3]</option>
                      <option value='Consumable Location Four [C-L-4]'>Consumable Location Four [C-L-4]</option>
                      <option value='Consumable Location Five [C-L-5]'>Consumable Location Five [C-L-5]</option>
                      <option value='Consumable Location Six [C-L-6]'>Consumable Location Six [C-L-6]</option>
                      <option value='Consumable Location Seven [C-L-7]'>Consumable Location Seven [C-L-7]</option>
                      <option value='Consumable Location Eight [C-L-8]'>Consumable Location Eight [C-L-8]</option>
                      <option value='Consumable Location Nine [C-L-9]'>Consumable Location Nine [C-L-9]</option>
                      <option value='Consumable Location Ten [C-L-10]'>Consumable Location Ten [C-L-10]</option>
                    </select>
                  </div>
                </div>
              </div>

              <div data-mdb-input-init className="form-outline mb-4">
                <label className="label" htmlFor="fileUpload">
                  Attach Receipt Picture
                </label>
                <input
                  id="fileUpload"
                  className="in11 mt-4"
                  name="file"
                  autoComplete="new-password"
                  type="file"
                  accept="application/pdf"
                  onChange={handleChange}
                />
              </div>

              <div className="">
                <button
                  type="submit"
                  className="btn btn-primary btn-block mb-4"
                >
                  Add Consumable
                </button>
              </div>
            </form>
          </MDBCol>
        </MDBRow>
      </MDBContainer>

      <ToastContainer position="top-center"
        style={{ right: 0, left: "auto" }} />
    </>
  );
}

export default AddConsumables;

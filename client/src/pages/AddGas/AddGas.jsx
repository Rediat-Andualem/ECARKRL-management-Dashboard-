import React, { useState } from "react";
import "./AddGas.css";
import image from "../../image/cylinders_new.webp";
import { MDBContainer, MDBCol, MDBRow } from "mdb-react-ui-kit";
import { axiosInstance } from "../../Utility/urlInstance"; // make sure this is configured
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddGas() {
  const [formData, setFormData] = useState({
    gas_name: "",
    gas_cylinders_amount: "",
    ordered_by: "",
    vendor_name: "",
    gas_receipt: null,
  });

  const [response, setResponse] = useState();
  const [message, setMessage] = useState();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "gassesReceipt") {
      setFormData((prev) => ({ ...prev, gas_receipt: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  const data = new FormData();
  data.append("gas_name", formData.gas_name);
  data.append("gas_cylinders_amount", formData.gas_cylinders_amount);
  data.append("ordered_by", formData.ordered_by);
  data.append("vendor_name", formData.vendor_name);

  if (formData.gas_receipt) {
    data.append("gassesReceipt", formData.gas_receipt);
  }

  try {
    const response = await axiosInstance.post("/add-gas", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.data.message) {
      toast.success(response.data.message || "Gas added successfully!");
    } else {
      toast.success("Gas added successfully!");
    }
  } catch (error) {
    console.error("Error submitting form:", error);
    toast.error("Failed to submit the form. Please try again.");
  }
};


  return (
    <MDBContainer fluid className="p-3 my-5 h-custom">
      <MDBRow className="mx-3">
        <MDBCol col="10" md="6">
          <img
            src={image}
            className="px-4 imageBorder align-items-center d-none d-md-block"
            alt="Sample"
          />
        </MDBCol>
        <MDBCol col="3" md="5" className="mx-3">
          <h3 className="stylingText text-white text-center">ADD GAS CYLINDERS</h3>
          <div className="divider my-4"></div>

          <form onSubmit={handleSubmit}>
            <div className="row mb-4">
              <div className="col">
                <select
                  className="form-select select-custom"
                  name="gas_name"
                  onChange={handleChange}
                  required
                >
                   <option value="" disabled selected>
                     Name Of Gas
                   </option>
                   <option value="Hydrogen">Hydrogen</option>
                   <option value="Nitrogen">Nitrogen</option>
                   <option value="Oxygen">Oxygen</option>
                   <option value="Argon">Argon</option>
                   <option value="Nitrogen">Nitrogen</option>
                   <option value="Ammonia">Ammonia</option>
                   <option value="Carbon Dioxide">Carbon Dioxide </option>
                   <option value="Carbon Monoxide">Carbon Monoxide</option>
                   <option value="Helium">Helium</option>
                   <option value="Zero Air">Zero Air</option>
                   <option value="Argon balanced Hydrogen">Argon balanced Hydrogen</option>
                   <option value="Helium balanced Hydrogen">Helium balanced Hydrogen</option>
                   <option value=" Helium balanced Carbon dioxide">
                     Helium balanced Carbon dioxide
                   </option>
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
              <div className="col">
                <input
                  type="text"
                  name="gas_cylinders_amount"
                  className="form-control"
                  placeholder="Gas Cylinder Amount"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="row mb-4">
              <div className="col">
                <input
                  type="text"
                  name="ordered_by"
                  className="form-control"
                  placeholder="Gas Ordered By"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col">
                <input
                  type="text"
                  name="vendor_name"
                  className="form-control"
                  placeholder="Vendor Name"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
                        <div data-mdb-input-init class="form-outline mb-4">
              <label className="label" htmlFor="fileUpload">
                Attach receipt (Optional)
              </label>
              <input
                id="fileUpload"
                className="in11 mt-4"
                name="gassesReceipt"
                autoComplete="new-password"
                type="file"
                accept="image/jpeg, image/png, image/gif, application/pdf"
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="btn btn-primary btn-block mb-4">
              Add Gas
            </button>
          </form>
        </MDBCol>
      </MDBRow>
        <ToastContainer />
    </MDBContainer>
  );
}

export default AddGas;

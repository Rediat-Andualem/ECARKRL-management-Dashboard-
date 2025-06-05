import React, { useState } from "react";
import "./AddChemcial.css";
import image from "../../image/chemcials2.webp";
import { MDBContainer, MDBCol, MDBRow } from "mdb-react-ui-kit";
import { Input, Ripple, initMDB } from "mdb-ui-kit";
import { axiosInstance } from "../../Utility/urlInstance";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

initMDB({ Input, Ripple });

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
  });

  const handleChange = (e) => {
    const { id, value, type, files } = e.target;
    if (type === "file") {
      setFormData({ ...formData, receipt: files[0] });
    } else {
      setFormData({ ...formData, [id]: value });
    }
  };

  const handleSelectChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      for (const key in formData) {
        if (key !== "receipt") {
          data.append(key, formData[key]);
        }
      }
      // Append the file if exists
      if (formData.receipt) {
        data.append("chemicalReceipt", formData.receipt);
      }

      const addedData = await axiosInstance.post("/add-chemicals", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Chemical added successfully:", addedData.data);
      toast.success("Chemical added successfully!");
    } catch (error) {
      console.error("Error adding chemical:", error);
      toast.error("Error adding chemical. Please try again!");
    }
  };

  return (
    <>
      <MDBContainer fluid className="p-3 my-5 h-custom">
        <MDBRow className="mx-3">
          <MDBCol col="10" md="6" >
            <img src={image} class="img-fluid retouch d-none d-md-block" alt="Sample image" />
          </MDBCol>
          <MDBCol col="3" md="5" className="mx-3">
            <div className="d-flex flex-row align-items-center justify-content-center">
              <h3 className="stylingText text-white">ADD CHEMICALS </h3>
            </div>
            <div className="divider  my-4"></div>
            <form
              className="formContainerChemical"
              method="POST"
              onSubmit={handleSubmit}
              enctype="multipart/form-data"
            >
              <div class="row mb-4">
                <div class="col">
                  <div data-mdb-input-init class="form-outline">
                    <input
                      type="text"
                      required
                      id="chemicalName"
                      class="form-control"
                      placeholder="Chemical name"
                      value={formData.chemicalName}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div class="col">
                  <div data-mdb-input-init class="form-outline">
                    <input
                      type="text"
                      required
                      id="chemicalFormula"
                      class="form-control"
                      placeholder="Chemical formula"
                      value={formData.chemicalFormula}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>



              <div data-mdb-input-init class="form-outline mb-4">
                <input
                  type="text"
                  required
                  id="casNumber"
                  class="form-control"
                  placeholder="CAS Number eg. 86722-66-9"
                  value={formData.casNumber}
                  onChange={handleChange}
                />
              </div>
              <div data-mdb-input-init class="form-outline mb-4">
                <input
                  type="number"
                  required
                  id="chemicalPurity"
                  class="form-control"
                  placeholder="Chemical purity eg. 98 no % required"
                  value={formData.chemicalPurity}
                  onChange={handleChange}
                />
              </div>

              <div data-mdb-input-init class="form-outline mb-4">
                <input
                  type="text"
                  required
                  id="chemicalManufacturer"
                  class="form-control"
                  placeholder="Chemical Manufacturer"
                  value={formData.chemicalManufacturer}
                  onChange={handleChange}
                />
              </div>

              <div data-mdb-input-init class="form-outline mb-4">
                <select
                  data-mdb-select-init
                  class="select form-select select-custom"
                  required
                  id="chemicalState"
                  value={formData.chemicalState}
                  onChange={handleSelectChange}
                >
                  <option value="" disabled selected>
                    Choose Chemical State
                  </option>
                  <option value="SOLID">Solid</option>
                  <option value="LIQUID">Liquid</option>
                  <option value="GAS">Gas</option>
                </select>
              </div>

              <div class="row mb-4">
                <div class="col">
                  <div data-mdb-input-init class="form-outline">
                    <input
                      type="text"
                      required
                      id="chemicalAmount"
                      class="form-control"
                      placeholder="Chemical Amount"
                      value={formData.chemicalAmount}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div class="col">
                  <div data-mdb-input-init class="form-outline mb-4">
                    <select
                      required
                      data-mdb-select-init
                      class="select form-select select-custom"
                      id="unitOfMeasurement"
                      value={formData.unitOfMeasurement}
                      onChange={handleSelectChange}
                    >
                      <option value="" disabled selected>
                        Unit Of Measurement
                      </option>
                      <option value="ml">ml</option>
                      <option value="L">L</option>
                      <option value="mg">mg</option>
                      <option value="g">g</option>
                      <option value="Kg">Kg</option>
                    </select>
                  </div>
                </div>
              </div>

              <div class="row mb-4">
                <div class="col">
                  <div data-mdb-input-init class="form-outline">
                    <select
                      required
                      data-mdb-select-init
                      class="select form-select select-custom"
                      id="chemicalLocation"
                      value={formData.chemicalLocation}
                      onChange={handleSelectChange}
                    >
                      <option value="" disabled selected>
                        Chemical Location
                      </option>
                      {/* Locations */}
                      <option value="ALCOHOL SECTION">ALCOHOL SECTION</option>
                      <option value="SOLID-A-B">SOLID-A-B</option>
                      <option value="SOLID-C-D">SOLID-C-D</option>
                      <option value="SOLID-E-F">SOLID-E-F</option>
                      <option value="SOLID-G-H">SOLID-G-H</option>
                      <option value="SOLID-I-J">SOLID-I-J</option>
                      <option value="SOLID-K-L">SOLID-K-L</option>
                      <option value="SOLID-M-N">SOLID-M-N</option>
                      <option value="SOLID-O-P">SOLID-O-P</option>
                      <option value="SOLID-Q-R">SOLID-Q-R</option>
                      <option value="SOLID-S-T">SOLID-S-T</option>
                      <option value="SOLID-U-V">SOLID-U-V</option>
                      <option value="SOLID-W-X">SOLID-W-X</option>
                      <option value="SOLID-Y-Z">SOLID-Y-Z</option>
                      <option value="LIQUID-A-B">LIQUID-A-B</option>
                      <option value="LIQUID-C-D">LIQUID-C-D</option>
                      <option value="LIQUID-E-F">LIQUID-E-F</option>
                      <option value="LIQUID-G-H">LIQUID-G-H</option>
                      <option value="LIQUID-I-J">LIQUID-I-J</option>
                      <option value="LIQUID-K-L">LIQUID-K-L</option>
                      <option value="LIQUID-M-N">LIQUID-M-N</option>
                      <option value="LIQUID-O-P">LIQUID-O-P</option>
                      <option value="LIQUID-Q-R">LIQUID-Q-R</option>
                      <option value="LIQUID-S-T">LIQUID-S-T</option>
                      <option value="LIQUID-U-V">LIQUID-U-V</option>
                      <option value="LIQUID-W-X">LIQUID-W-X</option>
                      <option value="LIQUID-Y-Z">LIQUID-Y-Z</option>
                    </select>
                  </div>
                </div>
                <div class="col">
                  <div data-mdb-input-init class="form-outline">
                    <input
                      required
                      type="text"
                      id="chemicalOrderedBy"
                      class="form-control"
                      placeholder="Chemical ordered by"
                      value={formData.chemicalOrderedBy}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div class="col">
                  <div data-mdb-input-init class="form-outline">
                    <input
                      type="text"
                      id="vendorName"
                      class="form-control"
                      placeholder="Vendor name"
                      value={formData.vendorName}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <div data-mdb-input-init class="form-outline mb-4">
                <select
                  required
                  data-mdb-select-init
                  class="select form-select select-custom"
                  id="chemicalPackaging"
                  value={formData.chemicalPackaging}
                  onChange={handleSelectChange}
                >
                  <option value="" disabled selected>
                    Chemical Packaging
                  </option>
                  <option value="GLASS">Glass</option>
                  <option value="PLASTIC">Plastic</option>
                  <option value="OTHER CONTAINER">Other Container</option>
                </select>
              </div>

              <div data-mdb-input-init class="form-outline mb-4">
                <input
                  required
                  type="text"
                  id="chemicalExpireDate"
                  class="form-control"
                  placeholder="Chemical Expire Date (MM/YYYY)"
                  value={formData.chemicalExpireDate}
                  onChange={handleChange}
                />
              </div>

              <div data-mdb-input-init class="form-outline mb-4">
                <select
                  required
                  data-mdb-select-init
                  class="select form-select select-custom"
                  id="chemicalPriority"
                  value={formData.chemicalPriority}
                  onChange={handleSelectChange}
                >
                  <option value="" disabled selected>
                    Chemical Priority
                  </option>
                  <option value="High">High</option>
                  <option value="Low">Low</option>
                </select>
              </div>

              <div data-mdb-input-init class="form-outline mb-4">
                <label className="label" htmlFor="fileUpload">
                  Attach receipt (Optional)
                </label>
                <input
                  id="fileUpload"
                  className="in11 mt-4"
                  name="chemicalReceipt"
                  autoComplete="new-password"
                  type="file"
                  accept="image/jpeg, image/png, image/gif, application/pdf"
                  onChange={handleChange}
                />
              </div>

              <div className="">
                <button type="submit" class="btn btn-primary btn-block mb-4">
                  Add Chemical
                </button>
              </div>
            </form>
            <ToastContainer
              position="top-center"
              style={{ right: 0, left: "auto" }}
            />
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  );
}

export default AddChemical;

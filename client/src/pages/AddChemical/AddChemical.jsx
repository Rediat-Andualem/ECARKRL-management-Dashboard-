import React from "react";
import "./AddChemcial.css";
import image from "../../image/chemicals2.jpg";
import {MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
import { Input, Ripple, initMDB } from "mdb-ui-kit";

initMDB({ Input, Ripple });
function AddChemical() {
  return (
<>
<MDBContainer fluid className="p-3 my-5 h-custom">

<MDBRow className='mx-3'>

  <MDBCol col='10' md='6'>
    <img src={image} class="img-fluid retouch " alt="Sample image" />
  </MDBCol>

  <MDBCol col='3' md='5' className='mx-3'>

    <div className="d-flex flex-row align-items-center justify-content-center">

      <h3 className="stylingText">ADD CHEMICALS </h3>


    </div>

    <div className="divider  my-4">

    </div>
<form>

<div class="row mb-4">
<div class="col">
<div data-mdb-input-init class="form-outline">
  <input type="text" id="form3Example1" class="form-control" />
  <label class="form-label" for="form3Example1">Chemical Name</label>
</div>
</div>
<div class="col">
<div data-mdb-input-init class="form-outline">
  <input type="text" id="form3Example2" class="form-control" />
  <label class="form-label" for="form3Example2">Chemical Formula</label>
</div>
</div>
</div>

<div data-mdb-input-init class="form-outline mb-4">
<input type="email" id="form3Example3" class="form-control" />
<label class="form-label" for="form3Example3">Chemical Purity</label>
</div>


<div data-mdb-input-init class="form-outline mb-4">
<input type="password" id="form3Example4" class="form-control" />
<label class="form-label" for="form3Example4">Chemical Manufacturer</label>

</div>
<div data-mdb-input-init class="form-outline mb-4">

    <select data-mdb-select-init class="select form-select select-custom" id="state" >
      <option value="" disabled selected>Choose Chemical State</option>
      <option value='SOLID'>Solid</option>
      <option value='LIQUID'>Liquid</option>
      <option value='GAS'>Gas</option>
    </select>

</div>
<div class="row mb-4">
<div class="col">
<div data-mdb-input-init class="form-outline">
  <input type="" id="form3Example7" class="form-control" />
  <label class="form-label" for="form3Example7">Chemical Amount</label>
</div>
</div>
<div class="col">
<div data-mdb-input-init class="form-outline">
  <input type="text" id="form3Example8" class="form-control" />
  <label class="form-label" for="form3Example8">Chemical Expire Date</label>
</div>

</div>
</div>
<div class="row mb-4">
<div class="col">
<div data-mdb-input-init class="form-outline">
<select data-mdb-select-init class="select form-select select-custom" id="state" >
      <option value="" disabled selected>Chemical Location</option>
      <option value='ALCOHOL SECTION'>ALCOHOL SECTION</option>
      <option value='SOLID-A-B'>SOLID-A-B</option>
      <option value='SOLID-C-D'>SOLID-C-D</option>
      <option value='SOLID-E-F'>SOLID-E-F</option>
      <option value='SOLID-G-H'>SOLID-G-H</option>
      <option value='SOLID-I-J'>SOLID-I-J</option>
      <option value='SOLID-K-L'>SOLID-K-L</option>
      <option value='SOLID-M-N'>SOLID-M-N</option>
      <option value='SOLID-O-P'>SOLID-O-P</option>
      <option value='SOLID-Q-R'>SOLID-Q-R</option>
      <option value='SOLID-S-T'>SOLID-S-T</option>
      <option value='SOLID-U-V'>SOLID-U-V</option>
      <option value='SOLID-W-X'>SOLID-W-X</option>
      <option value='SOLID-Y-Z'>SOLID-Y-Z</option>
      <option value='LIQUID-A-B'>LIQUID-A-B</option>
      <option value='LIQUID-C-D'>LIQUID-C-D</option>
      <option value='LIQUID-E-F'>LIQUID-E-F</option>
      <option value='LIQUID-G-H'>LIQUID-G-H</option>
      <option value='LIQUID-I-J'>LIQUID-I-J</option>
      <option value='LIQUID-K-L'>LIQUID-K-L</option>
      <option value='LIQUID-M-N'>LIQUID-M-N</option>
      <option value='LIQUID-O-P'>LIQUID-O-P</option>
      <option value='LIQUID-Q-R'>LIQUID-Q-R</option>
      <option value='LIQUID-S-T'>LIQUID-S-T</option>
      <option value='LIQUID-U-V'>LIQUID-U-V</option>
      <option value='LIQUID-W-X'>LIQUID-W-X</option>
      <option value='LIQUID-Y-Z'>LIQUID-Y-Z</option>
    </select>
</div>
</div>
<div class="col">
<div data-mdb-input-init class="form-outline">
  <input type="text" id="form3Example10" class="form-control" />
  <label class="form-label" for="form3Example10">Chemical Ordered By</label>
</div>
</div>
<div class="col">
<div data-mdb-input-init class="form-outline">
  <input type="text" id="form3Example10" class="form-control" />
  <label class="form-label" for="form3Example10">Vendor Name</label>
</div>
</div>
</div>
<div data-mdb-input-init class="form-outline mb-4">

    <select data-mdb-select-init class="select form-select select-custom" id="state" >
      <option value="" disabled selected>Chemical Packaging</option>
      <option value='GLASS'>Glass</option>
      <option value='PLASTIC'>Plastic</option>
      <option value='OTHER CONTAINER'>Other Container</option>
    </select>
</div>
<div data-mdb-input-init class="form-outline mb-4">
<select data-mdb-select-init class="select form-select select-custom" id="state" >
      <option value="" disabled selected>Unit Of Measurement </option>
      <option value='ml'>ml</option>
      <option value='L'>L</option>
      <option value='mg'>mg</option>
      <option value='g'>g</option>
      <option value='Kg'>Kg</option>
    </select>

</div>
<div data-mdb-input-init class="form-outline mb-4">
<select data-mdb-select-init class="select form-select select-custom" id="state" >
      <option value="" disabled selected>Chemical Priority </option>
      <option value='High'>High</option>
      <option value='Low'>Low</option>
    </select>
</div>

<div data-mdb-input-init class="form-outline mb-4">
<label className="label" htmlFor="fileUpload">
            Attach receipt (Optional)
            </label>
          <input
            id="fileUpload"
            required
            className="in11 mt-4"
            name="Course_file"
            autoComplete="new-password"
            type="file"
            accept="application/pdf"
          />
</div>


<div className="">

<button data-mdb-ripple-init type="button" class="btn btn-primary btn-block mb-4">Add Chemical</button>
</div>

</form>

  </MDBCol>

</MDBRow>


</MDBContainer>
</>
     

  );
}

export default AddChemical;


import React from "react";
import "./AddGas.css";
import image from '../../image/gas-cylinders-stack.webp'
import {MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
import { Input, Ripple, initMDB } from "mdb-ui-kit";

initMDB({ Input, Ripple });
function AddGas() {
  return (
<>
<MDBContainer fluid className="p-3 my-5 h-custom">

<MDBRow className='mx-3'>

  <MDBCol col='10' md='6'>
    <img src={image} class="px-4 align-items-center " alt="Sample image" />
  </MDBCol>

  <MDBCol col='3' md='5' className='mx-3'>

    <div className="d-flex flex-row align-items-center justify-content-center">

      <h3 className="stylingText">ADD Gas Cylinders  </h3>


    </div>

    <div className="divider  my-4">

    </div>
<form>

<div class="row mb-4">
<div class="col">
<div data-mdb-input-init class="form-outline">
<select data-mdb-select-init class="select form-select select-custom" id="state" >
      <option value="" disabled selected>Name Of Gas</option>
      <option value='ALCOHOL SECTION'></option>
      <option value='SOLID-A-B'>Hydrogen</option>
      <option value='SOLID-C-D'>Nitrogen</option>
      <option value='SOLID-E-F'>Oxygen</option>
      <option value='SOLID-G-H'>Argon</option>
      <option value='SOLID-I-J'>Nitrogen</option>
      <option value='SOLID-K-L'>Ammonia</option>
      <option value='SOLID-M-N'>Carbon Dioxide </option>
      <option value='SOLID-O-P'>Carbon Monoxide</option>
      <option value='SOLID-Q-R'>Helium</option>
      <option value='SOLID-U-V'>Zero Air</option>
      <option value='LIQUID-Y-Z'>Argon balanced Hydrogen</option>
      <option value='LIQUID-Y-Z'>Helium balanced Hydrogen</option>
      <option value='LIQUID-Y-Z'>Helium balanced Carbon dioxide</option>
      <option value='SOLID-S-T'>Methane</option>
      <option value='LIQUID-Y-Z'>Ethane</option>
      <option value='SOLID-W-X'>Propane</option>
      <option value='SOLID-Y-Z'>Butane</option>
      <option value='LIQUID-A-B'>Acetylene</option>
      <option value='LIQUID-C-D'>Chlorine</option>
      <option value='LIQUID-E-F'>Sulfur Dioxide</option>
      <option value='LIQUID-G-H'>Nitrous Oxide</option>
      <option value='LIQUID-I-J'>Hydrogen Chloride</option>
      <option value='LIQUID-K-L'>Ethylene</option>
      <option value='LIQUID-M-N'>Fluorine</option>
      <option value='LIQUID-O-P'>Krypton</option>
      <option value='LIQUID-Q-R'>Xenon</option>
      <option value='LIQUID-S-T'>Neon</option>
      <option value='LIQUID-U-V'>Silane</option>
      <option value='LIQUID-W-X'>Phosphine</option>
      <option value='LIQUID-Y-Z'>Nitric Oxide</option>
      <option value='LIQUID-Y-Z'>Diborane</option>
      <option value='LIQUID-Y-Z'>Arsine</option>
      <option value='LIQUID-Y-Z'>Sulfur Hexafluoride</option>
      <option value='LIQUID-Y-Z'>Tetrafluoromethane</option>
      <option value='LIQUID-Y-Z'>Dichlorosilane</option>
     
    </select>
</div>
</div>
<div class="col">
<div data-mdb-input-init class="form-outline">
  <input type="text" id="form3Example2" class="form-control" />
  <label class="form-label" for="form3Example2">Gas Cylinder Amount</label>
</div>
</div>
</div>


<div class="row mb-4">

<div class="col">
<div data-mdb-input-init class="form-outline">
  <input type="text" id="form3Example10" class="form-control" />
  <label class="form-label" for="form3Example10">Gas Ordered By</label>
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
<label className="label" htmlFor="fileUpload">
            Attach receipt 
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

<button data-mdb-ripple-init type="button" class="btn btn-primary btn-block mb-4">Add Gas</button>
</div>

</form>

  </MDBCol>

</MDBRow>


</MDBContainer>
</>
     

  );
}

export default AddGas;


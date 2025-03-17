import React from "react";
import "./AddConsumable.css";
import image from "../../image/chemicals2.jpg";
import {MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
import { Input, Ripple, initMDB } from "mdb-ui-kit";

initMDB({ Input, Ripple });
function AddConsumables() {
  return (
<>
<MDBContainer fluid className="p-3 my-5 h-custom">

<MDBRow className='mx-3'>

  <MDBCol col='10' md='6'>
    <img src={image} class="img-fluid retouch " alt="Sample image" />
  </MDBCol>

  <MDBCol col='3' md='5' className='mx-3'>

    <div className="d-flex flex-row align-items-center justify-content-center">

      <h3 className="stylingText">ADD Consumable Items </h3>


    </div>

    <div className="divider  my-4">

    </div>
<form>

<div class="row mb-4">
<div class="col">
<div data-mdb-input-init class="form-outline">
  <input type="text" id="form3Example1" class="form-control" />
  <label class="form-label" for="form3Example1">Consumable Name</label>
</div>
</div>
</div>

<div class="row mb-4">
<div class="col">
<div data-mdb-input-init class="form-outline">
  <input type="text" id="form3Example1" class="form-control" />
  <label class="form-label" for="form3Example1">Vendor Name</label>
</div>
</div>
</div>

<div class="row mb-4">
<div class="col">
<div data-mdb-input-init class="form-outline">
<select data-mdb-select-init class="select form-select select-custom" id="state" >
      <option value="" disabled selected>Consumable Location</option>
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


<div data-mdb-input-init class="form-outline mb-4">
<label className="label" htmlFor="fileUpload">
            Attach Receipt Picture
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

<button data-mdb-ripple-init type="button" class="btn btn-primary btn-block mb-4">Add Consumable</button>
</div>

</form>

  </MDBCol>

</MDBRow>


</MDBContainer>
</>
     

  );
}

export default AddConsumables;


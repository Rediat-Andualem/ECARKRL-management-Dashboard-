// import express from 'express'
// import {tableCreation} from '../controllers/tableCreator.js'
// import {register,deleteUserById,getAllUsers} from '../controllers/RegisterControler.js'
// import {login} from '../controllers/LoginControler.js'
// import {addChemicals,getAllChemicals,deleteChemicals,getChemicalById}  from '../controllers/addChemical.js'
// import {addGas,getJunkFiles,deleteBillFileForGas} from '../controllers/addGas.js'
// import {chemicalsConsumed}  from '../controllers/chemicalConsumed.js'
// import {gasConsumed,getAllGasesCylinder} from '../controllers/gasesConsumed.js'
// // import {chemcialNotifiyer,gasNotifiyer,zeroGasDelete} from '../middleware/chemialAndGasNotification.js'
// import {consumables,getAllConsumables} from '../controllers/consumablesRegisteration.js'
// import createImageUploader from '../middleware/ImageUploader.js'
// import { deleteChemicalImage,deleteGasImage,deleteConsumableImage } from '../Resources/toDelete.js'

// import {showChemicalBills,showConsumablesBill,showGassesBill} from '../controllers/imageSender.js'

// const chemicalUploader = createImageUploader('Resources/chemicalBills');
// const gasUploader = createImageUploader('Resources/gasBills');
// const consumableUploader = createImageUploader('Resources/consumableBills');
// import {forgetPassword,confirmation} from '../controllers/ForgotPasswordConfiguration.js'



// export let Route = express.Router()

// // user Related
// Route.get('/create-table',tableCreation)
// // user related
// Route.post('/add-user',register)
// Route.post("/login",login)
// Route.delete('/deleteProfile/:user_id',deleteUserById)
// Route.get('/getAllUsers',getAllUsers)
// // ----
// Route.post('/update-Password',forgetPassword)
// Route.post('/password-confirm/:iv/:content',confirmation)
// // chemical related
// Route.post("/add-chemicals",chemicalUploader.single("chemicalReceipt"),addChemicals)
// Route.get("/getAllChemicals",getAllChemicals)
// // Route.delete("/deleteChemicals/:chemicalId",deleteChemicals)
// Route.get('/singleChemical/:chemical_id',getChemicalById)
// Route.post("/chem-consu",chemicalsConsumed)
// // Route.get('/remain-chemcial',chemcialNotifiyer)
// Route.delete('/delete-chemical/:chemical_id',deleteChemicalImage)
// // consumable related
// Route.post("/add-consumables",consumableUploader.single("consumableReceipt"),consumables)
// Route.get('/getAllConsumables',getAllConsumables)
// Route.delete('/delete-consumables/:consumables_id',deleteConsumableImage)
// // gas related
// Route.post("/add-gas",gasUploader.single("gassesReceipt"),addGas)
// Route.post("/gas-consumed",gasConsumed)
// Route.get('/getAllGases',getAllGasesCylinder)
// // Route.get('/remain-gas',gasNotifiyer)
// // Route.get('/delete-gas',zeroGasDelete)
// Route.delete('/delete-gas/:gas_id',deleteGasImage)
// Route.get('/junkGasFiles',getJunkFiles)
// Route.delete('/deleteJunkGasFiles/:fileName',deleteBillFileForGas)
// // image related 
// Route.get('/Resources/chemicalBills/:imageName',showChemicalBills)
// Route.get('/Resources/gasBills/:imageName',showGassesBill)
// Route.get('/Resources/consumableBills/:imageName',showConsumablesBill)


const express = require('express');
const { tableCreation } = require('../controllers/tableCreator.js');
const { register, deleteUserById, getAllUsers } = require('../controllers/RegisterControler.js');
const { login } = require('../controllers/LoginControler.js');
const { addChemicals, getAllChemicals, deleteChemicals, getChemicalById } = require('../controllers/addChemical.js');
const { addGas, getJunkFiles, deleteBillFileForGas } = require('../controllers/addGas.js');
const { chemicalsConsumed } = require('../controllers/chemicalConsumed.js');
const { gasConsumed, getAllGasesCylinder } = require('../controllers/gasesConsumed.js');
const { consumables, getAllConsumables } = require('../controllers/consumablesRegisteration.js');
const {createUploader} = require('../middleware/ImageUploader.js');
const { deleteChemicalImage, deleteGasImage, deleteConsumableImage } = require('../Resources/toDelete.js');
const { showChemicalBills, showConsumablesBill, showGassesBill } = require('../controllers/imageSender.js');
const { forgetPassword, confirmation } = require('../controllers/ForgotPasswordConfiguration.js');

const chemicalUploader = createUploader('Resources/chemicalBills');
const gasUploader = createUploader('Resources/gasBills');
const consumableUploader = createUploader('Resources/consumableBills');

const Route = express.Router();

// user Related
Route.get('/create-table', tableCreation);
// user related
Route.post('/add-user', register);
Route.post("/login", login);
Route.delete('/deleteProfile/:user_id', deleteUserById);
Route.get('/getAllUsers', getAllUsers);
// ----
Route.post('/update-Password', forgetPassword);
Route.post('/password-confirm/:iv/:content', confirmation);
// chemical related
Route.post("/add-chemicals", chemicalUploader.single("chemicalReceipt"), addChemicals);
Route.get("/getAllChemicals", getAllChemicals);
// Route.delete("/deleteChemicals/:chemicalId", deleteChemicals);
Route.get('/singleChemical/:chemical_id', getChemicalById);
Route.post("/chem-consu", chemicalsConsumed);
// Route.get('/remain-chemcial', chemcialNotifiyer);
Route.delete('/delete-chemical/:chemical_id', deleteChemicalImage);
// consumable related
Route.post("/add-consumables", consumableUploader.single("consumableReceipt"), consumables);
Route.get('/getAllConsumables', getAllConsumables);
Route.delete('/delete-consumables/:consumables_id', deleteConsumableImage);
// gas related
Route.post("/add-gas", gasUploader.single("gassesReceipt"), addGas);
Route.post("/gas-consumed", gasConsumed);
Route.get('/getAllGases', getAllGasesCylinder);
// Route.get('/remain-gas', gasNotifiyer);
// Route.get('/delete-gas', zeroGasDelete);
Route.delete('/delete-gas/:gas_id', deleteGasImage);
Route.get('/junkGasFiles', getJunkFiles);
Route.delete('/deleteJunkGasFiles/:fileName', deleteBillFileForGas);
// image related 
Route.get('/Resources/chemicalBills/:imageName', showChemicalBills);
Route.get('/Resources/gasBills/:imageName', showGassesBill);
Route.get('/Resources/consumableBills/:imageName', showConsumablesBill);

module.exports = { Route };
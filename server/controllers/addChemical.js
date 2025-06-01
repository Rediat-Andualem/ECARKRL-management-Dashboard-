import connectionInfo from "../schema/db.config.js";


// export let addChemicals = (req, res) => {
//     let imageFilePath = req.file ? req.file.path : 'not provided'; 
//     const {
//         chemical_name,
//         chemical_unit_of_measurement,
//         chemical_formula,
//         chemical_purity,
//         chemical_manufacturer,
//         chemical_state,
//         chemical_packaging,
//         chemical_amount,
//         chemical_expire_date,
//         chemical_location,
//         chemical_ordered_by,
//         chemical_priority,
//         chemical_vender_name
//     } = req.body;
//     if (!chemical_name || !chemical_formula || !chemical_purity || !chemical_manufacturer || !chemical_state || !chemical_packaging || !chemical_amount || !chemical_expire_date || !chemical_location || !chemical_ordered_by || !chemical_priority || !chemical_unit_of_measurement) {
//         res.status(400).json({
//             message: "All input fields are required"
//         });
//     } else {
//         const isStringRegex = /^[A-Za-z\s]+$/;
//         const isNumberRegex = /^\d+$/;
//         const monthAndYear = /^(0[1-9]|1[0-2])\/\d{4}$/

//         if (!isStringRegex.test(chemical_name) || !isStringRegex.test(chemical_ordered_by)) {
//             res.json({
//                 message: "Chemical name or Chemical ordered by fields should only contain alphabets"
//             });
        
//         } else if (!isNumberRegex.test(chemical_amount)) {
           
//             res.json({
//                 message: "Chemical amount field should only contain number"
//             });
//         } else if (!isNumberRegex.test(chemical_purity)) {
//             res.json({
//                 message: "Chemical purity field should only contain number"
//             });
//         } else if (!monthAndYear.test(chemical_expire_date)) {
//             res.json({
//                 message: "Please check your expire date input ,Chemical expire date should be passed like 06/2024 '06' representing the month '/' to separate and '2024' the year"
//             });
//         } else {
//             let insertChemicalQuery = `INSERT INTO chemicals(chemical_name, chemical_formula, chemical_purity, chemical_manufacturer, chemical_state, chemical_packaging, chemical_amount, chemical_expire_date, chemical_location, chemical_ordered_by, chemical_bill_path,chemical_unit_of_measurement,chemical_priority,chemical_vender_name) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?)`;
//             let values = [chemical_name, chemical_formula, chemical_purity, chemical_manufacturer, chemical_state, chemical_packaging, chemical_amount, chemical_expire_date, chemical_location, chemical_ordered_by, imageFilePath, chemical_unit_of_measurement, chemical_priority,chemical_vender_name];

//             connectionInfo.query(insertChemicalQuery, values, (err) => {
//                 if (err) {
//                     console.log(err.message);
//                     res.status(500).send({
//                         message: "something wrong while adding chemical, please try again"
//                     });
//                 } else {
//                     res.send({
//                         messageToTheFront: 'New Chemical added successfully',
//                         navigation: '/home',
//                         messageToUser: 'Click here for home page',
//                     });
//                 }
//             });
//         }
//     }
// };



// Helper function for validation
// const validateChemicalFields = (data) => {
//     const isStringRegex = /^[A-Za-z\s]+$/;
//     const isNumberRegex = /^\d+$/;
//     const monthAndYear = /^(0[1-9]|1[0-2])\/\d{4}$/;

//     if (!data.chemicalName || !data.chemicalFormula || !data.chemicalPurity || !data.chemicalManufacturer || 
//         !data.chemicalState || !data.chemicalPackaging || !data.chemicalAmount || !data.chemicalExpireDate || 
//         !data.chemicalLocation || !data.chemicalOrderedBy || !data.chemicalPriority || !data.unitOfMeasurement || data.vendorName) {
//         return "All input fields are required";
//     }

//     if (!isStringRegex.test(data.chemicalName) || !isStringRegex.test(data.chemicalOrderedBy)) {
//         return "Chemical name and Chemical ordered by fields should only contain alphabets";
//     }

//     if (!isNumberRegex.test(data.chemicalAmount)) {
//         return "Chemical amount field should only contain numbers";
//     }

//     if (!isNumberRegex.test(data.chemicalPurity)) {
//         return "Chemical purity field should only contain numbers";
//     }

//     if (!monthAndYear.test(data.chemicalExpireDate)) {
//         return "Please check your expire date input, it should be passed like '06/2024' (MM/YYYY)";
//     }

//     return null; 
// };

// export let addChemicals = async (req, res) => {
//    const {chemicalName,chemicalFormula,chemicalPurity,chemicalManufacturer,chemicalState,chemicalAmount,unitOfMeasurement,chemicalLocation,chemicalOrderedBy,vendorName,chemicalPackaging,chemicalExpireDate,chemicalPriority,} = req.body
//     const imageFilePath = req.file ? req.file.path : 'not provided';
   
// console.log(req.body)
//     // Validate the fields
//     const validationError = validateChemicalFields(req.body);
//     if (validationError) {
//         return res.status(400).json({ message: validationError });
//     }

//     const insertChemicalQuery = `
//         INSERT INTO chemicals(chemical_name, chemical_formula, chemical_purity, chemical_manufacturer, chemical_vender_name,
//         chemical_state, chemical_packaging, chemical_amount,chemical_unit_of_measurement, chemical_expire_date, chemical_location, 
//         chemical_ordered_by,chemical_delivered_date,chemical_priority,chemical_bill_path) 
//         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?)
//     `;

//     const values = [
//         chemical_name = chemicalName,
//         chemical_formula =chemicalFormula ,
//         chemical_purity =chemicalPurity ,
//         chemical_manufacturer =chemicalManufacturer,
//         chemical_vender_name =vendorName ,
//         chemical_state=chemicalState,
//         chemical_packaging=chemicalPackaging,
//         chemical_amount=chemicalAmount,
//         chemical_unit_of_measurement=unitOfMeasurement,
//         chemical_expire_date=chemicalExpireDate,
//         chemical_location=chemicalLocation,
//         chemical_ordered_by=chemicalOrderedBy,
//         chemical_delivered_date,
//         chemical_priorit=chemicalPriority,
//         imageFilePath
//     ];

//     try {
//         // Use Promise-based query execution
//         await new Promise((resolve, reject) => {
//             connectionInfo.query(insertChemicalQuery, values, (err) => {
//                 if (err) {
//                     reject(err);
//                 } else {
//                     resolve();
//                 }
//             });
//         });

//         res.send({
//             messageToTheFront: 'New Chemical added successfully',
//             navigation: '/home',
//             messageToUser: 'Click here for home page',
//         });

//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send({
//             message: "Something went wrong while adding the chemical, please try again",
//         });
//     }
// };






export const validateChemicalFields = (data) => { 
 const isStringRegex = /^[A-Za-z\s]+$/;
    const isNumberRegex = /^\d+$/;
    const monthAndYear = /^(0[1-9]|1[0-2])\/\d{4}$/;

    // 🛑 vendorName is MISSING in your check! Fix it:
    if (!data.chemicalName || !data.chemicalFormula || !data.chemicalPurity || !data.chemicalManufacturer || 
        !data.chemicalState || !data.chemicalPackaging || !data.chemicalAmount || !data.chemicalExpireDate || 
        !data.chemicalLocation || !data.chemicalOrderedBy || !data.chemicalPriority || !data.unitOfMeasurement || !data.vendorName) {
        return "All input fields are required";
    }

    if (!isStringRegex.test(data.chemicalName) || !isStringRegex.test(data.chemicalOrderedBy)) {
        return "Chemical name and Chemical ordered by fields should only contain alphabets";
    }

    if (!isNumberRegex.test(data.chemicalAmount)) {
        return "Chemical amount field should only contain numbers";
    }

    if (!isNumberRegex.test(data.chemicalPurity)) {
        return "Chemical purity field should only contain numbers";
    }

    if (!monthAndYear.test(data.chemicalExpireDate)) {
        return "Please check your expire date input, it should be passed like '06/2024' (MM/YYYY)";
    }

    return null; 
};


export let addChemicals = async (req, res) => {
    const {
        chemicalName,
        chemicalFormula,
        chemicalPurity,
        chemicalManufacturer,
        chemicalState,
        chemicalAmount,
        unitOfMeasurement,
        chemicalLocation,
        chemicalOrderedBy,
        vendorName,
        chemicalPackaging,
        chemicalExpireDate,
        chemicalPriority,
    } = req.body;

    const imageFilePath = req.file ? req.file.path : 'not provided';


    // Validate fields
    const validationError = validateChemicalFields(req.body);
    if (validationError) {
        return res.status(400).json({ message: validationError });
    }

    const insertChemicalQuery = `
        INSERT INTO chemicals(
            chemical_name, chemical_formula, chemical_purity, chemical_manufacturer, chemical_vender_name,
            chemical_state, chemical_packaging, chemical_amount, chemical_unit_of_measurement, 
            chemical_expire_date, chemical_location, chemical_ordered_by, 
            chemical_delivered_date, chemical_priority, chemical_bill_path
        ) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const chemicalDeliveredDate = new Date(); 

    const values = [
        chemicalName,
        chemicalFormula,
        chemicalPurity,
        chemicalManufacturer,
        vendorName,
        chemicalState,
        chemicalPackaging,
        chemicalAmount,
        unitOfMeasurement,
        chemicalExpireDate,
        chemicalLocation,
        chemicalOrderedBy,
        chemicalDeliveredDate,
        chemicalPriority,
        imageFilePath
    ];

    try {
        await new Promise((resolve, reject) => {
            connectionInfo.query(insertChemicalQuery, values, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });

        res.send({
            messageToTheFront: 'New Chemical added successfully',
            navigation: '/home',
            messageToUser: 'Click here for home page',
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send({
            message: "Something went wrong while adding the chemical, please try again",
        });
    }
};

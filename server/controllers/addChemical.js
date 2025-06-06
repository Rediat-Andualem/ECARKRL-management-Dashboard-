import connectionInfo from "../schema/db.config.js";


// Helper function to query the database
const executeQuery = (query, params = []) => {
  return new Promise((resolve, reject) => {
    connectionInfo.query(query, params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};


export const validateChemicalFields = (data) => { 
 const isStringRegex = /^[A-Za-z\s]+$/;
    const isNumberRegex = /^\d+$/;
    const monthAndYear = /^(0[1-9]|1[0-2])\/\d{4}$/;

    // 🛑 vendorName is MISSING in your check! Fix it:
    if (!data.chemicalName || !data.chemicalFormula || !data.chemicalPurity || !data.chemicalManufacturer || 
        !data.chemicalState || !data.chemicalPackaging || !data.chemicalAmount || !data.chemicalExpireDate || 
        !data.chemicalLocation || !data.chemicalOrderedBy || !data.chemicalPriority || !data.unitOfMeasurement || !data.vendorName || !data.casNumber) {
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
        casNumber
    } = req.body;
console.log(req.body)
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
            chemical_delivered_date, chemical_priority, chemical_bill_path,chemical_cas_number
        ) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)
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
        imageFilePath,
        casNumber
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


export let getAllChemicals = async (req, res) => {
  try {
    const rows = await executeQuery('SELECT * FROM chemicals');
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching chemicals:', error);
    res.status(500).json({ message: 'Failed to fetch chemicals', error });
  }
};

export let deleteChemicals = async (req, res) => {
  const { chemicalId } = req.params;

  try {

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Chemical not found' });
    }

    res.status(200).json({ message: 'Chemical deleted successfully' });
  } catch (error) {
    console.error('Error deleting chemical:', error);
    res.status(500).json({ message: 'Failed to delete chemical', error });
  }
};

export let getChemicalById = async (req, res) => {
  const { chemical_id} = req.params;

  try {
    const rows = await executeQuery('SELECT * FROM chemicals WHERE chemical_id = ?', [chemical_id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Chemical not found' });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error('Error fetching chemical by ID:', error);
    res.status(500).json({ message: 'Failed to fetch chemical', error });
  }
};

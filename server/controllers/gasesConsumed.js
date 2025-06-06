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

export let gasConsumed = async (req, res) => {
  const { gas_cylinders_consumed, gas_id} = req.body;
console.log(gas_cylinders_consumed,gas_id)
  // Validate input
  const isNumberRegex = /^\d+$/;
  if (!gas_cylinders_consumed || !gas_id) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (!isNumberRegex.test(gas_cylinders_consumed)) {
    return res.status(400).json({
      message: "Consumed Gas Amount should contain number value only",
    });
  }

  try {
    // Get the current gas cylinders amount from the database
    const [gasData] = await executeQuery("SELECT gas_cylinders_amount FROM gases WHERE gas_id = ?", [gas_id]);

    if (!gasData) {
      return res.status(404).json({ message: "Gas not found" });
    }

    let gasAmountAvailable = parseInt(gasData.gas_cylinders_amount);

    // Check if enough gas is available
    if (gasAmountAvailable < gas_cylinders_consumed) {
      return res.status(400).json({
        message: "Insufficient gas available",
      });
    }

    // Update the gas amount in the gases table
    let remainingGasAmount = gasAmountAvailable - gas_cylinders_consumed;
    await executeQuery("UPDATE gases SET gas_cylinders_amount = ? WHERE gas_id = ?", [
      remainingGasAmount,
      gas_id,
    ]);

    // Insert the consumed gas record
    await executeQuery("INSERT INTO gases_consumed (gas_id, gas_cylinders_consumed) VALUES (?)", [
      [ gas_id, gas_cylinders_consumed],
    ]);

    // Send success response
    res.status(200).json({
      message: "Consumed gas added successfully",
    });
  } catch (error) {
    console.error("Error processing gas consumption:", error.message);
    res.status(500).json({
      message: "Something went wrong. Please try again.",
    });
  }
};




export let getAllGasesCylinder = async (req, res) => {
  try {
    const [rows] = await executeQuery('SELECT * FROM gases');
    
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching gas cylinders:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch gas cylinder records.',
      error: error.message
    });
  }
};

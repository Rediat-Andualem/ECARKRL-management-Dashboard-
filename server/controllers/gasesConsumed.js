// import connectionInfo from "../schema/db.config.js";

// export let gasConsumed = async (req, res) => {
//     const { gas_cylinders_consumed,gas_id,user_id} = req.body;
// whenver selecting and sending gas for selection, along with it send the gas ID

// const isNumberRegex=/^\d+$/;
//     if ( !gas_cylinders_consumed || !gas_id) {
//         res.json({
//             message: "All fields are required"
//         });
//     }else if(!isNumberRegex.test(gas_cylinders_consumed)){
//         res.json({
//             message: "Consumed Gas Amount  should contain number value only"
//         });
//     } else {
//         let gasSelect = `SELECT gas_cylinders_amount FROM gases WHERE gas_id = ?`;
//         let insertGasConsumed = `INSERT INTO gases_consumed (user_id,gas_id,gas_cylinders_consumed) VALUES (?)`;
//         let updateGasAmountInGasTable = `UPDATE gases SET  gas_cylinders_amount = ? WHERE gas_id = ?`;

//         connectionInfo.query(gasSelect, [gas_id], (err, data, field) => {
//             if (err) {
//                 console.error("Error selecting gas cylinder:", err.message);
                
//                 res.json({
//                     message: "Unable to find the gas from the main table"
//                 });
//             } else {
//                 try {
//                     let sylinderAmount = parseInt(data[0]?.gas_cylinders_amount);
//                     if (sylinderAmount >= gas_cylinders_consumed) {
//                         let netAmountLeft = sylinderAmount - gas_cylinders_consumed;
    
//                         connectionInfo.query(updateGasAmountInGasTable, [netAmountLeft, gas_id], (err, result) => {
//                             if (err) {
//                                 console.error("Error updating gas amount:", err.message);
//                                 res.json({
//                                     message: "Error updating gas amount"
//                                 });
//                             } else {
//                                 let valuesForGasConsumed = [ user_id,gas_id,gas_cylinders_consumed];
//                                 connectionInfo.query(insertGasConsumed, [valuesForGasConsumed], (err, result) => {
//                                     if (err) {
//                                         console.error("Error inserting consumed gas:", err.message);
//                                         res.json({
//                                             message: "Error adding consumed gases"
//                                         });
//                                     } else {
//                                         console.log("Consumed gas added");
//                                         // Send success response if needed
//                                         res.send({
//                                             message: "Consumed gas added successfully"
//                                         });
//                                     }
                                    
//                                 });
//                             }
//                         });
//                     } else {
//                         res.json({
//                                 message: "Wrong consumption Input,The gas cylinder in store is less than the amount you provide as a consumed gas cylinder"
//                         });
//                     }
//                 } catch (error) {
//                     res.json({
//                         message: "something went wrong please try again"
//                 });
//                 }
               
//             }
//         });
//     }

// };
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
  const { gas_cylinders_consumed, gas_id, user_id } = req.body;

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
    await executeQuery("INSERT INTO gases_consumed (user_id, gas_id, gas_cylinders_consumed) VALUES (?)", [
      [user_id, gas_id, gas_cylinders_consumed],
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

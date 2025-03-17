import connectionInfo from "../schema/db.config.js";

//  export let consumables = (req,res)=>{
//     let imageFilePath = req.file? req.file.path :'not provided'
//     const {user_id,consumable_name,consumable_location}= req.body;
 
//     if( !consumable_name || !consumable_location){
//         res.status(400).json({
//             message: "All input fields are required"
//         });
//     }else {
//         const isStringRegex = /^[A-Za-z\s]+$/;
//         if(!isStringRegex.test(consumable_name)){
//             res.json({
//                 message: "Consumable name  fields should only contain alphabets"
//             });
//         }else{
//                 let insertConsumables = `INSERT INTO consumables (user_id,consumable_name,consumable_location,Picture_location) VALUES (?,?,?,?)`
                
//                 let values =[user_id,consumable_name,consumable_location,imageFilePath,] 

//                 connectionInfo.query(insertConsumables,values,(err,data)=>{
//                     if(err){
//                         res.json({
//                             message: err.message
//                         })
//                     }else{
//                         res.json({
//                             message:"consumable item added successfully"
//                         })
//                     }
                        
//                 })
//         }
//     }
    





// }


// export let deleteConsumables = (req,res)=>{
//     const {consumables_id} =req.body
//     let deleteConsumables = `DELETE * FROM consumables WHERE consumables_id =?`
//     let value = [consumables_id]
//     connectionInfo.query(deleteConsumables,(err,data)=>{
//         if(err){
//             res.json({
//                message:"Internal server error"
//             })
//         }else{
//             res.json({
//             message :"consumable item with deleted successful"
//         })
//         }
//     })



// }





// Consumables endpoint
export let consumables = async (req, res) => {
    try {
        // File path handling
        const imageFilePath = req.file ? req.file.path : 'not provided'; // Or set as null, if you want to use it later

        // Destructuring input data from the request body
        const { user_id, consumable_name, consumable_location } = req.body;

        // Input validation
        if (!consumable_name || !consumable_location) {
            return res.status(400).json({
                message: "Consumable name and location are required"
            });
        }

        // Regular expression to validate the consumable name
        const isStringRegex = /^[A-Za-z\s\-']+$/;  // Allow alphabets, spaces, hyphens, and apostrophes
        if (!isStringRegex.test(consumable_name)) {
            return res.status(400).json({
                message: "Consumable name should only contain alphabets, spaces, hyphens, and apostrophes"
            });
        }

        // SQL query to insert the consumable item into the database
        const insertConsumables = `
            INSERT INTO consumables (user_id, consumable_name, consumable_location, Picture_location) 
            VALUES (?, ?, ?, ?)
        `;
        
        const values = [user_id, consumable_name, consumable_location, imageFilePath];

        // Use async/await to execute the query
        await new Promise((resolve, reject) => {
            connectionInfo.query(insertConsumables, values, (err, data) => {
                if (err) {
                    reject(err);  // Reject if error occurs
                } else {
                    resolve(data); // Resolve if query is successful
                }
            });
        });

        // Send a success response
        return res.status(201).json({
            message: "Consumable item added successfully"
        });

    } catch (err) {
        // Log the error for debugging
        console.error("Error while adding consumable:", err.message);
        return res.status(500).json({
            message: "Internal server error. Please try again later."
        });
    }
};

// Delete Consumables endpoint
export let deleteConsumables = async (req, res) => {
    try {
        const { consumables_id } = req.body;

        // Check if consumables_id is provided
        if (!consumables_id) {
            return res.status(400).json({
                message: "Consumables ID is required"
            });
        }

        // SQL query to delete the consumable item by ID
        const deleteConsumablesQuery = `DELETE FROM consumables WHERE consumables_id = ?`;
        const values = [consumables_id];

        // Use async/await for the query execution
        await new Promise((resolve, reject) => {
            connectionInfo.query(deleteConsumablesQuery, values, (err, data) => {
                if (err) {
                    reject(err);  // Reject if there's an error in deleting
                } else {
                    resolve(data); // Resolve if the deletion is successful
                }
            });
        });

        // Send a success response
        return res.status(200).json({
            message: "Consumable item deleted successfully"
        });

    } catch (err) {
        // Log the error for debugging
        console.error("Error while deleting consumable:", err.message);
        return res.status(500).json({
            message: "Internal server error. Please try again later."
        });
    }
};

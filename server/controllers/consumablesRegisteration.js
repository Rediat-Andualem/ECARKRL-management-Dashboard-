import connectionInfo from "../schema/db.config.js";

export let consumables = async (req, res) => {
    try {
        
        const imageFilePath = req.file ? req.file.path : 'not provided'; 

        const {name : consumable_name, location: consumable_location, vendor: consumables_vender_name } = req.body;

      console.log(consumable_name, consumable_location, consumables_vender_name)
    
        if (!consumable_name || !consumable_location) {
            return res.status(400).json({
                message: "Consumable name and location are required"
            });
        }

        
        const isStringRegex = /^[A-Za-z\s\-']+$/;  
        if (!isStringRegex.test(consumable_name)) {
            return res.status(400).json({
                message: "Consumable name should only contain alphabets, spaces, hyphens, and apostrophes"
            });
        }

      
        const insertConsumables = `
            INSERT INTO consumables (consumable_name, consumable_location,consumables_vender_name, Picture_location) 
            VALUES (?, ?, ?,?)
        `;
        
        const values = [ consumable_name, consumable_location,consumables_vender_name, imageFilePath];

   
        await new Promise((resolve, reject) => {
            connectionInfo.query(insertConsumables, values, (err, data) => {
                if (err) {
                    reject(err);  
                } else {
                    resolve(data); 
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

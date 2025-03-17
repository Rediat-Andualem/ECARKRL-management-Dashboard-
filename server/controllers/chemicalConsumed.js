import connectionInfo from "../schema/db.config.js";
export let chemicalsConsumed = async (req, res) => {
    try {
        const { chemical_id, user_id, amount_consumed } = req.body;
        const isNumberRegex = /^\d+$/;

        // Input validation
        if (!chemical_id || !user_id || !amount_consumed) {
            return res.status(400).json({
                message: "All fields are required"
            });
        } else if (!isNumberRegex.test(amount_consumed)) {
            return res.status(400).json({
                message: "Chemical Amount consumed should contain number value only"
            });
        }

        // Get the current chemical amount from the chemicals table
        const [chemicalData] = await connectionInfo.promise().query('SELECT chemical_amount FROM chemicals WHERE chemical_id = ?', [chemical_id]);
        
        // If the chemical is not found, return an error
        if (!chemicalData.length) {
            return res.status(404).json({
                message: "Chemical not found in the main table"
            });
        }

        const chemicalAmount = parseInt(chemicalData[0].chemical_amount, 10);

        // Check if the amount consumed is less than or equal to the available amount
        if (chemicalAmount >= amount_consumed) {
            const netAmountLeft = chemicalAmount - amount_consumed;

            // Update the chemical amount in the chemicals table
            await connectionInfo.promise().query('UPDATE chemicals SET chemical_amount = ? WHERE chemical_id = ?', [netAmountLeft, chemical_id]);

            // Insert into the chemicals_consumed table
            await connectionInfo.promise().query('INSERT INTO chemicals_consumed (chemical_id, user_id, amount_consumed) VALUES (?, ?, ?)', [chemical_id, user_id, amount_consumed]);

            return res.status(200).json({
                message: "Consumed chemical added successfully"
            });

        } else {
            return res.status(400).json({
                message: "Wrong consumption input, The chemical in store is less than the amount you provide as a consumed chemical"
            });
        }

    } catch (error) {
        console.error("Error processing chemicals consumed:", error);
        return res.status(500).json({
            message: "Something went wrong, please try again later"
        });
    }
};

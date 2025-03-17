import connectionInfo from "../schema/db.config.js";

connectionInfo

export let addGas = (req, res) => {
    const { gas_name, gas_cylinders_amount } = req.body;
    let gas_bill_path = req.file ? req.file.path : 'not provided'; 
    const isStringRegex = /^[A-Za-z\s]+$/;
    const isNumberRegex = /^\d+$/;
    if (!gas_name || !gas_cylinders_amount) {
        res.status(400).send({
            message: "All input fields are required"
        });
    } else {
        if (!isStringRegex.test(gas_name)) {
            res.json({
                message: "Gas name should only contain alphabets"
            });
        } else {
            if (!isNumberRegex.test(gas_cylinders_amount)) {
                res.json({
                    message: "gas cylinder amount should only contain numbers"
                });
            } else {
                let insertGasQuery = `INSERT INTO gases(gas_name,gas_cylinders_amount,gas_bill_path) VALUES (?, ?, ?)`;
                let values = [gas_name, gas_cylinders_amount, gas_bill_path];

                connectionInfo.query(insertGasQuery, values, (err) => {
                    if (err) {
                        console.log(err.message);
                        res.status(500).send({
                            message: "Error adding gases"
                        });
                    } else {
                        res.send({
                            messageToTheFront: 'gas added successfully',
                            navigation: '/home',
                            messageToUser: 'Click here for home page',
                        });
                    }
                });
            }
        }
    }
}

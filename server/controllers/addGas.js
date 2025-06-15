import connectionInfo from "../schema/db.config.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

export let addGas = (req, res) => {
  const { gas_name, gas_cylinders_amount, ordered_by, vendor_name } = req.body;
  let gas_bill_path = req.file ? req.file.path : "not provided";

  const isStringRegex = /^[A-Za-z\s]+$/;
  const isNumberRegex = /^\d+$/;

  if (!gas_name || !gas_cylinders_amount) {
    return res.status(400).send({
      message: "All input fields are required",
    });
  }

  if (!isStringRegex.test(gas_name)) {
    return res.status(400).json({
      message: "Gas name should only contain alphabets",
    });
  }

  if (!isNumberRegex.test(gas_cylinders_amount)) {
    return res.status(400).json({
      message: "Gas cylinder amount should only contain numbers",
    });
  }

  const checkQuery = `SELECT * FROM gases WHERE gas_name = ?`;
  connectionInfo.query(checkQuery, [gas_name], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send({ message: "Database error" });
    }

    if (results.length > 0) {
      // Gas already exists — update
      const existing = results[0];
      const newAmount =
        parseInt(existing.gas_cylinders_amount) +
        parseInt(gas_cylinders_amount);

      const updateQuery = `
                UPDATE gases 
                SET 
                    gas_cylinders_amount = ?,
                    gas_ordered_by = ?,
                    gas_bill_path = ?,
                    vendor_name = ?
                WHERE gas_name = ?`;

      connectionInfo.query(
        updateQuery,
        [newAmount, ordered_by, gas_bill_path, vendor_name, gas_name],
        (err) => {
          if (err) {
            console.error(err);
            return res.status(500).send({ message: "Error updating gas data" });
          }

          return res.send({
            messageToTheFront: "Gas updated successfully",
            navigation: "/home",
            messageToUser: "Click here for home page",
          });
        }
      );
    } else {
      // Gas does not exist — insert new
      const insertQuery = `
                INSERT INTO gases (gas_name, gas_cylinders_amount, gas_ordered_by, gas_bill_path, vendor_name) 
                VALUES (?, ?, ?, ?, ?)`;

      const values = [
        gas_name,
        gas_cylinders_amount,
        ordered_by,
        gas_bill_path,
        vendor_name,
      ];

      connectionInfo.query(insertQuery, values, (err) => {
        if (err) {
          console.error(err.message);
          return res.status(500).send({ message: "Error adding gas" });
        }

        return res.send({
          messageToTheFront: "Gas added successfully",
          navigation: "/home",
          messageToUser: "Click here for home page",
        });
      });
    }
  });
};

// this will delete teh files which are remaining in the gasBills folder not in the database
export let deleteBillFileForGas = (req, res) => {
  const { fileName } = req.params; // Expecting the filename to be passed in the URL
   console.log(fileName)
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const filePath = path.join(
    __dirname,
    "..",
    "Resources",
    "gasBills",
    fileName
  );

  // Check if the file exists
  if (fs.existsSync(filePath)) {
    // Delete the file
    fs.unlink(filePath, (err) => {
      if (err) {
        return res.status(500).send({ message: "Error deleting the file" });
      }

      res.send({ message: "File deleted successfully" });
    });
  } else {
    res.status(404).send({ message: "File not found" });
  }
};

// Controller to find junk files (files in the gasBills folder not used in the database)

const formatDate = (timestamp) => {
  const date = new Date(parseInt(timestamp)); // Convert timestamp to a Date object
  return date.toLocaleString(); // Format the date into a human-readable string
};

export let getJunkFiles = (req, res) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const folderPath = path.join(__dirname, "..", "Resources", "gasBills");

  // Read all files in the gasBills folder
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.log(err);
      return res
        .status(500)
        .send({ message: "Error reading gasBills directory" });
    }

    // Get all files from the database to compare
    const query = `SELECT gas_bill_path FROM gases WHERE gas_bill_path != 'not provided'`;

    connectionInfo.query(query, (err, results) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .send({ message: "Error fetching data from the database" });
      }

      // Extract the file names from gas_bill_path in the database (includes the date prefix)
      const usedFiles = results.map((result) => {
        const filePath = result.gas_bill_path;
        const fileName = path.basename(filePath); 
        return fileName; 
      });

      // Filter out files that are in the database
      const junkFiles = files.filter((file) => {
   
        return !usedFiles.includes(file);
      });

      // Prepare the junk files data (send the full filename, including the date prefix)
      const junkFilesData = junkFiles.map((file) => {
        const filePath = `/Resources/gasBills/${file}`; 
        const [date, fileName] = file.split("_"); 
        
        // Format the date to a human-readable string
        const formattedDate = formatDate(date);

        return {
            date,
          formateDate: formattedDate, 
          fileName: file.split("_").slice(1).join("_"), 
          filePath, 
        };
      });

      res.json(junkFilesData); 
    });
  });
};

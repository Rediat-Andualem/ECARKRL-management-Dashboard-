import connectionInfo from '../schema/db.config.js';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Generic function to handle deletion
const deleteImageAndData = (req, res, table, idColumn, pathColumn, folderName) => {
    const itemId = req.params[idColumn];
    
    // Parameterized queries to avoid SQL injection
    const getPathQuery = `SELECT ${pathColumn} FROM ${table} WHERE ${idColumn} = ?`;
    const deleteDataQuery = `DELETE FROM ${table} WHERE ${idColumn} = ?`;

    connectionInfo.query(getPathQuery, [itemId], (err, data) => {
        if (err) {
            console.error('Error fetching data from database:', err.message);
            return res.status(500).json({ message: 'Error querying database' });
        }

        if (data.length === 0) {
            return res.status(404).json({ message: `${table.slice(0, -1)} not found` });
        }

        const filePath = data[0]?.[pathColumn];

        // If the file path is "not provided", delete only the data from the database
        if (filePath === "not provided") {
            connectionInfo.query(deleteDataQuery, [itemId], (err) => {
                if (err) {
                    console.error('Error deleting data from database:', err.message);
                    return res.status(500).json({ message: 'Error deleting data from database' });
                }
                return res.json({
                    message: 'Data deleted successfully',
                    redirect: '/home',
                    redirectMessage: 'Click here to go to home page'
                });
            });
        } else {
            if (!filePath) {
                return res.status(404).json({ message: 'File path not found in database' });
            }

            const fileName = path.basename(filePath);
            const deleteFilePath = path.join(__dirname, '..', 'Resources', folderName, fileName);

            // Try deleting the file
            fs.unlink(deleteFilePath, (err) => {
                if (err) {
                    console.error('Error deleting file:', err);
                    return res.status(500).json({ message: 'Error deleting file', error: err.message });
                }

                // After file is deleted, delete the corresponding data from the database
                connectionInfo.query(deleteDataQuery, [itemId], (err) => {
                    if (err) {
                        console.error('Error deleting data from database:', err.message);
                        return res.status(500).json({ message: 'Error deleting data from database' });
                    }

                    return res.json({
                        message: 'Data and file deleted successfully',
                        redirect: '/home',
                        redirectMessage: 'Click here to go to home page'
                    });
                });
            });
        }
    });
};

// Controller functions using the common deletion function
export let deleteChemicalImage = (req, res) => {
    deleteImageAndData(req, res, 'chemicals', 'chemical_id', 'chemical_bill_path', 'chemicalBills');
};

export let deleteGasImage = (req, res) => {
    deleteImageAndData(req, res, 'gases', 'gas_id', 'gas_bill_path', 'gasBills');
};

export let deleteConsumableImage = (req, res) => {
    deleteImageAndData(req, res, 'consumables', 'consumables_id', 'Picture_location', 'consumables');
};

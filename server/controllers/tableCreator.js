import connectionInfo from "../schema/db.config.js";
import {
  registration,
  chemicals,
  gases,
  chemicalsConsumed,
  gasesConsumed,
  profile,
  consumables
} from "../schema/table.js";

export const tableCreation = async (req, res) => {
  try {
    const con = await connectionInfo.promise();

    await con.query(registration);

    await con.query(chemicals);

    await con.query(gases);

    await con.query(chemicalsConsumed);

    await con.query(gasesConsumed);

    await con.query(profile);

    await con.query(consumables)


    // Send success response
    return res.send("Tables created successfully");
  } catch (error) {
    // Handle errors
    console.log("Error creating tables:", error);
    return res.status(500).send("Error creating tables");
  }
};

// Use CommonJS syntax for importing if not using ES modules
import connectionInfo from "../schema/db.config.js";

export let deleteProfile = (req, res) => {
    const { user_email } = req.body;

    // SQL DELETE queries
    const deleteFromProfile = `DELETE FROM profile WHERE user_email = ?`;
    const deleteFromUser = `DELETE FROM users WHERE user_email = ?`;

    // Start a transaction to ensure both deletes happen atomically
    connectionInfo.beginTransaction((err) => {
        if (err) {
            return res.json({
                message: err.message
            });
        }

        // Delete from profile table first to avoid foreign key issues
        connectionInfo.query(deleteFromProfile, [user_email], (err, result) => {
            if (err) {
                // If an error occurs, rollback the transaction
                return connectionInfo.rollback(() => {
                    res.json({
                        message: err.message
                    });
                });
            }

            // Delete from users table after deleting from profile
            connectionInfo.query(deleteFromUser, [user_email], (err, result) => {
                if (err) {
                    // If an error occurs, rollback the transaction
                    return connectionInfo.rollback(() => {
                        res.json({
                            message: err.message
                        });
                    });
                }

                // Commit the transaction if both queries succeed
                connectionInfo.commit((err) => {
                    if (err) {
                        return connectionInfo.rollback(() => {
                            res.json({
                                message: err.message
                            });
                        });
                    }
                    // Send success response
                    res.json({
                        message: "Profile deleted successfully"
                    });
                });
            });
        });
    });
};


// *main imports
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectionInfo = require('./schema/db.config.js');
const { Route } = require('./Routes/index.js');
require('./middleware/chemialAndGasNotification.js');
dotenv.config();

// *middlewares
const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization,token');
    next();
});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
    origin: true,
    // credentials:true
}));

// * main routes 
app.use('/api', Route);
app.get('/', (req, res) => {
    res.send('backend is working!');
});

async function connectionHierarchy() {
    try {
        // Test a connection from the pool
        connectionInfo.getConnection((err, connection) => {
            if (err) {
                console.error('Database connection failed:', err);
                return;
            }

            console.log('Connection to database established successfully');

            // Release the connection back to pool
            connection.release();

            // Start the server
            app.listen(process.env.PORT, () => {
                console.log(`App is listening on port ${process.env.PORT}`);
            });
        });
    } catch (err) {
        console.error('Unexpected error:', err.message);
    }
}

connectionHierarchy();


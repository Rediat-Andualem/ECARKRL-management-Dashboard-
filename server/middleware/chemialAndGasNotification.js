
import connectionInfo from "../schema/db.config.js";
import nodemailer from 'nodemailer';

// Endpoint to get chemicals with high priority and low or zero amount
export let chemcialNotifiyer = async (req, res) => {
    const chemcialAmountQuery = `SELECT * FROM chemicals WHERE chemical_priority='High' AND chemical_amount <= 0`;

    try {
        const [data] = await connectionInfo.promise().query(chemcialAmountQuery);
        res.json({ data });
    } catch (err) {
        console.error("Error fetching chemical data:", err.message);
        res.status(500).json({ message: "Error fetching chemical data" });
    }
};

// Endpoint to get gases with cylinders that have zero or less amount
export let gasNotifiyer = async (req, res) => {
    const chemcialAmountQuery = `SELECT * FROM gases WHERE gas_cylinders_amount <= 0`;

    try {
        const [data] = await connectionInfo.promise().query(chemcialAmountQuery);
        res.json({ data });
    } catch (err) {
        console.error("Error fetching gas data:", err.message);
        res.status(500).json({ message: "Error fetching gas data" });
    }
};

// Delete zero value gases and send email notification every three days
export let zeroGasDelete = async (req, res) => {
    const selectAllUsersEmail = 'SELECT user_email FROM users WHERE user_role=0';
    const selectAllGasesWithOne = 'SELECT gas_name FROM gases WHERE gas_cylinders_amount = 1';
    const deleteZeroGasQuery = `DELETE FROM gases WHERE gas_cylinders_amount = 0`;

    try {
        // Step 1: Get all user emails with role 0
        const [emails] = await connectionInfo.promise().query(selectAllUsersEmail);
        const allEmails = emails.map(email => email.user_email);

        console.log("All emails:", allEmails);

        // Step 2: Get gases with one cylinder left
        const [gases] = await connectionInfo.promise().query(selectAllGasesWithOne);

        // Step 3: Send email if any gases have only one cylinder
        if (gases.length > 0) {
            sendEmail(gases, allEmails);
        }

        // Step 4: Delete gases with zero cylinders
        await connectionInfo.promise().query(deleteZeroGasQuery);

        res.json({
            message: 'Gas cylinders with zero amount are deleted',
        });
    } catch (err) {
        console.error("Error processing gas deletion:", err.message);
        res.status(500).json({
            message: "Error deleting zero amount gas cylinders",
        });
    }
};

// Function to send email notifications
function sendEmail(gases, allEmails) {
    const mailSender = nodemailer.createTransport({
        service: "gmail",
        port: 465,
        auth: {
            user: process.env.EMAIL_USER, // Use environment variable for security
            pass: process.env.EMAIL_PASS, // Use environment variable for security
        },
    });

    let gasList = gases.map(gas => `<tr><td>${gas.gas_name}</td></tr>`).join('');

    const htmlContent = `
    <html>
    <head>
        <style>
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid black; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
            .container {
                border: 1px solid black;
                padding: 16px;
                width: 50%;
                margin: 20px auto;
                background-color: #fe8402;
                border-radius: 10px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            h2 { text-align: center; font-weight: bold; color: #ffffff; }
            p { font-weight: bold; background-color: #fe8402; color: #ffffff; padding: 10px; text-align: center; border-radius: 5px; }
            .gas-item { background-color: #516cfo; color: #ffffff; }
        </style>
    </head>
    <body>
        <div class="container">
            <h2>List of Gases to be Ordered</h2>
            <p>Only one cylinder of the listed gases is found in the store. Kindly order as soon as possible</p>
            <table>
                <tr><th>Gas Name</th></tr>
                <small class="gas-item">${gasList}</small>
            </table>
        </div>
    </body>
    </html>`;

    // Send email to each user
    allEmails.forEach(email => {
        const mailOptions = {
            from: process.env.EMAIL_FROM, // Use environment variable for security
            to: email,
            subject: "Notification for gas ordering",
            html: htmlContent
        };

        mailSender.sendMail(mailOptions, (err) => {
            if (err) {
                console.error("Error sending email to:", email, err.message);
            } else {
                console.log("Email sent to:", email);
            }
        });
    });
}



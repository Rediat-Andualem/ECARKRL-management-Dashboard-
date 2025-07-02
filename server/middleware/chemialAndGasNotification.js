const connectionInfo = require("../schema/db.config.js");
const nodemailer = require('nodemailer');
const { Cron } = require('croner');

function sendNotificationEmail(type, items, allEmails) {
    const mailSender = nodemailer.createTransport({
        service: "gmail",
        port: 465,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    let subject, title, message, tableHeaders, tableRows;

    if (type === "chemical") {
        subject = "Expired Chemical Notification";
        title = "Expired Chemicals Detected";
        message = "The following chemicals are expired. Please move them to the 'Expired' section.";
        tableHeaders = "<tr><th>Name</th><th>Location</th><th>Expiry Date</th></tr>";
        tableRows = items.map(c => `
            <tr>
                <td>${c.chemical_name}</td>
                <td>${c.chemical_location}</td>
                <td>${c.chemical_expire_date}</td>
            </tr>
        `).join('');
    } else if (type === "gas") {
        subject = "Gas Cylinder Low Stock Alert";
        title = "Low Gas Cylinder Notification";
        message = "Only one cylinder left for the following gases. Please order!";
        tableHeaders = "<tr><th>Gas Name</th></tr>";
        tableRows = items.map(g => `<tr><td>${g.gas_name}</td></tr>`).join('');
    }

    const htmlContent = `
    <html>
    <head>
        <style>
            .container { border: 1px solid #ccc; padding: 16px; border-radius: 8px; width: 40%; margin: auto; background: #f9f9f9; }
            h2 { color: #333; text-align: center; }
            table { width: 100%; border-collapse: collapse; }
            th, td { padding: 8px; border: 1px solid #ddd; }
            th { background: #fe8402; color: white; }
            p { text-align: center; font-weight: bold; }
        </style>
    </head>
    <body>
        <div class="container">
            <h2>${title}</h2>
            <p>${message}</p>
            <table>${tableHeaders}${tableRows}</table>
        </div>
    </body>
    </html>`;

    allEmails.forEach(email => {
        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to: email,
            subject: subject,
            html: htmlContent
        };

        mailSender.sendMail(mailOptions, (err) => {
            if (err) {
                console.error("❌ Failed to send email to", email, err.message);
            } else {
                console.log("✅ Email sent to:", email);
            }
        });
    });
}

const chemicalNotifier = async (req = {}, res = { json: () => {}, status: () => ({ json: () => {} }) }) => {
    const expiredChemicalsQuery = `
        SELECT * FROM chemicals 
        WHERE STR_TO_DATE(chemical_expire_date, '%Y-%m-%d') < CURDATE()
    `;
    const emailsQuery = `SELECT email FROM users`;

    try {
        const [chemicals] = await connectionInfo.promise().query(expiredChemicalsQuery);
        const [emails] = await connectionInfo.promise().query(emailsQuery);
        const allEmails = emails.map(user => user.email);

        if (chemicals.length > 0) {
            sendNotificationEmail("chemical", chemicals, allEmails);
        }

        res.json({ expiredChemicals: chemicals });
    } catch (err) {
        console.error("❌ Error fetching chemical data:", err.message);
        res.status(500).json({ message: "Error fetching chemical data" });
    }
};

// const gasNotifier = async (req = {}, res = { json: () => {}, status: () => ({ json: () => {} }) }) => {
//     const lowGasQuery = `
//         SELECT * FROM gases 
//         WHERE gas_cylinders_amount = 1
//     `;
//     const emailsQuery = `SELECT user_email FROM users`;

//     try {
//         const gases = await connectionInfo.promise().query(lowGasQuery);
//         const emails = await connectionInfo.promise().query(emailsQuery);
//         const allEmails = emails.map(user => user.email);

//         if (gases.length > 0) {
//             sendNotificationEmail("gas", gases, allEmails);
//         }

//         res.json({ lowGas: gases });
//     } catch (err) {
//         console.error("❌ Error fetching gas data:", err.message);
//         res.status(500).json({ message: "Error fetching gas data" });
//     }
// };
const gasNotifier = async (req = {}, res = { json: () => {}, status: () => ({ json: () => {} }) }) => {
    const lowGasQuery = `SELECT * FROM gases WHERE gas_cylinders_amount <= 1`;
    const emailsQuery = `SELECT user_email FROM users`;

    try {
        const [gasesRows] = await connectionInfo.promise().query(lowGasQuery);
        const [emailRows] = await connectionInfo.promise().query(emailsQuery);

        const allEmails = emailRows.map(user => user.user_email);
        if (gasesRows.length > 0) {
            await sendNotificationEmail("gas", gasesRows, allEmails);
        }

        res.json({ lowGas: gasesRows });
    } catch (err) {
        console.error("❌ Error fetching gas data:", err.message);
        res.status(500).json({ message: "Error fetching gas data" });
    }
};


// new Cron('0 */12 * * *', async () => {
//     try {
//         // await chemicalNotifier();
//         await gasNotifier();
//         console.log("✅ Daily chemical and gas checks executed.");
//     } catch (err) {
//         console.error("❌ Scheduler error:", err.message);
//     }
// });

new Cron('0 0 * * *', async () => {  // for midnight execution 
    try {
        await gasNotifier(); 
        console.log("✅ Daily chemical and gas checks executed at midnight.");
    } catch (err) {
        console.error("❌ Scheduler error:", err.message);
    }
});


module.exports = {
    // chemicalNotifier,
    gasNotifier,
    sendNotificationEmail
};

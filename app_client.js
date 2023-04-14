const express = require('express');
const mysql = require('mysql');

const app = express();

// MySQL database connection configuration
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'username',
    password: 'password',
    database: 'database_name'
});

// Route to handle form data
app.post('/register', (req, res) => {
    const clientNumber = req.body.clientNumber;
    const clientFullName = req.body.clientFullName;
    const branchNumber = req.body.branchNumber;
    const branchAddress = req.body.branchAddress;
    const type = req.body.type;
    const maxRent = req.body.maxRent;
    const registeredBy = req.body.registeredBy;
    const date = req.body.date;

    // SQL query to insert data into database
    const sql = `INSERT INTO clients (client_number, full_name, branch_number, branch_address, type, max_rent, registered_by, date) VALUES ('${clientNumber}', '${clientFullName}', '${branchNumber}', '${branchAddress}', '${type}', '${maxRent}', '${registeredBy}', '${date}')`;

    // Execute the SQL query
    connection.query(sql, (error, results, fields) => {
        if (error) throw error;
        res.send('Data inserted successfully!');
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server started on port 3000');
});

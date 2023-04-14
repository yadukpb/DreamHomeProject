const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3000;


const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'mydb'
});


app.use(bodyParser.urlencoded({ extended: false }));


app.post('/register', (req, res) => {
 
  const staffNumber = req.body.staffNumber;
  const staffFullName = req.body.fullName;
  const staffDob = req.body.dob;
  const staffGender = req.body.gender;
  const branchNumber = req.body.branchNumber;
  const branchAddress = req.body.branchAddress;
  const branchTelephoneNumber = req.body.telephoneNumber;
  const staffPosition = req.body.position;
  const staffSalary = req.body.staffSalary;
  const supervisorName = req.body.supervisorName;
  const managerStartDate = req.body.managerStartDate;
  const managerBonus = req.body.managerBonus;


  const sql = `INSERT INTO staff (staff_number, full_name, dob, gender, branch_number, branch_address, telephone_number, position ,staff_salary , supervisor_name, manager_start_date, manager_bonus) 
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const values = [staffNumber, staffFullName, staffDob, staffGender, branchNumber, branchAddress, branchTelephoneNumber, staffPosition, staffSalary, supervisorName, managerStartDate, managerBonus];


  pool.query(sql, values, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error inserting data into database');
    } else {
      console.log(`Inserted ${result.affectedRows} row(s)`);
      res.status(200).send('Data inserted successfully');
    }
  });
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

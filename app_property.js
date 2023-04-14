const express = require('express');
const app = express();
const cheerio = require('cheerio');
const mysql = require('mysql');
const bodyParser = require('body-parser');


const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'mydatabase'
});


app.use(bodyParser.urlencoded({ extended: false }));

app.post('/submit-form', (req, res) => {

  const propertyNumber = req.body.propertyNumber;
  const propertyType = req.body.propertyType;
  const propertyRent = req.body.propertyRent;
  const propertyrooms = req.body.propertyrooms;
  const propertyaddress = req.body.propertyaddress;
  const propertyownerNumber = req.body.propertyownerNumber;
  const propertypersonBusinessNumber = req.body.propertypersonBusinessNumber;
  const propertyownerAddress = req.body.propertyownerAddress;
  const propertytelephoneNumber = req.body.propertytelephoneNumber;
  const propertybusinessType = req.body.propertybusinessType;
  const propertycontactName = req.body.propertycontactName;
  const propertymanagedByStaff = req.body.propertymanagedByStaff;
  const propertyregisteredAtBranch = req.body.propertyregisteredAtBranch;

  
  pool.query('INSERT INTO property_registration (property_number, property_type, rent, rooms, address, owner_number, person_business_number, owner_address, telephone_number, business_type, contact_name, managed_by_staff, registered_at_branch) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [propertyNumber, propertyType, propertyRent, propertyrooms, propertyaddress, propertyownerNumber, propertypersonBusinessNumber, propertyownerAddress, propertytelephoneNumber, propertybusinessType, propertycontactName, propertymanagedByStaff, propertyregisteredAtBranch], (error, results, fields) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error inserting data into database');
    } else {
      res.send('Data inserted into database');
    }
  });
});


app.listen(3000, () => {
  console.log('Server started on port 3000');
});

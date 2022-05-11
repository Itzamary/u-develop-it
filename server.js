// inport express, save to a variable, add port designation to a variable.
const express = require('express');
const res = require('express/lib/response');
const mysql = require('mysql2');
const inputCheck = require('./utils/inputCheck');
const PORT = process.env.PORT || 3001;
const app = express();

// middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
    {
      host: '127.0.0.1',
      // Your MySQL username,
      user: 'root',
      // Your MySQL password
      password: '',
      database: 'election'
    }, 
    console.log('Connected to the election database.')
);

// GET all candidates get rout;
app.get('/api/candidates', (req, res) => {

  const sql = `SELECT * FROM candidates`;

  //query for user request for a list of potential candidates.
  db.query(sql, (err, rows) => {
    if (err){
      res.status(500).json({error: err.message});
      return;
    }
    res.json({
      message: 'success',
      data: rows
    });
  });
});


// GET request for a single candidate
app.get('/api/candidate/:id', (req, res) => {

  const sql = `SELECT * FROM candidates WHERE id=?`;
  const params = [req.params.id];


  // Get a single candidate based on id
  db.query(sql, params, (err, row) => {
    if (err){
      res.status(400).json({error: err.message});
      return;
    }
    res.json({
      message: 'success',
      data: row
    });
  });
});


// Delete a candidate
app.delete('/api/candidate/:id', (req, res) => {
const sql = `DELETE FROM candidates WHERE id=?`;
const params = [req.params.id];

  // delete A candidate
  db.query(sql, params, (err, result) => {
    if (err) {
      res.statusMessage(400).json({error: res.message});
    } else if(!result.affectedRows){
      res.json({message: `Candidate not found`});
    } else {
      res.json({
        message: `deleted`,
        changes: result.affectedRows,
        id: req.params.id
      });
    }
  });
});

// Create candidate using a POST ROUTE
app.post('/api/candidate', ({body}, res) => {
  const errors = inputCheck(body, 'first_name', 'last_name', 'industry_connected');
  if(errors){
    res.status(400).json({error: errors});
    return;
  }
  // Create a candidate with sql
  const sql = `INSERT INTO candidates (first_name, last_name, industry_connected)
    VALUES (?,?,?)`;
  const params = [body.first_name, body.last_name, body.industry_connected];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({error: err.message});
      return;
    }
    res.json({
      message: 'success',
      data: body
    });
  });
});




  app.get('/', (req, res) => {
    res.json({
      message: 'Hello World'
    });
  });



// Default response for any other request(not found)
app.use((req, res) => {
    res.status(404).end();
})

// start js server
app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`);
});
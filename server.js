// inport express, save to a variable, add port designation to a variable.
const express = require('express');
const mysql = require('mysql2');

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

  // //query for user request for a list of potential candidates.
  // db.query(`SELECT * FROM candidates`, (err, rows) => {
  //   console.log(rows);
  // });

  // // Get a single candidate based on id
  // db.query(`SELECT * FROM candidates WHERE id=1`, (err, row) => {
  //   if (err){
  //     console.log(err);
  //   }
  //   console.log(row);
  // });

  // // delete A candidate
  // db.query(`DELETE FROM candidates WHERE id=?`, 1, (err, result) => {
  //   if (err) {
  //     console.log(err);
  //   }
  //   console.log(result);
  // });

  // // Create a candidate
  // const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected)
  //              VALUES (?,?,?,?)`;

  // const params = [1, 'Ronald', 'Firbank', 1];

  // db.query(sql, params, (err, result) => {
  //   if (err) {
  //     console.log(err);
  //   }
  //   console.log(result);
  // })


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
// inport express, save to a variable, add port designation to a variable.
const express = require('express');
const db = require('./db/connection');
const apiRoutes = require('./routes/apiRoutes');


const PORT = process.env.PORT || 3001;

const app = express();

// middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//Use api routes.
app.use('/api', apiRoutes);



// Default response for any other request(not found)
app.use((req, res) => {
    res.status(404).end();
})

// start js server after DB connection

db.connect(err => {
  if (err) throw err;

    console.log('Database connected');

  app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`);
  });

});

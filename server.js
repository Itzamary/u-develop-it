// inport express, save to a variable, add port designation to a variable.
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();

// middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());



// Default response for any other request(not found)
app.use((req, res) => {
    res.status(404).end();
})

// start js server
app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`);
});
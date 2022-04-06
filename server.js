const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const dotenv = require('dotenv').config();

// Middlewares
app.use(express.json())

app.get('/', (req, res) => {
    res.send("hello from home route")
})
app.listen(PORT, (err) => {
    if (err) return console.log("Error", err);
    console.log(`Successfully running on http://localhost:${PORT}`);
})
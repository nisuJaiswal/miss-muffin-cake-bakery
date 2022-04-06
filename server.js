const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 5000;
const connectDb = require('./config/connectDb')

// Middlewares
app.use(express.json())
connectDb();

app.get('/', (req, res) => {
    res.send("hello from home route")
})

app.listen(PORT, (err) => {
    if (err) return console.log("Error", err);
    console.log(`Successfully running on http://localhost:${PORT}`);
})
const dotenv = require('dotenv').config();
const DB_URL = process.env.DB_URL;
const mongoose = require('mongoose');

const connectDb = async () => {
    try {
        const connection = await mongoose.connect(DB_URL)
        console.log(`Connected to database Successfully: ${connection}`)
    } catch (error) {
        console.log(error)
    }
}
module.exports = connectDb;
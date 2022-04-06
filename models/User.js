const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
    },
    address: {
        type: String
    },
    allOrders: {
        type: mongoose.Schema.Types.ObjectId
    }
})

const User = mongoose.model("Users", userSchema);
module.exports = User;
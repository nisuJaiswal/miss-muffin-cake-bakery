const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
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
    role: {
        type: String,
        default: "user"
    },
    address: {
        type: String
    },
    allOrders: {
        type: Array,
        default: [],
    }
})

const User = mongoose.model("Users", userSchema);
module.exports = User;
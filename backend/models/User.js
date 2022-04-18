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
        required: [true, "Please Enter Your Password"],
    },
    email: {
        type: String,
    },
    image: {
        type: String,
        default: 'https://res.cloudinary.com/dexshxzyp/image/upload/v1649503397/avatars/odjgpditepgcu2s4e2ax.png'
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
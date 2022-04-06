const mongoose = require('mongoose')
const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
    },
    quantity: {
        type: Number,
        default: 0.
    },
    date: {
        type: Date,
        default: Date.now(),
    }
})
const Item = mongoose.model('Item', itemSchema);
module.exports = Item;
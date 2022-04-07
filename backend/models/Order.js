const mongoose = require('mongoose')
const orderSchema = new mongoose.Schema({
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
    total: {
        type: Number,
        default: 0
    },
    status: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now(),
    }
})
const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
const mongoose = require('mongoose')
const orderSchema = new mongoose.Schema({
    itemDetails: [
        {
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
            itemId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Item",
                required: true
            }
        }
    ],
    userDetails: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
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
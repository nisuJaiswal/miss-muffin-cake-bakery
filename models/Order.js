const mongoose = require('mongoose')
const orderSchema = new mongoose.Schema({
    singleOrder: {
        type: Array
    }
})
const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
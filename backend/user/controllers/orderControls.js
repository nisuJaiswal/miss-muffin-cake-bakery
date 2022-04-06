const Item = require('../models/Item')
const Order = require('../models/Order')

// ADD ITEM TO CART -- USER
const addItem = async (req, res) => {

    const id = req.params.id;
    const addedItem = await Item.findOne({ _id: id });
    const { name, description, price, quantity } = addedItem
    const addedOrder = await Order.insertMany([{ name, description, price, quantity, total: quantity * price, status: false }])
    res.json({ addedOrder })
    // res.json({ "Hey There": "Hello" })
}

// ADD ITEM TO DB --ADMIN
const addItemToDB = async (req, res) => {
    // console.log(req.cookies)
    if (req.cookies.role === 'admin') {
        const { name, description, price, quantity, weight } = req.body;

        if (!name || !description || !price || !quantity || !weight) {
            return res.json({ error: "Provide all values" })
        }

        const itemToAdd = await Item.insertMany([{ name, description, price, quantity, weight }])
        res.json({ itemToAdd })
    }
    else {
        return res.json({ "error": 'You are not an admin' })
    }
}
module.exports = { addItem, addItemToDB };
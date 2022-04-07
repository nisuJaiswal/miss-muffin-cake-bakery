const Item = require('../models/Item')
const Order = require('../models/Order')

// ADD ITEM TO CART -- USER
const addItem = async (req, res) => {

    const id = req.params.id;
    const addedItem = await Item.findOne({ _id: id });
    if (!addedItem) return res.json({ error: "Item doesn't exitst" })
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

// GET REQ --ADMIN 
const getAllItems = async (req, res) => {
    if (req.cookies.role === 'admin') {
        const allItems = await Item.find({})
        res.json({ allItems })
    }
    else {
        res.json({ msg: "You are not admin" })
    }
}

// DEL REQ -- ADMIN
const deleteItem = async (req, res) => {
    if (req.cookies.role === 'admin') {

        const { id } = req.params;

        const deleted = await Item.findByIdAndDelete({ _id: id })
        res.json({ deleted })
    }
    else {
        res.json({ msg: "You are not admin" })
    }
}
module.exports = { addItem, addItemToDB, getAllItems, deleteItem };
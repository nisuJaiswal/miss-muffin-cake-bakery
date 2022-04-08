const Item = require('../models/Item')
const Order = require('../models/Order')

// ADD ITEM TO CART -- USER
const addItem = async (req, res) => {

    const { id } = req.params;
    const itemToAdd = await Item.findById({ _id: id });
    const addToOrder = await Order.create({
        itemDetails: [{ name: itemToAdd.name, description: itemToAdd.description, price: itemToAdd.price, quantity: itemToAdd.quantity, itemId: itemToAdd._id }],
        userDetails: req.user._id,
    })
    res.json({ addToOrder })
}

// GET ITEMS OF LOGED IN USER -- GET
const getAllItemsOfUser = async (req, res) => {
    const allOrders = await Order.find({ userDetails: req.user._id });
    if (!allOrders) return res.json({ msg: "Your Ordres are empty" })
    res.json({ allOrders })
}

// ADD ITEM TO DB --ADMIN
const addItemToDB = async (req, res) => {
    if (req.user.role === 'admin') {
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
    if (req.user.role === 'admin') {
        const allItems = await Item.find({})
        res.json({ allItems })
    }
    else {
        res.json({ msg: "You are not admin" })
    }
}

// DEL REQ -- ADMIN
const deleteItem = async (req, res) => {
    if (req.user.role === 'admin') {

        const { id } = req.params;

        const deleted = await Item.findByIdAndDelete({ _id: id })
        res.json({ deleted })
    }
    else {
        res.json({ msg: "You are not admin" })
    }
}
module.exports = { addItem, addItemToDB, getAllItems, deleteItem, getAllItemsOfUser };
const Item = require('../models/Item')
const Order = require('../models/Order')
var cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

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
const getAllOrdersOfUser = async (req, res) => {
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
        const myCloud = await cloudinary.v2.uploader.upload(req.file.path, {
            folder: "itemImages",
            width: 250,
            crop: "scale",
        });
        const itemToAdd = await Item.insertMany([{ name, description, price, quantity, weight, image: myCloud.secure_url }])
        res.json({ itemToAdd })
        // res.json({ file: req.file })
    }
    else {
        return res.json({ "error": 'You are not an admin' })
    }
}

// GET REQ --ADMIN 
const getAllItemsAdmin = async (req, res) => {
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

// GET ALL PRODUCTS -- USER
const getAllProducts = async (req, res) => {
    try {
        const allProducts = await Item.find({})
        res.json({ allProducts })
    } catch (error) {
        res.json({ error })
    }
}

// GET SINGLE ITEM DETAILS FOR USER
const getItemDetails = async (req, res) => {
    try {

        const { id } = req.params
        const item = await Item.findOne({ _id: id })
        if (item) return res.json({ item })
        return res.json({ error: "Something went wrong" })
    } catch (error) {
        res.json({ error })
    }
}

module.exports = {
    addItem,
    addItemToDB,
    getAllItemsAdmin,
    deleteItem,
    getAllOrdersOfUser,
    getAllProducts,
    getItemDetails
};
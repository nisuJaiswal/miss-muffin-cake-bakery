const router = require('express').Router();
const { addItem, addItemToDB, getAllItems, deleteItem } = require('../controllers/orderControls')


// POST REQ
// GENERATED EACH TIME WHEN USER CLICKS ON + ICON
router.post('/additemtodatabase', addItemToDB)
router.get('/getAllItems', getAllItems)
router.post('/:id', addItem)
router.delete('/:id', deleteItem)

module.exports = router
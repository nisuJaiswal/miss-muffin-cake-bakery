const router = require('express').Router();
const { addItem, addItemToDB } = require('../controllers/orderControls')


// POST REQ
// GENERATED EACH TIME WHEN USER CLICKS ON + ICON
router.post('/additemtodatabase', addItemToDB)
router.post('/:id', addItem)

module.exports = router
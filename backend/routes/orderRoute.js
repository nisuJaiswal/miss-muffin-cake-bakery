const router = require('express').Router();
const { addItem, addItemToDB, getAllItems, deleteItem, getAllItemsOfUser } = require('../controllers/orderControls');
const { userAuth } = require('../middleware/userAuth');


// POST REQ
router.post('/additemtodatabase', userAuth, addItemToDB)
router.get('/getAllItems', userAuth, getAllItems)
router.get('/getmyorders', userAuth, getAllItemsOfUser)
router.post('/:id', userAuth, addItem)
router.delete('/:id', userAuth, deleteItem)

module.exports = router
const router = require('express').Router();
const { addItem, addItemToDB, getAllItems, deleteItem, getAllItemsOfUser } = require('../controllers/orderControls');
const { userAuth } = require('../middleware/userAuth');

const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname + '--' + Date.now())
    }
});
const upload = multer({ storage: storage })



// POST REQ
router.post('/additemtodatabase', userAuth, upload.single('itemimage'), addItemToDB)
router.get('/getAllItems', userAuth, getAllItems)
router.get('/getmyorders', userAuth, getAllItemsOfUser)
router.post('/:id', userAuth, addItem)
router.delete('/:id', userAuth, deleteItem)

module.exports = router
const router = require('express').Router();

const { register, login, logout, getAllUsers, resetPassword } = require('../controllers/userControls')
const { userAuth } = require('../middleware/userAuth')

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


router.post('/login', login)
router.post('/register', upload.single('userimage'), register)
router.post('/logout', logout)
router.get('/getAllUsers', userAuth, getAllUsers)
router.put('/resetPassword', userAuth, resetPassword)
// router.post('/uploaduserimage', upload.single('userimage'), uploadImage)

module.exports = router;
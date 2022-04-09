const router = require('express').Router();

const { register, login, logout, getAllUsers, uploadImage } = require('../controllers/userControls')
const { userAuth } = require('../middleware/userAuth')

const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
        // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        // cb(null, file.originalname + '-' + uniqueSuffix)
    }
});
const upload = multer({ storage: storage })
// const upload = multer({ dest: 'uploads/' })
router.post('/login', login)
router.post('/register', register)
router.post('/logout', logout)
router.get('/getAllUsers', userAuth, getAllUsers)
router.post('/uploaduserimage', upload.single('userimage'), uploadImage)

module.exports = router;
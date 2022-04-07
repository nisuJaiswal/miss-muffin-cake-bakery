const router = require('express').Router();
const { register, login, logout, getAllUsers } = require('../controllers/userControls')
const { userAuth } = require('../middleware/userAuth')
router.post('/login', login)
router.post('/register', register)
router.post('/logout', logout)
router.get('/getAllUsers', userAuth, getAllUsers)

module.exports = router;
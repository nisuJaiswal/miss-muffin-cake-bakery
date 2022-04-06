const jwt = require('jsonwebtoken');
const User = require('../models/User')

const userAuth = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {

            token = req.headers.authorization.split(' ')[1];

            const decode = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decode.id).select('-password')

            next()
        } catch (error) {
            res.json({ error })
        }
    } else {
        res.json({ err: "If else error" })
    }

    if (!token) {
        res.status(401).json({ err: "Login First" })
    }
}

module.exports = { userAuth }
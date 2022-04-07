const jwt = require('jsonwebtoken');
const User = require('../models/User')



const userAuth = async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return res.json({ error: "User not loged in" });
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decodedData.id);

    next();
};


module.exports = { userAuth }
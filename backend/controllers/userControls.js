const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const SECRET = process.env.JWT_SECRET
// POST REQ
const register = async (req, res) => {
    const { firstname, lastname, username, password, email, address } = req.body;

    if (!firstname || !lastname || !username || !password || !email) {
        return res.json({ "err": "Enter all fields" })
    }

    if (!address) {
        address = "";
    }

    const exitstingUser = await User.findOne({ username });
    if (exitstingUser) {
        return res.json({ "error": "Username already Exitsts" });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const createdUser = await User.create({ firstname, lastname, email, username, password: hashedPassword, address });

    if (createdUser) {
        res.json({ "success": "User created Successfully" });
    }
    else {
        res.json({ "error": "Something went wrong in database" })
        res.json({ "error": "Something went wrong in database" })
    }
}

// POST REQ
const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.json({ "error": "Provide all fields" })
    }

    const user = await User.findOne({ email });
    if (user && (await bcryptjs.compare(password, user.password))) {

        let cookieOptions = {
            expires: new Date(
                Date.now() + 1 * 24 * 60 * 60 * 1000
            ),
            httpOnly: true,
        }

        res.cookie('token', generateToken(user._id), cookieOptions).cookie('role', user.role).json({ "success": "Logined", "jwtToken": generateToken(user._id) })
    }
    else {
        res.json({ "error": "Creds are wrong" })
    }
}
// FUNCTION FOR GENERATE TOKEN
const generateToken = (id) => {
    return jwt.sign({ id }, SECRET, { expiresIn: '1d' })
}
module.exports = { register, login }
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const SECRET = process.env.JWT_SECRET
var cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

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

    if (!req.file) {

        const createdUser = await User.create({ firstname, lastname, email, username, password: hashedPassword, address });
        return res.json({ createdUser })
    }


    const myCloud = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "avatars",
        width: 250,
        crop: "scale",
    });
    const createdUser = await User.create({ firstname, lastname, email, username, password: hashedPassword, image: myCloud.secure_url, address });
    // return res.json({ createdUser })
    return res.json({ createdUser })

}

// POST REQ
const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.json({ "error": "Provide all fields" })
    }

    const user = await User.findOne({ email });
    if (user && (await bcryptjs.compare(password, user.password))) {
        sendToken(user, 200, res);
    }
    else {
        res.json({ "error": "Creds are wrong" })
    }
}

const logout = (req, res) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        message: "Logged Out",
    });
}

// GET ALL USRS --ADMIN
const getAllUsers = async (req, res) => {
    if (req.user.role === 'admin') {

        const allUsers = await User.find({})
        res.json({ allUsers })
    }
    else {
        res.json({ error: "You are not admin" })
    }
}


// FUNCTION FOR GENERATE TOKEN
const generateToken = (id) => {
    return jwt.sign({ id }, SECRET, { expiresIn: '1d' })

}

const sendToken = (user, statusCode, res) => {
    const token = generateToken(user._id);

    // options for cookie
    const options = {
        expires: new Date(
            Date.now() + 1 * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
    };

    res.status(statusCode).cookie("token", token, options).cookie("role", user.role).json({
        success: true,
        user,
        token,
    });
};
const uploadImage = async (req, res) => {
    // res.json({ data: req.file })


}
module.exports = { register, login, logout, getAllUsers, uploadImage }
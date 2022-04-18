const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const nodemailer = require("nodemailer");
const SECRET = process.env.JWT_SECRET
var cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

// POST REQ FOR REGISTRATION
const register = async (req, res) => {
    const { firstname, lastname, username, password, email } = req.body;
    // console.log(req.body.userimage)
    let { address } = req.body

    if (!firstname || !lastname || !username || !password || !email) {
        return res.json({ "error": "Enter all fields" })
    }

    if (!address) {
        address = "";
    }

    // const exitstingUser = await User.findOne({ username, email });
    // if (exitstingUser) {
    //     return res.json({ "error": "Username or Email already exists" });
    // }
    User.find({ $or: [{ email }, { username }] }).exec(async (err, data) => {

        if (data.length > 0) {
            return res.json({ "error": "Username or Email already exists" });
        }
        else {
            const salt = await bcryptjs.genSalt(10);
            const hashedPassword = await bcryptjs.hash(password, salt);


            if (!req.body.userimage) {
                const createdUser = await User.create({ firstname, lastname, email, username, password: hashedPassword, address });
                console.log("NO FIle RECEIVED")
                return res.json({ user: createdUser })
            }


            const myCloud = await cloudinary.v2.uploader.upload(req.body.userimage, {
                folder: "uploads/",
                width: 250,
                crop: "scale",
            });

            const createdUser = await User.create({ firstname, lastname, email, username, password: hashedPassword, image: myCloud.secure_url, address });
            // return res.json({ createdUser })
            console.log("file REceived")
            return res.json({ user: createdUser })
        }
    });



}

// POST REQ FOR LOGIN   
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

// GET REQUEST FOR LOGOUT
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

const resetPassword = async (req, res) => {
    const { currentPass, newPass, confirmPass } = req.body;
    if (!newPass || !confirmPass || !currentPass) {
        return res.json({ error: "Enter all fields" })
    }
    if (!(await bcryptjs.compare(currentPass, req.user.password))) {
        return res.json({ error: "Current Password is wrong" })
    }
    if (newPass !== confirmPass) {
        return res.json({ error: "Passwords doesn't matches" })
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(confirmPass, salt);


    const resetPasswordUser = await User.findOne({ _id: req.user._id })
    resetPasswordUser.password = hashedPassword;
    await resetPasswordUser.save()
    res.json({ resetPasswordUser })

    const testAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD,
            clientId: process.env.OAUTH_CLIENTID,
            clientSecret: process.env.OAUTH_CLIENT_SECRET,
            refreshToken: process.env.OAUTH_REFRESH_TOKEN
        }
    }); cd
    const info = await transporter.sendMail({
        from: 'nisujaiswal4@gmail.com',
        to: req.user.email,
        subject: "Password has been changed",
        text: `Your password has been changed in Miss Muffin Home Backery at ${new Date().toLocaleString()}`,
    });
}

// DELETE A USER --ADMIN
const deleteUser = async (req, res) => {
    if (req.user.role === 'admin') {

        const { userId } = req.params;
        User.findByIdAndDelete({ _id: userId }, (err, data) => {
            if (data) return res.json({ success: true, msg: "User deleted" })

        })
    }
    else {
        res.json({ error: "You are not admin" })
    }
}

// GET LOGED IN USER
const getme = async (req, res) => {
    const user = await User.findById(req.user._id)
    res.json({ user })
}

const updateProfile = async (req, res) => {
    try {


        const { firstname, lastname, email, username } = req.body;
        console.log(req.body.firstname)
        if (req.body.userimage !== "") {
            const myCloud = await cloudinary.v2.uploader.upload(req.body.userimage, {
                folder: "avatar/",
                width: 250,
                crop: "scale",
            });
            const updatedUser = await User.findByIdAndUpdate(req.user._id, {
                firstname, lastname, username, email, image: myCloud.secure_url
            }, {
                new: true,
                runValidators: true,
                useFindAndModify: false,
            })
            console.log("inside if statement")
            return res.json({ updatedUser })
        }

        const updatedUser = await User.findByIdAndUpdate(req.user._id, {
            firstname, lastname, username, email
        }, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        })
        res.json({ updatedUser })
    } catch (error) {
        res.json({ error })
    }
}
module.exports = { register, login, logout, getAllUsers, resetPassword, deleteUser, updateProfile, getme };
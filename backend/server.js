const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 5000;
const connectDb = require('./config/connectDb')
var cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')

// Middlewares
app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use('/public', express.static(process.cwd() + '/public'));
app.use('/uploads', express.static(process.cwd() + '/uploads'))
connectDb();

// app.get('/', (req, res) => {
//     res.send("hello from home route")
// })

app.use('/api/user', require('./routes/userRoute'))
app.use('/api/order', require('./routes/orderRoute'))



app.listen(PORT, (err) => {
    if (err) return console.log("Error", err);
    console.log(`Successfully running on http://localhost:${PORT}`);
})
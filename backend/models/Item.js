const mongoose = require('mongoose')
const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
    },
    quantity: {
        type: Number,
        default: 0.
    },
    weight: {
        type: Number
    },
    image: {
        type: String,
        default: 'https://res.cloudinary.com/dexshxzyp/image/upload/v1649503397/avatars/odjgpditepgcu2s4e2ax.png'
    }

})
const Item = mongoose.model('Item', itemSchema);
module.exports = Item;
const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    code : {
        type : String,
        required : true,
        unique : true
    },
    description: {
        type: String,
        required : true,
    },
    price: {
        type: Number,
        required : true,
    }
});

module.exports = mongoose.model('Product', productSchema);
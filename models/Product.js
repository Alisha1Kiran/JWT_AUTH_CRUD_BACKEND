const mongoose = require('mongoose');

// Generating Schema
const productSchema = new mongoose.Schema({
    productName : { type: String, required: true, unique: true },
    description : { type: String, required: true, unique: true },
    image : { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true }
})

// Creating the model and exporting it
const Product = mongoose.model('Product', productSchema); // Model registration
module.exports = Product;
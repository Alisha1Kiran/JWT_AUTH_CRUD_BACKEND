const mongoose = require("mongoose");

// Generating Schema
const productSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    productName: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    description: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
  },
  { _id: false }
);

// Creating the model and exporting it
const Product = mongoose.model("Product", productSchema); // Model registration
module.exports = Product;

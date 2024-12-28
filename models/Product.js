const mongoose = require('mongoose');

// Generating Schema
const productSchema = new mongoose.Schema({
    id: {type: Number, required: true, unique: true},
    productName : { type: String, required: true, unique: true },
    category: { type: String, required: true},
    description : { type: String, required: true, unique: true },
    image : { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true }
})

// Pre-save hook to generate customId
productSchema.pre('save', async function (next) {
    if (!this.isNew) return next(); // Only run for new documents

    try {
        const lastProduct = await mongoose.model('Product').findOne().sort({ id: -1 });
        this.id = lastProduct ? lastProduct.id + 1 : 1; // Increment the ID or start at 1
        next();
    } catch (error) {
        next(error);
    }
});

// Creating the model and exporting it
const Product = mongoose.model('Product', productSchema); // Model registration
module.exports = Product;
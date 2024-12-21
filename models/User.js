const mongoose = require('mongoose');

// Generating Schema
const userSchema = new mongoose.Schema({
    fullName : { type: String, required: true, unique: true },
    email : { type: String, required: true, unique: true },
    password : { type: String, required: true},
    role: {type: String, required: true}
})

// Creating the model and exporting it
const User = mongoose.model('User', userSchema); // Model registration
module.exports = User;
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

// Fetch all users
const getAllUsers = async (req,res) => {
    if(req.user.role !== "admin") return res.status(403).json({ message: "Access denied: Admins only" });
    
    try {
        const usersList = await User.find();
        res.json(usersList);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
}

// Adding user details to db
const addUser = async (req, res) => {
    try {
        if (req.body) {
            // Exteract data from the request body
            const { fullName, email, password} = req.body;

            // Hashing the password
            const hashedPassword = await bcrypt.hash(password, 12);

            // Create a new user document
            const newUser = new User({
                fullName,
                email,
                password : hashedPassword,
                role : 'user'
            })
            
            // posrting user details to db
            await newUser.save()
                .then( (savedUser) => {
                    res.status(200).json({
                        message: 'Successfully added new user',
                        user: savedUser
                    })
                } )
                .catch( (error) => {
                    res.status(500).json({
                        message: 'Error adding user',
                        error: error.message // Send the error message in the response
                    });
                } )
        }
    } catch (error) {
        console.error(`Error is : ${error}`)
        res.status(500).send('Internal Server Error');
    }
}

// Login
const userLogin = async (req, res) => {
    const {email, password} = req.body;

    try {
        // Using email whether user exists in DB
        const user = await User.findOne({ email });
        console.log(`User with email ${email} exists`);
        console.log(`User : ${user}`);

        if (!user) return res.status(404).json({ message: "User not found" });

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        
        if (!isPasswordMatch) return res.status(401).json({ message: "Invalid credentials" });

        // Generate JWT Token
        const token = jwt.sign(
            { email: user.email, role: user.role }, // Payload
            process.env.JWT_SECRET,                      // Secret key
            { expiresIn: '1h' }                     // Options (e.g., token expiration)
        );

        // Send the token to the client
        res.status(200).json({ 
            message: 'Login successful', 
            token: token 
        });

    } catch (error) {
        console.error(`Error is : ${error}`);
        res.status(500).send('Internal Server Error');
    }
}

// Get user by id
const getUserById = async (req,res) => {
    const userId = req.params.id;

    try {
        const userDetails = await User.findById(userId)

        if (!userDetails) return res.status(402).json({
            message: "User not found"
        })

        res.status(200).json({
            message: "User found successfully",
            user: userDetails
        })
        
    } catch (error) {
        res.status(500).json({
            message: 'Error finding user',
            error: error.message // Send the error message in the response
        });
    }
}

// Update user data
const updateUserData = async (req, res) => {

    const userId = req.params.id; // User ID from URL
    const updatedData = req.body; // Fields to update

    try {
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            updatedUser,
            { new: true, runValidators: true } // Return updated document and validate changes
        );
        
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            message: 'User updated successfully',
            updatedProduct,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error updating user details',
            error: error.message,
        });
    }
}

// Delete user
const deleteUser = async (req, res) => {

    const userId = req.params.id; // User ID from URL
    try {
        const deleteUser = await User.findByIdAndDelete(userId);

        if (!deleteUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            message: 'User deleted successfully',
            deleteUser,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting product',
            error: error.message,
        });
    }
}


module.exports = {addUser, userLogin, getAllUsers, getUserById, updateUserData, deleteUser}
const express = require('express');
const userRouter = express.Router();
const {addUser, userLogin, getAllUsers, getUserById, updateUserData, deleteUser} = require('../controller/userController');
const verifyToken = require('../middleware/verifyToken');

// registerRouter.get('/', (res, res) => {
    
// })

userRouter.post('/register', addUser);
userRouter.post('/login', userLogin);

// View all products
userRouter.get('/', verifyToken, getAllUsers);

// Delete products
userRouter.get('/:id', getUserById);

// Update products data
userRouter.put('/:id', updateUserData);

// Delete products
userRouter.delete('/:id', deleteUser);

module.exports = userRouter;
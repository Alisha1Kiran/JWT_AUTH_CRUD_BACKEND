const express = require('express');
const verifyToken = require('../middleware/verifyToken');
const {getAllProducts, getProductById, addProductData, deleteProduct, updateProductData} = require('../controller/productsController')
const productRouter = express.Router();

// View all products
productRouter.get('/', getAllProducts);

// Delete products
productRouter.get('/:id', getProductById);

// Add products
productRouter.post('/', verifyToken, addProductData);

// Delete products
productRouter.delete('/:id', verifyToken, deleteProduct);

// Update products data
productRouter.put('/:id', verifyToken, updateProductData);



module.exports = productRouter;
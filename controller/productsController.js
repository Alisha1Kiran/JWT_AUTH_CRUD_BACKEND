const Product = require("../models/Product");

// Fetch all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// View product by id
const getProductById = async (req, res) => {
  const productId  = req.params.id;
  console.log("Product ID: ", productId);

  try {
    const productDetails = await Product.findById(productId);
    console.log("productDetails : ", productDetails);
    if (!productDetails)
      return res.status(402).json({
        message: "Product not found",
      });

    res.status(200).json({
      message: "Product found successfully",
      product: productDetails,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error adding product",
      error: error.message, // Send the error message in the response
    });
  }
};

// Add product -> by admin
const addProductData = async (req, res) => {
  if (req.user.role !== "admin")
    return res.status(403).json({ message: "Access denied: Admins only" });

  try {
    if (req.body) {
      console.log("product body : " , req.body);
      const { productName, category, description, image, price, stock } =
        req.body;

      if (
        !productName ||
        !category ||
        !description ||
        !image ||
        !price ||
        !stock
      ) {
        return res.status(400).json({ message: "All fields are required" });
      }
      // create new product document
      const product = new Product({
        productName,
        category,
        description,
        image,
        price,
        stock
      });

      console.log("Before saving product");

      // posting product details to db
      await product.save().then((savedProduct) => {
        console.log("Inside product save");
        res.status(200).json({
          message: "Product added successfully",
          newProduct: savedProduct,
        });
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error adding product",
      error: error.message, // Send the error message in the response
    });
  }
};

// update product data
const updateProductData = async (req, res) => {
  if (req.user.role != "admin")
    return res.status(403).json({
      message: "Access denied: Admins only",
    });

  const productId = req.params.id; // Product ID from URL
  const updatedData = req.body; // Fields to update

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updatedData,
      { new: true, runValidators: true } // Return updated document and validate changes
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product updated successfully",
      updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating product",
      error: error.message,
    });
  }
};

// Delete product from db
const deleteProduct = async (req, res) => {
  if (req.user.role !== "admin")
    return res.status(403).json({
      message: "Access denied: Admins only",
    });

  const productId = req.params.id; // Product ID from URL
  try {
    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product deleted successfully",
      deletedProduct,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting product",
      error: error.message,
    });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  addProductData,
  updateProductData,
  deleteProduct,
};

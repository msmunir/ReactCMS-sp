//Import product module
const Product = require("../schemas/productSchema");
const mongoose = require("mongoose");


//Create new product
const createNewProduct = async (req, res) => {
  try {
    const { name, category, description, price, imgURL } = req.body;

    if (!name || !category || !description || !price || !imgURL ) {
      return res
        .status(400).json({ 
            message: "All product fields are required" });
    }

    const newProduct = await Product.create(req.body);

    res.status(200).json({ newProduct });

  } catch (err) {
    res.status(500).json({
      message: "An error occurred while creating the product",
      error: err.message,
    });
  }
};


//Get all products
const getAllProducts = async (req, res) => {
  try {
    let allProducts = await Product.find();

    res.status(200).json({ allProducts });

  } catch (err) {
    res.status(500).json({
      message: "An error occurred while getting the products",
      error: err.message,
    });
  }
};


//Get single product
const getSingleProduct = async (req, res) => {
  try {
    const oneProduct = await Product.findById(req.params.id);

    if (!oneProduct) {
      res.status(404).json({
        message: "Could not find this product",
      });
      return;
    }
    res.status(200).json(oneProduct);

  } catch (err) {
    res.status(500).json({
      message: "An error occurred while getting the products",
      err: err.message,
    });
  }
};


//Update a product
const updateProduct = async (req, res) => {
  try {
    const upProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!upProduct) {
      res.status(404).json({
        message: "Could not find this product",
      });
      return;
    }
    res.status(200).json(upProduct);
    
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong when updating this product!",
      err: err.message,
    });
  }
};


//Delete a product
const deleteProduct = async (req, res) => {
  try {

    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400).json({
            message: "Invalid product ID",
        });
        return;
    }

    const delProduct = await Product.findByIdAndDelete(req.params.id);

    if (!delProduct) {
      res.status(404).json({
        message: "Could not find this product",
      });
      return;
    }
    res.status(200).json(delProduct);

  } catch (err) {
    res.status(500).json({
      message: "Something went wrong when deleting this product!",
      err: err.message,
    });
  }
};

//Export modules
module.exports = {
  createNewProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
//Import express,router and productModel
const router = require('express').Router()
const productModel = require('../models/productModel')
const auth = require('../authentication/auth')


//Create a new product
router.post('/', auth.verifyToken, auth.checkAdmin, productModel.createNewProduct)

//Get all products
router.get('/', productModel.getAllProducts)

//Get single product
router.get('/:id', productModel.getSingleProduct)

//Update a product
router.put('/:id', auth.verifyToken, auth.checkAdmin, productModel.updateProduct)

//Delete a product
router.delete('/:id', auth.verifyToken, auth.checkAdmin, productModel.deleteProduct)

//Export router
module.exports = router
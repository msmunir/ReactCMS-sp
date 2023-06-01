//Import router and userModel
const router = require('express').Router()
const userModel = require('../models/userModel')
const auth = require('../authentication/auth')



//Create a new user
router.post('/register', userModel.registerNewUser)

//Login a user
router.post('/login', userModel.loginUser)

//Login admin
router.post('/loginadmin', userModel.loginAdmin)

//Get all users
router.get('/', userModel.getAllUsers)

//GET a single user
router.get('/:id', userModel.getUserData)

//Delete user?


//Export router
module.exports = router;
//Require express and cors and initialize app
const express = require('express');
const app = express();
const cors = require('cors');


//Middlewear
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//Controllers
app.use('/api/products', require('./controllers/productController'));
app.use('/api/users', require('./controllers/userController'));
app.use('/api/orders', require('./controllers/orderController'));


//Export app
module.exports = app;



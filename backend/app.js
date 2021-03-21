const express = require("express");
const app = express();
const cors = require('cors');
const errorMiddleware = require("./middlewares/error");
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

const dotEnv = require("dotenv");
// Setting up config
if (process.env.NODE_ENV !== 'PRODUCTION') require('dotenv').config({
  path: "./config/config.env"
})

const corsOpts = {
  origin: '*',
  methods: [ 'OPTIONS', 'GET', 'POST', 'PUT', 'DELETE' ],
  allowedHeaders: '*',
};

app.use(cors(corsOpts));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload());




// import all routes.
const products = require("./routes/product");
const auth = require('./routes/auth');
const order = require('./routes/order');
const payment = require('./routes/payment');


// Our handler function is passed a request and response object
app.get('/', function(req, res) {
  res.status(200).json({
    success: true,
    message: 'First page of node server run '
  });
  // We must end the request when we are done handling it
  res.end();
});

app.use('/api/v1', products);
app.use('/api/v1', auth);
app.use('/api/v1', order);
app.use('/api/v1', payment);


// Middleware to handle errors.
app.use(errorMiddleware);


module.exports = app
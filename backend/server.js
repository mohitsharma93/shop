const app = require("./app");
const mongoDb = require('./config/mongo.database');

const dotEnv = require("dotenv");
const cloudinary = require('cloudinary');

// handle uncaught exceptions
process.on("uncaughtException", err => {
  console.log(`${err.stack}`);
  console.log('Shuting down the server bcz unhandled promise rejection');
    process.exit(1);
})

// Setting up config
if (process.env.NODE_ENV !== 'PRODUCTION') require('dotenv').config({
  path: "./config/config.env"
})

// connect to mongo
mongoDb();

// setting up cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const server = app.listen(process.env.PORT, () => {
  console.log(`server start at port: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`);
})

// Handle unhandled promise rejection.
process.on("unhandledRejection", err => {
  console.log(`Error: ${err.stack}`);
  console.log('Shuting down the server bcz unhandled promise rejection');
  server.close(() => {
    process.exit(1);
  })
})
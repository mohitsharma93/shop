const productModel = require('../models/products');
const dotenv = require('dotenv');

const mongoDb = require('../config/mongo.database');
const productDummy = require('../data/products.json');

// setting dotenv file.
dotenv.config({
  path: 'backend/config/config.env'
})

mongoDb();

const setProduct = async () => {
  try {
    await productModel.deleteMany();
    console.log('Product are deleted successfully');

    await productModel.insertMany(productDummy);
    console.log('Product are inserted successfully');

    process.exit();

  } catch (err) {
    console.error(err.message);
    process.exit();
  }
}

setProduct();
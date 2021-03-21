const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter product name'],
    trim: true,
    maxLength: [100, 'Product name can not exceed']
  },
  price: {
    type: Number,
    required: [true, 'Please enter product price'],
    trim: true,
    maxLength: [5, 'Product price can not exceed'],
    default: 0.0
  },
  description: {
    type: String,
    required: [true, 'Please enter product description']
  },
  rating: {
    type: Number,
    default: 0
  },
  images: {
    type: [
      {
        public_id : {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true
        }
      },
    ],
  },
  category: {
    type: String,
    required: [true, 'Please select category for product.'],
    enum: {
      values: [
        'Electronics',
        'Laptop',
        'Accessories',
        'Food',
        'Books',
        'Clothes/Shoes',
        'Beauty/Health',
        'Cameras',
        'Headphones',
        'Sports',
        'Outdoor',
        'Home'
      ],
      message: 'Please select correct category for product'
    }
  },
  seller: {
    type: String,
    required: [true, 'Please enter product seller']
  },
  stock: {
    type: Number,
    required: [true, 'Please enter product stock'],
    maxLength: [100, 'Product stock cannot exceed 5 characters'],
    default: 0
  },
  numOfReviews: {
    type: Number,
    default: 0
  },
  reviews : [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
      },
      name: {
        type: String,
        required: true
      },
      rating: {
        type: Number,
        required: true
      },
      comment: {
        type: String,
        required: true
      }
    }
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Product', productSchema);
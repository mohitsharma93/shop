const ErrorHandler = require('../utils/ErrorHandler');

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;

  if (process.env.NODE_ENV === 'DEVELOPMENT') {
    res.status(err.statusCode).json({
      success: false,
      error: err,
      message: err.message,
      stack: err.stack
    })
  }

  if (process.env.NODE_ENV === 'PRODUCTION') {
    let error = {...err};

    error.message = err.message;

    // wrong mongoes id error
    if (err.name === 'CastError') {
      const message = `Resource not found. Invalid: ${err.path }`;
      error = new ErrorHandler(message, 400);
    }

    // handling mongoes validation error.
    if (err.name === 'ValidationError') {
      const message = Object.values(err.errors).map(value => value.message);
      error = new ErrorHandler(message, 400)
    }

    // Handling mongoes duplicate key error
    if (err.code === 11000) {
      const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
      error = new ErrorHandler(message, 400)
    }

    // handling wrong JWT errors.
    if (err.name === 'JsonWebTokenError') {
      const message = `JSON Web Token invalid. Try Again!!! `;
      error = new ErrorHandler(message, 400)
    }

    // handling expired JWT errors.
    if (err.name === 'TokenExpireError') {
      const message = `JSON Web Token is expired. Try Again!!! `;
      error = new ErrorHandler(message, 400)
    }

    res.status(error.statusCode).json({
      success: false,
      error: [error.message || 'Internal server error'],
    })
  }

  res.end();
}
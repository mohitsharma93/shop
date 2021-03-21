const catchAsyncError = require('../middlewares/catchAsyncError');

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// process stripe payment request => /api/v1/payment/process
exports.processPayment = catchAsyncError(async (req, res, next) => {
  
  const paymentIntent = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: 'inr',
    metadata: { integration_check: 'accept_a_payment' }
  })

  res.status(200).json({
    success: true,
    client_secret: paymentIntent.client_secret
  })
  res.end();
});

// return stripe api key => /api/v1/stripe-api
exports.getStripeApiKey  = catchAsyncError(async (req, res, next) => {

  res.status(200).json({
    success: true,
    stripeApiKey: process.env.STRIPE_API_KEY
  })
  res.end();
})
const User = require('../models/user');

const ErrorHandler = require('../utils/ErrorHandler');
const catchAsyncError = require('../middlewares/catchAsyncError');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');
const cloudinary = require('cloudinary');

// Register user with => /api/v1/register
exports.registerUser = catchAsyncError(async (req, res, next) => {

	const cloudinaryObj = await cloudinary.v2.uploader.upload(req.body.avatar, {
		folder: 'shop-user-image',
	})
	const { name, email, password } = req.body;
	const user = await User.create({
		name,
		email,
		password,
		avatar: {
			public_id: cloudinaryObj.public_id,
			url: cloudinaryObj.secure_url, // secure_url follow https rules.
		},
	});

	sendToken(user, 200, res);
});

// Log In => /api/v1/login
exports.loginUser = catchAsyncError(async (req, res, next) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return next(new ErrorHandler('Please Enter email & password.', 400));
	}

	// find user.
	const user = await User.findOne({ email }).select('+password');
	if (!user) {
		return next(new ErrorHandler('Invalid Email or Password', 401));
	}

	// password match
	const isPasswordMatched = await user.comparePassword(password);

	if (!isPasswordMatched) {
		return next(new ErrorHandler('Invalid Email or Password', 401));
	}

	sendToken(user, 200, res);
});

// forgot Password => /api/v1/password/forgot
exports.forgotPassword = catchAsyncError(async (req, res, next) => {
	const user = await User.findOne({ email: req.body.email });

	if (!user) {
		return next(new ErrorHandler('User not found with this email', 401));
	}

	// get reset token.
	const resetToken = user.getResetPasswordToken();

	await user.save({ validateBeforeSave: false });

	// create password url.
	const resetUrl = `${req.protocol}://${req.get(
		'host'
	)}/api/v1/password/reset/${resetToken}`;
	const message = `Your password reset token is as follow: \n\n${resetUrl}\n\nif you have not requested this email, than ignore it.`;

	try {
		await sendEmail({
			email: user.email,
			subject: 'Shop Password Recovery',
			message,
		});

		res.status(200).send({
			success: true,
			message: `Email sent to: ${user.email}`,
		});
	} catch (error) {
		user.resetPasswordToken = undefined;
		user.resetPasswordExpire = undefined;

		await user.save({ validateBeforeSave: false });

		return next(new ErrorHandler(error.message), 500);
	}
});

// Reset Password => /api/vi/password/reset/:token
exports.resetPassword = catchAsyncError(async (req, res, next) => {
	// hash url token
	const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
	const user = await User.findOne({
		resetPasswordToken,
		resetPasswordExpire: { $gt: Date.now() },
	});

  if (!user) {
    return next(new ErrorHandler('Password reset token is invalid or has been expired', 400));
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler('Password does not match', 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();
  sendToken(user, 200, res);
});

// Get Current logged in user profile => /api/v1/me
exports.getUserProfile = catchAsyncError(async (req, res, next) => {
	// here you need of current logged in user id, which we already assign from middleware of auth.js on line 15
	const user = await User.findById(req.user.id);

	res.status(200).json({
		success: true,
		user
	})
	res.end();
});

// Update user profile => /api/v1/me/Update
exports.updateProfile = catchAsyncError(async (req, res, next) => {

	const newUserData = {
		name: req.body.name,
		email: req.body.email
	}

	if (req.body.avatar !== '') {
		const user = await User.findById(req.user.id);
		const imgId = user.avatar.public_id;
		const res = await cloudinary.v2.uploader.destroy(imgId);
		const cloudinaryObj = await cloudinary.v2.uploader.upload(req.body.avatar, {
			folder: 'shop-user-image',
		})
		newUserData.avatar = {
			public_id: cloudinaryObj.public_id,
			url: cloudinaryObj.secure_url, // secure_url follow https rules.
		}
	}

	// need to update avatar.
	const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
		new: true,
		runValidators: true,
		useFindAndModify: false
	})

	res.status(200).json({
		success: true,
		user
	})
	res.end();
});

// Update / Change Password => /api/v1/password/update
exports.changePassword = catchAsyncError(async (req, res, next) => {
	const user = await User.findById(req.user.id).select('+password');
	// compare password with db user
	const match = await user.comparePassword(req.body.oldPassword)

	if (!match) {
		return next(new ErrorHandler('Old password is incorrect', 404))
	}

	user.password = req.body.newPassword;
	await user.save(); // update password;
	sendToken(user, 200, res); // send token again bcz password is change.
})



// LogOut user => /api/v1/logout
exports.logOut = catchAsyncError(async (req, res, next) => {
	res.cookie('token', null, {
		expires: new Date(),
		httpOnly: true,
	});

	res.status(200).json({
		success: true,
		message: 'Logged out',
	});
});


// admin routes

// Get all users => /api/v1/admin/users
exports.allUsers = catchAsyncError(async (req, res, next) => {
	const allUsers = await User.find();

	res.status(200).json({
		success: true,
		allUsers
	});
	res.end();
});

// Get user detail => /api/v1/admin/user/:userId
exports.getUserDetail = catchAsyncError(async (req, res, next) => {
	const user = await User.findById(req.params.userId);

	if (!user) {
		return next(new ErrorHandler('User does not found with id.'))
	}
	res.status(200).json({
		success: true,
		user
	});
	res.end();
});

// Update user Detail => /api/v1/admin/user/:userId
 exports.updateUser = catchAsyncError(async (req, res, next) => {
	const { name, email, role} = req.body;
	// need to update avatar.
	const user = await User.findByIdAndUpdate(req.user.id, { name, email, role }, {
		new: true,
		runValidators: true,
		useFindAndModify: false
	})

	res.status(200).json({
		success: true,
		user
	})
	res.end();
});

// Delete User => /api/v1/admin/user/:userId
exports.deleteUser = catchAsyncError(async (req, res, next) => {
	const user = await User.findById(req.params.userId);

	if (!user) {
		return next(new ErrorHandler('User does not found with id.'))
	}

	await user.remove();

	res.status(200).json({
		success: true,
		message: 'User Removed successfully.'
	});
	res.end();
});
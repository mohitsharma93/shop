const express = require('express');

const router = express.Router();

const {
	registerUser,
	loginUser,
	logOut,
	forgotPassword,
	resetPassword,
	getUserProfile,
	changePassword,
	updateProfile,
	allUsers,
	getUserDetail,
	updateUser,
	deleteUser
} = require('../controllers/authController');

const { isAuthenticated, authorizeRoles } = require('../middlewares/auth');

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').put(resetPassword);
router.route('/logout').get(logOut);

router.route('/me').get(isAuthenticated, getUserProfile);
router.route('/me/update').put(isAuthenticated, updateProfile);
router.route('/password/update').put(isAuthenticated, changePassword);

router
	.route('/admin/users')
	.get(isAuthenticated, authorizeRoles('admin'), allUsers);
router
	.route('/admin/user/:userId')
	.get(isAuthenticated, authorizeRoles('admin'), getUserDetail)
	.put(isAuthenticated, authorizeRoles('admin'), updateUser)
	.delete(isAuthenticated, authorizeRoles('admin'), deleteUser); 

module.exports = router;

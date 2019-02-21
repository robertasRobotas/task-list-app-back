const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../midleware/auth');

const UserSchema = require('../models/user');
const singupValidation = require('../midleware/singupValidation');
const emailValidation = require('../midleware/emailValidation');
const UserController = require('../controllers/user');

router.post('/singup', singupValidation, UserController.SINGUP);

router.post('/login', UserController.LOGIN);

router.post('/setUserSecretKeyAndSendEmail', emailValidation, UserController.SET_USER_SECRET_KEY_AND_SEND_EMAIL);

router.post('/recreatePassword', UserController.RECREATE_PASSWORD);


router.get('/authUser', auth, (req, res)=>{
	res.status(200).json({
		message : "user authorizated"
	});
});




module.exports = router;
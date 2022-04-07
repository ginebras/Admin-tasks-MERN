const Router=require('express').Router();
const AuthController=require('../controller/auth');
const { check } = require('express-validator');
const auth =require('../middlewares/auth');

Router.post('/auth/login',
	[
		check('email','email is required').isEmail(),
		check('password','password is required').isLength({min:6})
	],
	AuthController.authUser);

Router.get('/auth',auth,AuthController.login);

module.exports=Router;
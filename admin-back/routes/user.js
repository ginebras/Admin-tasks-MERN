const Router=require('express').Router();
const UserController=require('../controller/user');
const { check } = require('express-validator');

Router.post('/user/post',
	[
		check('name','name is required').not().isEmpty(),
		check('email','email is required').isEmail(),
		check('password','password is required').isLength({ min : 6})
	],
	UserController.postUser);

module.exports=Router;
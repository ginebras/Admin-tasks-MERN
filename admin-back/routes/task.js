const Router =require('express').Router();
const TaskController=require('../controller/task');
const Auth= require('../middlewares/auth');
const { check }=require('express-validator');

Router.post('/task',
	[
		check('name','name is required').not().isEmpty(),
	],
	TaskController.postTask);

Router.get('/tasks/:id',Auth,TaskController.getTasks);
Router.put('/task/:id',Auth,TaskController.updateTask);
Router.delete('/task/:id',Auth,TaskController.deleteTask);

module.exports=Router;
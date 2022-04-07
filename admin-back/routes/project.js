const Router=require('express').Router();
const ProjectController=require('../controller/project');
const Auth= require('../middlewares/auth');
const { check }=require('express-validator');

Router.post('/project',Auth,[
		check('name','name is required').not().isEmpty()
	],
	ProjectController.postProject);

Router.get('/projects',Auth,ProjectController.getProjects);
Router.delete('/project/:id',Auth,ProjectController.deleteProject);

module.exports=Router;
const Task=require('../models/task');
const Project=require('../models/project');
const { validationResult }=require('express-validator');

var controller={

	postTask:async function(req,res){
		const errors=validationResult(req.body);
		if(!errors.isEmpty()) return res.status(400).send({errors:errors.array()});

		try{
			let task=new Task(req.body);
			task.save();

			return res.status(200).send({task});
		}catch(error){
			console.log(error);
			return res.status(500).send({error});
		}
	},

	getTasks:async function(req,res){
		try{

			let project=await Project.findById(req.params.id);
			if(!project) return res.status(400).send({msg:'El proyecto no existe'});

			if(project.creator.toString()!==req.user.id) return res.status(401).send({msg:'No autorizado'});

			tasks=await Task.find({project_id:req.params.id});

			return res.status(200).send({tasks});

		}catch(error){
			console.log(error);
			return res.status(500).send({error});
		}
	},

	updateTask:async function(req,res){
		try{

			let task=await Task.findById(req.params.id);
			if(!task) return res.status(400).send({msg:'No existe la tarea'});

			let project=await Project.findById(req.query.project);
			if(!project) return res.status(400).send({msg:'el proyecto no existe'});

			let updatedTask={
				name:req.body.name,
				completed:req.body.completed
			}

			await Task.findByIdAndUpdate(task,updatedTask,{new:true});
			return res.status(200).send({updatedTask});
			

		}catch(error){
			console.log(error);
			return res.status(200).send({error});
		}
	},

	deleteTask:async function(req,res){
		try{

			let task=await Task.findById(req.params.id);
			if(!task) return res.status(400).send({msg:'No existe la tarea'});

			let project=await Project.findById(req.query.project);
			if(!project) return res.status(400).send({msg:'No existe el proyecto'});

			if(project.creator.toString()!==req.user.id) return res.status(401).send({msg:'No autorizado'});

			await Task.findByIdAndRemove(task);
			return res.status(200).send({msg:'tarea eliminada'});

		}catch(error){
			console.log(error);
			return res.status(500).send({error});
		}
	}

}

module.exports=controller;
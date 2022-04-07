const Project=require('../models/project');
const { validationResult }=require('express-validator');

var controller={

	postProject:async function(req,res){

		const errors=validationResult(req.body);
		if(!errors.isEmpty()) return res.status(400).send({errors:errors.array()});

		try{
			let project=new Project(req.body);
			await project.save();

			return res.status(200).send({project});
		}catch(error){
			console.log(error);
			return res.status(500).send({error});
		}
	},

	getProjects:async function(req,res){

		try{
			let projects=await Project.find({creator:req.user.id}).sort({created:-1});

			return res.status(200).send({projects});

		}catch(error){
			console.log(error);
			return res.status(500).send({error});
		}

	},

	deleteProject:async function(req,res){

		let project=await Project.findById(req.params.id);
		if(!project) return res.status(404).send({msg:'No existe el proyecto'});

		if(project.creator.toString()!==req.user.id) return res.status(401).send({msg:'No autorizado'})

		try{
			await Project.findByIdAndRemove(project);

			return res.status(200).send({msg:'Project deleted'});

		}catch(error){
			console.log(error);
			return res.status(500).send({error});
		}
		
	}

}

module.exports=controller;
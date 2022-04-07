const User=require('../models/user');
const bcryptjs=require('bcryptjs');
const { validationResult }=require('express-validator');
const jwt=require('jsonwebtoken');

var controller={

	authUser:async function(req,res){
		const errors=validationResult(req);

		if(!errors.isEmpty()) return res.status(400).send({ errors: errors.array() });

		const { email,password }=req.body;

		var user=await User.findOne({email});
		if(!user) return res.status(400).send({msg:'email incorrect'});

		var comparedPassword=await bcryptjs.compare(password,user.password);
		if(!comparedPassword) return res.status(400).send({msg:'password incorrect'});

		const secret='secretword';

		const payload={
			user:{
				id:user.id
			}
		}

		jwt.sign(payload,secret,{
			expiresIn:3600
		},(error,token)=>{
			if(error) throw error;

			return res.status(200).send({token});
		})
	},

	login:async function(req,res){

		try{
			let user=await User.findById(req.user.id);
			return res.status(200).send({user});
		}catch(error){
			return res.status(500).send({error});
		}
	}

}

module.exports=controller;
const User=require('../models/user');
const bcryptjs=require('bcryptjs');
const { validationResult }=require('express-validator');
const jwt=require('jsonwebtoken');

var controller={

	postUser:async function(req,res){

		const errors=validationResult(req);

		if(!errors.isEmpty()) return res.status(400).send({errors:errors.array()});

		const { email, password }= req.body; 

		try{
			let user=await User.findOne({ email }); 
	 
			if(user) return res.status(400).send({msg:'Email already in use '});

			user=new User(req.body);
			user.password=await bcryptjs.hash(password,10);

			await user.save();


			const payload={
				user:{
					id:user.id
				}
			}

			const secret=process.env.SECRET || 'secretword';

			jwt.sign(payload,secret,{
				expiresIn:3600
			},(error,token)=>{
				if(error) throw error;

				return res.status(200).send({ token });
			});
		}
		catch(err){
			console.log(err);
			res.status(400).send({message:'Error'});
		}
	}

}

module.exports=controller;
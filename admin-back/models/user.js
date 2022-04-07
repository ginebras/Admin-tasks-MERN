const mongoose=require('mongoose');

const UserSchema=mongoose.Schema({
	name:{
		type:String,
		trim:true,
		required:true
	},
	email:{
		type:String,
		required:true,
		unique:true,
		trim:true
	},
	password:{
		type:String,
		required:true,
		trim:true
	},
	register:{
		type:Date,
		default:Date.now()
	}
}) 

module.exports=mongoose.model('users',UserSchema);
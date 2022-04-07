const mongoose=require('mongoose');

const ProjectMongoose=mongoose.Schema({
	name:{
		type:String,
		trim:true,
		required:true
	},
	creator:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'users'
	},
	created:{
		type:Date,
		default:Date.now()
	}
})

module.exports=mongoose.model('projects',ProjectMongoose);
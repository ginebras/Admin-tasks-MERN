const mongoose=require('mongoose');

const TaskSchema=mongoose.Schema({
	name:{
		type:String,
		required:true,
		trim:true,
	},
	project_id:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'projects'
	},
	completed:{
		type:Boolean,
		default:false
	},
	created:{
		type:Date,
		default:Date.now()
	},
})

module.exports=mongoose.model('tasks',TaskSchema);
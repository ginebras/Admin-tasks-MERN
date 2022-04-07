const app=require('./app');
const mongoose=require('mongoose');

mongoose.Promise=global.Promise;

mongoose.connect('mongodb://localhost:27017/administrador',{useNewUrlParser:true,useUnifiedTopology:true})
	.then(()=>{
		console.log('Conexion a base de datos realizada');

		app.listen(4000,'0.0.0.0',()=>{
			console.log('Servidor arriba');
		});

	}).catch(error=>console.log(error));

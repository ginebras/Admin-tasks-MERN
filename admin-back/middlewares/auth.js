const jwt=require('jsonwebtoken');

const secret='secretword';

const authtorize=(req,res,next)=>{
	const token=req.header('x-auth-token');
	if(!token) return res.status(401).send({msg:'No existe la token'});

	try{
		const encryption=jwt.verify(token,secret);
		req.user=encryption.user;
		next();

	}catch(error){
		return res.status(401).send({msg:'Token no válido'});
	}
}

module.exports=authtorize;
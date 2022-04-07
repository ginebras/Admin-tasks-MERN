import React,{ useState, useContext,useEffect } from 'react';
import { Link } from 'react-router-dom';
import  AlertContext  from '../../context/alerts/alertContext';
import AuthContext from '../../context/auth/authContext';

const Login=props=>{

	const context=useContext(AlertContext);
	const {showAlert, alert}=context;

	const authContext=useContext(AuthContext);
	const { msg,login,authenticated }=authContext;

	useEffect(()=>{

		if(authenticated) window.location.href="/projects";

		if(msg) showAlert(msg.msg,msg.category);

	},[msg,authenticated,props.history])

	const [usuario,guardarUsuario] = useState({
		email:'',
		password:''
	});

	var {email,password}=usuario;

	const handleChange=e=>{
		guardarUsuario({
			...usuario,
			[e.target.name]:e.target.value
		});
	}

	const handleSubmit=e=>{
		e.preventDefault();

		if(email.trim()===''|| password.trim() ==='' ){
			showAlert("Los campos son obligatorios","danger");
		}

		login({email,password});
	}

	return(
		<div className="container">
			<h1 className="wcolor">Bienvenido a la página de login</h1>

			{alert ? (
				<div className={`alert alert-${alert.category} col-md-3`} role="alert">
				  {alert.msg}
				</div>
			) : null}

			<form className="form" onSubmit={handleSubmit}>
				<div className="mb-3">
				  <label htmlFor="email" className="form-label">Correo</label>
				  <input type="email" className="form-control w-25" name="email" id="email" onChange={handleChange} placeholder="Introducir tu correo electrónico"/>
				</div>
				<div className="mb-3">
				  <label htmlFor="password" className="form-label">Contraseña</label>
				  <input type="password" className="form-control w-25" id="password" name="password" onChange={handleChange} placeholder="Introducir tu contraseña"/>
				</div>
				<button className="btn btn-success">Iniciar sesión</button>
			</form>

			<div className="row m-4">
				<p className="wcolor">¿No tienes una cuenta?</p>
				<Link to="/register" className="btn btn-primary col-md-2">Crear cuenta</Link>
			</div>
			
		</div>
	)
}

export default Login;
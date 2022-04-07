import React,{ useEffect,useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import  AlertContext  from '../../context/alerts/alertContext';
import AuthContext from '../../context/auth/authContext';

const Register=props=>{

	const context=useContext(AlertContext);
	const {showAlert, alert}=context;

	const authContext=useContext(AuthContext);
	const { registerUser,msg,authenticated }=authContext;

	useEffect(()=>{

		if(authenticated) window.location.href="/projects";

		if(msg) showAlert(msg.msg,msg.category);

	},[msg,authenticated,props.history]);

	const [usuario,guardarUsuario] = useState({
		name:'',
		email:'',
		password:'',
		verifyPassword:''
	});

	var {name,email,password,verifyPassword}=usuario;

	const onChange=e=>{
		guardarUsuario({
			...usuario,
			[e.target.name]:e.target.value
		});
	}

	const onSubmit=e=>{
		e.preventDefault();

		if(name.trim() ==='' || email.trim() ==='' || password.trim() ==='' || verifyPassword.trim() ===''){
			showAlert("Hay campos vacios", "danger");
			return;
		}

		if(password.length<6){
			showAlert("La contraseña es corta","danger");
			return;
		}

		if(password !==verifyPassword ){
			showAlert("Las contraseñas no son iguales","danger");
			return;
		}

		registerUser({name,email,password,verifyPassword});
	}

	return(
		<div className="container">
			<h1 className="wcolor">Bienvenido a la página de registro</h1>

			{alert ? (
				<div className={`alert alert-${alert.category} col-md-3`} role="alert">
				  {alert.msg}
				</div>
			) : null}

			<form className="form" onSubmit={onSubmit}>
				<div className="mb-3">
				  <label htmlFor="name" className="form-label">Nombre</label>
				  <input type="name" className="form-control w-25" id="name" name="name" value={name} onChange={onChange} placeholder="Introducir tu nombre"/>
				</div>		
				
				<div className="mb-3">
				  <label htmlFor="email" className="form-label">Correo</label>
				  <input type="email" className="form-control w-25" name="email" id="email" value={email} onChange={onChange} placeholder="Introducir tu correo electrónico"/>
				</div>
				
				<div className="mb-3">
				  <label htmlFor="password" className="form-label">Contraseña</label>
				  <input type="password" className="form-control w-25" id="password" name="password" value={password} onChange={onChange} placeholder="Introducir tu contraseña"/>
				</div>
				
				<div className="mb-3">
				  <label htmlFor="verifyPassword" className="form-label">Verificar contraseña</label>
				  <input type="password" className="form-control w-25" id="verifyPassword" name="verifyPassword" value={verifyPassword} onChange={onChange} placeholder="Introducir tu contraseña de nuevo"/>
				</div>
				
				<button className="btn btn-success">Registrarse</button>
			</form>

			<div className="row m-4">
				<p className="wcolor">¿Ya tienes una cuenta?</p>
				<Link to="/login" className="btn btn-primary col-md-2">Iniciar sesión</Link>
			</div>
			
		</div>
	)
}

export default Register;
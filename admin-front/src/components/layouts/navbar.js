import React,{ useContext, useEffect } from 'react';
import {Link} from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

const Navbar=()=>{

	const auth=useContext(AuthContext);
	const { user,authenticatedUser,logout } = auth;

	useEffect(()=>{
		authenticatedUser();
	},[])

	const handleLogout=()=>{
		logout();
	}

	return(
		<>
			<nav className="navbar navbar-expand-lg navbar-light bg-primary bg-gradient">
			  <div className="container-fluid">
			    
			    <div className="collapse navbar-collapse" id="navbarNav">
			      <ul className="navbar-nav">
			      	
			      	{ user? 
				      	(
				      	<>
					      	<li className="nav-item me-5 align-middle ">
					          <span className="nav-link  opacity-100">Hola <strong>{user.name}</strong> </span>
					        </li>
					        <li className="nav-item me-5 align-middle">
					          <Link className="nav-link" to="/">Inicio</Link>
					        </li>
					        <li className="nav-item me-5 align-middle">
					          <Link className="nav-link" to="/projects">Proyectos</Link>
					        </li>
					        <li className="nav-item me-5 align-middle">
					          <Link className="nav-link" to="/" onClick={()=>handleLogout()}>Cerrar Sesión</Link>
					        </li>
				        </>
				        ) 
					: (
						<>
							<li className="nav-item me-5 align-middle">
					          <Link className="nav-link" to="/login">Iniciar sesión</Link>
					        </li>
					        <li className="nav-item me-5 align-middle">
					          <Link className="nav-link" to="/register">Registrarse</Link>
					        </li>
					        <li className="nav-item me-5 align-middle">
					          <Link className="nav-link" to="/">Inicio</Link>
					        </li>
						</>
					) }
			        
			      </ul>
			    </div>
			  
			  </div>
			</nav>
		</>
	)
}

export default Navbar;
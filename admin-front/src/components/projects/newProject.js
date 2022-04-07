import React,{ useState, useContext,useEffect } from 'react';

import projectContext from '../../context/project/contextProject';
import AuthContext from '../../context/auth/authContext';

const NewProject=()=>{

	var context=useContext(projectContext);
	var { newProject,showForm,postProjects,formerror,validateForm } =context;

	const auth= useContext(AuthContext);
	const { user } = auth;

	const [project,setProject]=useState({
		name:'',
		creator:null
	});

	var { name, creator}=project;

	useEffect(()=>{

		if(user){
			setProject({
				...project,
				creator:user._id
			})
		}

	},[user])

	const handleChange=e=>{
		setProject({
			...project,
			[e.target.name]:e.target.value
		});
	}

	const handleSubmit=e=>{
		e.preventDefault();
		
		if(name===''){
			validateForm();
			return;
		} 

		postProjects(project);

	}


	return(
		<>
			<button type="button" className="btn btn-secondary" onClick={showForm}>Nuevo proyecto</button>

			{newProject?

				<form className="form" onSubmit={handleSubmit}>
					<div className="mb-3">
					  <label htmlFor="name" className="form-label">Nombre del poyecto</label>
					  <input type="text" className="form-control w-75" value={name} onChange={handleChange} name="name" id="name" placeholder="Introducir el nombre del proyecto"/>
					</div>
					<button className="btn btn-secondary" type="submit">Agregar proyecto</button>
				</form>

			:null}

			{formerror? 
				<span><strong>El nombre es requerido </strong></span>
				
			:null}			
			
		</>
	)
}

export default NewProject;
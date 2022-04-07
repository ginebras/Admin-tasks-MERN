import React,{ useReducer } from 'react';
import contextReducer from './contextReducer';
import contextProject from './contextProject';

import {
	PROJECT_FORM,
	GET_PROJECTS,
	POST_PROJECTS,
	VALIDATE_FORM,
	ACTUAL_PROJECT,
	DELETE_PROJECT
} from '../../types';

import axiosClient from '../../config/axios';

const ContextState=props=>{

	const initialState={
		projects:[],
		newProject:false,
		formerror:false,
		project:null
	}

	//EJECUTAR LAS ACCIONES
	const [state,dispatch]=useReducer(contextReducer,initialState);

	//FUNCIONES PARA EL CRUD

	//MOSTRAR FORMULARIO
	const showForm=()=>{
		dispatch({
			type:PROJECT_FORM
		})
	}

	//OBTENER PROYECTOS
	const getProjects=async ()=>{
		
		try{

			const projects=await axiosClient.get("https://shrouded-journey-59344.herokuapp.com/api/projects"); 
			console.log(projects);

			dispatch({
				type:GET_PROJECTS,
				payload:projects.data.projects
			})

		}catch(error){
			console.log(error);
		}
	}

	//AGREGAR PROYECTOS
	const postProjects=async project=>{
		
		try{
			const request=await axiosClient.post("https://shrouded-journey-59344.herokuapp.com/api/project",project);
			console.log(request);
			
			dispatch({
				type:POST_PROJECTS,
				payload:request.data.project
			})

		}catch(error){
			console.log(error);
		}
		

	}

	//VALIDAR FORMULARIO
	const validateForm=()=>{
		dispatch({
			type: VALIDATE_FORM, 
		})
	}

	//ELEGIR EL PROYECTO ACTUAL
	const getProject=id=>{
		dispatch({
			type:ACTUAL_PROJECT,
			payload:id
		})
	}

	//ELIMINAR PROYECTO
	const deleteProject=async id=>{

		try{

			const deleted=await axiosClient.delete(`https://shrouded-journey-59344.herokuapp.com/api/project/${id}`);
			console.log(deleted);


			dispatch({
				type:DELETE_PROJECT,
				payload:id
			})

		}catch(error){
			console.log(error);			
		}
	}

	return(
		<contextProject.Provider
			value={{
				projects:state.projects,
				newProject:state.newProject,
				formerror:state.formerror,
				project:state.project,
				showForm,
				getProjects,
				postProjects,
				validateForm,
				getProject,
				deleteProject
			}}
		>
			{props.children}
		</contextProject.Provider>
	)
}

export default ContextState;
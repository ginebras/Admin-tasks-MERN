import React,{ useContext,useEffect } from 'react';
import Project from './project';

import contextProject from '../../context/project/contextProject';

const ProjectList=()=>{
	var context=useContext(contextProject);
	var { projects,getProjects } =context;

	useEffect(()=>{
		getProjects();
	},[])

	if(projects.length===0) return <span>No hay proyectos</span>;

	return(
		<ul className="list-group">
			{projects.map(project=>(
				<Project project={project} key={project._id} />
			))}
		</ul>
	)
}

export default ProjectList;
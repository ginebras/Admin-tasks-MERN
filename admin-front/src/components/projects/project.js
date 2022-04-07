import React,{ useContext } from 'react';
import projectContext from '../../context/project/contextProject';
import TaskContext from '../../context/task/taskContext';

const Project=({project})=>{

	var context=useContext(projectContext);
	var { getProject } =context;

	var taskContext=useContext(TaskContext);
	var { filterTasks }=taskContext;

	const handleGet=id=>{
		getProject(id);
		filterTasks(id);
	}

	return(
		<li className="list-group-item list-group-item-danger" key={project}>
			<button className="btn btn-primary" onClick={()=>handleGet(project._id)}>{project.name}</button>

		</li>
	)
}

export default Project;
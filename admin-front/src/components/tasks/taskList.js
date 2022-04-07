import React,{useContext} from 'react';
import Task from './task';
import projectContext from '../../context/project/contextProject';
import TaskContext from '../../context/task/taskContext';

const TaskList=()=>{

	var context=useContext(projectContext);
	var { project,deleteProject } =context;

	var taskContext=useContext(TaskContext);
	var { actualTasks }=taskContext;


	if(!project) return <h2>Selecciona un proyecto</h2>;

	const actualProject=project[0];

	return(
		<>
			<h1>Proyecto: <strong>{ actualProject.name }</strong> </h1>

			<ul className="list-group mt-3">
					
				{actualTasks.length!==0? 
					
					actualTasks.map(task=>(
						<Task task={task} key={task._id}/>
					))
						
				:<li><span>No hay tareas</span></li>}

				<button className="btn btn-danger" onClick={()=>deleteProject(actualProject._id)}>Eliminar proyecto</button>
			</ul>
		</>
	)
}

export default TaskList;
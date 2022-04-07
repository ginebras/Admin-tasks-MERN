import React,{useContext} from 'react';
import TaskContext from '../../context/task/taskContext';
import contextProject from '../../context/project/contextProject';

const Task=({task})=>{
	var taskContext=useContext(TaskContext);
	var { deleteTask,filterTasks,editTask,updateTask }=taskContext;

	var context=useContext(contextProject);
	var { project } =context;

	const actualProject=project[0];

	const handleDelete=id=>{
		deleteTask(id,actualProject._id);
		filterTasks(actualProject._id);
	}

	const handleCompleted=()=>{
		if(task.completed)
			task.completed=false;
		else
			task.completed=true;

		updateTask(task,actualProject._id);
	}

	const handleEdit=()=>{
		editTask(task);
	}

	return(
		<li className="list-group-item">
			<span>{task.name}</span>

			{task.completed? 
				<button className="badge btn btn-success rounded-pill" onClick={handleCompleted}>Completada</button>
			: 
				<button className="badge btn btn-danger rounded-pill" onClick={handleCompleted} >Incompleta</button>
			}

			
			<button className="btn btn-secondary" onClick={handleEdit} >Editar</button>
			<button className="btn btn-warning" onClick={()=>handleDelete(task._id)}>Eliminar</button>
		

			
		</li>
	)
}

export default Task;
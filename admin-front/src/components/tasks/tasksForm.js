import React,{ useState, useContext,useEffect } from 'react';
import projectContext from '../../context/project/contextProject';
import TaskContext from '../../context/task/taskContext';

const TasksForm=()=>{
	var context=useContext(projectContext);
	var { project } =context;

	var taskContext=useContext(TaskContext);
	var { postTasks,errortask,validateTask,filterTasks,edittask,updateTask }=taskContext;

	const [task,setTask]=useState({
		name:'',
		project_id:null
	})
	const { name,project_id }=task;

	useEffect(()=>{

		if(edittask!==null)
			setTask(edittask);
		else
			setTask({name:''});

	},[edittask])

	if(!project) return null;

	const actualProject=project[0];

	const handleChange=e=>{
		setTask({
			...task,
			[e.target.name]:e.target.value
		})
	}

	const handleSubmit=e=>{
		e.preventDefault();
		
		if(edittask){
			updateTask(task,actualProject._id);
		}else{

			if(name.trim()===''){
				validateTask();
				return;
			}

			task.project_id=actualProject._id;
			task.completed=false;

			console.log(task);
			postTasks(task);

		}
		filterTasks(actualProject._id);
		
		setTask({
			name:''
		})		
	}

	return(
		
		<div className="container w-auto">
			<form className="form" onSubmit={handleSubmit}>
				<div className="mb-3">
				  <label htmlFor="name" className="form-label">Tarea</label>
				  <input type="text" className="form-control w-25" value={name} onChange={handleChange} name="name" id="name" placeholder="Nombre de la tarea"/>
				  
				  {errortask? <span>Nombre de tarea invalida</span>:null}
				</div>

				<button className="btn btn-success" type="submit">{edittask? 'Editar tarea': 'Agregar tarea'}</button>
			</form>
		</div>
		
	)
}

export default TasksForm;
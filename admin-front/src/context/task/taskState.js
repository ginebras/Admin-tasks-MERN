import React, { useReducer } from 'react';
import TaskContext from './taskContext';
import TaskReducer from './taskReducer';

import {
	FILTER_TASKS,
	POST_TASKS,
	VALIDATE_TASK,
	DELETE_TASK,
	EDIT_TASK,
	UPDATE_TASK
} from '../../types';

import axiosClient from '../../config/axios';

const TaskState=props=>{
	const initialState={
		actualTasks:[],
		errortask:false,
		edittask:null
	}

	const [state,dispatch]=useReducer(TaskReducer,initialState);

	const filterTasks=async project=>{
		
		try{
			const request=await axiosClient.get(`https://shrouded-journey-59344.herokuapp.com/api/tasks/${project}`); 
			console.log(request);

			dispatch({
				type:FILTER_TASKS,
				payload:request.data.tasks
			})

		}catch(error){
			console.log(error);
		}
	}

	const postTasks=async task=>{
		
		try{

			const request=await axiosClient.post("https://shrouded-journey-59344.herokuapp.com/api/task",task);
			console.log(request); 

			dispatch({
				type:POST_TASKS,
				payload:task
			})

		}catch(error){
			console.log(error);
		}
	}

	const validateTask=()=>{
		dispatch({
			type:VALIDATE_TASK,
		})
	}

	const deleteTask=async (id,project)=>{

		try{

			const request=await axiosClient.delete(`https://shrouded-journey-59344.herokuapp.com/api/task/${id}`,{ params:{project}});
			console.log(request);

			dispatch({
				type:DELETE_TASK,
				payload:id
			})

		}catch(error){
			console.log(error);
		}
	}

	const updateTask=async (task,project)=>{
		
		try{

			const request=await axiosClient.put(`https://shrouded-journey-59344.herokuapp.com/api/task/${task._id}`,task,{ params:{ project }});
			console.log(request);

			dispatch({
				type:UPDATE_TASK,
				payload:task
			})

		}catch(error){
			console.log(error);
		}

	}

	const editTask=task=>{
		dispatch({
			type:EDIT_TASK,
			payload:task
		})
	}

	return(
		<TaskContext.Provider
			value={{
				actualTasks:state.actualTasks,
				errortask:state.errortask,
				edittask:state.edittask,
				filterTasks,
				postTasks,
				validateTask,
				deleteTask,
				editTask,
				updateTask
			}}
		>
			{props.children}
		</TaskContext.Provider>
	)
}

export default TaskState;
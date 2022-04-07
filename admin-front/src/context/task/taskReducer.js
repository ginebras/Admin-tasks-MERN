import {
	FILTER_TASKS,
	POST_TASKS,
	VALIDATE_TASK,
	DELETE_TASK,
	EDIT_TASK,
	UPDATE_TASK
} from '../../types';

export default (state,action)=>{
	switch(action.type){

		case FILTER_TASKS:
			return {
				...state,
				actualTasks:action.payload
			}

		case POST_TASKS:
			return{
				...state,
				actualTasks:[...state.actualTasks,action.payload],
				errortask:false
			}

		case VALIDATE_TASK:
			return{
				...state,
				errortask:true
			}

		case DELETE_TASK:
			return{
				...state,
				actualTasks:state.actualTasks.filter(task=>task._id!==action.payload),
			}

		case UPDATE_TASK:
			return{
				...state,
				actualTasks:state.actualTasks.map(task=>task._id===action.payload._id ? action.payload: task),
				edittask:null
			}

		case EDIT_TASK:
			return{
				...state,
				edittask:action.payload
			}

		default:
			return state;
	}
}
import {
	PROJECT_FORM,
	GET_PROJECTS,
	POST_PROJECTS,
	VALIDATE_FORM,
	ACTUAL_PROJECT,
	DELETE_PROJECT
} from '../../types';

export default (state,action)=>{
	switch(action.type){
		case PROJECT_FORM:
			return{
				...state,
				newProject:!state.newProject
			}

		case GET_PROJECTS:
			return{
				...state,
				projects:action.payload
			}

		case POST_PROJECTS:
			return{
				...state,
				projects:[...state.projects,action.payload],
				newProject:false,
				formerror:false
			}

		case VALIDATE_FORM:
			return{
				...state,
				formerror:true
			}

		case ACTUAL_PROJECT:
			return{
				...state,
				project:state.projects.filter(project=>project._id===action.payload)
			}

		case DELETE_PROJECT:
			return{
				...state,
				projects:state.projects.filter(project=>project._id!==action.payload),
				project:null
			}
		default:
			return state;
	}
}
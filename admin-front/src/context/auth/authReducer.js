import {
	REGISTER_OK,
	REGISTER_ERROR,
	LOGIN_OK,
	LOGIN_ERROR,
	GET_USER,
	LOGOUT
} from '../../types';

export default (state,action)=>{
	switch(action.type){
		
		case LOGIN_OK:
		case REGISTER_OK:
			localStorage.setItem('token',action.payload.token);
			return{
				...state,
				authenticated:true,
				msg:null
			}

		case LOGOUT:
		case LOGIN_ERROR:
		case REGISTER_ERROR:
			localStorage.removeItem('token');
			return{
				...state,
				token:null,
				user:null,
				authenticated:false,
				msg:action.payload
			}

		case GET_USER:
			return{
				...state,
				user:action.payload
			}

		default:
			return state;
	}
}
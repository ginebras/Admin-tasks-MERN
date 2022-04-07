import  React ,{ useReducer } from 'react';
import AuthContext from './authContext';
import AuthReducer from './authReducer';

import axiosClient from '../../config/axios';
import authToken from '../../config/token';

import {
	REGISTER_OK,
	REGISTER_ERROR,
	LOGIN_OK,
	LOGIN_ERROR,
	GET_USER,
	LOGOUT
} from '../../types';

const AuthState=props=>{
	const initialState={
		token:localStorage.getItem('token'),
		authenticated:false,
		user:null,
		msg:null
	}

	const [state,dispatch]=useReducer(AuthReducer,initialState);

	const registerUser=async data=>{
		try{
			const answer=await axiosClient.post("https://shrouded-journey-59344.herokuapp.com/api/user/post",data);

			dispatch({
				type:REGISTER_OK,
				payload:answer.data
			})

			authenticatedUser();

		}catch(error){
			console.log(error.response.data.msg);
			const alert={
				msg:error.response.data.msg,
				category:"danger"
			}

			dispatch({
				type:REGISTER_ERROR,
				payload:alert
			})
		}
	}

	const authenticatedUser=async ()=>{
		const token=localStorage.getItem('token');

		if(token){
			authToken(token);
		}

		try{
			
			const answer=await axiosClient.get('https://shrouded-journey-59344.herokuapp.com/api/auth')

			dispatch({
				type:GET_USER,
				payload:answer.data.user
			})

		}catch(error){
			dispatch({
				type:LOGIN_ERROR
			})
		}
	} 

	const login=async data=>{
		try{

			let answer=await axiosClient.post('https://shrouded-journey-59344.herokuapp.com/api/auth/login',data);
			
			dispatch({
				type:LOGIN_OK,
				payload:answer.data
			})

			authenticatedUser();
			
		}catch(error){
			console.log(error.response);
			const alert={
				msg:error.response.data.msg,
				category:"danger"
			}

			dispatch({
				type:LOGIN_ERROR,
				payload:alert
			})
		}
	}

	const logout=()=>{
		dispatch({
			type:LOGOUT
		})
	}

	return(
		<AuthContext.Provider
			value={{
				token:state.token,
				authenticated:state.authenticated,
				user:state.user,
				msg:state.msg,
				registerUser,
				login,
				authenticatedUser,
				logout
			}}
		>
			{props.children}
		</AuthContext.Provider>
	)
}

export default AuthState;
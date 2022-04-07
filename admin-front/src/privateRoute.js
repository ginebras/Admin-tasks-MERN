import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import AuthContext from './context/auth/authContext';

const PrivateRoute=({component:Component, ...props})=>{

	const context= useContext(AuthContext);
	const { authenticated }= context;

	return(

		<Route {...props} render={ props => !authenticated ?(
			<Navigate to="/" />
		): (
			<Component {...props}/>
		)} />

	)
}

export default PrivateRoute;
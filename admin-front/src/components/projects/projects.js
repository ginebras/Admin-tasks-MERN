import React,{ useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import '../../index.css';

import TasksForm from '../tasks/tasksForm';
import TaskList from '../tasks/taskList'
import Aside from '../layouts/aside';


import AuthContext from '../../context/auth/authContext';

const Projects=()=>{

	const auth=useContext(AuthContext);
	const { authenticated,authenticatedUser } = auth;

	useEffect(()=>{
		
		authenticatedUser();

	},[])

	return(
		<div>
			<Aside/>
		
			<div className="container">
				<main>
					<TasksForm />
					
					<div className="container">
						<TaskList />
					</div>
				
				</main>
			</div>
			
		</div>
	)
}

export default Projects;
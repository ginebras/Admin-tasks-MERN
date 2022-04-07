import React from 'react';
import '../../index.css';
import NewProject from '../projects/newProject';
import ProjectList from '../projects/projectList';

const Aside=()=>{
	return(
		<>
			<aside className="aside bg-danger bg-gradient">
				<div className="container">
					<h1>MERN<span>Tareas</span></h1>

					<NewProject />

					<div className="mt-4">
						<h4>Tus proyectos</h4>
						
						<ProjectList />

					</div>
				</div>
			</aside>
		</>
	)
}

export default Aside;
import React from 'react';
import {BrowserRouter, Route,Routes} from 'react-router-dom';

//COMPONENTS
import Login from './components/auth/login';
import Register from './components/auth/register';
import Projects from './components/projects/projects';
import Navbar from './components/layouts/navbar';
import Footer from './components/layouts/footer';
import Home from './components/layouts/home';

//HOOKS
import ContextState from './context/project/contextState';
import TaskState from './context/task/taskState';
import AlertState from './context/alerts/alertState';
import AuthState from './context/auth/authState';

import authToken from './config/token';
import PrivateRoute from './privateRoute';

function App() {

 const token=localStorage.getItem('token'); 
 if(token) authToken(token);

  return (
    <ContextState>
      <TaskState>
        <AlertState>
          <AuthState>
            <BrowserRouter>
                <Navbar/>

                <Routes>
                  <Route exact path="/" element={<Home/>} />
                  <Route exact path="/register" element={<Register/>} />
                  <Route exact path="/login" element={<Login/>} />
                  <Route exact path="/projects" element={<Projects/> }  />
                </Routes>
                
                <Footer />
            
            </BrowserRouter>
          </AuthState>
        </AlertState>
      </TaskState>
    </ContextState>
  );
}

export default App;

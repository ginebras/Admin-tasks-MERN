const express=require('express');
const app=express();
const morgan=require('morgan');
const cors=require('cors');
const dotenv=require('dotenv');

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));

const userRoutes=require('./routes/user');
const authRoutes=require('./routes/auth');
const projectRoutes=require('./routes/project');
const taskRoutes=require('./routes/task');

app.use('/api/',userRoutes);
app.use('/api/',authRoutes);
app.use('/api/',projectRoutes);
app.use('/api/',taskRoutes);

module.exports =app;
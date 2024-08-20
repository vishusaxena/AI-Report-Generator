const express=require('express');
const path = require('path');

const reportRoutes = require('./routes/reportRoutes');
const cors=require('cors');
const app=express();
require('dotenv').config();
app.use(express.json());
app.use(cors());
app.use('/api/reports', reportRoutes);
app.use('/reports', express.static(path.join(__dirname, 'reports')));


app.listen(process.env.PORT,()=>{
    console.log(`server started at`,process.env.PORT);
})
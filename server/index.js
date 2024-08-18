const express=require('express');
const reportRoutes = require('./routes/reportRoutes');

const app=express();
require('dotenv').config();
app.use(express.json());

app.use('/api/reports', reportRoutes);


app.listen(process.env.PORT,()=>{
    console.log(`server started at`,process.env.PORT);
})
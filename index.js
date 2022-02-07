const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors')
const path = require('path');
require('dotenv').config()
const app=express()
const PORT=process.env.PORT || 8000;
app.listen(PORT,()=>console.log(`Server running on port ${8000}`))

//db connection
mongoose.connect(process.env.MONGODB_URI,()=>console.log("Connected to database"))
///middlewares
app.use(cors())
app.use(express.json())

//routes
//-----------------//
//route -> /
app.get('/',(req,res)=>res.sendFile(path.join(__dirname+'/static/index.html')))
//router -> /signup
const SignUpRouter=require('./routes/Signup.router')
app.use('/signup',SignUpRouter)
//router -> /login
const LoginRouter=require('./routes/Login.router')
app.use('/login',LoginRouter)
//router -> /fetch
const FetchRouter=require('./routes/Fetch.router')
app.use('/fetch',FetchRouter)

const express=require("express");
const app=express();
const cors=require("cors")
const errorMiddleware=require("./middlewares/errorMiddleware");
const UserRoutes=require("./routes/UserRoute");
const AdminRoute=require("./routes/AdminRoute")
const cookieParser = require('cookie-parser')
const path=require('path')

app.use(cookieParser());
app.use('/uploads',express.static(__dirname+'/uploads'));
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173', // Replace with your React app's URL
  credentials: true
}));
  
app.get('/test',(req,res)=>{
    res.json("Test Ok");
})

app.use("/auth",UserRoutes);

app.use('/admin',AdminRoute);

app.use(errorMiddleware)

module.exports=app

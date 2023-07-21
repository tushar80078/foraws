const mongoose=require("mongoose");
const {Schema}=require('mongoose');

const adminUserSchema=new Schema({

    email:{
        type:String,
        require:true,
        unique:true
    },

    password:{
        type:String,
        require:true,
    },

})

const ADMINUSERSCHEMA=mongoose.model('AdminUserSchema',adminUserSchema);

module.exports=ADMINUSERSCHEMA;
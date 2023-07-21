const mongoose=require("mongoose");
const {Schema}=require('mongoose');

const userSchema=new Schema({

    name:{
        type:String,
        require:true
    },

    email:{
        type:String,
        require:true,
        unique:true
    },

    password:{
        type:String,
        require:true,
    }

})

const USERSCHEMA=mongoose.model('AirNBUsers',userSchema);

module.exports=USERSCHEMA;
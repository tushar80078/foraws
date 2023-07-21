const mongoose=require("mongoose");
const {Schema}=require('mongoose');

const airNbRequested=new Schema({

    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },

    title:{
        type:String,
        require:true
    },

    address:{
        type:String
    },

    photos:{
        type:[String]
    },

    discirption:{
        type:String
    },

    perks:{
        type:[String]
    },

    extraInfo:{
        type:String
    },

    checkIn:{
        type:String
    },

    checkOut:{
        type:String
    },

    maxGuests:{
        type:Number
    },
    price:{
        type:Number
    }

})

const REQUESTEDPLACE=mongoose.model('requestedplace',airNbRequested);

module.exports=REQUESTEDPLACE;
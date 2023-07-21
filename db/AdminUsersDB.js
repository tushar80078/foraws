const AdminUser=require("./Schemas/AdminUsers");
const AirNBUsers=require('./Schemas/AirNBUser');
const AirNBPlaces=require("./Schemas/AirNBPlaces");
const  RejectedPlaces = require("./Schemas/RejectedPlaces");

const createUser=(userData)=>{
    return new Promise((res,rej)=>{
        
        AdminUser.findOne({email:userData.email}).then(data=>{
            if(data)
            {
                rej("User Already Exist With Given Email-ID Please Enter Another One")
            }else{
                const user=new AdminUser(userData);
                res(user.save());
            }
        }).catch(err=>rej(err));

    })
}

const getUserByUserId=(userId)=>{
    return AdminUser.findOne({_id:userId});
}

const getAllAirNBUsers=()=>{
    return AirNBUsers.find();
}

const getAllPlaces=()=>{
    return AirNBPlaces.find();
}

const getPlacesByUserId=(id)=>{
    return AirNBPlaces.find({owner:id})
}

const deleteUserById=(id)=>{
    return AirNBUsers.deleteOne({_id:id})
}


module.exports={
    createUser,
    getUserByUserId,
    getAllAirNBUsers,
    getAllPlaces,
    getPlacesByUserId,
    deleteUserById
}
const AirNBUsers=require("./Schemas/AirNBUser")

//Insert User Data
const createUser=(userData)=>{
    return new Promise((res,rej)=>{
        
        AirNBUsers.findOne({email:userData.email}).then(data=>{
            if(data)
            {
                rej("User Already Exist With Given Email-ID Please Enter Another One")
            }else{
                const user=new AirNBUsers(userData);
                res(user.save());
            }
        }).catch(err=>rej(err));

    })
}

const getUserByUserEmailId=(userId)=>{
    return AirNBUsers.findOne({email:userId});
}

const getUserByUserId=(userId)=>{
    return AirNBUsers.findOne({_id:userId});
}


module.exports={
    createUser,
    getUserByUserEmailId,
    getUserByUserId
}
const RejectedPlace=require("./Schemas/RejectedPlaces");
const AirNBPlaces=require("./Schemas/AirNBPlaces")

const addRejectedPlace=async(data)=>{
    RejectedPlace.create(data).then(resData=>{
         AirNBPlaces.deleteOne({_id:data.rejectedPlace._id}).then(newData=>{
            return newData;
         })
    });
}

const getAllRejectedPlace=()=>{
    return RejectedPlace.find();
}

const deleteRejectedPlace=(id)=>{
    return RejectedPlace.deleteOne({_id:id});
}

const getRejectedPlaesByUserId=(ownerId)=>{
    return RejectedPlace.find({'rejectedPlace.owner': ownerId })
}
module.exports={
    addRejectedPlace,
    getAllRejectedPlace,
    deleteRejectedPlace,
    getRejectedPlaesByUserId
}

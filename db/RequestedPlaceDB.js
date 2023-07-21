const ReqPlace=require("./Schemas/RequestedPlace")

//Insert ReqPlace Data

const enterReqPalceData=(placeData)=>{
    return new Promise((res,rej)=>{
        
        ReqPlace.findOne({title:placeData.title}).then(data=>{
            if(data)
            {
            
                rej("Place Already Exists With Given Title. Please Check It.")
            }else{
                const place=new ReqPlace(placeData);
                res(place.save());
            }
        }).catch(err=>rej(err));

    })
}

const getReqPlaceByUserId=(id)=>{
    return ReqPlace.find({owner:id});
}

const getPlaceById=(id)=>{
    return ReqPlace.findOne({_id:id});
}

const updatePlaceById=(userData)=>{
    return new Promise((res,rej)=>{
        const places =  ReqPlace.findByIdAndUpdate(
            userData.id,
            userData,
            { new: true }
        )

        if (!places) {
            rej('Place not found');
        }else{
            res(places);
        }
    })
}

const getReqAllPlaces=()=>{
    return ReqPlace.find();
}

const deleteReqPlace=(id)=>{
    return ReqPlace.deleteOne({_id:id});
}


module.exports={

    enterReqPalceData,
    getPlaceById,
    getPlaceById,
    updatePlaceById,
    getReqPlaceByUserId,
    getReqAllPlaces,
    deleteReqPlace
}
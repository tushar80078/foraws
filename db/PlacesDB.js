const AirNBPlaces=require("./Schemas/AirNBPlaces")

//Insert AirNBPlaces Data

const enterPalceData=(placeData)=>{
    return new Promise((res,rej)=>{
        
        AirNBPlaces.findOne({title:placeData.title}).then(data=>{
            if(data)
            {
                rej("Place Already Exists With Given Title. Please Check It.")
            }else{
                const place=new AirNBPlaces(placeData);
                res(place.save());
            }
        }).catch(err=>rej(err));

    })
}

const getPlaceByUserId=(id)=>{
    return AirNBPlaces.find({owner:id});
}

const getPlaceById=(id)=>{
    return AirNBPlaces.findOne({_id:id});
}

const updatePlaceById=(userData)=>{
    return new Promise((res,rej)=>{
        const places =  AirNBPlaces.findByIdAndUpdate(
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

const getAllPlaces=()=>{
    return AirNBPlaces.find();
}

module.exports={

    enterPalceData,
    getPlaceByUserId,
    getPlaceById,
    getPlaceById,
    updatePlaceById,
    getAllPlaces
}
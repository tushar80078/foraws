const { createUser, getUserByUserId, getAllAirNBUsers, getAllPlaces,
    getPlacesByUserId,deleteUserById } = require("../db/AdminUsersDB")
const {addRejectedPlace,getAllRejectedPlace,deleteRejectedPlace}=require('../db/RejectedPlacesDB');
const {enterPalceData}=require("../db/PlacesDB");
const {getReqAllPlaces,deleteReqPlace}=require("../db/RequestedPlaceDB")


const jwt = require('jsonwebtoken');



const createUserController=(req,res,next)=>{
    const userData = req.body;

    createUser(userData)
        .then(response => {
            res.json({
                status: "Success",
                message: "User Created"
            });
        })
        .catch(err => next(err));
}

const signInUserController = (req, res, next) => {

    let token = jwt.sign({ email: req.body.email, id: req.body.data._id }, process.env.JWTKEY);
    let newData = { ...req.body.data._doc, "token": token };

    res.cookie('admintoken', token).json({
        status: "Success",
        data: newData,
        message: "User Logged In"
    });
};

const getProfileController = (req, res, next) => {
    const { admintoken } = req.cookies;

    if (admintoken) {
        jwt.verify(admintoken, process.env.JWTKEY, {}, (err, tokenData) => {
            if (err) throw next(err);

            getUserByUserId(tokenData._id).then(resData => {
                res.json({
                    resData
                });
            })
        });
    } else {
        res.json(null);
    }

};

const logoutUserController=(req,res,next)=>{
    res.cookie('admintoken','').json(true);
}


const getAllUsersController=(req,res,next)=>{
    getAllAirNBUsers().then(resData=>{
        res.json(resData)
    }).catch(err=>{
        next(err);
    })
}

const getAllPlacesController=(req,res,next)=>{
    getAllPlaces().then(resData=>{
        res.json(resData)
    }).catch(err=>{
        next(err);
    })
}

const getPlacesByUserIdController=(req,res,next)=>{
    getPlacesByUserId(req.params.id).then(resData=>{
        res.json(resData)
    }).catch(err=>{
        next(err);
    })
}

const addRejectedPlacesController=(req,res,next)=>{

    const reqBodyRej=req.body.rejectedPlace;

    const data={
        rejectedMessage:req.body.rejectedMessage,
        rejectedPlace :{
            _id:reqBodyRej._id,
            owner:reqBodyRej.owner,
            title:reqBodyRej.title,
            address:reqBodyRej.address,
            photos:reqBodyRej.photos,
            description:reqBodyRej.discirption,
            perks:reqBodyRej.perks,
            extraInfo:reqBodyRej.extraInfo,
            checkIn:reqBodyRej.checkIn,
            checkOut:reqBodyRej.checkOut,
            maxGuests:reqBodyRej.maxGuests,
            price:reqBodyRej.price
        }
    };
    

    res.json(data);

    addRejectedPlace(data).then((data)=>{
        res.json(data)
    }).catch(err=>{
        next(err);
    })
}

const deleteUserByIdController=(req,res,next)=>{
  
    deleteUserById(req.body.id).then(data=>{
        res.json(data)
    }).catch(err=>{
        next(err);
    })
}

const getAllRejectedPlacesController=(req,res,next)=>{
    getAllRejectedPlace().then(data=>{
        res.json(data);
    }).catch(err=>{
        next(err);
    })
}

const deleteRejectedPlacesController=(req,res,next)=>{
   
    deleteRejectedPlace(req.params.id).then(data=>{
        res.json(data);
    }).catch(err=>{
        next(err);
    })
}

const addAirNBRejectedPlaceController=(req,res,next)=>
{
    let data=req.body.rejectedPlace;
    data={...data,discirption:data.description};
    
    enterPalceData(data).then(data=>{
        deleteRejectedPlace(req.body._id).then(data=>{
            res.json(data);
        }).catch(err=>{
            next(err);
        })
    }).catch(err=>{
        next(err);
    })

   
}

const addReqRejectedDataController=(req,res,next)=>
{

    let data=req.body.rejectedPlace;
   
    data={...data,description:data.discirption};
    
    req.body.rejectedPlace=data;
 

    addRejectedPlace(req.body).then(data=>{
        
        deleteReqPlace(req.body.rejectedPlace._id).then(data=>{
            res.json(data);
        }).catch(err=>{
            next(err);
        })
    }).catch(err=>{
        next(err);
    })

   
}

const getAllApprovedPlaces=(req,res,next)=>{
    getAllPlaces().then(data=>{
        res.json(data)
    }).catch(err=>{
        next(err);
    })
}

const getAllReqPlacesController=(req,res,next)=>{
    getReqAllPlaces().then(data=>{
        res.json(data);
    }).catch(err=>{
        next(err);
    })
}

const approveRequestController=(req,res,next)=>{
    
    enterPalceData(req.body).then(data=>{
        deleteReqPlace(req.body._id).then(nData=>{
            res.json(nData);
        })
    }).catch(err=>{
        next(err);
    })    


}


module.exports={
    createUserController,
    signInUserController,
    getProfileController,
    logoutUserController,
    getAllUsersController,
    getAllPlacesController,
    getPlacesByUserIdController,
    addRejectedPlacesController,
    deleteUserByIdController,
    getAllRejectedPlacesController,
    deleteRejectedPlacesController,
    addAirNBRejectedPlaceController,
    getAllReqPlacesController,
    addReqRejectedDataController,
    approveRequestController
}
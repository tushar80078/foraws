const { createUser, getUserByUserId } = require("../db/UserDB")
const {getAllPlaces,updatePlaceById,getPlaceByUserId,enterPalceData,getPlaceById}=require("../db/PlacesDB");
const {enterReqPalceData,getReqPlaceByUserId,getReqAllPlaces}=require("../db/RequestedPlaceDB")
const {getRejectedPlaesByUserId}=require("../db/RejectedPlacesDB")
const {enterBookings,getAllBookingsByUserId}=require("../db/BookingsDB")
const jwt = require('jsonwebtoken');
const imageDownloader=require('image-downloader')
const pathVar = require('path');
const fs=require("fs")

const createUserController = (req, res, next) => {
    const userData = req.body;

    createUser(userData)
        .then(response => {
            res.json({
                status: "Success",
                message: "User Created"
            });
        })
        .catch(err => next(err));
};

const signInUser = (req, res, next) => {

    let token = jwt.sign({ email: req.body.email, id: req.body.data._id }, process.env.JWTKEY);
    let newData = { ...req.body.data._doc, "token": token };

    res.cookie('token', token).json({
        status: "Success",
        data: newData,
        message: "User Logged In"
    });
};

const getProfile = (req, res, next) => {
    const { token } = req.cookies;

    if (token) {
        jwt.verify(token, process.env.JWTKEY, {}, (err, tokenData) => {
            if (err) throw next(err);

            getUserByUserId(tokenData.id).then(resData => {
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
    res.cookie('token','').json(true);
}

const uploadByLinkController=async(req,res,next)=>{
    const {link}=req.body;

    const dirName=pathVar.resolve(__dirname,'..')
    const newName = 'photo' + Date.now() + '.jpg'

    await imageDownloader.image({
        url: link,
        dest: dirName +'/uploads/'+newName
    });

    res.json(newName)
}


const uploadFilesController=(req,res,next)=>{
    
    const uploadedFiles = [];
    for (let i = 0; i < req.files.length; i++) {
      const { path, originalname } = req.files[i];
      const parts = originalname.split('.');
      const ext = parts[parts.length - 1];
      const newPath = path + '.' + ext;
    
      fs.renameSync(path, newPath);
    
      const fileName =  pathVar.basename(newPath);
      uploadedFiles.push(fileName);
    }
    res.json(uploadedFiles);

}

const createPlaceData=(req,res,next)=>{
    const { token } = req.cookies;

    jwt.verify(token, process.env.JWTKEY, {}, (err, tokenData) => {
        if (err) throw next(err);
        
        req.body.owner=tokenData.id;
       
        enterReqPalceData(req.body).then(data=>{
        res.json(data)
       }).catch(err=>{
        next(err);
       });
        
    });
}

const addReqDataController=(req,res,next)=>{
    const { token } = req.cookies;

    jwt.verify(token, process.env.JWTKEY, {}, (err, tokenData) => {
        if (err) throw next(err);
        
        req.body.owner=tokenData.id;
       
        enterReqPalceData(req.body).then(data=>{
        res.json(data)
       }).catch(err=>{
        next(err);
       });
        
    });
}

const getAllPlacesForUser=(req,res,next)=>{
    const { token } = req.cookies;

    jwt.verify(token, process.env.JWTKEY, {}, (err, tokenData) => {
        if (err) throw next(err);
      
        const {id}=tokenData;

        getPlaceByUserId(id).then(data=>{
            res.json(data)
        }).catch(err=>{
            next(err);
        })
    });
}



const getPlaceByIdController=(req,res,next)=>{
    getPlaceById(req.params.id).then(data=>{
        res.json(data);
    }).catch(err=>{
        next(err);
    })
}

const updatePlaceDataController=(req,res,next)=>{

    const { token } = req.cookies;

    jwt.verify(token, process.env.JWTKEY, {}, (err, tokenData) => {
        if (err) throw next(err);
        updatePlaceById(req.body).then(response=>{
            res.json(response)
        }).catch(err=>{
            next(err);
        })
    });
}

const getAllplacesController=(req,res,next)=>{
    getAllPlaces().then(data=>{
        res.json(data);
    }).catch(err=>{
        next(err);
    })
} 

const bookingsController=(req,res,next)=>{
    const data = req.body;

    const { token } = req.cookies;

    jwt.verify(token, process.env.JWTKEY, {}, (err, tokenData) => {
        if (err) throw next(err);
        data.user=tokenData.id;
        enterBookings(data).then(data=>{
            res.json(data);
        }).catch(err=>{
            next(err)
        })
    
    });
    
}

const getAllBookings=(req,res,next)=>{
    
    const { token } = req.cookies;

    jwt.verify(token, process.env.JWTKEY, {}, (err, tokenData) => {
        if (err) throw next(err);
        
        getAllBookingsByUserId(tokenData.id).then(resData=>{
            res.json(resData);
        }).catch(err=>next(err))    
    });
}


const getReqPlacesController=(req,res,next)=>{
    const { token } = req.cookies;

    jwt.verify(token, process.env.JWTKEY, {}, (err, tokenData) => {
        if (err) throw next(err);
      
        const {id}=tokenData;

        getReqPlaceByUserId(id).then(data=>{
            res.json(data)
        }).catch(err=>{
            next(err);
        })
    });
}

const getRejectedPlacesByOwnerIdController=(req,res,next)=>{
    const { token } = req.cookies;

    if (token) {
        jwt.verify(token, process.env.JWTKEY, {}, (err, tokenData) => {
            if (err) throw next(err);

            getRejectedPlaesByUserId(tokenData.id).then(data => {
                res.json(data);
            }).catch(err=>{
                next(err);
            })
        })

    } else {
        res.json(null);
    }
}

module.exports = {
    createUserController,
    signInUser,
    getProfile,
    logoutUserController,
    uploadByLinkController,
    uploadFilesController,
    createPlaceData,
    getAllPlacesForUser,
    getPlaceByIdController,
    updatePlaceDataController,
    getAllplacesController,
    bookingsController,
    getAllBookings,
    getReqPlacesController,
    addReqDataController,
    getRejectedPlacesByOwnerIdController
};
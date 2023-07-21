const express=require("express");
const router=express.Router();
const {updatePlaceDataController,createUserController,signInUser,getProfile,
    logoutUserController,uploadByLinkController,uploadFilesController,
    createPlaceData,getAllPlacesForUser,getPlaceByIdController,
    getAllplacesController,bookingsController,
    getAllBookings,getReqPlacesController,addReqDataController,getRejectedPlacesByOwnerIdController}=require('../controllers/UserController');
const encryptPasswordMiddlewar = require("../middlewares/encryptPassword");
const checkPasswordMiddleware=require("../middlewares/checkPassword");
const multer = require("multer");

router.post("/create",encryptPasswordMiddlewar,createUserController);

router.post("/login",checkPasswordMiddleware,signInUser);

router.post("/register",encryptPasswordMiddlewar,createUserController)

router.get("/profile",getProfile)

router.post("/logout",logoutUserController)

router.post('/upload-by-link',uploadByLinkController)

const photoMiddleware=multer({dest:'uploads'})
router.post('/upload',photoMiddleware.array('photos',100),uploadFilesController)

router.post('/places',addReqDataController)

router.get('/places',getAllPlacesForUser)

router.get('/places/:id',getPlaceByIdController)

router.put('/places',updatePlaceDataController)

router.get("/all-places",getAllplacesController);

router.post('/booking',bookingsController)

router.get('/bookings',getAllBookings)

router.get("/req-places",getReqPlacesController)

router.get("/rej-places",getRejectedPlacesByOwnerIdController)

module.exports=router
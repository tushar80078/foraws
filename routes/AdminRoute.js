const express=require("express");
const router=express.Router();
const {createUserController,signInUserController,getProfileController,logoutUserController,
    getAllUsersController, getAllPlacesController, getPlacesByUserIdController,
    addRejectedPlacesController,deleteUserByIdController,getAllRejectedPlacesController,
    deleteRejectedPlacesController,addAirNBRejectedPlaceController,getAllReqPlacesController,
    addReqRejectedDataController,approveRequestController}=require('../controllers/AdminUserController')
const encryptPasswordMiddlewar = require("../middlewares/encryptPassword");
const checkPasswordMiddleware=require("../middlewares/checkPassword");

router.post("/register",encryptPasswordMiddlewar,createUserController);

router.post("/login",checkPasswordMiddleware,signInUserController);

router.get("/profile",getProfileController);

router.post("/logout",logoutUserController);

router.get('/getallusers',getAllUsersController);

router.get('/getallplaces',getAllPlacesController);

router.get("/getplacesforuser/:id",getPlacesByUserIdController);

router.post("/addrejectplace",addRejectedPlacesController);

router.post("/deleteuser",deleteUserByIdController);

router.get("/getrejectedplaces",getAllRejectedPlacesController);

router.delete("/deleterejected/:id",deleteRejectedPlacesController);

router.post("/addplacerejected",addAirNBRejectedPlaceController)

router.get("/reqplaces",getAllReqPlacesController);

router.post("/addreqrejplaces",addReqRejectedDataController);

router.post("/approve",approveRequestController)



module.exports=router
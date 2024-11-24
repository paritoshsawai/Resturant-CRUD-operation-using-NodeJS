const express = require("express");
const { getuserController, updateuserController, resetPasswordController, updatePasswordController, deleteUserController } = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const { route } = require("./testroutes");

const router = express.Router();

//Routes
//GET User || GET
router.get("/getuser", authMiddleware, getuserController);

//Update profile || 
router.put("/updateUser", authMiddleware, updateuserController);

//reset Password
router.post("/resetPassword", authMiddleware, resetPasswordController);

//Password update
router.post("/updatePassword", authMiddleware, updatePasswordController );

//Delete User
router.delete("/deleteUser/:id", authMiddleware, deleteUserController);

//

module.exports = router;
const express = require("express");

const authMiddleware = require("../middlewares/authMiddleware");
const { createFoodController, getALlFoodController, getFoodByIdController, updateFoodController, deleteFoodController, placeorderController, orderStatusController } = require("../controllers/foodController");
const adminmiddleare = require("../middlewares/adminmiddleare");



const router = express.Router();

//Routes
//Create
router.post("/create", authMiddleware, createFoodController)

//Get all food
router.get("/getAll", getALlFoodController)

//Get food by ID
router.get("/get/:id", getFoodByIdController)

//Update food
router.put("/update/:id", authMiddleware,updateFoodController)

//Delete food
router.delete("/delete/:id", authMiddleware,deleteFoodController)

//Order
router.post("/placeOrder", authMiddleware, placeorderController)

//order status
router.post("/orderStatus/:id",authMiddleware, adminmiddleare , orderStatusController)

module.exports = router;
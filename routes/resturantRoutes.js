const express = require("express");

const authMiddleware = require("../middlewares/authMiddleware");
const { createResturentController, getAllReturantController, getReturantbyIdController, deleteResturantController } = require("../controllers/resturantController");


const router = express.Router();

//Routes
//Create Resturant
router.post("/create",authMiddleware, createResturentController);

//Get All
router.get("/getAll",getAllReturantController )

//Get by id
router.get("/get/:id",getReturantbyIdController )

//Delete resturant
router.delete("/delete/:id", authMiddleware, deleteResturantController)

module.exports = router;
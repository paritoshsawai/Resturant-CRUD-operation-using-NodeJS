const express = require("express");

const authMiddleware = require("../middlewares/authMiddleware");
const { createCatController, getAllCatController, updateCatController, deleteCatController } = require("../controllers/categoryController");


const router = express.Router();

//Routes
//Create
router.post("/create", authMiddleware, createCatController);

//Get al Category
router.get("/getAll", getAllCatController);

//UpdateCat
router.put("/update/:id", authMiddleware,updateCatController)

//Delete cat
router.delete("/delete/:id", authMiddleware, deleteCatController)

module.exports = router;
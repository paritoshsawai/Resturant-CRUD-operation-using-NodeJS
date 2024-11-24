//create

const categoryModel = require("../models/categoryModel");

const createCatController = async(req, res) => {
    try{
        const {title, imgUrl} = req.body
        //validation
        if(!title || !imgUrl){
            return res.status(500).send({
                success: false,
                message: "Please provide category title or Image"
            });
        }
        const newCategory = new categoryModel({title,imgUrl})
        await newCategory.save();
        res.status(200).send({
            success: true,
            message: "New category Created! ",
            newCategory
        });
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in Create Category API",
            error
        });
    }
};

//Get all Category
const getAllCatController =async(req,res) => {
    try{
        const categories = await categoryModel.find({})
        if(!categories){
          return res.status(404).send({
            success:false,
            message: "No category Found"
          })  
        }
        res.status(200).send({
            success:true,
            message:"Categories found successsfully",
            totalCat: categories.length,
            categories
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in Get all Category API",
            error
        });
    }
};

//Update Cat
const updateCatController =async(req,res) => {
    try{
        const {id} = req.params
        const {title, imgUrl} = req.body
        const updatedCategory = await categoryModel.findByIdAndUpdate(id,{title,imgUrl},{new:true});
        if(!updatedCategory){
            return res.status(404).send({
                success:false,
                message: "No category Found"
              })  
        }
        res.status(200).send({
            success:true,
            message: "Upate Successfully"
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in Updaete Category API",
            error
        });
    }
    
};

//Delete Cat
const deleteCatController = async(req,res) => {
    try{
        const {id} = req.params
        if(!id){
            return res.status(404).send({
                success:false,
                message: "No category id Found"
              })  
        }
        const category = await categoryModel.findById(id)
        if(!category){
            return res.status(404).send({
                success:false,
                message: "No category Found with this id"
              })  
        }
        await categoryModel.findByIdAndDelete(id)
        res.status(200).send({
            success: true,
            message: "CAtegory Deleted Successfully",
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in delete Category API",
            error
        });
    }
};





module.exports = {createCatController, getAllCatController,updateCatController,deleteCatController}
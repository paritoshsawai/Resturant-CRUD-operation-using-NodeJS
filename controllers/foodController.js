const foodModel = require("../models/foodModel");
const orderModel = require("../models/orderModel");

//Create food
const createFoodController = async(req,res) => {
    try{
      const {title,description,price,imageUrl,foodTags,category,code,isAvaiabe,resturant,rating,ratingCount} = req.body
      if(!title || ! description || !price || !resturant){
        res.status(500).send({
            success: false,
            message:"Required feaild neede",
        })
    }
    const newFood = new foodModel({title,description,price,imageUrl,foodTags,category,code,isAvaiabe,resturant,rating,ratingCount});
    await newFood.save();
    res.status(200).send({
        success: true,
        message:"New food item added",
        newFood
    })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            message:"Error in Create food Api",
            error
        })
    }
};

//Get all food
const getALlFoodController = async(req, res) => {
    try{
       const food = await foodModel.find({})
       if(!food){
        res.status(404).send({
            success: false,
            message:"No food Found",
        })
        }
    res.status(200).send({
        success: true,
        tottalFoods: food.length,
        food
    });
    }catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            message:"Error in get all food Api",
            error
        })
    }
};

//Get by ID
const getFoodByIdController = async(req,res) => {
    try{
         const foodId = req.params.id 
         if(!foodId){
            return res.status(404).send({
                success: false,
                message:"No foodId Found",
            })
        }
         const food = await foodModel.findById(foodId)
         if(!food){
            return res.status(404).send({
                success: false,
                message:"No food Found",
            })
        }
    res.status(200).send({
        success: true,
        message:"Food Found",
        food
    })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            message:"Error in get food by Id Api",
            error
        })
    }
};

//Update
const updateFoodController = async(req, res) => {
    try{
        const foodId = req.params.id 
        if(!foodId){
           return res.status(404).send({
               success: false,
               message:"No foodId Found",
           })
       }
        const food = await foodModel.findById(foodId)
        if(!food){
           return res.status(404).send({
               success: false,
               message:"No food Found",
           })
       }
       const {title,description,price,imageUrl,foodTags,category,code,isAvaiabe,resturant,rating,ratingCount} = req.body
       const upadatedFood = await foodModel.findByIdAndUpdate(foodId,{title,description,price,imageUrl,foodTags,category,code,isAvaiabe,resturant,rating,ratingCount}, {new:true});
       res.status(200).send({
        success: true,
        message:"Food Updated succefully",
        upadatedFood
    })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in Update food Api",
            error
        })
    }
};
//delete
const deleteFoodController = async(req,res) => {
    try{
        const foodid = req.params.id
       if(!foodid){
        return res.status(404).send({
            success: false,
            message: "please provide food ID",
        })
    }
    const food = await foodModel.findById(foodid)
    if(!food){
     return res.status(404).send({
         success: false,
         message: "No food item found",
     })
 }
    await foodModel.findByIdAndDelete(foodid)
    res.status(200).send({
        success:true,
        message: "Food deleted succesfully"
    })
     }catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in Delete food API",
            error
       })
     }
};

//Place order
const placeorderController = async(req,res) => {
    try{
       const {cart} = req.body
       if(!cart){
        return res.status(500).send({
            success: false,
            message: "Plase add in the cart",
        })
       }
       let total = 0;
       //calculate price
       cart.map((i) =>{
        total += i.price
       }) 

    const newOrder = new orderModel({
        foods:cart,
        payment:total,
        buyer : req.body.id
    });
    await newOrder.save();
    res.status(200).send({
        success:true,
        message: "Food order palce succesfully"
    })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in place food order API",
            error
       })
    }
};

//Order status
const orderStatusController = async(req, res) => {
    try{
        const orderId = req.params.id
        if(!orderId){
            return res.status(404).send({
                success: false,
                message: "please provide order ID",
            })
        }
        const {status} = req.body
        const order = await orderModel.findByIdAndUpdate(orderId,{status},{new:true})
        res.status(200).send({
            success: true,
            message: "Order status updated"
        
        })
    
    }catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in status food order API",
            error
       })
    }
};



module.exports = {createFoodController,getALlFoodController,getFoodByIdController, updateFoodController,deleteFoodController,placeorderController,orderStatusController}
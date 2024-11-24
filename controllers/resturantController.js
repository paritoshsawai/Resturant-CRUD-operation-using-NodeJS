//Create Returant

const resturantModel = require("../models/resturantModel");

const createResturentController = async(req, res) => {
    try{
        const {title,
            imgUrl,
            foods,
             time, 
             pickup, 
             delivery, 
             isOpen,
             logoUrl,
             rating,
             ratingCount,
             coords} = req.body;
             //validation
             if(!title || !coords){
                return res.status(500).send({
                    success: false,
                    message: "Resturant title and address required! "
                });
             }
    const newResturant = new resturantModel({
            title,
            imgUrl,
            foods,
             time, 
             pickup, 
             delivery, 
             isOpen,
             logoUrl,
             rating,
             ratingCount,
             coords
    })
    await newResturant.save();
    res.status(200).send({
        success: true,
        message: "New Resturant Created ! "})
    }catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in Create resturant API",
            error
        })
    }
};
//Get all resturant
const getAllReturantController = async( req, res) => {
    try{
        const resturants = await resturantModel.find({})
        if(!resturants){
            return res.status(404).send({
                success: false,
                message:"No resturant available!"
            })
        }
        res.status(200).send({
            success:true,
            totalCount: resturants.length,
            resturants
        })
    }catch(error)
    {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in Get all resturant API",
            error
    });
}
}
const getReturantbyIdController = async(req, res) => {
    try{
       const returantid = req.params.id
       if(!returantid){
        res.status(404).send({
            success: false,
            message: "No returant ID Found",
        })
       }
       //find returant
       const returant = await resturantModel.findById(returantid)
       if(!returant){
        res.status(404).send({
            success: false,
            message: "No returant Found",
        })
       }
       res.status(200).send({
           success:true,
           returant
       })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in Get all resturant by id API",
            error
       })
    }
};
//Delete
const deleteResturantController = async(req, res) => {
     try{
        const returantid = req.params.id
       if(!returantid){
        return res.status(404).send({
            success: false,
            message: "please provide resturant ID",
        })
      
    }
    await resturantModel.findByIdAndDelete(returantid)
    res.status(200).send({
        success:true,
        message: "Resturant deleted succesfully"
    })
     }catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in Delete resturant API",
            error
       })
     }
};


module.exports ={createResturentController,getAllReturantController,getReturantbyIdController,deleteResturantController}

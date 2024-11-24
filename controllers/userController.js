const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs")
//Get USer
const getuserController = async(req,res) => {
    try{
        const user = await userModel.findById({_id:req.body.id});
        //validation
        if(!user){
            return res.status(404).send({
                success: false,
                message: "Usernot found"
            })
        }
        //hide password
        user.password = undefined
        //resp
        res.status(200).send({
            success: true,
            message: "User found Successfully",
            user
        })
    }catch(error){
       console.log(error)
       res.status(500).send({
        success: false,
        message: "Error in Get user Api",
        error
       })
    }
};

//Update user
const updateuserController = async( req, res) => {
    try{
     //find user
     const user = await userModel.findById({_id:req.body.id});
     //Validation
     if(!user){
        return res.status(404).send({
            success: false,
            message: "Usernot found"
        })
    }
    //Update
    const {userName,address,phone} = req.body
    if(userName) user.userName = userName
    if(address) user.address = address
    if(phone) user.phone = phone
    //Save  User details
    await user.save()
    res.status(200).send({
        success: true,
        message: "Userupdate Succesfully"
    })
    }catch(error){
        console.log(error)
        res.status(500).send({
         success: false,
         message: "Error in Update user Api",
         error
        })
    }
};

//Reset Password
const resetPasswordController = async( req,res) => {
    try{
        const {email, newPassword, answer} = req.body
        if(!email ||  !newPassword || !answer){
            return res.status(500).send({
                success: false,
                message: "PLease provide all provide",
            });
        }
         const user = await userModel.findOne({email,answer})
         if(!user){
            return res.status(500).send({
                success: false,
                message: "User not found or invalid answer",
            });
        }
        var salt = bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hash(newPassword, salt) ; 
        user.password = hashPassword
        await user.save();
        res.status(200).send(
            {
                success: true,
                message: "Password reset succesfully",
            }
        ) ;
    }catch(error){
        console.log(error)
        res.status(500).send({
         success: false,
         message: "Error in Password reset Api",
         error
        });
    }
};

//Update user Password
const updatePasswordController = async(req, res) => {
    try{
        //find user
        const user = await userModel.findById({_id:req.body.id})
        //validation
        if(!user){
            return res.status(400).send({
                success:false,
                message: "USer not found"
            });
        }
        //get data from user
        const {oldPassword, newPassword} = req.body
        if(!oldPassword || !newPassword){
            return res.status(500).send({
                success:false,
                message: "Please provide old or new password"
            });
        }
        //Check USer Password  | Comapre password
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if(!isMatch){
        return res.status(500).send({
            success: false,
            messgae: "Invalid old Password"
        });
    }
    
        //hasing password
        var salt = bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hash(newPassword, salt);
        user.password =hashPassword;
        await user.save();
        res.status(200).send({
            success: true,
            message: "Password Updated!"
        });

    }catch(error){
        console.log(error)
        req.status(500).send({
            success: false,
            message: "Error in PAssword update API",
            error
        })
    }
};

const deleteUserController = async(req, res) => {
    try{
       await userModel.findByIdAndDelete(req.params.id)
       return res.status(200).send({
        success: true,
        message: "Your account has been deleted",
       })
    }catch(error){
        console.log(error)
        req.status(500).send({
            success: false,
            message: "Error in Delete user API",
            error
        })
    }
};


module.exports = {getuserController, updateuserController, resetPasswordController,updatePasswordController, deleteUserController}
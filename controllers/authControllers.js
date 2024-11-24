const userModel = require("../models/userModel");
const { use } = require("../routes/testroutes");
const bcrypt = require("bcryptjs")
const JWT = require("jsonwebtoken")


const registerController = async(req, res) => {
try{
    const {userName, email, password, phone, address, answer} = req.body
    //Validation
    if(!userName || !email || !password || !phone || !address || !answer){
        return res.status(500).send({
            success:false,
            messgae: "Please provide all Details"
        })
    }
    //Check User
    const existing = await userModel.findOne({email})
    if(existing){
        return res.status(500).send({
            success:false,
            messgae: "Email already Registred"
        })
    }
    //hasing password
    var salt = bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hash(password, salt)
    //Create New User
    const user = await userModel.create({userName,email,password:hashPassword,address,phone,answer});
    res.status(201).send({
        success: true,
        messgae: " Successfully Registred"
    })
} catch(error){
    console.log(error)
    res.status(500).send({
        sucess: false,
        messgae: "Error In Register API",
        error
    })
}
};

//LogIn
const loginController = async(req, res) => {
    try{
       const {email,password} = req.body
       //Validation
       if(!email || !password ){
        return res.status(500).send({
            success:false,
            messgae: "Please provide Email or Password Details"
        })
    }
    //Check user
    const user = await userModel.findOne({email})
    if(!user){
        return res.status(404).send({
            success:false,
            messgae: "Useer not found"
        })
    }
    //Check USer Password  | Comapre password
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        return res.status(500).send({
            success: false,
            messgae: "Invalid Credentials"
        })
    }
    //token
    const token = JWT.sign({id:user._id}, process.env.JWT_SECRET,{
        expiresIn: "7d",
    })
    user.password = undefined;
    res.status(200).send({
        success:true,
        messgae: " Login Successfully",
        token,
        user
    })
    } catch(error){
        console.log(error)
        res.status(500).send({
            sucess: false,
            messgae: "Error In Login API",
            error
        })
    }
};

module.exports = {registerController, loginController}
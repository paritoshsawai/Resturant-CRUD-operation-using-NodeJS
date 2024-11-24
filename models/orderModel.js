const mongoose  = require("mongoose")

//Schema
const  orderSchema = new mongoose.Schema({
   foods:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Foods'
   }] ,
   payment: {
   },
   buyer:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'User'
   },
   status: {
       type:String,
       enum: ["preparing", "prepared", "On the Way", "Delivered"],
       default: "preparing"
   }


},{timestamps: true});

//Export 

module.exports  = mongoose.model('Orders', orderSchema)
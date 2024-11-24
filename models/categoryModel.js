const mongoose  = require("mongoose")

//Schema
const  categorySchema = new mongoose.Schema({
    title:{
        type: String,
        required: [true, "caterory title is required"]
    },
    imgUrl:{
        type: String,
        default: "https://thumbs.dreamstime.com/b/serving-food-icon-symbol-service-serving-food-icon-sign-hand-waiter-serving-tray-waiter-serving-isolated-symbol-148100509.jpg"
    }

},{timestamps: true});

//Export 

module.exports  = mongoose.model('Category', categorySchema)
const mongoose  = require("mongoose")

//Schema
const  foodSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true,"Food title is required"]
    },
    description:{
        type: String,
        required:[ true,"Food description is required"]
    },
    price:{
        type: Number,
        required: [true, "Food price is required"]
    },
    imageUrl:{
        type: String,
        default: "https://cdn.icon-icons.com/icons2/2493/PNG/512/food_patter_icon_150227.png"
    },
    foodTags:{
        type: String,
    },
    category:{
        type: String,
    },
    code:{
        type: String,
    },
    isAvaiabe:{
        type: Boolean,
        default: true
    },
    resturant:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Resturant'
    },
    rating:{
        type: Number,
        default: 5,
        min: 1,
        max: 5
    },
    ratingCount:{
        type: String
    }


},{timestamps: true});

//Export 

module.exports  = mongoose.model('Foods', foodSchema)
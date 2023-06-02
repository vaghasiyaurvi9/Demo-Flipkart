import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    name:{
        type:String,
        // required:true,
        minlength:2,
        maxlength:100,
        trim:true
    },
    price:{
        type:String,
        // required:true,
        min:1,

    },
    productDetail:{
        type:String,
        // required:true,
        trim:true
    },
    brand:{
        type:String,
        // required:true,
        trim:true
    },
    category:{
        type:String,
        // required:true,
        trim:true

    },
    url:String,
    Stripe_Id:String    ,  
    Stripe_priceId: String
})

export default mongoose.model('productDetail',productSchema);
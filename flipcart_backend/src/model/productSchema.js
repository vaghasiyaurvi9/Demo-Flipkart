import mongoose from "mongoose";
// import mongoosePaginate from 'mongoose-paginate-v2';
const productSchema = mongoose.Schema({
    name: {
        type: String,
        // required:true,
        // minlength:2,
        // maxlength:100,
        // trim:true
    },
    price: {
        type: String,
        // required:true,
        min: 1,

    },
    productDetail: {
        type: String,
        // required:true,
        trim: true
    },
    brand: {
        type: String,
        // required:true,
        trim: true
    },
    category: {
        type: String,
        // required:true,
        trim: true

    },
    status: {
        type: String,
    },
    rating:{
        type:Number
    },
    url: String,
    Stripe_Id: String,
    Stripe_priceId: String
})
// productSchema.plugin(mongoosePaginate);

export default mongoose.model('productDetail', productSchema);
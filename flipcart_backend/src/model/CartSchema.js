import mongoose from "mongoose";
const ObjectId = mongoose.Schema.Types.ObjectId;

const cartSchema = new mongoose.Schema({

    customerId:{ type : String},
    userId: { type: ObjectId },
    productId: { type: ObjectId },
    name: {
        type: String,
        require: true,
    },
    productDetail: {
        type: String
    },
    quantity: Number,
    price: Number,
    totalPrice: Number,
    url: String,
    brand:{
        type:String,
        required:true,
        trim:true
    },
    category:{
        type:String,
        required:true,
        trim:true

    },
    Stripe_Id: String,
    Stripe_priceId: String,



}, { timestamps: true });
const Carts = mongoose.model('Carts', cartSchema);

export default Carts;
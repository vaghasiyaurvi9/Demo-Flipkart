import mongoose from "mongoose";
const ObjectId = mongoose.Schema.Types.ObjectId

const wishlistItem = new mongoose.Schema({
    userId: { type: ObjectId },
    productId: { type: ObjectId },
    name:{
        type: String
    },
    productDetail:{
        type:String
    }

})
const wishlistModel = mongoose.model('wishlistItem',wishlistItem)
export default wishlistModel
import mongoose from "mongoose";


const commentSchema = new mongoose.Schema({
 

    comment: {
        type: String,

    },

    by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "registerSchema"
    },
    productId: { type: mongoose.Schema.Types.ObjectId },



})
const Comments = mongoose.model('comments',commentSchema) 
export default Comments

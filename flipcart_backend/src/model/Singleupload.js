import mongoose from "mongoose";
const SingleUpload = new mongoose.Schema({
    image:{
        type:String,
        // required:true
    }
},{timestamps:true})

const singleFileUpload = mongoose.model('fileupload',SingleUpload);

export default singleFileUpload
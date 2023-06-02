import mongoose  from "mongoose";

const multipleUpload = new mongoose.Schema({
    images:[
        {
            url:{
                type:String,
                required:true
            }
        }
    ]
},{timestamps:true})

const Multifile = mongoose.model('multipleUpload',multipleUpload)

export default Multifile
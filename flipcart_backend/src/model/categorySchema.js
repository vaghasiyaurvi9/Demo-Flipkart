import mongoose from 'mongoose';

const categorySchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    status:{
        type:String
    }
  

},{ timestamps: true })

export default mongoose.model('category',categorySchema);
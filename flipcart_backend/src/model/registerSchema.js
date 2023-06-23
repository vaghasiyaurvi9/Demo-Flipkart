import mongoose from 'mongoose';

const registerSchema = mongoose.Schema({

    name:{
        type:String,
        required:true 
    },
    email:{
        type:String,
        // unique:true,
        required:true 
    },
    password:{
        type:String,
        required:true 
    },
    Stripe_Id: String, 
})

export default  mongoose.model('registerUser',registerSchema);

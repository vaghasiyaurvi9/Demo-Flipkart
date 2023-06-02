import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import registerSchema from "../model/registerSchema.js"
const { KEY_TOKEN ,STRIPE_S_KEY } = process.env;
import nodemailer from "nodemailer"
import Stripe from 'stripe';
import Comments from '../model/Comments.js'
import productSchema from "../model/productSchema.js";
const stripe = new Stripe('');




const User = {

    Query: {

        registerUsers: async () => await registerSchema.find({}),
        registerUser: async (_, { _id }) => await registerSchema.findById({ _id }),
        // comments:async ()=> await Comments.find({}),
        allComments:async (_,{by}) => await Comments.find({by})



    },
    Mutation: {
        //register the user
        registerUser: async (_, { signupUser }) => {
            // const stripe = new Stripe(stripe);

            const customer = await stripe.customers.create({
                email: signupUser.email,
                name:signupUser.name,
                // shipping: {
                //     name: signupUser.name,
                //     address: {
                //         line1: '510 Townsend St',
                //         postal_code: '395004',
                //         city: 'Surat',
                //         state: 'GUJ',
                //         country: 'IND',
                //     },
                // },

            });

            // console.log("customer====",customer);

            const user = await registerSchema.findOne({ email: signupUser.email});
            if (user) {
                throw new Error ('email is already exist');
            }

            // mail send
            const transporter = nodemailer.createTransport({
                host: 'smtp.ethereal.email',
                port: 587,
                auth: {
                    user: 'kadin.kunze55@ethereal.email',
                    pass: 'RQw1tBVJXAfGbAqwtA'
                }
            });


            var mailOptions = {
                from: 'kadin.kunze55@ethereal.email',
                to: signupUser.email,
                subject: 'Sending Email for varification',
                html: `<h1>Email Confirmation</h1>
                <h2>Hello ${signupUser.name} for register our website </h2>
               
                </div>`
            };

            const mailer =  transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
            
            const bcryptPassword = await bcrypt.hash(signupUser.password, 12);
            
            
            const userData = new registerSchema({
                ...signupUser,
                password: bcryptPassword,
                Stripe_Id: customer.id
            });
            
            // return {userData}
            const res= userData.save();
            return {
                id: res.id,
                ...res._doc,
                customer,
                mailer
                
            }
        },

        //LoginUser
        loginUser: async (_, { signinUser }) => {

            const user = await registerSchema.findOne({ email: signinUser.email });
            if (!user) {
                throw new Error('First Required The Register The Data');
            }
            const matchPassword = await bcrypt.compare(signinUser.password, user.password);
            if (!matchPassword) {
                throw new Error('email and password is invalid');
            }
            
            const token = Jwt.sign({ id: user._id }, KEY_TOKEN);
          

          
            user.token = token;
            return {

                _id: user._id,
                token,
                ...user._doc
            }
        },
        changePassword: async (_,{email,oldPassword,newPassword}) =>{

            const user= await registerSchema.findOne({email:email});

            // const comparePassword= user && (await bcrypt.compare(oldPassword,user.password ));

            // if(!comparePassword){
            //     throw new Error('Old Password Is Invalid');
             
            // }

            if(oldPassword === newPassword )
            {
                throw new Error ('new password and old password is not same');

            }
               
                const hashPassword = await bcrypt.hash(newPassword,10);

                const updatePassword= {};
                updatePassword.password =hashPassword    
                const users= await registerSchema.findOneAndUpdate({email},{$set:updatePassword}, {new:true})
                return users;
        },
        forgetPassword :async (_,{email}) =>{
            const user = await registerSchema.findOne({email})
            if(!user)
            {
                throw new Error("that email is not exist");
            }
            const token = Jwt.sign({ id: user._id }, KEY_TOKEN);

            user.token = token;
            return {

                _id: user._id,
                token,
                ...user._doc
            }
        },
        comments:async (_,{comment,productId},{id}) =>{

            const productid = productSchema.findOne({_id:productId})
            
            if(!id)
            {
                throw new Error('you must be logged in')
            }

            const commets=await new Comments({
                comment,
                productid,
                by: id ,  
                          
            });

          return   commets
          
           
        }


    }
}
export default User
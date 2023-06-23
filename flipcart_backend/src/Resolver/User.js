import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import nodemailer from "nodemailer"
import registerSchema from "../model/registerSchema.js"
import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51N6WIySEXyEfFfEC2Gdy7czIdtzu2vcwU2nKHcMAacfFIMvjUzN0ea2xup5ylD8zkmxOr2CS6l3BpZpxlGMT7u0y006dNaPn0T');
const { KEY_TOKEN, STRIPE_S_KEY } = process.env;

const User = {

    Query: {

        registerUsers: async () => await registerSchema.find({}),
        registerUser: async (_, { _id }) => await registerSchema.findById({ _id }),
    },

    Mutation: {

        registerUser: async (_, { signupUser }) => {

            const customer = await stripe.customers.create({
                email: signupUser.email,
                name: signupUser.name,
            });

            const user = await registerSchema.findOne({ email: signupUser.email });

            if(user) {
                throw new Error('email is already exist');
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

            const mailer = transporter.sendMail(mailOptions, function (error, info) {
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
            const res = userData.save();
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
        changePassword: async (_, { email, oldPassword, newPassword }) => {

            const user = await registerSchema.findOne({ email:email});
            if(!user)
            {
                throw new Error ('that email user is not valid')
            }
            if (oldPassword === newPassword) {
                throw new Error('new password and old password is not same');
            }
            const hashPassword = await bcrypt.hash(newPassword, 10);
            const updatePassword = {};
            updatePassword.password = hashPassword
            const users = await registerSchema.findOneAndUpdate({ email }, { $set: updatePassword }, { new: true })
            return users;
        },

        forgetPassword: async (_, { email }) => {
            const user = await registerSchema.findOne({ email })
            if (!user) {
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

    }
}
export default User
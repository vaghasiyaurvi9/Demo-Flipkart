const user = `
type User{
    _id: ID!
    name: String
    email:String
    password:String
    token:String
    Stripe_Id: String
}

input userinput{
    name:String!
    email:String!
    password:String!
    Stripe_Id: String
}

input signinInput{
    email:String!
    password:String!
}

type Query{
    registerUsers:[User]
    registerUser(_id:ID!):User    
}

type Mutation{  
    registerUser(signupUser:userinput!): User
    loginUser(signinUser:signinInput!): User
    changePassword( email:String ,oldPassword:String, newPassword:String):User
    forgetPassword(email:String):User
}

`
export default user;
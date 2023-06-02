const user = `
# type registerUser{
 #   _id: ID!
  #  name: String
   # email:String
    # password:String
   # Stripe_Id: String
#}

type User{
    _id: ID!
    name: String
    email:String
    password:String
    token:String
    Stripe_Id: String
}
type commentsWithName{
    comment:String
    by:IdName
}
type IdName{
    _id:String
    name:String
}
type comment{

    comment:String
    by:ID!
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
  
    allComments(by:ID!):comment
}

type Mutation{  
    registerUser(signupUser:userinput!): User
    loginUser(signinUser:signinInput!): User
    changePassword( email:String ,oldPassword:String, newPassword:String):User
    forgetPassword(email:String):User
    comments(comment:String!,productId:ID): comment
     
}

`
export default user;
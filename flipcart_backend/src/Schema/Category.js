const category = `
type category{
    _id:ID!
    name:String
    status:String
}
input categoryinput{
    name:String!
    status:String!
}

type Query{
    category:[category]
    categoryById(_id:ID):category
    productsByCategory(name:String!):[products]
}

type Mutation{
    category(category:categoryinput!):category
    deleteCategory(_id:ID):category
    updateCategory(_id:ID,name:String,status:String):category
    
}


`
export default category
const category = `
type category{
    _id:ID!
    name:String
}
input categoryinput{
    name:String!
}

type Query{
    category:[category]
    productsByCategory(name:String!):[products]
}

type Mutation{
    category(category:categoryinput!):category
}


`
export default category
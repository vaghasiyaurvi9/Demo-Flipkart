const Product = `

type products{
    _id: ID!
    name: String
    price: String
    productDetail:String
    brand:String
    category:String
    url:String
    status:String
    rating:Int
    Stripe_Id:String      
    Stripe_priceId: String
}
input addProductinput{
    name:String!
    price:String!
    productDetail:String!
    brand:String!
    category:String!
    url:String
    status:String!

}

input updateProductinput{
    _id:ID!
    name:String
    price:String
    productDetail:String
    brand:String
    category:String
    url:String
    status:String
}

type Query{
   
    products(limit : Int!,offset:Int!):[products]
    product(_id:ID!):products
    searchItem(searchItem:String!):[products]
    productsByCategory(name:String!):[products]
    pagination(page:Int,pageSize:Int):products

}
type Mutation{
    addProduct(addProduct:addProductinput!):products
    updateProduct(updateProduct:updateProductinput!):products
    deleteProduct(_id:ID!):products 
    rateProduct(rating:Int,productId:ID,userId:ID):products
}
`

export default Product
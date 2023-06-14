const wishlistItem = `

type wishListItem{
    id: ID!
    name: String
    productDetail:String
    userId:ID         
    productId:ID         
}

input wishlistInput{
    name: String
    productDetail:String
    userId:ID         
    productId:ID   
}
type Query{
    getWishList(userId:ID):[wishListItem]
}

type Mutation{

    addToWishList(wishInput:wishlistInput):wishListItem
    deleteWishList(_id:ID!):Boolean
}
`
export default wishlistItem
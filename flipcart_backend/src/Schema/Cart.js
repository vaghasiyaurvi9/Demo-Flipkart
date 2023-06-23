
const Cart = `

scalar Number    
scalar Int

type Carts{   
    customerId:String                    
    id:ID     
    userId:ID         
    productId:ID         
    name:String                       
    productDetail:String
    quantity:Number
    price:Number
    totalPrice:Number
    url:String  
    brand:String
    category:String
    Stripe_Id:String
    Stripe_priceId: String   
           
  } 
  
type CartData {
    count: Int
    Item:[Carts]
    data: [Carts]
  }

type Query{
    Carts(userId:ID):CartData                       
    getCarts(id:ID):Carts 
  
}
input CartInput{  
    customerId:String
    userId:ID         
    productId:ID         
    name:String                       
    productDetail:String
    quantity:Number
    price:Number
    totalPrice:Number
    url:String  
    brand:String
    category:String            
    Stripe_Id:String
    Stripe_priceId: String   
}

type Mutation{
    addCarts(cartInput:CartInput):Carts                     
    deleteCart(id:ID):String      
    updateCarts(id:ID,quantity:Number,totalPrice:Number):Carts
}
`

export default Cart
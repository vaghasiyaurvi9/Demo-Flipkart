

import Cart from "./Cart.js"
import Category from "./Category.js"
import Product from "./Product.js"
import User from "./User.js"
import Stripes from "./Stripe.js"
import Bill from "./Bill.js"
import wishlistItem from "./WishlistItem.js"




const resolvers = [
    User,
    Category,
    Product,
    Cart,
    Stripes,
    Bill,
    wishlistItem

]
export default resolvers
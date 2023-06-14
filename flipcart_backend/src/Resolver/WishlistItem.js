import wishlistModel from "../model/WishlistItem.js"


const wishlistItem = {
    Query:{

        getWishList: async (_,{userId}) =>{

            const result= await wishlistModel.find({userId})
            
            return result
        }
    },
    Mutation:{
        addToWishList : async (_,{wishInput}) =>{

            const newWish= await  wishlistModel.create(wishInput)
            return newWish
        },
        deleteWishList :async (_,{_id}) =>{

           await wishlistModel.findByIdAndDelete({_id})
           return true
        }
    }
}
 export default wishlistItem
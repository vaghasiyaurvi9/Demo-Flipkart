import { gql } from "@apollo/client"

export const GET_WISHLIST_ITEM = gql`

query Query($userId: ID) {
    getWishList(userId: $userId) {
      id
      name
      productDetail
      userId
      productId
    }
  }
`


export const WISHLIST_ITEM = gql`
mutation Mutation($wishInput: wishlistInput) {
    addToWishList(wishInput: $wishInput) {
      id
      name
      productDetail
      userId
      productId
    }
  }
`
export const DELETE_ITEM = gql`
mutation DeleteWishList($id: ID!) {
  deleteWishList(_id: $id)
}
`
export const GET_WISHLIST_ID =gql`
query Query($userId: ID) {
  getWishList(userId: $userId) {
    id
    
  }
}
`
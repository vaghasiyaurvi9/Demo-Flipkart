import { gql } from '@apollo/client';

export const GET_CART = gql`
query GetCarts($getCartsId: ID) {
    getCarts(id: $getCartsId) {
      customerId
      id
      userId
      productId
      name
      productDetail
      quantity
      price
      totalPrice
      url
      brand
      category
      Stripe_Id
      Stripe_priceId
    }
  }
`

export const CARTS= gql`
query Carts($userId: ID) {
    Carts(userId: $userId) {
      data {
        customerId
        id
        userId
        productId
        name
        productDetail
        quantity
        price
        totalPrice
        url
        brand
        category
        Stripe_Id
        Stripe_priceId
      }
      count
      Item {
        customerId
        id
        userId
        productId
        name
        productDetail
        quantity
        price
        totalPrice
        url
        brand
        category
        Stripe_Id
        Stripe_priceId
      }
    }
  }
`

export const ADD_TO_CART = gql `

mutation AddCarts($cartInput: CartInput) {
    addCarts(cartInput: $cartInput) {
      customerId
      id
      userId
      productId
      name
      productDetail
      quantity
      price
      totalPrice
      url
      brand
      category
      Stripe_Id
      Stripe_priceId
    }
  }
  
`

export const DELETE_CART = gql`
mutation deleteCart($id:ID){
  deleteCart(id:$id)
}
`

export const UPADTE_CART=   gql`

mutation UpdateCarts($updateCartsId: ID, $quantity: Number, $totalPrice: Number) {
    updateCarts(id: $updateCartsId, quantity: $quantity, totalPrice: $totalPrice) {
      customerId
      id
      userId
      productId
      name
      productDetail
      quantity
      price
      totalPrice
      url
      brand
      category
      Stripe_Id
      Stripe_priceId
    }
  }
`

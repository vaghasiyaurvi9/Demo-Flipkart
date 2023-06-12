import { gql } from '@apollo/client';

export const REGISTER_USER= gql`

mutation RegisterUser($signupUser: userinput!) {
    registerUser(signupUser: $signupUser) {
      name
      password
      email
      Stripe_Id

    }
  }
`

export const LOGIN_USER =gql`
mutation LoginUser($signinUser: signinInput!) {
  loginUser(signinUser: $signinUser) {
    _id
    name
    email
    password
    token
    Stripe_Id
  }
}

`
export const ADD_PRODUCTS= gql`

mutation AddProduct($addProduct: addProductinput!) {
  addProduct(addProduct: $addProduct) {
    _id
    brand
    category
    name
    price
    productDetail
    url
    status
    Stripe_Id
    Stripe_priceId
  }
}
`

export const DELETE_PRODUCT= gql`

mutation DeleteProduct($id: ID!) {
  deleteProduct(_id: $id) {
    _id
    brand
    category
    name
    price
    productDetail
    url
    Stripe_Id
    Stripe_priceId
  }
}

`
export const UPDATE_PRODUCT= gql`

mutation UpdateProduct($updateProduct: updateProductinput!) {
  updateProduct(updateProduct: $updateProduct) {
    _id
    name
    price
    productDetail
    brand
    category
    url
    status
    Stripe_Id
    Stripe_priceId
  }
}

`
export const CATEGORY_DATA=gql`
mutation Category($category: categoryinput!) {
  category(category: $category) {
    _id
    name
  }
}
`

export const RESET_PASSWORD=gql`

mutation ChangePassword($email: String, $oldPassword: String, $newPassword: String) {
  changePassword(email: $email, oldPassword: $oldPassword, newPassword: $newPassword) {
    _id
    name
    email
    password
    token
    Stripe_Id
  }
}

`

export const FORGETPASSWORD= gql`

mutation ForgetPassword($email: String) {
  forgetPassword(email: $email) {
    _id
    name
    email
    password
    token
    Stripe_Id
  }
}
`


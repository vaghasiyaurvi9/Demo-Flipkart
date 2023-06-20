import { gql } from "@apollo/client";

export const GET_ALL_PRODUCT = gql`
query products($limit : Int!,$offset:Int!) {
    products(limit : $limit ,offset: $offset) {
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

export const GET_SINGLE_PRODUCT = gql`

query Product($id:ID!) {
  product(_id: $id) {
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

export const GET_ALL_CATEGORY = gql`
query Category {
  category {
    name
    status
    _id
    
  }
}

`
export const PRODUCT_BY_CATEGORY = gql`
query ProductsByCategory($name: String!) {
  productsByCategory(name: $name) {
    url
    productDetail
    price
    name
    category
    brand
    _id
  }
}

`
export const SEARCH_ITEM = gql`
query SearchItem($searchItem: String!) {
  searchItem(searchItem: $searchItem) {
    url
    productDetail
    price
    name
    status
    category
    brand
    _id
  }
}
`
export const REGISTERUSER = gql`

query RegisterUsers {
  registerUsers {
    _id
    name
    email
    password
    token
    Stripe_Id
  }
}
`







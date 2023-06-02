import { gql } from "@apollo/client";


export const COMMENT = gql`
mutation Mutation($comment: String!, $productId: ID!) {
  comments(comment: $comment, productId: $productId)
   comment
    by
}
  
`
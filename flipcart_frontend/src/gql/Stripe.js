import { gql } from "@apollo/client";


export const CHECKOUT = gql`

query Query($userId: ID, $email: String, $stripeId: String) {
    createCheckoutSession(userId: $userId, email: $email, Stripe_Id: $stripeId)
  }

`
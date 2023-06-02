import { gql } from "@apollo/client";

export const Bills = gql`
{
    Bills{
        id
        customerId
        InvoiceNumber
        invoice_url
        invoice_pdf
        payment_status
        shipping{
            address{
                city
                country
                line1
                line2
                postal_code
                state
            }
            email
            name
            phone
        }
        Product{
            customerId
            userId
            name
            quantity
            price
            totalPrice
            url
        }
    }
}
`


export const getBill = gql`
    query getBills($id:ID){
        getBills(id:$id){
            id
        customerId
        InvoiceNumber
        invoice_url
        invoice_pdf
        payment_status
        shipping{
            address{
                city
                country
                line1
                line2
                postal_code
                state
            }
            email
            name
            phone
        }
        Product{
            customerId
            userId
            name
            quantity
            price
            totalPrice
            url
        }
    }
    }
`
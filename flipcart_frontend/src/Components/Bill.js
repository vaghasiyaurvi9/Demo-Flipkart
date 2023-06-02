import React from 'react'
import Product from './Product'
import { useQuery } from '@apollo/client';
import { Bills } from '../gql/Bill';

const Bill = () => {
    const { data } = useQuery(Bills);
    const UserData = JSON.parse(localStorage.getItem("userData"))
    console.log("data===",data);

    const Seen = (bill) => {
        window.location.assign(bill.invoice_url);
    }
    const download = (bill) => {
        window.location.assign(bill.invoice_pdf);
    }
    return (
        <div>
        
            <div className="container">
                <div className="row">


                    {data?.Bills.map(bill => {
                        return (
                            <>
                                {
                                    UserData?.loginUser
                                        .Stripe_Id === bill.customerId ?
                                        <>
                                            <table border=''>
                                                <tr className='col-12 '>

                                                    <td className='me-2'>invoice No :{bill.InvoiceNumber}</td>
                                                    <td>
                                                        <Product bill={bill} />
                                                    </td>
                                                    <td className='me-5'>{bill.payment_status}</td>

                                                    <td>

                                                        <button className="material-icons download" onClick={() => download(bill)}>download Invoice</button>

                                                        <button className="material-icons remove_red_eye" onClick={() => Seen(bill)}>see invoice</button>

                                                    </td>
                                                </tr>
                                            </table>
                                        </>
                                        :
                                        <></>
                                }
                            </>
                        )
                    }
                    )
                    }
                </div>
            </div>

        </div>
    )
}

export default Bill

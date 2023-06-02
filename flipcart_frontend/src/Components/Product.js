import React from 'react'

const Product = ({ bill }) => {
    return (
        <div>
            <table >



                <div className="">
                    <div className="">
                        <tr>
                            <td className='pe-3'>name</td>
                            <td className='pe-4'>quantity</td>
                            <td className='pe-5'>price</td>
                            <td className='pe-4'>totalPrice</td>
                            <td className=''>image</td>
                        </tr>
                        {
                            bill?.Product.map(data => {
                                return (
                                    <>
                                        <tr className='col-auto'>
                                            <td className='pe-5'>{data.name}</td>
                                            <td className='pe-5'>{data.quantity}</td>
                                            <td className='pe-5'>{data.price}</td>
                                            <td className='pe-5'>{data.totalPrice}</td>
                                            <td className=''><img src={data.url} className='imsize' /></td>
                                        </tr>
                                    </>
                                )
                            })
                        }
                    </div>
                </div>

            </table>
        </div>
    )
}

export default Product

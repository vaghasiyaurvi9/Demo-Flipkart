import React, { useEffect, useState } from 'react'
import NavBar from './NavBar';
import { BsFillTrash3Fill, BsTypeH1 } from "react-icons/bs";
import Footer from './Footer';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { CARTS, DELETE_CART, UPADTE_CART } from '../gql/Cart';
import { CHECKOUT } from '../gql/Stripe';

const AddCartData = () => {

    const id = localStorage.getItem('id');
    const token = localStorage.getItem('token');
    const UserData = JSON.parse(localStorage.getItem("userData"));
    const [cart, setcart] = useState([]);
    const [updateCarts] = useMutation(UPADTE_CART);
    const [deleteCart] = useMutation(DELETE_CART);
    // console.log("UserDatadfg", UserData);


    // get cart
    const { data, error, loading, refetch } = useQuery(CARTS, {
        variables: {
            userId: id
        }, onCompleted: (data) => setcart(data?.Carts?.Item)

    });


    useEffect(() => {
        refetch();
    }, [])


    const [startCheckOut] = useLazyQuery(CHECKOUT, {

        variables: {
            userId: id,
            email: UserData?.loginUser.email,
            stripeId: UserData?.loginUser.Stripe_Id
        },
        onCompleted: (queryData) => {
            let checkoutData = JSON.parse(queryData.createCheckoutSession);
            console.log("checkoutData====", checkoutData);
            let checkoutUrl = checkoutData.url
            window.location.assign(checkoutUrl)
        }
    })

    if (error) {
        console.log(error);
    }

    console.log("addtocart===", cart);

    if (loading) return <h1>loading.....</h1>

    const removeCart = (cart) => {

        deleteCart({
            variables: {
                id: cart
            }
        }).then(() => {
            refetch();
        })

    }


    const increment = (cart) => {
        const count = cart.quantity + 1
        const total = cart.price * count

        console.log("cart===", cart.id);

        if (cart.id !== 0) {

            updateCarts({
                variables: {
                    updateCartsId: cart.id,
                    quantity: count,
                    totalPrice: total
                }
            }).then(() => {
                refetch();
            })
        }
    }
    const decrement = (cart) => {
        if (cart.quantity > 1) {
            const count = cart.quantity - 1
            const total = cart.price * count
            // console.log(count);
            if (cart.id !== 0) {
                updateCarts({
                    variables: {
                        updateCartsId: cart.id,
                        quantity: count,
                        totalPrice: total
                    }
                }).then(() => {
                    refetch();
                })
            }
        }
    }
    const emptyCart = () => {

        data?.Carts?.data.map(cart => {
            id === cart.userId ?
                deleteCart({
                    variables: {
                        id: cart.id
                    }
                }).then(() => {
                    refetch();
                })
                :
                <></>
        })
    }
    let subtotal = 0;
    let badge = 0
    // eslint-disable-next-line
   data?.Carts?.data.map(cart => {
        id === cart.userId ?
            subtotal += cart.totalPrice
            : <></>
        id === cart.userId ?
             badge += cart.quantity
            : <></>
    });




    return (
        <div>
            
            <NavBar badge={badge}/>

            <div className="container">
                <div className="row">
                    <div className="col-12">
                        {(cart.length === 0) ?
                            <>
                                <h1>cart is empty</h1>
                            </>
                            :
                            <>
                                {
                                    cart.map((item) => {
                                        return (
                                            <ul className='list-unstyled mt-2 d-flex '>

                                                <div className='col-3' >
                                                    <li ><img src={item.url} alt="" className='imgsize ' /></li>
                                                </div>
                                                <div className='my-auto col-3'>
                                                    <li className='my-auto text-primary'> {item.name}</li>
                                                    <li className='my-auto '>Brand: {item.brand}</li>
                                                </div>

                                                <div className='my-auto ms-5 col-2' >
                                                    <h5 className='text-primary'>Price</h5>
                                                    <p> ₹ {item.price} X {item.quantity} = {item.totalPrice}</p>
                                                    <button className='me-5 bg-primary text-white' onClick={() => increment(item)}>+</button>

                                                    <button className='ms-5 bg-primary text-white px-2' onClick={() => decrement(item)}>-</button>
                                                </div>

                                                <div className='my-auto ms-5 col-3'>
                                                    <p className='text-primary'>{item.productDetail}</p>
                                                </div>

                                                <div className='mt-4 ms-5 col-1'>
                                                    <p className='border-0 fs-3 ' ><BsFillTrash3Fill className='text-danger' onClick={() => removeCart(item.id)} /></p>
                                                </div>

                                            </ul>

                                        )

                                    })
                                }


                            </>

                        }
                    </div>
                </div>
            </div>

            <div className="container mt-5">

                {
                    (cart.length > 0)
                        ?
                        <div>
                            <div className="row col-3">
                                <h4 className='text-primary mb-4'> Cart item : {badge}</h4>
                                <button className='mt-5 btn btn btn-outline-primary fw-bold px-5' onClick={() => emptyCart()}>Clear Cart</button>

                            </div>
                            <div className='d-flex'>
                                <h1 className='mt-4 text-primary'>Total Price : ₹ {subtotal}</h1>
                                {

                                    token ? <button className='ms-auto my-auto btn btn-outline-primary  fw-bold' onClick={() => startCheckOut()}>proceed to buy ({badge}  items)</button> :
                                        <button className='ms-auto my-auto btn btn-outline-primary  fw-bold'>Please Login To Payment</button>
                                }

                            </div>
                        </div>

                        :
                        null
                }



            </div>

            <Footer />

        </div>
    )
}

export default AddCartData

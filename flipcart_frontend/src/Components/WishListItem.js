import React, { useEffect } from 'react'
import NavBar from './NavBar'
import Footer from './Footer'
import { useQuery } from '@apollo/client'
import { GET_WISHLIST_ITEM } from '../gql/WishlistItem'

const WishListItem = () => {
    const userid = localStorage.getItem("id")
    const { data, loading, error,refetch} = useQuery(GET_WISHLIST_ITEM, {
        variables: {
            userId: userid
        }
    })
    useEffect(()=>{
        refetch();
    },[refetch])
    console.log("===data", data);
    return (
        <div>
            <NavBar />
            {/* <h1 className='text-center text-primary mt-3'>WishList Item</h1> */}
            <div className="container mt-5" >
                <div className="row">
                    <div className="col-10">
                        {
                            data?.getWishList?.map((item) => {
                                return (
                                    <div className='border mb-2'>
                                        <h1 className='text-primary text-center'>{item.name}</h1>
                                        <span>- {item.productDetail}</span>
                                       
                                    </div>


                                )
                            })

                        }
                    </div>
                </div>
            </div>
            <Footer />

        </div>
    )
}

export default WishListItem

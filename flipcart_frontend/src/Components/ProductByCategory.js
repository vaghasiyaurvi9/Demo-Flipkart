import { useQuery } from '@apollo/client';
import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { PRODUCT_BY_CATEGORY } from '../gql/Queries';
import NavBar from './NavBar';
import Category from './Category';
import Owlcarosel from './Owlcarosel';
import Footer from './Footer';

const ProductByCategory = () => {


    const { name } = useParams();

    const { data, error, loading } = useQuery(PRODUCT_BY_CATEGORY, {
        variables: {
            name: name
        }
    });

    if (loading) return <h1>loading....</h1>

    if (data) {
        console.log(data);
    }

    if (error) {
        console.log(error);
    }

    return (
        <div>

            <NavBar />
            <Category />
            <Owlcarosel />

            <div className="container">
                <div className="row mt-5">

                    {
                        (data?.productsByCategory?.length > 0) ?

                            data?.productsByCategory?.map((productdata, index) => {
                                return (
                                    <div className="col-4 mb-4" key={index}>
                                        <img src={productdata.url} alt="" className='imgsize' />
                                        <div className='p-2'>
                                            <p className=' mt-1 text-primary'> Name:  {productdata.name}</p>

                                            <p className=''> Price: from {productdata.price}*</p>
                                            <span className=''>Brand:  {productdata.brand}</span>
                                            <p className='text-truncate'>{productdata.productDetail}</p>
                                            <Link to={`/product/${productdata._id}`}> <button className='btn btn-outline-primary mt-2  fw-bold'>View More</button></Link>
                                        </div>


                                    </div>
                                )
                            })
                            :  
                                

                                <h3 className='text-primary text-center'>No {name} Categories available</h3>
                            
                    }
                </div>
            </div>

            <Footer />

        </div>
    )
}

export default ProductByCategory

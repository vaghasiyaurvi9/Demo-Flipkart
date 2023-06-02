import { useMutation, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CartProvider, useCart } from "react-use-cart";
import { GET_COMMENTS, GET_SINGLE_PRODUCT, REGISTERUSER } from '../gql/Queries';
import NavBar from './NavBar';
import Footer from './Footer';
import { ADD_TO_CART, CARTS } from '../gql/Cart';
import { COMMENT } from '../gql/Comments';

const SingleProduct = () => {

  const { id } = useParams();
  const { data, error, loading, refetch } = useQuery(GET_SINGLE_PRODUCT, {
    variables: { id }
  });
  const [addCarts] = useMutation(ADD_TO_CART);
  const userid = localStorage.getItem("id")
  const UserData = JSON.parse(localStorage.getItem('userData'))
  console.log("UserData===grg", UserData.loginUser.Stripe_Id);

  const [comments, setComments] = useState('')
  const [comment] = useMutation(COMMENT);

  const {data:getcomment , refetch:refetchData}=useQuery(GET_COMMENTS,{
    variables:{
      by:userid,
      // productid:id
    }
  });
  useEffect(()=>{
    refetchData();
  })
  console.log("getcomments===",getcomment);

  const submitData = (e) => {
    e.preventDefault();
    comment({
      variables: {
        comment: comments,
        productId:id
      }
    });
    setComments('');
  }

  if (error) {
    console.log(error);
  }

  if (data) {
    console.log("data===", data);
  }

  if (loading) return <h5>loading....</h5>
  const { name, price, brand, category, productDetail, url } = data.product;


  const cartAddData = (data) => {


    if (data.product._id) {
      let cartInput = {
        "customerId": UserData.loginUser.Stripe_Id,
        "userId": userid,
        "url": data.product.url,

        "productId": id,
        "productDetail": data.product.productDetail,
        "price": data.product.price,
        "name": data.product.name,
        "category": data.product.category,
        "brand": data.product.brand,
        "Stripe_Id": data.product.Stripe_Id,
        "Stripe_priceId": data.product.Stripe_priceId

      }

      addCarts({
        variables: {
          cartInput: cartInput
        }, refetchQueries: [
          { query: CARTS }
        ]
      })
    }
  }


  return (
    <div>
      <NavBar />
      <div className="container mt-5">
        <div className="row">
          <div className="col-xl-4">
            <img src={data.product.url} alt="" />
          </div>
          <div className="col-xl-5 ms-auto p-5">
            <h1 className='text-primary'>{data.product.name}</h1>
            <p>{data.product.productDetail}</p>
            <p className='mt-3 fs-4'> Brand : {data.product.brand}</p>
            <p className='mt-3 fs-4'> Category : {data.product.category}</p>
            <p className='mt-3 fs-4'> price : {data.product.price}</p>
            {/* <button className='btn btn-primary mt-3 px-4 ' onClick={()=>addToCart()}>Add To Cart</button> */}
            <button className='btn btn-primary mt-3 px-4 ' onClick={() => cartAddData(data)}>Add To Cart</button>
          </div>
        </div>
      </div>

      <section>
        <div className="container">
          <div className="row">
            <div className="col-12 border mt-4">
                {/* {
                  getcomment.allComments.map((item)=>{
                    return(
                      <h5 className='mb-3'>{item.comment}</h5>
                    )
                  })
                } */}
              
            </div>
          </div>
        </div>
      </section>

      <section>

        <div className="container mt-5">
          <div className="row">
            <h1>Comments</h1>
            <hr />
            <div className="">
             <form action="" onSubmit={submitData}>
             <div>Write Comment Here..</div>
              <input type="text" className='border boder-0 mt-2 p-2' size='100' value={comments} placeholder='your comments.....' onChange={(e) => { setComments(e.target.value) }} />
              <div>
            
              <button >submit</button>
              </div>
             </form>
            </div>
          </div>
        </div>

      </section>

     

      <Footer />

    </div>
  )
}

export default SingleProduct

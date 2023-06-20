import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ADD_TO_CART, CARTS } from '../gql/Cart';
import { GET_SINGLE_PRODUCT } from '../gql/Queries';
import { useMutation, useQuery } from '@apollo/client';
import ReactImageMagnify from 'react-image-magnify';
import NavBar from './NavBar';
import Footer from './Footer';
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { DELETE_ITEM, GET_WISHLIST_ITEM, WISHLIST_ITEM } from '../gql/WishlistItem';
import Rating from './Rating';
import Loader from './Loader';

const SingleProduct = () => {
  // read more functionality
  const [readMore, setReadMore] = useState(true);
  const toggleReadMore = () => {setReadMore(!readMore)};

  const { id } = useParams();

  const { data, error, loading, refetch } = useQuery(GET_SINGLE_PRODUCT, {
    variables: { id }
  });
  const [addCarts] = useMutation(ADD_TO_CART);
  const userid = localStorage.getItem("id")
  const UserData = JSON.parse(localStorage.getItem('userData'))
  
  
  const [isWishList, setIsWishList] = useState('false');
  //add wishlistitem
  const { data: getIdData } = useQuery(GET_WISHLIST_ITEM, {
    variables: {
      userId: userid
    },onCompleted : (getIdData) => { getIdData.getWishList.map((i) => {     
      return(
        <>
        {i.productId === id ?  setIsWishList('true') : setIsWishList('false')}      
        
        </>
      )
    })}
  })
  console.log('getIdData====',getIdData);
  const [addWishListItem] = useMutation(WISHLIST_ITEM);
  const [deleteWishListItem] = useMutation(DELETE_ITEM);

  const addDataToWishList = () => {
    addWishListItem({
      variables: {
        wishInput: {
          userId: userid,
          productId: id,
          productDetail: data.product.productDetail,
          name: data.product.name,
        }
      }
    }).then(refetch())
    setIsWishList('true')
  }

  // const deleteWishList = (idData) => {
  //   deleteWishListItem({
  //     variables: {
  //       id: idData
  //     }
  //   })
  // }



  if (error) {
    console.log(error);
  }

  if (data) {
    console.log("data===", data);
  }

  if (loading) return <Loader />



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

  let img = data.product.url;
  let text = data.product.productDetail


  return (
    <div>
      <NavBar />
      <div className="container mt-5">
        <div className="row">
          <div className="col-xl-4">
            {
              isWishList === 'false' ?
                <span> <AiOutlineHeart className='fs-1 text-danger pointer' onClick={addDataToWishList} /></span> :

                <span> <AiFillHeart className='fs-1 text-danger pointer' /></span>

            }

            {/*  zoom the image in side */}
            <ReactImageMagnify {...{
              smallImage: {
                alt: 'Wristwatch by Ted Baker London',
                isFluidWidth: true,
                src: img
              },
              largeImage: {
                src: img,
                width: 1200,
                height: 2000
              }
            }} />
          </div>
          <div className="col-xl-5 ms-auto p-5">
            <h1 className='text-primary'>{data.product.name}</h1>
            <p> {readMore ? text.slice(0, 149) : text}
              {text.length > 150 &&
                <span onClick={toggleReadMore} className='text-primary'>
                  {readMore ? '...read more' : ' ...show less'}
                </span>
              }
            </p>
            <p className='mt-3 fs-4'> Brand : {data.product.brand}</p>
            <p className='mt-3 fs-4'> Category : {data.product.category}</p>
            <p className='mt-3 fs-4'> price : {data.product.price}</p>
            <button className='btn btn-primary mt-3 px-4 ' onClick={() => cartAddData(data)}>Add To Cart</button>
            <Rating />
          </div>
        </div>
      </div>
      <Footer />
    </div >
  )
}


export default SingleProduct

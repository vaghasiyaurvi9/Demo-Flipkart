import { useMutation, useQuery } from '@apollo/client';
import React, { useContext, useEffect, useState } from 'react'
import { ADD_PRODUCTS, UPDATE_PRODUCT } from '../gql/Mutation';
import { ItemContext } from './Context';
import { GET_ALL_PRODUCT, GET_SINGLE_PRODUCT } from '../gql/Queries';
import Loader from '../Components/Loader';

const Product = () => {
  const { selectedId, setSelectedId } = useContext(ItemContext);
  const [product, setproduct] = useState({});
  const [image, setImage] = useState('')

  const [addProductdata, { error, loading, data  }] = useMutation(ADD_PRODUCTS);
  const [updateProductdata] = useMutation(UPDATE_PRODUCT);
  const { refetch, data: getData } = useQuery(GET_SINGLE_PRODUCT, {
    variables: { id: selectedId }, onCompleted:
      (data) =>
        setproduct(data.product)
  }
  );


  useEffect(()=>{
    refetch();
  },[refetch])



  const productInput = (event) => {
    setproduct({
      ...product,
      [event.target.name]: event.target.value
    })
  }


  // if (data) {
    console.log("products==== ", product.status);
  // }
  if (error) {
    console.log(error);
  }
  if (loading) return <Loader/>

  let productschema = {
    name: product.name,
    price: product.price,
    brand: product.brand,
    category: product.category,
    productDetail: product.productDetail,
    url: image,
    status: product.status
  }

  const submitProductData = (event) => {
    event.preventDefault();

    let productDataupdate = {
      _id: selectedId,
      name: product.name,
      price: product.price,
      brand: product.brand,
      category: product.category,
      status: product.status,
      productDetail: product.productDetail,
      url: image
    }

    console.log("productschema====", productschema);

    if (selectedId === 0) {
      addProductdata({
        variables: {
          addProduct: productschema
        },refetchQueries: [{ query:GET_ALL_PRODUCT}]
      }).then(refetch())

    } else {
      if (selectedId) {
        updateProductdata({
          variables: {
            updateProduct: productDataupdate
          }
        }).then(() => {
          refetch();
        })
      }
    }


  }


  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  return (
    <div>

      <div className='container'>

        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <h1 className='text-primary'> Add PRODUCT</h1>


            </div>
          </div>
        </section>
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div >
                <div className="card card-primary">
                  <div className="card-header">
                    <h3 className="card-title ">PRODUCT DETAIL</h3>
                  </div>

                  <form onSubmit={submitProductData}>
                    <div className="card-body">
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Product Name:</label>
                        <input type="name" className="form-control" id="exampleInputEmail1" value={product.name} onChange={productInput} name="name" />
                      </div>
                      <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Price:</label>
                        <input type="number" className="form-control" id="exampleInputPassword1" value={product.price} onChange={productInput} name='price' />
                      </div>
                      <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Product Detail:</label>
                        <input type="text" className="form-control" id="exampleInputPassword1" value={product.productDetail} onChange={productInput} name='productDetail' />
                      </div>
                      <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Brand:</label>
                        <input type="text" className="form-control" id="exampleInputPassword1" value={product.brand} onChange={productInput} name='brand' />
                      </div>
                      <div className="form-group">
                        <label htmlFor="exampleInputPassword1">category:</label>
                        <input type="text" className="form-control" id="exampleInputPassword1" value={product.category} onChange={productInput} name='category' />
                      </div>
                      <div className="form-group">
                        <label htmlFor="exampleInputPassword1">status:</label>
                        <input type="text" className="form-control" id="exampleInputPassword1" value={product.status} onChange={productInput} name='status' />
                      </div>

                      <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Url:</label>
                        <input type="file" onChange={onImageChange} className="filetype" />
                      </div>
                    </div>
                    <div className="card-footer">
                      {selectedId === 0 ? <button type="submit" className="btn btn-primary">Submit</button> : <button type="submit" className="btn btn-primary">Edit</button>}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>


    </div>
  )
}

export default Product

import React, { useContext, useState } from 'react'
import NavBar from './NavBar'
import Category from './Category'
import Owlcarosel from './Owlcarosel'
import { useQuery } from '@apollo/client'
import { GET_ALL_PRODUCT } from '../gql/Queries'
import { Link } from 'react-router-dom'
import Footer from './Footer'
import { searchContexData } from './Contex'

const Index = () => {
  const { Data, setData } = useContext(searchContexData);
  const [sortBy, setSortBy] = useState('');
  const pageSize = 6;
  const [page, setPage] = useState(0);
  const { loading, error, data } = useQuery(GET_ALL_PRODUCT, {
    variables: {
      limit: pageSize,
      offset: page * pageSize,
    }, onCompleted: (data) => setData(data?.products)
  });


  if (loading) return <h5>loading...</h5>

  if (error) {
    console.log(error);
  }
  console.log("Data===", Data);



  // let Data = data?.products;

  if (sortBy === 'ASC') {
    Data = Data.slice().sort((a, b) => a.price - b.price);
  } else if (sortBy === 'DESC') {
    Data = Data.slice().sort((a, b) => b.price - a.price);
  }

  return (
    <div>
      <Category />
      <Owlcarosel />

      {/* sorting the data */}
      <div className="container">
        <div className="row col-3">
          <label >Sort By:</label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="">None</option>
            <option value="ASC">Price (Ascending)</option>
            <option value="DESC">Price (Descending)</option>
          </select>
        </div>
      </div>

      <div className="container">
        <div className="row mt-5">
          {
            Data?.length === 0 ? <h1 className='text-primary text-center mb-5'>No Result Found </h1> :

              Data?.map((productdata, index) => {
                return (
                  // productdata.status === "visible" ?
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
                  //  : ''

                )
              })
          }
        </div>
      </div>
      {/* pagination */}

      <div className="container">
        <div className="row">
          <div className="col-2 text-center mx-auto">
            <button className='me-2 btn btn-outline-primary' disabled={!page} onClick={() => setPage((prev) => prev - 1)}>previous</button>
            <button className='btn btn-outline-primary' disabled={!Data.length} onClick={() => setPage((prev) => prev + 1)} >next</button>
          </div>
        </div>
      </div>



      <Footer />
    </div>
  )
}

export default Index




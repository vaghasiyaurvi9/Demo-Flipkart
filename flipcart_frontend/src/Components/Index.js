import React, { useContext, useState } from 'react'
import Category from './Category'
import Owlcarosel from './Owlcarosel'
import { useQuery } from '@apollo/client'
import { GET_ALL_PRODUCT } from '../gql/Queries'
import { Link } from 'react-router-dom'
import Footer from './Footer'
import { searchContexData } from './Contex'
import Loader from './Loader'

const Index = () => {

  const ImageperRow = 3
  const [next, setnext] = useState(ImageperRow);

  const [valueData, setValueData] = useState([0])
  let { Data, setData } = useContext(searchContexData);
  const [sortBy, setSortBy] = useState('');
  const pageSize = 10;
  const [page, setPage] = useState(0);
  const { loading, error, data } = useQuery(GET_ALL_PRODUCT, {
    variables: {
      limit: pageSize,
      offset: page * pageSize,
    }, onCompleted: (data) => setData(data?.products)
  });


  const handleMoreImage = () => {
    setnext(next + ImageperRow);
  };

  if (error) {
    console.log(error);
  }

  let DataSort = data?.products;

  if (sortBy === 'ASC') {
    Data = DataSort.slice().sort((a, b) => a.price - b.price);
  } else if (sortBy === 'DESC') {
    Data = DataSort.slice().sort((a, b) => b.price - a.price);
  }
  // Data = DataSort.filter((number) => number.price <= valueData);

  // const min = valueData[0];
  // const max =valueData[1];
  // Data= DataSort.filter((i)=> i.price >= min && i.price <= max)
  if (loading) return <Loader />
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
          {/* <input type="range" min='0' max='1000' step='10' value={valueData} onChange={(e) => { setValueData(e.target.value) }} />
          <p>{valueData}</p> */}
        </div>
      </div>


      <div className="container">
        <div className="row mt-5">
          {
            Data?.length === 0 ? <h1 className='text-primary text-center mb-5'>No Result Found </h1> :
              Data?.slice(0, next)?.map((productdata, index) => {
                return (
                  productdata.status === "visible" ?

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

                    : ''

                )
              })
          }
        </div>
        {next < Data?.length && (
          <button
            className="mt-4 btn btn-primary"
            onClick={handleMoreImage}
          >
            Load more
          </button>
        )}
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




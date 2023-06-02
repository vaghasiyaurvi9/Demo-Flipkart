import { useMutation, useQuery } from '@apollo/client';
import React, { useState } from 'react'
import { CATEGORY_DATA } from '../gql/Mutation';
import { GET_ALL_CATEGORY } from '../gql/Queries';

const AddCategory = () => {

  const [categoryDataTarget, setcategoryDataTarget] = useState({});
  const [Category, {  error, loading }] = useMutation(CATEGORY_DATA);
  const {data}=useQuery(GET_ALL_CATEGORY);

  if(data) {
    console.log(data);
  }
  if(error) {
    console.log(error);
  }
  if(loading) return <h4>loading....</h4>

 


  const categoryData = (e) =>{
    setcategoryDataTarget({
      ...categoryDataTarget,
      [e.target.name]:e.target.value
    })
  }
  const categorySubmit = (e) => {
    e.preventDefault();
    console.log("Category===",categoryDataTarget);

    Category({
      variables: {
        category: categoryDataTarget

      }
    })
  }


  return (
    <div>
      <div className="container">
        <h1 className='text-primary'> ADD Category</h1>
        <form action="" onSubmit={categorySubmit}>
          <div>
            <label htmlFor="">Category Name:</label>
            <div> <input type="text" onChange={categoryData} name='name' /></div>
          </div>
          <div>
            <button className='mt-3 btn btn-outline-primary px-3'>Submit</button>
          </div>
        </form>
      </div>

      <div className="containr">
        <div className="row ">
          <table action="">
            {/* {
             data.category.map((value,index)=>{
                return (
                  <tr className='col-6 mx-auto' key={index} >
                    <td>{value.name}</td>
                  </tr>
                )
              })
            } */}
          </table>
        </div>
      </div>

    </div>
  )
}

export default AddCategory

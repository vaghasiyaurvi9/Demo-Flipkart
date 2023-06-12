import { useMutation, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react'
import { CATEGORY_DATA } from '../gql/Mutation';
import { GET_ALL_CATEGORY } from '../gql/Queries';
import Table from 'react-bootstrap/esm/Table';
import { BsFillTrash3Fill } from 'react-icons/bs';
import { MdBrowserUpdated } from 'react-icons/md';
import { CATEGORY_BY_ID, DELETE_CATEGORY, UPDATE_CATEGORY } from '../gql/category';

const AddCategory = () => {
  const [updateId, setUpdateId] = useState('')
  const [categoryDataTarget, setcategoryDataTarget] = useState({});
  const [Category, { error, loading }] = useMutation(CATEGORY_DATA);
  const { data, refetch } = useQuery(GET_ALL_CATEGORY);
  const [deleteData] = useMutation(DELETE_CATEGORY)
  const [categoruUpdate] = useMutation(UPDATE_CATEGORY);
  const { data: categoryDataById } = useQuery(CATEGORY_BY_ID, {
    variables: { categoryByIdId: updateId }, onCompleted: (data) => setcategoryDataTarget(data.categoryById)
  });

  useEffect(() => {

    data?.category.map((i, index) => {
      if (i.status === "visible") {
        document.getElementById('switched' + index).checked = true;
      }
    })

  })


  if (data) {
    console.log("===data", data);
  }
  if (error) {
    console.log(error);
  }
  if (loading) return <h4>loading....</h4>

  const categoryData = (e) => {
    setcategoryDataTarget({
      ...categoryDataTarget,
      [e.target.name]: e.target.value
    })
  }


  const categorySubmit = (e) => {
    e.preventDefault();

    if (updateId !== '') {
      categoruUpdate({
        variables: {
          id: updateId,
          name: categoryDataTarget.name
        }
      })

    } else {
      Category({
        variables: {
          category: categoryDataTarget

        }, refetchQueries: [{ query: GET_ALL_CATEGORY }]
      })
    }
    setcategoryDataTarget('');
  }


  const deleteCategory = (id) => {
    deleteData({
      variables: {
        id: id
      }
    }).then(refetch())
  }


  const switchhandler = (check, id) => {
    if (check === false) {
      categoruUpdate({
        variables: {
          id: id,
          status: "invisible"
        }
      }).then(refetch())
    } else {
      categoruUpdate({
        variables: {
          id: id,
          status: "visible"
        }
      }).then(refetch())
    }

  }

  return (
    <div>

      {/* Add Category */}
      <div className="container mb-3">
        <h1 className='text-primary'> ADD Category</h1>
        <form action="" onSubmit={categorySubmit}>
          <div>
            <label htmlFor="">Category Name:</label>
            <div> <input type="text" onChange={categoryData} name='name' value={categoryDataTarget.name} /></div>
          </div>
          <div>
            <label htmlFor="">Status:</label>
            <div> <input type="text" onChange={categoryData} name='status' value={categoryDataTarget.status} /></div>
          </div>
          <div>
            <button className='mt-3 btn btn-outline-primary px-3'>Submit</button>
          </div>
        </form>
      </div>


      {/* show category */}
      <div className="container">

        <Table striped bordered hover>
          <thead>
            <tr>
              <th >name</th>
              <th >Delete</th>
              <th >Update</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {
              data?.category?.map((value, index) => {
                return (
                  <tr className='col-6 mx-auto' key={index} >
                    <td>{value.name}</td>
                    <td><button className='border-0 fs-3' onClick={() => deleteCategory(value._id)}><BsFillTrash3Fill className='text-danger' /></button></td>
                    <td><button className='border-0 fs-3' onClick={() => setUpdateId(value._id)} ><MdBrowserUpdated className='text-success' /></button></td>
                    <td>
                      <label className="switch">
                        <p>{value.status}</p>
                        <input type="checkbox" id={"switched" + index} onChange={(e) => switchhandler(e.target.checked, value._id)} />
                        <span className="slider round" />
                      </label></td>
                  </tr>
                )
              })
            }
          </tbody>
        </Table>

      </div>

    </div>
  )
}

export default AddCategory

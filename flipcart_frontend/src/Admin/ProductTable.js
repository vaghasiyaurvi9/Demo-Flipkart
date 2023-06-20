import { useMutation, useQuery } from '@apollo/client'
import React, { useContext, useEffect } from 'react'
import { BsFillTrash3Fill } from "react-icons/bs";
import { MdBrowserUpdated } from "react-icons/md";
import Table from 'react-bootstrap/Table';
import { GET_ALL_PRODUCT } from '../gql/Queries';
import { DELETE_PRODUCT, UPDATE_PRODUCT } from '../gql/Mutation';
import { ItemContext } from './Context';
import Loader from '../Components/Loader';

const ProductTable = () => {
    const { selectedId, setSelectedId } = useContext(ItemContext);
    const [updateProductdata] = useMutation(UPDATE_PRODUCT);

    const { data, error, loading, refetch } = useQuery(GET_ALL_PRODUCT, {
        variables: {
            limit: 0,
            offset: 0
        }
    });
    const [deleteData] = useMutation(DELETE_PRODUCT);


    // toggle switch check and unchecked
    useEffect(() => {
        data?.products.map((i, index) => {
            if (i.status === "visible") {
                document.getElementById('switched' + index).checked = true;
            }
        })

    })

    if (error) {
        console.log(error);
    }

    if (loading) return <Loader/>

    //deletedata
    const deleteProduct = (id) => {
        deleteData({
            variables: {
                id
            }
        }).then(refetch());
    }

    const switchhandler = (check,id) =>{
        let updateSwitchOff = {
            _id: id,
            status: "invisible"
        }
        let updateSwitchOn ={
            _id:id,
            status:"visible"
        }
        
        if(check ===  false) 
        {
            updateProductdata({
                variables:{
                    updateProduct:updateSwitchOff
                }
            })

        }else{
            updateProductdata({
                variables:{
                    updateProduct:updateSwitchOn
                }
            })
        }
    }

    return (
        <div className='container'>

            <h1 className='mt-5 text-decoration-underline text-primary mb-4'>PRODUCT TABLE</h1>
            <Table striped bordered hover>
                <thead>
                    <tr >
                        <th>Name</th>
                        <th>Category</th>
                        <th>Brand</th>
                        <th>Price</th>
                        <th>Product Detail</th>
                        <th>Image</th>
                        <th>Delete</th>
                        <th>Update</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data?.products?.map((value, index) => {
                            return (
                                <tr key={index}>
                                    <td>{value.name}</td>
                                    <td>{value.category}</td>
                                    <td>{value.brand}</td>
                                    <td>{value.price}</td>
                                    <td>{value.productDetail}</td>
                                    <td className=''><img src={value.url} alt="" className='w-25 ' /></td>
                                    <td><button className='border-0 fs-3' onClick={() => { deleteProduct(value._id) }}><BsFillTrash3Fill className='text-danger' /></button></td>
                                    <td><button className='border-0 fs-3' onClick={() => { setSelectedId(value._id) }}><MdBrowserUpdated className='text-success' /></button></td>
                                  
                                    <td>
                                        <p>{value.status}</p>
                                        <label className="switch">
                                            <input type="checkbox" id={"switched" + index} onChange={(e) => switchhandler(e.target.checked, value._id)} />
                                            <span className="slider round" />
                                        </label>

                                    </td>

                                </tr>
                            )
                        })
                    }
                </tbody>

            </Table>



        </div >
    )
}

export default ProductTable

import { useQuery } from '@apollo/client'
import React, { useState } from 'react'
import { GET_ALL_CATEGORY } from '../gql/Queries'
import { Link } from 'react-router-dom';
import Footer from './Footer';

const Category = () => {

    const [activeCategory, setActiveCategory] = useState('');

    const { data, error, loading } = useQuery(GET_ALL_CATEGORY);

    if (loading) return <p>Loading...</p>
    if (error) {
        console.log(error);
    }
    if (data) {
        console.log(data);
    }
    // color change of active category
    const handleClickCategory = (category) => {
        setActiveCategory(category);
    };
    return (
        <div>

            <div className="bg-white border border-bottom mb-3">
                <div className="row justify-content-center mt-3">
                    <div className="col-auto">
                        <img src={require('../images/1.webp')} alt="" className='h-75 w-50' />
                    </div>
                    <div className="col-auto">
                        <img src={require('../images/2.webp')} alt="" className='h-75 w-50' />


                    </div>
                    <div className="col-auto">
                        <img src={require('../images/3.webp')} alt="" className='h-75 w-50' />

                    </div>
                    <div className="col-auto">
                        <img src={require('../images/4.webp')} alt="" className='h-75 w-50' />

                    </div>
                    <div className="col-auto">
                        <img src={require('../images/5.webp')} alt="" className='h-75 w-50' />

                    </div>
                    <div className="col-auto">
                        <img src={require('../images/6.webp')} alt="" className='h-75 w-50' />

                    </div>
                    <div className="col-auto">
                        <img src={require('../images/7.webp')} alt="" className='h-75 w-50' />

                    </div>
                    <div className="col-auto">
                        <img src={require('../images/8.webp')} alt="" className='h-75 w-50' />

                    </div>
                    <div className="col-auto">
                        <img src={require('../images/9.webp')} alt="" className='h-75 w-50' />

                    </div>



                </div>
                <div className="row justify-content-center pb-2 ">

                    {
                        data.category.map((getCategory, key) => {
                            return (
                                <div className='col-1 ' key={key}>
                                    <Link to={`/category/${getCategory.name}`} className='text-decoration-none'>
                                        <p className={activeCategory === getCategory.name ? 'active' : ''}
                                            onClick={() => handleClickCategory(getCategory.name)}
                                            style={{
                                                color: activeCategory === getCategory.name ? 'blue' : 'black',

                                            }}> {getCategory.name}

                                        </p></Link>
                                </div>
                            )
                        })
                    }
                </div>

            </div>



        </div>
    )
}

export default Category

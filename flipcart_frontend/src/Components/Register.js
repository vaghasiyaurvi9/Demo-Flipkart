import { useMutation } from '@apollo/client';
import React, { useState } from 'react'
import { REGISTER_USER } from '../gql/Mutation';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from './Loader';

const Register = () => {
    const navigate = useNavigate();
    const [passwordType, setPasswordType] = useState("password");
    const [formFiled, setFormField] = useState({});

    const inputTarget = (event) => {
        setFormField({
            ...formFiled,
            [event.target.name]: event.target.value
        })

    }

    const [registerUserdata, { data, loading, error }] = useMutation(REGISTER_USER, {
        onCompleted(data) {
            if (data) {
                navigate('/login');
                localStorage.setItem('UserData', JSON.stringify(data));

            }
        }
    });

    if (error) {
        console.log(error);
    }

    if (loading) return <Loader/>

    if (data) {
        console.log(data);
    }


    const submitRegisterForm = (e) => {
        e.preventDefault();
        registerUserdata({
            variables: {
                signupUser: formFiled
            }
        })
        toast.success('successfully register the data', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,

        });

    }
    const togglePassword = () => {
        if (passwordType === "password") {
            setPasswordType("text")
            return;
        }
        setPasswordType("password");
    }

    return (
        <div>
            {
                error && <p className='text-center text-danger mt-3'>{error.message}</p>
            }
            {
                data && <p className='text-center'>{data.registerUser.name} is successfully Register</p>
            }

            <form action="" onSubmit={submitRegisterForm}>


                <div className="container">
                    <div className="row   ">
                        <div className="col-5 mx-auto ">
                            <h1 className='mb-3 text-primary'>REGISTER</h1>

                            <div className='mb-3'>
                                <label htmlFor="" className='text-primary me-5'>Name:</label>
                                <input type="text" className='border border-primary' onChange={inputTarget} name='name' />
                            </div>
                            <div className='mb-3'>
                                <label htmlFor="" className='text-primary me-5'>Email:</label>
                                <input type="email" className='border border-primary' onChange={inputTarget} name='email' />
                            </div>
                            <div className='mb-5 d-flex'>
                                <label htmlFor="" className='text-primary me-3'>password:</label>
                                <input type={passwordType} className='border border-primary' onChange={inputTarget} name='password' />
                                <div className='eye-icon fs-6 text-primary ' onClick={togglePassword}>
                                    {passwordType === "password" ? <FaEye /> : <FaEyeSlash />}
                                </div>
                            </div>
                            <div>
                                <input type="submit" value="submit" className='btn btn-primary px-5 rounded-pill mb-4' />
                            </div>

                            <Link to="/login" className=' pb-4'><p>Now able to Login data</p></Link>

                        </div>

                    </div>
                </div>


            </form>

        </div>
    )
}

export default Register

import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { LOGIN_USER } from '../gql/Mutation'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash } from "react-icons/fa";
const Login = () => {

    const [passwordType, setPasswordType] = useState("password");

    const navigate = useNavigate();
    const [loginField, setloginField] = useState({})

    const [loginUser, { error, loading, data }] = useMutation(LOGIN_USER, {
        onCompleted(data) {
            localStorage.setItem('token', data.loginUser.token);
            localStorage.setItem('id', data.loginUser._id);
            localStorage.setItem('userData', JSON.stringify(data))

            navigate('/');

        }
    });

    if (error) {
        console.log(error);
    }
    if (loading) return <h6>loading....</h6>

    if (data) {
        console.log(data);
    }

    const inputTarget = (event) => {
        setloginField({
            ...loginField,
            [event.target.name]: event.target.value
        })

    }


    const loginDatasubmit = (e) => {
        e.preventDefault();
        loginUser({
            variables: {
                signinUser: loginField
            }
        })
        toast.success('successfully login the data', {
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
                error && <p className='text-danger text-center mt-5 fs-5 '>{error.message} </p>
            }

            <form action="" onSubmit={loginDatasubmit}>
                <div className="container">
                    <div className="row   ">
                        <div className="col-5 mx-auto  ">
                            <h1 className='text-primary mb-3'>LOGIN</h1>

                            <div className='mb-3'>
                                <label htmlFor="" className='text-primary me-5'>Email:</label>
                                <input type="email" className='border border-primary' name='email' onChange={inputTarget} />
                            </div>
                            <div className='mb-5 d-flex'>
                                <label htmlFor="" className='text-primary me-3'>password:</label>

                                <input type={passwordType} className='border border-primary' name='password' onChange={inputTarget} />
                                <div className='eye fs-6 text-primary ' onClick={togglePassword}>
                                    {passwordType === "password" ? <FaEye /> : <FaEyeSlash />}
                                </div>

                            </div>
                            <div>
                                <input type="submit" value="submit" className='btn btn-primary px-5 rounded-pill mb-5' />
                            </div>
                            <Link to="/register" className='pt-3 '><p>If Not Register Now Register data</p></Link>
                            <Link to="/changepassword" className=' pb-4'><p>Reset Password</p></Link>
                            <Link to="/forgetpassword" className=' pb-4'><p>forget Password</p></Link>

                        </div>
                    </div>

                </div>


            </form>
            <ToastContainer />
        </div>

    )

}

export default Login

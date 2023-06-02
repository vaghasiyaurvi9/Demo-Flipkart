import { useMutation } from '@apollo/client';
import React, { useState } from 'react'
import { FORGETPASSWORD } from '../gql/Mutation';
import { useNavigate } from 'react-router-dom';

const Forgetpassword = () => {
    const navigate = useNavigate()
    const [email,setEmail]= useState(); 
    const [forgetPassword,{error,data}]=useMutation(FORGETPASSWORD,{
        onCompleted(data){
            if(data)
            {
                navigate('/');
                
                
                localStorage.setItem('userData',JSON.stringify(data));
             
                

            }
        }
    } );

    const handleSubmit = (e) =>{
        e.preventDefault();
        forgetPassword({
            variables:{
                email:email
            }
        })
    }
    console.log(data);
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit" >
                    submit
                </button>
                {error && <p>{error.message}</p>}
            </form>
        </div>
    )
}

export default Forgetpassword

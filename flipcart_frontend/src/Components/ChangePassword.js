
import { useMutation } from '@apollo/client';
import React, { useState } from 'react'
import { RESET_PASSWORD } from '../gql/Mutation';

const ChangePassword = () => {
    const [oldPassword,setoldPassword] = useState();
    const [email,setemail] = useState();
    const [newPassword,setnewPassword] = useState();
   const[changePassword]= useMutation(RESET_PASSWORD);

   const submitData = (e) =>{
    // alert();


    e.preventDefault();

   
        changePassword({
            variables:{
                email:email,
                oldPassword: oldPassword,
                newPassword: newPassword
            },
     

        
        })
    
   }
  return (
    <div>
        <form action="" onSubmit={submitData}>
        <div>
            <label htmlFor="">email</label>
            <input type="email" onChange={(e)=> setemail(e.target.value) }/>
        </div>
        <div>
            <label htmlFor="">Old password</label>
            <input type="password" onChange={(e)=> setoldPassword(e.target.value)} />
        </div>
        <div>
            <label htmlFor="">New Password</label>
            <input type="password" onChange={(e)=> setnewPassword(e.target.value)}/>
        </div>
        
        <div>
            <button>submit</button>
        </div>





        </form>

      
    </div>
  )
}

export default ChangePassword

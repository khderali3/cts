'use client';

import { useRouter } from 'next/navigation'
import { toast } from "react-toastify";
import Spinner from '@/app/(site)/_components/jsx/spinner';

import { useChangePasswordMutation } from '@/app/(site)/_components/redux/features/authApiSlice';

import { useState } from 'react';



const changePassword = ( ) => {
	const router = useRouter();
    const [changePassword, {isLoading} ] = useChangePasswordMutation()


    const [formData, setFormData] = useState({
        new_password: '',
        re_new_password: '',
        current_password: ''
    })
    const {  new_password, re_new_password, current_password } = formData

    const onChange = (event) => {
        setFormData({...formData, [event.target.name]: event.target.value})
    }   

    const onSubmit = (event) => {
        event.preventDefault()
        changePassword({ new_password, re_new_password, current_password})
        .unwrap()
        .then(() => {
          toast.success('changed password succusfuly')
          router.push('/')
          
        })
        .catch( (err) => {
            console.log(err)
             toast.error('error change password , kindly check you inputs again')

        })
    }

    return (
        <>
        
        <main className="form-signin col-4 py-5">
            <form onSubmit={onSubmit}>


        <h1 className="h3 mb-3 fw-normal">Change password  </h1>



        <div className="form-floating pb-1">
        <input
            type="password"
            className="form-control"
            id="current_password"
            placeholder="current_password"
            name='current_password'
            value={current_password}
            onChange={onChange}

        />
        <label htmlFor="current_password">current Password</label>
        </div>




        <div className="form-floating pb-1">
        <input
            type="password"
            className="form-control"
            id="new_password"
            placeholder="new_password"
            name='new_password'
            value={new_password}
            onChange={onChange}


        />
        <label htmlFor="new_password">New Password</label>
        </div>


        <div className="form-floating pb-1">
        <input
            type="password"
            className="form-control"
            id="re_new_password"
            placeholder="re_new_password"
            name="re_new_password"
            value={re_new_password}
            onChange={onChange}


        />
        <label htmlFor="re_new_password">confirm New Password</label>
        </div>


    
        <button className="w-100 btn btn-lg btn-primary" type="submit">

        { isLoading ? <Spinner />  : 'Change password '  }
        
        </button>
        <p className="mt-5 mb-3 text-muted">©CloudTech</p>
    </form>
    </main>



        </>
    )
}

export default changePassword

'use client'
import { useState } from "react"
import { toast } from "react-toastify"
import { useRouter } from 'next/navigation';

import { useCustomFetchMutation } from "@/app/(dashboard)/_components/redux_staff/features/authApiSlice";
import { useDispatch } from 'react-redux';
import { setAuth,finishIntialLoad,setloginFirstName,setprofileImage,setIsStaff,setIsSupserUser,setGroups,setPermissions  } from '@/app/(dashboard)/_components/redux_staff/features/authSlice';
import { redirect } from "next/navigation";


const Login = () => {

  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const [customFetch] = useCustomFetchMutation();
	const dispatch = useDispatch();
	const router = useRouter();


  const handleChange = (e) => {
    setForm( (prevState) => {
      return {...prevState, [e.target.name] : e.target.value}
      })
  }

  const handlesubmit = async (e) => {
      const formdata = new FormData();
      formdata.append("email", form.email);
      formdata.append("password", form.password);

      e.preventDefault()
      console.log('the form was submited')
      if (form.email.trim() !== '' 
      && form.password.trim() !== ''
    ) {

      try {
        // Send form data using customFetch mutation
        const response = await customFetch({
          url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/staff/auth/create/`,
          method: "POST",
          body: formdata, // Send FormData as the body
        });
  
        if (response && response.data) {
          console.log('response.data', response.data)
          if(response.data.is_staff === true || response.data.is_superuser === true){
            dispatch(setAuth());
            dispatch(setloginFirstName(response.data.firstname))
            dispatch(setprofileImage(response.data.PRF_image)) 
            dispatch(setIsStaff(response.data.is_staff)) 
            dispatch(setIsSupserUser(response.data.is_superuser)) 
            dispatch(setGroups(response.data.groups)) 
            dispatch(setPermissions(response.data.permissions)) 
            
            toast.success('Logged in');
            router.push('/staff');

          } else {
            toast.error("you have no permission to access this area");
            router.push('/');
          }

 
        } else {
          
          console.log(response)
          if(response.error.data.non_field_errors){
            toast.error(response.error.data.non_field_errors[0]);

          
          } else {
            toast.error("Failed to login");
         
          }
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        toast.error("Error with login ");
      }


    } else { 
      toast.error("Please fill out your email and password and try again! ");
    }

    dispatch(finishIntialLoad())
  }


    return (
        <>
<div className="d-flex vh-100 align-items-center justify-content-center">

    <div className="login-box ">
      <div className="login-logo">

          <b>CloudTech</b>Sky

      </div>

      <div className="card">
        <div className="card-body login-card-body">
          <p className="login-box-msg">Sign in to start your session</p>
          <form  onSubmit={handlesubmit}>        
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="floatingEmail"
                placeholder="Email"
                name='email'
                value={form.email}
                onChange={handleChange}
                required

              />
              <label htmlFor="floatingEmail">Email</label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control"
                id="floatingPassword"
                placeholder="Password"
                name='password'
                value={form.password}
                onChange={handleChange}
                required
              />
              <label htmlFor="floatingPassword">Password</label>
            </div>


            <div className="row">
              <div className="col-8">

              </div>
              <div className="col-4">
                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-primary">
                    Sign In
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>

</div>
      </>
      
    )
}


export default Login
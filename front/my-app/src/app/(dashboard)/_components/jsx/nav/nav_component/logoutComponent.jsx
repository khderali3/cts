
'use client';

import { useDispatch } from "react-redux"
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

import { useLogoutMutation } from '@/app/(dashboard)/_components/redux_staff/features/authApiSlice';
import {setLogout } from '@/app/(dashboard)/_components/redux_staff/features/authSlice';


const LogoutLink = () => {

    const router = useRouter()
    const [logout] = useLogoutMutation();
    const dispatch = useDispatch();

      const handleLogout = (event) => {
        event.preventDefault()
        logout()
          .unwrap()
          .then(() => {
            console.log('log out clicked')
            dispatch(setLogout());
            toast.success('you have loged out succusfuly')
            router.push('/staff/account/login')
          })
          .catch( () => {
            console.log('logout failed')
            toast.error('field to logout!')
          })
      };





        return(
          <>
        <a className="btn btn-default btn-flat float-end" href="#" onClick={handleLogout}>
          logout
        </a>
          </>
        )
}

export default LogoutLink
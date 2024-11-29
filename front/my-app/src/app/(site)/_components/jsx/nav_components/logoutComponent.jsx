
'use client';

import { useDispatch } from "react-redux"
import { useLogoutMutation } from '@/app/(site)/_components/redux/features/authApiSlice';
import { logout as setLogout } from '@/app/(site)/_components/redux/features/authSlice';
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

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
            router.push('/')
          })
          .catch( () => {
            console.log('logout failed')
            toast.error('field to logout!')
          })
      };





        return(
          <>
        <a className="bg-focus dropdown-item text-light" href="#" onClick={handleLogout}>
          logout
        </a>
          </>
        )
}

export default LogoutLink
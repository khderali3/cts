


import { useState } from "react"
import { useResetPasswordMutation } from "@/app/(site)/_components/redux/features/authApiSlice";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";



export default function useResetPassword() {

    const router = useRouter()

    const [resetPassword, {isLoading} ] = useResetPasswordMutation()

    const [formData, setFormData] = useState({email:'' })
    const {email} = formData

    const onChange = (event) => {
      console.log('on change is clicked')
        setFormData({...formData, [event.target.name]: event.target.value})
    }    

    const onSubmit = (event) => {
        event.preventDefault()
        resetPassword(email)
        .unwrap()
        .then((data) => {
          console.log(data)
          console.log('kindly check your mailbox')
          router.push('/account/login')
          toast.success('kindly check your mailbox')
        })
        .catch( (error) => {
          console.log('reset password failed', error)
          toast.error('error with reset password')

        })



	};

	return {
		email,
		isLoading,
		onChange,
		onSubmit,
	};
}
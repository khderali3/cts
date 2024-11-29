'use client';

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from "react-toastify";

import { useActivationMutation } from '@/app/(site)/_components/redux/features/authApiSlice';

import { useParams } from 'next/navigation'




const activationAccount = ( {params} ) => {
	const router = useRouter();
	const [activation] = useActivationMutation();

    const {uid, token} = useParams()




	useEffect(() => {
		// const { uid, token } = params

        console.log(uid, token)

		activation({ uid, token })
			.unwrap()
			.then(() => {
				toast.success('Account activated');
			})
			.catch(() => {
				toast.error('Failed to activate account');
			})
			.finally(() => {
				router.push('/account/login');
			});
	}, []);

    return (
        <>
        

    <div className="form account_form d-flex align-items-center justify-content-center   background-color ">
        <div> 
        <h1 className="text-center text-light pt-5">
            CloudTech Company 
        </h1>
        <h3 className='text-success'> Activating your account... </h3>
        </div>
    </div>



        </>
    )
}

export default activationAccount

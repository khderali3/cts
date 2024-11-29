'use client'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';


import { setAuth, finishIntialLoad, setloginFirstName, setprofileImage } from '@/app/(site)/_components/redux/features/authSlice';

import { useVerifyMutation, useRetrieveUserQuery } from '@/app/(site)/_components/redux/features/authApiSlice';

import { useCustomFetchMutation } from '../redux/features/siteApiSlice';


export default function useVerify() {
	const dispatch = useDispatch();
	const [verify] = useVerifyMutation();
	const [customFetch] = useCustomFetchMutation();

	const fetchData = async (pageUrl) => {
		
		try {
		  const response = await customFetch({
			url: pageUrl,
			method: 'GET', // Only use 'GET' for fetching data
			headers: {
			  'Content-Type': 'application/json',
			}, 
		  });

		  if(response && response.data ){
			const data = response.data
			if (data?.first_name) {
				dispatch(setloginFirstName(data?.first_name))
			}
			if(data?.profile.PRF_image){
				dispatch(setprofileImage(data?.profile.PRF_image))
			}

		  } else {
			console.log('error response', response.data)
		  }
	 	 	
	
		} catch (error) {
		  console.error("Error fetching data:", error);
		}
		
	  };
	
	






	useEffect(() => {
		verify()
			.unwrap()
			.then(() => {
				dispatch(setAuth());
				fetchData(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/me/`)



			})
			.finally(() => {
				dispatch(finishIntialLoad());
			});

			


	}, []);




}



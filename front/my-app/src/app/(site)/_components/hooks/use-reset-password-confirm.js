import { useRouter } from 'next/navigation'
import { toast } from "react-toastify";
import { useResetPasswordConfirmMutation } from '@/app/(site)/_components/redux/features/authApiSlice';
import { useState } from 'react';

export default function useResetPasswordConfirm(uid, token) {
	const router = useRouter();

	const [resetPasswordConfirm, { isLoading }] = useResetPasswordConfirmMutation();


	const [formData, setFormData] = useState({
		new_password: '',
		re_new_password: '',
	});

	const { new_password, re_new_password } = formData;

	const onChange = (event) => {
		const { name, value } = event.target;

		setFormData({ ...formData, [name]: value });
	};

	const onSubmit = (event) => {
		event.preventDefault();

		// resetPasswordConfirm({ uid, token, new_password, re_new_password })
		// 	.unwrap()
		// 	.then(() => {
		// 		toast.success('Password reset successful');
		// 		router.push('/account/login');
		// 	})
		// 	.catch((err) => {
        //         console.log(err)
		// 		toast.error('Password reset failed');
		// 	});


        if(new_password.trim() !== '' && re_new_password.trim() !== '') {
			if(new_password.trim() ===  re_new_password.trim()) {
			resetPasswordConfirm({ uid, token, new_password, re_new_password })
				.unwrap()
				.then(() => {
					toast.success('Password reset successful');
					router.push('/account/login');
				})
				.catch((err) => {
					console.log(err)
					toast.error('Password reset failed');
				});

			} else {
				toast.error('Password and confirm password do not match');
			}

		} else {
			toast.error('All fields are required');
		}


	};

	return {
		new_password,
		re_new_password,
		isLoading,
		onChange,
		onSubmit,
	};
}
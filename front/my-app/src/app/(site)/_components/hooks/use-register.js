import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useRegisterMutation } from '../redux/features/authApiSlice';
import { toast } from 'react-toastify';
export default function useRegister() {
	const router = useRouter();
	const [register, { isLoading }] = useRegisterMutation();

	const [formData, setFormData] = useState({
		first_name: '',
		last_name: '',
		email: '',
		password: '',
		re_password: '',
	});

	const { first_name, last_name, email, password, re_password } = formData;

	const onChange = (event ) => {
		const { name, value } = event.target;

		setFormData({ ...formData, [name]: value });
	};

	const onSubmit = (event) => {
		event.preventDefault();


				// register({ first_name, last_name, email, password, re_password })
				// .unwrap()
				// .then(() => {
				// 	toast.success('Please check email to verify account');
				// 	router.push('/account/login');
				// })
				// .catch((error) => {
					
				// 	toast.error('Failed to register account');
				// 	console.log(error)
				// });
		
			


		if (first_name.trim() !== '' && last_name.trim() !== '' 
		&& email.trim() !== '' && password.trim() !== ''
		&& re_password.trim() !== '') {
		
		if (password.trim().length < 8) {
			toast.error(`Password must be at least 8 characters long`);
		} else if (password.trim() !== re_password.trim()) {
			toast.error('Password and confirm password do not match');
		} else {
		register({ first_name, last_name, email, password, re_password })
			.unwrap()
			.then(() => {
				toast.success('Please check email to verify account');
				router.push('/account/login');
			})
			.catch(() => {
				toast.error('Failed to register account');
			});
		}
		
	} else {
		toast.error('All fields are required');
	}
	





	};

	return {
		first_name,
		last_name,
		email,
		password,
		re_password,
		isLoading,
		onChange,
		onSubmit,
	};
}
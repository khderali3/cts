import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { useDispatch } from 'react-redux';
import { useLoginMutation } from '../redux/features/authApiSlice';
import { setAuth, setloginFirstName, setprofileImage } from '../redux/features/authSlice';
import { toast } from 'react-toastify';
import { jwtDecode} from 'jwt-decode';

export default function useLogin() {
	const router = useRouter();
	const dispatch = useDispatch();
	const [login, { isLoading }] = useLoginMutation();

	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const { email, password } = formData;

	const onChange = (event) => {
		const { name, value } = event.target;

		setFormData({ ...formData, [name]: value });
	};

	const onSubmit = (event) => {
		event.preventDefault();


		login({ email, password })
			.unwrap()
			.then((data) => {

				if (email.trim() !== '' && password.trim() !== '') {
					dispatch(setAuth());
					const token_info = jwtDecode(data.access)
					const user_first_name = token_info?.first_name
					dispatch(setloginFirstName(user_first_name))
					const profileImage = token_info?.PRF_image
					dispatch(setprofileImage(profileImage)) 
					toast.success('Logged in');
					router.push('/');

				} else  {
				toast.error('All fields are required');
				}
			})
			.catch(() => {
				toast.error('Failed to log in');
			});
	};

	return {
		email,
		password,
		isLoading,
		onChange,
		onSubmit,
	};
}
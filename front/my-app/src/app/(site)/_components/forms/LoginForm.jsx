'use client';


import useLogin from '../hooks/use-login';
import Form from './Form';

export default function LoginForm() {
	const { email, password, isLoading, onChange, onSubmit } = useLogin();

	const config = [
		{
			labelText: 'Email address',
			labelId: 'email',
			type: 'email',
			value: email,
			required: true,
		},
		{
			labelText: 'Password',
			labelId: 'password',
			type: 'password',
			value: password,
			required: true,
			link: {
				linkText: 'Forgot password?',
				linkUrl: '/account/password-reset',
			},
		},
	];

	return (
		<Form
			form_title='Login Page'
			config={config}
			isLoading={isLoading}
			btnText='Sign in'
			onChange={onChange}
			onSubmit={onSubmit}
		/>
	);
}
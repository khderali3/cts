'use client';

import useResetPassword from '../hooks/use-reset-password';
import Form from './Form';


export default function ResetPasswordForm() {
	const {  email, isLoading, onChange, onSubmit } = useResetPassword();

	const config = [

		{
			labelText: 'input your email address ',
			labelId: 'email',
			type: 'email',
			value: email,
			required: true,
		},



	];

	return (
		<Form
			config={config}
			isLoading={isLoading}
			btnText='Reset Password'
			onChange={onChange}
			onSubmit={onSubmit}
		/>
	);
}

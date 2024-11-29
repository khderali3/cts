'use client';

import useChangePassword from '../hooks/use-change-password';
import Form from './Form';





export default function ChangePasswordForm() {
	const {  new_password, re_new_password, current_password, isLoading, onChange, onSubmit } = useChangePassword();

	const config = [

		{
			labelText: 'current password',
			labelId: 'current_password',
			type: 'password',
			value: current_password,
			required: true,
		},
		{
			labelText: 'new password',
			labelId: 'new_password',
			type: 'password',
			value: new_password,
			required: true,
		},
		{
			labelText: 're new password',
			labelId: 're_new_password',
			type: 'password',
			value: re_new_password,
			required: true,
		},





	];

	return (
		<Form
			config={config}
			isLoading={isLoading}
			btnText='Change Password'
			onChange={onChange}
			onSubmit={onSubmit}
		/>
	);
}

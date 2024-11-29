import Spinner from '../jsx/spinner';

import Input from './Input';

export default function Form({
	config,
	isLoading,
	btnText,
	onChange,
	onSubmit,

}) {
	return (
		<form   onSubmit={onSubmit}     >
			 
			{config.map(input => (
				<Input
					key={input.labelId}
					labelId={input.labelId}
					type={input.type}
					onChange={onChange}
					value={input.value}
					required={input.required}
					link={input.link}
					
				>
					{input.labelText}
				</Input>
			))}

			<div>
				<button
					type='submit'
					className='w-100 btn btn-lg btn-primary m-0'
					disabled={isLoading}
				>
					{isLoading ? <Spinner />  : `${btnText}`}
				</button>
			</div>
		</form>
	);
}
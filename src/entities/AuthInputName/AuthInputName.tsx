import { FC } from 'react';
import { TextField } from 'reshaped/bundle';
import * as S from './AuthInputName.styled';

interface IAuthInputProps {
	register: any;
	name: string;
	placeholder: string;
	label: string;
	errors: Record<string, any>;
}

export const AuthInputName: FC<IAuthInputProps> = ({ register, name, placeholder, label, errors }) => {
	return (
		<>
			<S.MyText variant='body-2'>{label}</S.MyText>
			<TextField
				hasError={errors && errors[name]}
				name={name}
				placeholder={placeholder}
				attributes={{ style: { marginBottom: 20 } }}
				inputAttributes={{ ...register(name, { required: true, pattern: /^[а-яА-ЯёЁ]+$/ }) }}
			/>
		</>
	);
};

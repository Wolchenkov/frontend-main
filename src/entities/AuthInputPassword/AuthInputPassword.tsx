import { Dispatch, forwardRef, MutableRefObject, SetStateAction } from 'react';
import { TextField } from 'reshaped/bundle';
import { SvgComponent } from '../../shared';
import * as S from './AuthInputPassword.styled';
import { UseFormSetValue } from 'react-hook-form';

interface IAuthInputProps {
	register: any;
	hidePassword: boolean;
	setHidePassword: Dispatch<SetStateAction<boolean>>;
	name: string;
	placeholder: string;
	label: string;
	errors: Record<string, any>;
	login?: boolean;
	setValue?: UseFormSetValue<{
		email: string | null;
		password: string;
		remember: boolean;
	}>;
	ref: MutableRefObject<HTMLInputElement | null>;
}

export const AuthInputPassword = forwardRef<HTMLInputElement, IAuthInputProps>(
	({ register, hidePassword, setHidePassword, name, placeholder, label, errors, login, setValue }, ref) => {
		return (
			<>
				<S.MyText variant='body-2'>{label}</S.MyText>
				<TextField
					hasError={errors && errors[name]}
					name={name}
					placeholder={placeholder}
					attributes={{ style: { marginBottom: 20 } }}
					onChange={(e) => {
						setValue &&
							setValue('password', e.value, {
								shouldDirty: true,
								shouldValidate: true,
							});
					}}
					inputAttributes={
						!login
							? {
									...register(name, {
										required: true,
										minLength: 8,
										maxLength: 36,
										pattern: /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@_!%$*~()#^`&?<>\-+=_{}\\[\]]{8,36}$/,
									}),
									type: hidePassword ? 'password' : 'text',
							  }
							: {
									...register(name, {
										required: true,
									}),
									type: hidePassword ? 'password' : 'text',
									ref,
							  }
					}
					endIcon={
						hidePassword ? (
							<SvgComponent
								name='eye-off'
								style={{ cursor: 'pointer', pointerEvents: 'all' }}
								onClick={() => setHidePassword(false)}
							/>
						) : (
							<SvgComponent
								name='eye-on'
								style={{ cursor: 'pointer', pointerEvents: 'all' }}
								onClick={() => setHidePassword(true)}
							/>
						)
					}
				/>
			</>
		);
	}
);
AuthInputPassword.displayName = 'AuthInputPassword';

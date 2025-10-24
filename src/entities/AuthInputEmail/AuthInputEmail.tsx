import React, { forwardRef, MutableRefObject, useImperativeHandle } from 'react';
import { TextField } from 'reshaped/bundle';
import { SvgComponent } from '../../shared';
import { ChangeHandler } from 'reshaped/types/global';
import * as S from './AuthInputEmail.styles';
import { UseFormSetValue } from 'react-hook-form';

interface IAuthInputProps {
	serverError?: boolean;
	register: any;
	margin?: number;
	emailForm?: string;
	handleEmail?: ChangeHandler<string>;
	delEmailInput?: () => void;
	errors: Record<string, any>;
	setValue?: UseFormSetValue<{
		email: string | null;
		password: string;
		remember: boolean;
	}>;
}

export const AuthInputEmail = forwardRef<HTMLInputElement, IAuthInputProps>(
	({ register, emailForm, handleEmail, delEmailInput, margin, errors, serverError, setValue }, ref) => {
		const { ref: registerRef, ...rest } = register('email', { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i });
		useImperativeHandle(registerRef, () => ref ? (ref as MutableRefObject<HTMLInputElement | null>).current : {});

		return (
			<>
				<S.MyText variant='body-2' align='start'>
					Email
				</S.MyText>
				<TextField
					hasError={(errors && errors.email) || serverError}
					name='email'
					placeholder='Введите свой email...'
					attributes={{ style: { marginBottom: margin ? margin : 20 } }}
					inputAttributes={{
						ref,
						...rest
					}}
					onChange={(e) => {
						handleEmail?.(e);
						setValue &&
							setValue('email', e.value, {
								shouldDirty: true,
								shouldValidate: true,
							});
					}}
					endIcon={
						emailForm ? (
							<SvgComponent
								name='close-circle'
								style={{ cursor: 'pointer', pointerEvents: 'all' }}
								onClick={delEmailInput}
							/>
						) : (
							<></>
						)
					}
				/>
			</>
		);
	}
);
AuthInputEmail.displayName = 'AuthInputEmail';

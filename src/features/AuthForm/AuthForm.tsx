import { FC, MutableRefObject } from 'react';
import { Button, Text } from 'reshaped/bundle';
import { AuthCheckbox, AuthHeader, AuthInputEmail, AuthInputPassword } from '../../entities';
import * as S from './AuthForm.styled';
import { FieldErrors, SubmitHandler, UseFormHandleSubmit, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { ChangeHandler } from 'reshaped/types/global';
import { SvgComponent } from '../../shared';
import { IFormInput } from './AuthFormController';

interface IAuthFormProps {
	handleSubmit: UseFormHandleSubmit<IFormInput>;
	onSubmit: SubmitHandler<IFormInput>;
	serverError: boolean;
	delEmailInput: () => void;
	handleEmail: ChangeHandler<string>;
	register: UseFormRegister<IFormInput>;
	emailForm: string;
	hidePassword: boolean;
	navigateRestorePassword: () => Promise<boolean>;
	isValid: boolean;
	setHidePassword: React.Dispatch<React.SetStateAction<boolean>>;
	setCheckbox: React.Dispatch<React.SetStateAction<boolean>>;
	errors: FieldErrors<IFormInput>;
	authByGoogle: () => Promise<void>;
	touchedFields: Partial<
		Readonly<{
			email?: boolean | undefined;
			password?: boolean | undefined;
			remember?: boolean | undefined;
		}>
	>;
	wasInitiallyAutofilled: boolean;
	setValue: UseFormSetValue<IFormInput>;
	inputEmailRef: MutableRefObject<HTMLInputElement | null>;
	inputPasswordRef: MutableRefObject<HTMLInputElement | null>;
	authByMailRu: () => Promise<void>;
}

export const AuthForm: FC<IAuthFormProps> = ({
	authByGoogle,
	handleSubmit,
	onSubmit,
	serverError,
	delEmailInput,
	handleEmail,
	register,
	emailForm,
	hidePassword,
	navigateRestorePassword,
	isValid,
	setHidePassword,
	setCheckbox,
	errors,
	touchedFields,
	wasInitiallyAutofilled,
	setValue,
	inputEmailRef,
	inputPasswordRef,
	authByMailRu
}) => {
	return (
		<S.MainContainer>
			<AuthHeader svgName='main-logo' marginBottom={40} text='Войти в Brave Manager' />
			<Button variant='outline' startIcon={<SvgComponent name='google' />} onClick={authByGoogle}>
				<Text variant='body-2' attributes={{ style: { fontWeight: '500', letterSpacing: '-0.02em' } }}>
					Войти с помощью Google
				</Text>
			</Button>
			<S.ButtonMail variant='outline'  startIcon={<SvgComponent name='mail-ru' />} onClick={authByMailRu}>
				<Text variant='body-2' attributes={{ style: { color: '#ffffff', fontWeight: '400', letterSpacing: '-0.02em' } }}>
					Войти с помощью Mail.ru
				</Text>
			</S.ButtonMail>
			<S.MyDivider />
			<form onSubmit={handleSubmit(onSubmit)} style={{ padding: '2px' }}>
				<AuthInputEmail
					errors={errors}
					register={register}
					emailForm={emailForm}
					handleEmail={handleEmail}
					delEmailInput={delEmailInput}
					setValue={setValue}
					ref={inputEmailRef}
				/>
				<AuthInputPassword
					errors={errors}
					register={register}
					hidePassword={hidePassword}
					setHidePassword={setHidePassword}
					name='password'
					placeholder='Введите свой пароль...'
					label='Пароль'
					login={true}
					setValue={setValue}
					ref={inputPasswordRef}
				/>
				<S.Container>
					<AuthCheckbox setCheckbox={setCheckbox} />
					<Text
						color='primary'
						variant='body-2'
						attributes={{
							style: { letterSpacing: '-0.02em', cursor: 'pointer' },
							onClick: navigateRestorePassword,
						}}
					>
						Забыли пароль?
					</Text>
				</S.Container>
				<Button
					disabled={Object.keys(touchedFields).length ? !isValid : !wasInitiallyAutofilled}
					color={'primary'}
					attributes={{ style: { marginBottom: 12 } }}
					fullWidth={true}
					type='submit'
				>
					<Text variant='body-2' attributes={{ style: { fontWeight: '500', letterSpacing: '-0.02em' } }}>
						Отправить
					</Text>
				</Button>
			</form>
			<Text
				color={(errors && errors.email) || serverError ? 'critical' : 'neutral-faded'}
				variant='caption-1'
				attributes={{ style: { fontWeight: '500', letterSpacing: '-0.01em' } }}
			>
				{(errors && errors.email) || serverError
					? 'Проверьте корректность данных в полях логина или пароля'
					: 'Мы пришлем проверочный 4-х значный код на ваш email'}
			</Text>
		</S.MainContainer>
	);
};

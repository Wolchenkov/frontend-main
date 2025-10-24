import { FC } from 'react';
import { Button, Text } from 'reshaped/bundle';
import { AuthCheckbox, AuthHeader, AuthInputName, AuthInputPassword } from '../../../entities';
import { useFirstLoginFormController } from './FirstLoginFormController';
import { Alert } from 'reshaped/bundle';
import * as S from './FirstLoginForm.styled';

export const FirstLoginForm: FC = () => {
	const {
		handleSubmit,
		onSubmitPassword,
		register,
		hidePassword,
		setHidePassword,
		setCheckbox,
		step,
		onSubmit,
		email,
		alertColor,
		alertMessage,
		errors,
	} = useFirstLoginFormController();

	return (
		<>
			{step ? (
				<S.MainContainer>
					<AuthHeader svgName='main-logo' marginBottom={32} text={`Придумайте пароль для входа в аккаунт ${email} `} />
					<S.Container>
						<form onSubmit={handleSubmit(onSubmitPassword)} style={{ padding: '2px' }}>
							<AuthInputPassword
								register={register}
								errors={errors}
								hidePassword={hidePassword}
								setHidePassword={setHidePassword}
								label='Пароль'
								name='password'
								placeholder='Введите свой пароль...'
							/>
							<AuthInputPassword
								register={register}
								errors={errors}
								hidePassword={hidePassword}
								setHidePassword={setHidePassword}
								label='Подтвердите пароль'
								name='confirmPassword'
								placeholder='Введите новый пароль ещё раз...'
							/>
							<AuthCheckbox setCheckbox={setCheckbox} />
							<Alert color={alertColor} attributes={{ style: { margin: '32px 0' } }}>
								{alertMessage}
							</Alert>
							<Button color='primary' attributes={{ style: { marginBottom: 12 } }} fullWidth={true} type='submit'>
								<Text variant='body-2' attributes={{ style: { fontWeight: '500', letterSpacing: '-0.02em' } }}>
									Далее
								</Text>
							</Button>
						</form>
					</S.Container>
				</S.MainContainer>
			) : (
				<S.MainContainer>
					<AuthHeader svgName='main-logo' marginBottom={64} text='Введите свое имя и фамилию' />
					<S.Container>
						<form onSubmit={handleSubmit(onSubmit)}>
							<AuthInputName
								errors={errors}
								register={register}
								name='firstName'
								placeholder='Введите свое имя...'
								label='Имя'
							/>
							<AuthInputName
								errors={errors}
								register={register}
								name='lastName'
								placeholder='Введите свою фамилию...'
								label='Фамилия'
							/>
							<Alert color={alertColor} attributes={{ style: { margin: '41px 0' } }}>
								Ваши имя и фамилия должны содержать только буквы на кириллице
							</Alert>
							<Button color='primary' fullWidth={true} type='submit'>
								<Text variant='body-2' attributes={{ style: { fontWeight: '500', letterSpacing: '-0.02em' } }}>
									Войти в таск-трекер
								</Text>
							</Button>
						</form>
					</S.Container>
				</S.MainContainer>
			)}
		</>
	);
};

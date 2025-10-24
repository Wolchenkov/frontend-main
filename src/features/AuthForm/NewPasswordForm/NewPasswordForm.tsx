import { FC } from 'react';
import { Alert, Button, Text } from 'reshaped/bundle';
import { AuthInputPassword } from '../../../entities';
import { useNewPasswordFormController } from './NewPasswordFormController';

export const NewPasswordForm: FC = () => {
	const { register, handleSubmit, onSubmit, hidePassword, setHidePassword, errors, alertColor, alertMessage } =
		useNewPasswordFormController();

	return (
		<form onSubmit={handleSubmit(onSubmit)} style={{ padding: '2px' }}>
			<AuthInputPassword
				errors={errors}
				register={register}
				hidePassword={hidePassword}
				setHidePassword={setHidePassword}
				name='password'
				placeholder='Введите новый пароль...'
				label='Пароль'
			/>
			<AuthInputPassword
				errors={errors}
				register={register}
				hidePassword={hidePassword}
				setHidePassword={setHidePassword}
				name='confirmPassword'
				placeholder='Введите новый пароль ещё раз...'
				label='Подтвердите пароль'
			/>
			<Alert color={alertColor} attributes={{ style: { margin: '32px 0' } }}>
				{alertMessage}
			</Alert>
			<Button color='primary' attributes={{ style: { marginTop: 16 } }} fullWidth={true} type='submit'>
				<Text variant='body-2' attributes={{ style: { fontWeight: '500', letterSpacing: '-0.02em' } }}>
					Обновить пароль
				</Text>
			</Button>
		</form>
	);
};

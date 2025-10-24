import { FC } from 'react';
import { Button, FormControl, TextField } from 'reshaped/bundle';
import * as S from '../Profile.styled';
import { useProfileDetailFormController } from './ProfileDetailFormController';

interface IProfileDetailForm {
	user: IMember | undefined;
	refetch: any;
}

export const ProfileDetailForm: FC<IProfileDetailForm> = ({ user, refetch }) => {
	const { errors, inputValues, onChangeValues, hasChanges, handleSubmitChanges } = useProfileDetailFormController({
		user,
		refetch,
	});

	return (
		<form style={{ display: 'flex', flexDirection: 'column', gap: 20, marginTop: 32 }}>
			<FormControl hasError={errors.firstName}>
				<FormControl.Label>Имя</FormControl.Label>
				<TextField
					value={inputValues.firstName}
					name='firstName'
					placeholder='Введите свое имя...'
					onChange={({ name, value }) => onChangeValues(name, value)}
				/>
				{inputValues.firstName !== '' && (
					<FormControl.Error>
						<S.Text500 variant='caption-1' color='critical'>
							Допускаются только символы кириллицы без пробелов
						</S.Text500>
					</FormControl.Error>
				)}
			</FormControl>
			<FormControl hasError={errors.lastName}>
				<FormControl.Label>Фамилия</FormControl.Label>
				<TextField
					value={inputValues.lastName}
					name='lastName'
					placeholder='Введите свою фамилию...'
					onChange={({ name, value }) => onChangeValues(name, value)}
				/>
				{inputValues.lastName !== '' && (
					<FormControl.Error>
						<S.Text500 variant='caption-1' color='critical'>
							Допускаются только символы кириллицы без пробелов
						</S.Text500>
					</FormControl.Error>
				)}
			</FormControl>
			<FormControl hasError={errors.email}>
				<FormControl.Label>Почта</FormControl.Label>
				<TextField
					value={inputValues.email}
					name='email'
					placeholder='Введите электронную почту...'
					onChange={({ name, value }) => onChangeValues(name, value)}
				/>
				{inputValues.email !== '' && (
					<FormControl.Error>
						<S.Text500 variant='caption-1' color='critical'>
							Неверный формат электронной почты
						</S.Text500>
					</FormControl.Error>
				)}
			</FormControl>
			<FormControl hasError={errors.telegram}>
				<FormControl.Label>Telegram</FormControl.Label>
				<TextField
					value={inputValues.telegram}
					name='telegram'
					placeholder='Введите ник в телеграмм...'
					onChange={({ name, value }) => onChangeValues(name, value)}
				/>
				{inputValues.telegram !== '' && (
					<FormControl.Error>
						<S.Text500 variant='caption-1' color='critical'>
							Допускаются только символы латиницы и цифры без пробелов
						</S.Text500>
					</FormControl.Error>
				)}
			</FormControl>
			<FormControl disabled>
				<FormControl.Label>Должность</FormControl.Label>
				<TextField name='role' value={inputValues.role} />
			</FormControl>
			<FormControl disabled>
				<FormControl.Label>Команда</FormControl.Label>
				<TextField name='team' value={inputValues.team} />
			</FormControl>
			<Button
				color='primary'
				disabled={Object.values(errors).some((error) => error) || !hasChanges()}
				onClick={handleSubmitChanges}
			>
				Сохранить изменения
			</Button>
		</form>
	);
};

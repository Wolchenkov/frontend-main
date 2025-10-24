import { FC } from 'react';
import { Button, Divider, View } from 'reshaped/bundle';
import * as S from './AddUserInput.styled';
import { SvgComponent } from '../../../shared';
import { PillAddUser } from './Pills';
import { useAddUserInputController } from './AddUserInputController';
import { ConfirmModal } from '../ConfirmModal/ConfirmModal';

interface IAddUser {
	email: string;
	role: number;
	team: number;
	position: number;
	editMode: boolean;
	id: number;
	error: string;
}
interface IErrors {
	id: number;
	error: string;
}
interface ILabelledValue {
	label: string;
	id: number;
	value: string;
}
interface IEmptyTeamProps {
	setAddUsers: React.Dispatch<React.SetStateAction<IAddUser[]>>;
	addUsers: IAddUser[];
	mode: string | boolean;
	isClientTeam: boolean;
	id: number;
	errorMessage: IErrors[];
	setErrorMessage: React.Dispatch<React.SetStateAction<IErrors[]>>;
	rolesWithLabels: ILabelledValue[] | undefined;
	teamsWithLabels: ILabelledValue[] | undefined;
	positionsWithLabels: ILabelledValue[] | undefined;
}

export const AddUserInput: FC<IEmptyTeamProps> = ({
	mode,
	addUsers,
	setAddUsers,
	isClientTeam,
	id,
	errorMessage,
	setErrorMessage,
	rolesWithLabels,
	teamsWithLabels,
	positionsWithLabels,
}) => {
	const {
		handleOnChange,
		activeModalDeleteRow,
		activateModalDeleteRow,
		deactivateModalDeleteRow,
		confirmDelete,
		myErrorMessage,
	} = useAddUserInputController(
		mode,
		isClientTeam,
		setAddUsers,
		setErrorMessage,
		errorMessage,
		id,
		teamsWithLabels,
		rolesWithLabels
	);
	const userData = addUsers.find((user) => user.id === id);
	return (
		<>
			<View padding={4}>
				<View
					paddingBottom={4}
					align='center'
					direction='row'
					attributes={{ style: { justifyContent: 'space-between' } }}
				>
					<S.MyInput
						isValidEmail={myErrorMessage}
						value={userData?.email}
						placeholder='Введите email участника…'
						onChange={(e) => handleOnChange(e)}
					/>
					<View direction='row' gap={1}>
						{addUsers.length >= 1 && addUsers[0].email && (
							<Button
								onClick={activateModalDeleteRow}
								size='small'
								color='white'
								startIcon={<SvgComponent name='close-line' />}
							/>
						)}
					</View>
				</View>
				<View direction='row' gap={1} paddingBottom={1}>
					{!isClientTeam && (
						<PillAddUser
							mode='Роль'
							dropdownValues={rolesWithLabels?.filter((role) => role.value !== 'client')}
							pillValue={userData?.role || 0}
							setPillValue={setAddUsers}
							startIcon={<SvgComponent name='account-circle' />}
							isInvalid={!!(myErrorMessage?.includes('все поля') && userData?.role === 0)}
							id={id}
						/>
					)}
					<PillAddUser
						currentTeam={mode}
						mode='Команда'
						dropdownValues={teamsWithLabels}
						pillValue={userData?.team || 0}
						setPillValue={setAddUsers}
						startIcon={<SvgComponent name='group-neutral-faded' />}
						isInvalid={!!(myErrorMessage?.includes('все поля') && userData?.team === 0)}
						id={id}
					/>
					{!isClientTeam && (
						<PillAddUser
							mode='Должность'
							dropdownValues={positionsWithLabels}
							pillValue={userData?.position || 0}
							setPillValue={setAddUsers}
							startIcon={<SvgComponent name='award-line' />}
							isInvalid={!!(myErrorMessage?.includes('все поля') && userData?.position === 0)}
							id={id}
						/>
					)}
				</View>
				{myErrorMessage && (
					<S.MyText variant='caption-1' color='critical'>
						{myErrorMessage}
					</S.MyText>
				)}
				<ConfirmModal
					active={activeModalDeleteRow}
					deactivate={deactivateModalDeleteRow}
					confirmDel={confirmDelete}
					text={'Вы действительно хотите удалить это поле?'}
				/>
			</View>
			<Divider />
		</>
	);
};

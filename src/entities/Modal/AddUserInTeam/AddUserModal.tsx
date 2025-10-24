import React, { FC } from 'react';
import { Button, Divider, Modal, View } from 'reshaped/bundle';
import { SvgComponent } from '../../../shared';
import * as S from './AddUserModal.styled';
import { AddUserInput } from './AddUserInput';
import { useAddUserModalController } from './AddUserModalController';

interface IAddUserModalprops {
	mode: string | boolean;
	active: boolean;
	onClose: () => void;
	size: string;
	isClientTeam: boolean;
	projectId?: number;
}

export const AddUserModal: FC<IAddUserModalprops> = ({ mode, active, onClose, size, isClientTeam, projectId }) => {
	const {
		closeModal,
		checkData,
		addUsers,
		setAddUsers,
		errorMessage,
		setErrorMessage,
		rolesWithLabels,
		teamsWithLabels,
		positionsWithLabels,
	} = useAddUserModalController({ onClose, isClientTeam, projectId });

	return (
		<S.MyModal size={size} active={active} onClose={closeModal} padding={0}>
			<View padding={4} direction='row' align='center' attributes={{ style: { justifyContent: 'space-between' } }}>
				<Modal.Title>
					<S.MyText variant='body-2'>Добавить участников</S.MyText>
				</Modal.Title>
				<SvgComponent
					name='close-line-modal'
					style={{ cursor: 'pointer', pointerEvents: 'all' }}
					onClick={closeModal}
				/>
			</View>
			<Divider />
			<S.ScrollableDiv>
				{addUsers.map((user) => (
					<AddUserInput
						mode={mode}
						key={user.id}
						addUsers={addUsers}
						setAddUsers={setAddUsers}
						isClientTeam={isClientTeam}
						id={user.id}
						errorMessage={errorMessage}
						setErrorMessage={setErrorMessage}
						rolesWithLabels={rolesWithLabels}
						teamsWithLabels={teamsWithLabels}
						positionsWithLabels={positionsWithLabels}
					/>
				))}
			</S.ScrollableDiv>

			<View direction='row' align='center' padding={4} attributes={{ style: { justifyContent: 'space-between' } }}>
				<Button
					onClick={() => checkData('addMore')}
					color='white'
					type='button'
					size='small'
					startIcon={<SvgComponent name='user-add-primary' />}
				>
					<S.MyText variant='body-2' color='primary'>
						{projectId ? (isClientTeam ? 'Ещё клиент' : 'Ещё исполнитель') : 'Ещё участник'}
					</S.MyText>
				</Button>
				<Button onClick={() => checkData('sendInvites')} color='primary' type='button' size='small'>
					Добавить
				</Button>
			</View>
		</S.MyModal>
	);
};

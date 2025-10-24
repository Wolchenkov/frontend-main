import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { Button, Divider, Modal, View, useToggle } from 'reshaped/bundle';
import { SvgComponent } from '../../../shared';
import * as S from './AddUserInProjectModal.styled';
import OneMember from './OneMember';
import { AddUserModal } from '../AddUserInTeam/AddUserModal';
import { useGetUserQuery } from '../../../store/auth/authApi';
interface IAddUserModalprops {
	active: boolean;
	onClose: () => void;
	size: string;
	isClientTeam: boolean;
	membersToAdd: IMember[] | undefined;
	setAddUserData: Dispatch<SetStateAction<IMember[]>>;
	addUserData: IMember[];
	addUsers: () => void;
	projectId: number | undefined;
}

export const AddUserInProjectModal: FC<IAddUserModalprops> = ({
	active,
	onClose,
	size,
	isClientTeam,
	membersToAdd,
	addUserData,
	setAddUserData,
	addUsers,
	projectId,
}) => {
	//поиск-фильтр
	const [search, setSearch] = useState('');
	const [filteredMembers, setFilteredMembers] = useState<IMember[]>(membersToAdd || []);

	useEffect(() => {
		if (!search) {
			setFilteredMembers(membersToAdd || []);
			return;
		}
		setFilteredMembers(
			(membersToAdd || []).filter((member) => member.name.toLowerCase().includes(search.toLowerCase()))
		);
	}, [search, membersToAdd]);

	const {
		active: activeModalAddUser,
		activate: activateModalAddUser,
		deactivate: deactivateModalAddUser,
	} = useToggle(false);

	function closeModal() {
		onClose();
		setSearch('');
	}

	const { data: user } = useGetUserQuery();

	return (
		<S.MyModal size={size} active={active} onClose={closeModal} padding={0}>
			<View padding={4} direction='row' align='center' attributes={{ style: { justifyContent: 'space-between' } }}>
				<Modal.Title>
					<S.MyText variant='body-medium-2'>Добавить {isClientTeam ? 'клиентов' : 'исполнителей'}</S.MyText>
				</Modal.Title>
				<SvgComponent
					name='close-line-modal'
					style={{ cursor: 'pointer', pointerEvents: 'all' }}
					onClick={closeModal}
				/>
			</View>
			<Divider />
			<div style={{ padding: '8px 12px' }}>
				<S.MyInput
					placeholder='Поиск...'
					onChange={(e) => {
						setSearch(e.target.value);
					}}
				/>
			</div>
			<S.ScrollableDiv>
				{filteredMembers?.map((member) => (
					<OneMember
						isSelected={addUserData.map(({ id }) => id).includes(member.id)}
						key={member.id}
						member={member}
						setAddUserData={setAddUserData}
					/>
				))}
			</S.ScrollableDiv>
			<Divider />
			<View
				direction='row'
				align='center'
				padding={4}
				attributes={{
					style: {
						justifyContent: user?.role?.name === 'admin' || user?.role?.name === 'unitMaster' ? 'space-between' : 'end',
					},
				}}
			>
				{(user?.role?.name === 'admin' || user?.role?.name === 'unitMaster') && (
					<Button
						onClick={activateModalAddUser}
						color='white'
						size='small'
						startIcon={<SvgComponent name='user-add-primary' />}
					>
						<S.MyText variant='body-medium-2' color='primary'>
							Пригласить
						</S.MyText>
					</Button>
				)}
				<View direction='row' gap={1}>
					<Button onClick={() => setAddUserData([])} size='small' disabled={addUserData.length === 0}>
						<S.MyText variant='body-medium-2'>Сбросить</S.MyText>
					</Button>
					<Button
						disabled={addUserData.length === 0}
						onClick={() => {
							addUsers();
							closeModal();
						}}
						color='primary'
						size='small'
					>
						Добавить
					</Button>
				</View>
			</View>
			<AddUserModal
				size='660px'
				active={activeModalAddUser}
				onClose={deactivateModalAddUser}
				mode={false}
				isClientTeam={isClientTeam}
				projectId={projectId}
			/>
		</S.MyModal>
	);
};

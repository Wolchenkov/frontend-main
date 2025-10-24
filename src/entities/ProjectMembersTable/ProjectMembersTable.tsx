import { FC } from 'react';
import * as S from './ProjectMembersTable.styled';
import ProjectMembersRow from './ProjectMembersRow/ProjectMembersRow';
import { Button, Text } from 'reshaped/bundle';
import { SvgComponent } from '../../shared';
import { AddUserInProjectModal } from '../Modal/AddUserInProject/AddUserInProjectModal';
import { useProjectMemberTableController } from './ProjectMembersTableController';
import { ProjectInvitedUsersRow } from './ProjectMembersRow/InveitedUsers/ProjectInvitedUsersRow';

interface IProjectMembersTableProps {
	dataProject: IOneProject | undefined;
	isClientTeam: boolean;
	allMembers: IMember[] | undefined;
	members: IMembersState;
	setMembers: React.Dispatch<React.SetStateAction<IMembersState>>;
	managerId?: number;
}

const ProjectMembersTable: FC<IProjectMembersTableProps> = ({
	dataProject,
	isClientTeam,
	allMembers,
	members: { clients, members },
	setMembers,
	managerId,
}) => {
	const {
		membersToAdd,
		addUsers,
		delUser,
		activeModalAddUser,
		activateModalAddUser,
		deactivateModalAddUser,
		addUserData,
		setAddUserData,
	} = useProjectMemberTableController({
		isClientTeam,
		allMembers,
		members: { clients, members },
		setMembers,
	});

	return (
		<div style={{ width: '100%' }}>
			<Text variant='body-strong-1' attributes={{ style: { letterSpacing: '-0.02em', marginBottom: 12 } }}>
				{isClientTeam ? 'Клиенты' : 'Исполнители'}
			</Text>
			<S.Table>
				{(isClientTeam ? clients : members)?.map((member, index) => (
					<ProjectMembersRow
						key={member.id}
						member={member}
						index={index}
						isClientTeam={isClientTeam}
						delUser={delUser}
						managerId={managerId}
					/>
				))}
				{(isClientTeam ? dataProject?.invitedUsers.clients : dataProject?.invitedUsers.members)?.map(
					(invitedUser, index) => (
						<ProjectInvitedUsersRow
							key={index}
							row={invitedUser}
							isOnlyInvitedUsers={isClientTeam ? clients.length === 0 : members.length === 0}
							isOnlyOneNotInvitedUser={isClientTeam ? clients.length === 1 : members.length === 1}
							index={index}
						/>
					)
				)}
			</S.Table>
			<Button color='white' size='small' onClick={activateModalAddUser} startIcon={<SvgComponent name='add-line' />}>
				<S.MyText color='neutral-faded' variant='caption-1'>
					Добавить участника
				</S.MyText>
			</Button>
			<AddUserInProjectModal
				size='660px'
				active={activeModalAddUser}
				onClose={() => {
					deactivateModalAddUser();
					setAddUserData([]);
				}}
				isClientTeam={isClientTeam}
				membersToAdd={membersToAdd}
				addUserData={addUserData}
				setAddUserData={setAddUserData}
				addUsers={addUsers}
				projectId={dataProject?.id}
			/>
		</div>
	);
};

export default ProjectMembersTable;

import { FC, useState } from 'react';
import { Button, DropdownMenu, Text, useToggle } from 'reshaped/bundle';
import { SvgComponent } from '../../../../../shared';
import { AddUserInProjectModal } from '../../../../../entities';
import {
	useGetProjectClientMembersQuery,
	useGetProjectMembersQuery,
} from '../../../../../store/dictionaries/dictionariesApi';
import { useRouter } from 'next/router';
import { useUpdateMembersInProjectMutation } from '../../../../../store/projects/projectsApi';
import { useShowToast } from '../../../../../shared/utility/Hooks';

interface IMemberSwitcherProps {
	dataProject: IOneProject | undefined;
	members: IMembersState;
	setMembers: React.Dispatch<React.SetStateAction<IMembersState>>;
}
export const MemberSwitcher: FC<IMemberSwitcherProps> = ({
	dataProject,
	members: { clients, members },
	setMembers,
}) => {
	const router = useRouter();
	const { slug } = router.query;
	const showToast = useShowToast();

	const {
		active: activeModalAddUser,
		activate: activateModalAddUser,
		deactivate: deactivateModalAddUser,
	} = useToggle(false);
	const [isClientTeam, setIsClientTeam] = useState(false);

	const { data: allOurMembers } = useGetProjectMembersQuery();
	const { data: allClientMembers } = useGetProjectClientMembersQuery();

	const allMembers = isClientTeam ? allClientMembers : allOurMembers;
	const membersToAdd = isClientTeam
		? allMembers?.filter((member1) => !clients?.some((member2) => member2.id === member1.id))
		: allMembers?.filter((member1) => !members?.some((member2) => member2.id === member1.id));

	const [addUserData, setAddUserData] = useState<IMember[]>([]);

	const [updateProject] = useUpdateMembersInProjectMutation();

	function addUsers() {
		const updatedMembers = (prevMembers: IMember[]) => prevMembers.concat(addUserData);
		const getUpdatedIds = (members: IMember[]) => members?.map(({ id }) => id).concat(addUserData.map(({ id }) => id));
		setMembers((prev) =>
			isClientTeam
				? { ...prev, clients: updatedMembers(prev.clients) }
				: { ...prev, members: updatedMembers(prev.members) }
		);
		const body = isClientTeam ? { clients: getUpdatedIds(clients) } : { members: getUpdatedIds(members) };
		const payload = { projectSlug: slug, body };

		updateProject(payload).then(() => {
			showToast(isClientTeam ? 'Клиенты добавлены' : 'Исполнители добавлены');
			setAddUserData([]);
		});
	}

	return (
		<>
			<DropdownMenu width='131px' position='bottom-end'>
				<DropdownMenu.Trigger>
					{(attributes) => (
						<Button
							{...attributes}
							color='primary'
							startIcon={<SvgComponent name='add-white' />}
							size='small'
							attributes={{ style: { letterSpacing: '-0.02em' } }}
						>
							Участник
						</Button>
					)}
				</DropdownMenu.Trigger>
				<DropdownMenu.Content>
					<DropdownMenu.Item
						size='small'
						onClick={() => {
							setIsClientTeam(false);
							activateModalAddUser();
						}}
					>
						<Text variant='body-medium-2' attributes={{ style: { letterSpacing: '-0.02em' } }}>
							Исполнитель
						</Text>
					</DropdownMenu.Item>
					<DropdownMenu.Item
						size='small'
						onClick={() => {
							setIsClientTeam(true);
							activateModalAddUser();
						}}
					>
						<Text variant='body-medium-2' attributes={{ style: { letterSpacing: '-0.02em' } }}>
							Клиент
						</Text>
					</DropdownMenu.Item>
				</DropdownMenu.Content>
			</DropdownMenu>
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
		</>
	);
};

import { useState } from 'react';
import { useToggle } from 'reshaped/bundle';

import { useRouter } from 'next/router';
import { useUpdateMembersInProjectMutation } from '../../store/projects/projectsApi';
import { useShowToast } from '../../shared/utility/Hooks';

interface IProjectMembersTableProps {
	isClientTeam: boolean;
	allMembers: IMember[] | undefined;
	members: IMembersState;
	setMembers: React.Dispatch<React.SetStateAction<IMembersState>>;
}

export const useProjectMemberTableController = ({
	isClientTeam,
	allMembers,
	members: { clients, members },
	setMembers,
}: IProjectMembersTableProps) => {
	const router = useRouter();
	const { slug } = router.query;
	const showToast = useShowToast();

	const membersToAdd = isClientTeam
		? allMembers?.filter((member1) => !clients?.some((member2) => member2.id === member1.id))
		: allMembers?.filter((member1) => !members?.some((member2) => member2.id === member1.id));

	const [addUserData, setAddUserData] = useState<IMember[]>([]);

	const [updateProject] = useUpdateMembersInProjectMutation();

	// function addUsers() {
	// 	setMembers((prev) =>
	// 		isClientTeam
	// 			? { ...prev, clients: prev.clients.concat(addUserData) }
	// 			: { ...prev, members: prev.members.concat(addUserData) }
	// 	);
	// 	const body = isClientTeam
	// 		? { clients: clients?.map(({ id }) => id).concat(addUserData.map(({ id }) => id)) }
	// 		: { members: members?.map(({ id }) => id).concat(addUserData.map(({ id }) => id)) };

	// 	const payload = { projectSlug: slug, body };

	// 	updateProject(payload).then(() => {
	// 		showToast(isClientTeam ? 'Клиенты добавлены' : 'Исполнители добавлены');
	// 		setAddUserData([]);
	// 	});
	// }

	function addUsers() {
		const updatedMembers = (prevMembers: IMember[]) => prevMembers.concat(addUserData);
		const getUpdatedIds = (members: IMember[]) => members?.map(({ id }) => id).concat(addUserData.map(({ id }) => id));
		const body = isClientTeam ? { clients: getUpdatedIds(clients) } : { members: getUpdatedIds(members) };
		const payload = { projectSlug: slug, body };

		updateProject(payload).then(() => {
			showToast(isClientTeam ? 'Клиенты добавлены' : 'Исполнители добавлены');
			setMembers((prev) =>
				isClientTeam
					? { ...prev, clients: updatedMembers(prev.clients) }
					: { ...prev, members: updatedMembers(prev.members) }
			);
			setAddUserData([]);
		});
	}

	function delUser(id: number) {
		const updatedMembers = (prevMembers: IMember[]) => prevMembers.filter((user) => user.id !== id);
		const getUpdatedIds = (members: IMember[]) => members?.filter((user) => user.id !== id).map((member) => member.id);

		setMembers((prev) =>
			isClientTeam
				? { ...prev, clients: updatedMembers(prev.clients) }
				: { ...prev, members: updatedMembers(prev.members) }
		);

		const body = isClientTeam ? { clients: getUpdatedIds(clients) } : { members: getUpdatedIds(members) };

		const payload = { projectSlug: slug, body };

		updateProject(payload).then(() => {
			showToast('Участник удален');
		});
	}

	const {
		active: activeModalAddUser,
		activate: activateModalAddUser,
		deactivate: deactivateModalAddUser,
	} = useToggle(false); //  модалкa добавления пользователя

	return {
		membersToAdd,
		addUsers,
		delUser,
		activeModalAddUser,
		activateModalAddUser,
		deactivateModalAddUser,
		addUserData,
		setAddUserData,
	};
};

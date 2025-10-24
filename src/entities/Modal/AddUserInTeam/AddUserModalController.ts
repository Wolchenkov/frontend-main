import { useState } from 'react';
import {
	useCheckInviteMutation,
	useGetClientTeamsQuery,
	useGetOurTeamsQuery,
	useInviteMutation,
} from '../../../store/teams/teamsApi';
import { useGetPositionsQuery, useGetRolesQuery } from '../../../store/dictionaries/dictionariesApi';
import { ROLES_LABELS } from '../../../shared/utility/Constants/roleLabels';
import { useInviteInProjectMutation } from '../../../store/projects/projectsApi';
import { useShowToast } from '../../../shared/utility/Hooks';

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
interface IAddUserModalControllerProps {
	onClose: () => void;
	isClientTeam?: boolean;
	projectId?: number;
}

export function useAddUserModalController({ onClose, isClientTeam, projectId }: IAddUserModalControllerProps) {
	const rolesLabels = ROLES_LABELS;
	const { data: roles } = useGetRolesQuery();
	const rolesWithLabels = roles?.map((item) => ({
		...item,
		label: rolesLabels[item.value],
	}));

	const { data: ourTeams } = useGetOurTeamsQuery();
	const { data: clientTeams } = useGetClientTeamsQuery();
	const teamsWithLabels = isClientTeam
		? clientTeams?.map((el) => ({ ...el, label: el.value }))
		: ourTeams?.map((el) => ({ ...el, label: el.value }));

	const { data: positions } = useGetPositionsQuery();
	const positionsWithLabels = positions?.map((el) => ({ ...el, label: el.value }));

	const [addUsers, setAddUsers] = useState<IAddUser[]>([
		{
			email: '',
			role: 0,
			team: 0,
			position: isClientTeam ? 1 : 0,
			editMode: true,
			id: 1,
			error: '',
		},
	]); // данные об участниках

	const addMoreUser = () => {
		setAddUsers((prev) => [
			...prev,
			{
				email: '',
				role: 0,
				team: 0,
				position: isClientTeam ? 1 : 0,
				editMode: true,
				id: Math.max(...prev.map((el) => el.id)) + 1,
				error: '',
			},
		]);
	};

	const isEmailValid = (email: string) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email);

	const [errorMessage, setErrorMessage] = useState<IErrors[]>([]);

	const [checkInvite] = useCheckInviteMutation();

	const checkData = (mode: 'addMore' | 'sendInvites') => {
		const errors: IErrors[] = addUsers.map((el) => ({ id: el.id, error: '' }));

		const promises = addUsers.map((userData, index) =>
			checkInvite({
				email: userData.email,
				role_id: userData.role,
				team_id: userData.team,
			}).then((data: any) => {
				const isValidEmail = isEmailValid(userData.email);
				const firstEmailIndex = addUsers.findIndex((user) => user.email === userData.email);
				const isEmailDuplicate = index !== firstEmailIndex;
				const isOtherFieldsNotEmpty = !!(userData.role && userData.team && userData.position);
				const errorObject = errors.find((err) => err.id === userData.id);

				if (!errorObject) {
					return;
				}

				const hasEmailError = data?.error?.data.errors.email || !isValidEmail || isEmailDuplicate;

				errorObject.error = '';

				if (hasEmailError && !isOtherFieldsNotEmpty) {
					errorObject.error = 'Введите уникальную корректную почту и заполните все поля';
				} else if (hasEmailError) {
					errorObject.error = 'Введите уникальную корректную почту';
				} else if (!isOtherFieldsNotEmpty) {
					errorObject.error = 'Заполните все поля';
				}
			})
		);

		Promise.all(promises).then(() => {
			const isEveryErrorEmpty = errors.every((err) => err.error === '');
			setErrorMessage([...errors]);
			if (isEveryErrorEmpty) {
				if (mode === 'addMore') {
					addMoreUser();
				} else {
					sendInvites();
				}
			}
		});
	};

	const closeModal = () => {
		onClose();
		setAddUsers([
			{
				email: '',
				role: 0,
				team: 0,
				position: isClientTeam ? 1 : 0,
				editMode: true,
				id: 1,
				error: '',
			},
		]);

		setErrorMessage([]);
	};

	const [inviteInTeam] = useInviteMutation();
	const [inviteInProject] = useInviteInProjectMutation();
	const showToast = useShowToast();

	const sendInvites = () => {
		const payload = addUsers.map((user) => {
			const payloadForUser = {
				email: user.email,
				role_id: user.role,
				team_id: user.team,
				...(projectId && { project_id: projectId }),
				...(!isClientTeam && { position_id: user.position }),
			};
			return payloadForUser;
		});

		const handleSuccess = (data: any) => {
			if (data?.data?.message === 'Приглашения высланы') {
				closeModal();
				showToast('Приглашения отправлены');
			}
		};

		const inviteFunc = projectId ? inviteInProject : inviteInTeam;
		inviteFunc({ data: payload }).then(handleSuccess);
	};

	return {
		closeModal,
		addUsers,
		setAddUsers,
		errorMessage,
		setErrorMessage,
		checkData,
		rolesWithLabels,
		teamsWithLabels,
		positionsWithLabels,
	};
}

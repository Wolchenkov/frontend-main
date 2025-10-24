import { useState } from 'react';
import { useToggle } from 'reshaped/bundle';
import { useGetPositionsQuery, useGetRolesQuery } from '../../../../../store/dictionaries/dictionariesApi';
import { ROLES_LABELS } from '../../../../../shared/utility/Constants/roleLabels';
import {
	useChangePositionMutation,
	useChangeRateMutation,
	useChangeRoleMutation,
	useChangeTeamMutation,
	useDeleteUserMutation,
} from '../../../../../store/teams/teamsApi';
import { useShowToast } from '../../../../../shared/utility/Hooks';

export function useTableRowController(row: UserForTeam) {
	const {
		active: activeModalDelUser,
		activate: activateModalDelUser,
		deactivate: deactivateModalDelUser,
	} = useToggle(false); // стейт для модалки удаления пользователя
	const {
		active: activeModalChangeTeam,
		activate: activateModalChangeTeam,
		deactivate: deactivateModalChangeTeam,
	} = useToggle(false); // стейт для модалки смены команды

	const showToast = useShowToast();

	const rolesLabels = ROLES_LABELS;
	const { data: roles } = useGetRolesQuery();
	const rolesWithLabels = roles?.map((item) => ({
		...item,
		label: rolesLabels[item.value],
	}));

	const { data: positions } = useGetPositionsQuery();
	const positionsWithLabels = positions?.map((el) => ({ ...el, label: el.value }));

	const [hoverRow, setHoverRow] = useState(false); // стейт для hover над строкой
	const [hoverRoleMenu, setHoverRoleMenu] = useState(false); // стейт для hover над ячейкой роли
	const [hoverHourlyRate, setHoverHourlyRate] = useState(false); // стейт для hover над ячейкой стоимости работы
	const [isEditHourlyRate, setIsEditHourRate] = useState(false); //стейт для редактирования стоимости работы
	const [newHourlyRate, setNewHourlyRate] = useState(''); // стейт с новой стоимостью работы
	const [hoverPositionMenu, setHoverPositionMenu] = useState(false); // стейт для hover над ячейкой должности

	const [newRole] = useChangeRoleMutation();
	function changeRole(roleId: number) {
		newRole({
			user_id: +row.id,
			role: roleId,
		}).then(() => {
			setHoverRoleMenu(false);
			setHoverRow(false);
		});
	}

	const [isClicked, setIsClicked] = useState(false);
	const [changeRate] = useChangeRateMutation();
	function changeHourlyRate() {
		if (newHourlyRate === '') {
			setIsEditHourRate(!isEditHourlyRate);
			setHoverRow(false);
		} else if (!isClicked) {
			setIsClicked(true);
			changeRate({
				user_id: +row.id,
				rate: Number(newHourlyRate.replace(/\s/g, '')),
			})
				.unwrap()
				.then(() => {
					setTimeout(() => {
						setIsEditHourRate(!isEditHourlyRate);
						setNewHourlyRate('');
						setIsClicked(false);
					}, 1830);
				});
		}
	}

	const [newPosition] = useChangePositionMutation();
	function changePosition(positionId: number) {
		newPosition({
			user_id: +row.id,
			position_id: positionId,
		}).then(() => {
			setHoverPositionMenu(false);
			setHoverRow(false);
		});
	}

	const [delUser] = useDeleteUserMutation();
	function deleteUser() {
		delUser(+row.id).then(() => {
			deactivateModalDelUser();
			showToast('Участник удалён');
		});
	}

	const [newTeam] = useChangeTeamMutation();
	function changeTeam(teamId: number) {
		newTeam({
			user_id: +row.id,
			team_id: teamId,
		}).then(() => {
			deactivateModalChangeTeam();
			showToast('Участник перемещён в другую команду');
		});
	}

	const {
		active: isDropdownRoleActive,
		activate: activateDropdownRole,
		deactivate: deactivateDropdownRole,
	} = useToggle(false); // дропдаун для роли
	const {
		active: isDropdownPositionActive,
		activate: activateDropdownPosition,
		deactivate: deactivateDropdownPosition,
	} = useToggle(false); // дропдаун для должности
	const {
		active: isDropdownMoreActive,
		activate: activateDropdownMore,
		deactivate: deactivateDropdownMore,
	} = useToggle(false); // дропдаун для строки

	const handleDropdownMenuRoleClick = () => {
		isDropdownRoleActive ? deactivateDropdownRole() : activateDropdownRole();
	};
	const handleDropdownMenuPositionClick = () => {
		isDropdownPositionActive ? deactivateDropdownPosition() : activateDropdownPosition();
	};
	const handleDropdownMenuMoreClick = () => {
		isDropdownMoreActive ? deactivateDropdownMore() : activateDropdownMore();
	};

	const handleDropdownMenuClose = () => {
		deactivateDropdownRole();
		deactivateDropdownPosition();
		deactivateDropdownMore();
	};

	return {
		hoverRow,
		setHoverRow,
		setHoverRoleMenu,
		rolesLabels,
		hoverRoleMenu,
		isDropdownRoleActive,
		handleDropdownMenuClose,
		handleDropdownMenuRoleClick,
		rolesWithLabels,
		changeRole,
		setHoverHourlyRate,
		isEditHourlyRate,
		setNewHourlyRate,
		hoverHourlyRate,
		changeHourlyRate,
		setIsEditHourRate,
		setHoverPositionMenu,
		positionsWithLabels,
		hoverPositionMenu,
		isDropdownPositionActive,
		changePosition,
		isDropdownMoreActive,
		handleDropdownMenuPositionClick,
		deactivateDropdownMore,
		handleDropdownMenuMoreClick,
		activateModalChangeTeam,
		activateModalDelUser,
		activeModalDelUser,
		deactivateModalDelUser,
		deleteUser,
		activeModalChangeTeam,
		deactivateModalChangeTeam,
		changeTeam,
	};
}

import { useState } from 'react';
import { useToggle } from 'reshaped/bundle';

import {
	useChangeTeamNameMutation,
	useChangeTeamTypesWorkMutation,
	useDeleteTeamMutation,
} from '../../../../store/teams/teamsApi';
import { useShowToast } from '../../../../shared/utility/Hooks';

interface ITableData {
	data: UserForTeam[];
	teamId: number;
	invitedUsers: InvitedUser[];
	teamNames: string[] | undefined;
}

export function useTableOurTeamController({ data, invitedUsers, teamId, teamNames }: ITableData) {
	const [isExpanded, setIsExpanded] = useState(false); //стейт для состояния свернутой и развернутой таблицы

	const handleExpandClick = () => {
		setIsExpanded(!isExpanded);
	};

	const allData = [...data, ...invitedUsers];
	const displayData = isExpanded ? allData : allData.slice(0, 12);

	const [isHoveredTitle, setIsHoveredTitle] = useState(false); // стейт ховера изменения команды

	const {
		active: activeModalAddUser,
		activate: activateModalAddUser,
		deactivate: deactivateModalAddUser,
	} = useToggle(false); //  модалкa добавления пользователя
	const {
		active: activeModalChangeTeamName,
		activate: activateModalChangeTeamName,
		deactivate: deactiveModalChangeTeamName,
	} = useToggle(false); //  модалкa изменения названия команды

	const {
		active: activeModalChangeRate,
		activate: activateModalChangeRate,
		deactivate: deactivateModalChangeRate,
	} = useToggle(false); //  модалкa редакирования ставок команды

	const {
		active: activeModalDelUser,
		activate: activateModalDelUser,
		deactivate: deactivateModalDelUser,
	} = useToggle(false); // стейт для модалки удаления пользователя

	const [isValidName, setIsValidName] = useState(true);
	const [changeTeamName] = useChangeTeamNameMutation();

	const changeName = (newTeamName: string) => {
		if (teamNames?.map((el) => el.toLowerCase()).includes(newTeamName.trim().toLowerCase())) {
			setIsValidName(false);
			return;
		}
		changeTeamName({ teamId, name: newTeamName }).then(() => {
			setIsValidName(true);
			deactiveModalChangeTeamName();
		});
	};

	const [fetchingTypesData, setFetchingTypesData] = useState<fetchingTypeWork[]>([]);
	const [newTypesWork] = useChangeTeamTypesWorkMutation();
	const showToast = useShowToast();

	const changeTypesWork = () => {
		newTypesWork({ teamId, typeWork: fetchingTypesData.map((t) => ({ id: t.id, cost: t.cost })) }).then(() =>
			showToast('Изменения внесены')
		);
	};

	const [deleteCurrentTeam] = useDeleteTeamMutation();
	const delTeam = () => {
		deleteCurrentTeam(teamId).then(() => {
			setIsHoveredTitle(false);
		});
	};

	const { active: isDropdownActive, activate: activateDropdown, deactivate: deactivateDropdown } = useToggle(false);

	const handleDropdownMenuClick = () => {
		isDropdownActive ? deactivateDropdown() : activateDropdown();
	};

	const handleDropdownMenuClose = () => {
		deactivateDropdown();
	};

	return {
		setIsHoveredTitle,
		isHoveredTitle,
		isDropdownActive,
		handleDropdownMenuClose,
		handleDropdownMenuClick,
		activateModalChangeTeamName,
		activateModalDelUser,
		activateModalChangeRate,
		isExpanded,
		displayData,
		activateModalAddUser,
		allData,
		handleExpandClick,
		activeModalAddUser,
		deactivateModalAddUser,
		activeModalChangeTeamName,
		deactiveModalChangeTeamName,
		changeName,
		activeModalChangeRate,
		deactivateModalChangeRate,
		setFetchingTypesData,
		changeTypesWork,
		activeModalDelUser,
		deactivateModalDelUser,
		delTeam,
		isValidName,
		setIsValidName,
		fetchingTypesData,
	};
}

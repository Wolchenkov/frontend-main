import { useState } from 'react';
import { useToggle } from 'reshaped/bundle';
import { useChangeClientTeamNameMutation, useDeleteClientTeamMutation } from '../../../../store/teams/teamsApi';

interface IControllerData {
	data: UserForTeam[];
	teamId: number;
	teamNames: string[] | undefined;
	invitedUsers: InvitedUser[];
}
export function useTableClientTeamController({ data, teamId, invitedUsers, teamNames }: IControllerData) {
	const [isExpanded, setIsExpanded] = useState(false); //стейт для состояния свернутой и развернутой таблицы

	const handleExpandClick = () => {
		setIsExpanded(!isExpanded);
	};
	const {
		active: activeModalAddUser,
		activate: activateModalAddUser,
		deactivate: deactivateModalAddUser,
	} = useToggle(false); //  модалкa добавления пользователя

	const [isHoveredTitle, setIsHoveredTitle] = useState(false); // стейт ховера изменения команды

	const {
		active: activeModalChangeTeamName,
		activate: activateModalChangeTeamName,
		deactivate: deactiveModalChangeTeamName,
	} = useToggle(false); //  модалкa изменения названия команды
	const allData = [...data, ...invitedUsers];
	const displayData = isExpanded ? allData : allData.slice(0, 12);

	const [changeTeamName] = useChangeClientTeamNameMutation();
	const [isValidName, setIsValidName] = useState(true);

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
	const {
		active: activeModalDelUser,
		activate: activateModalDelUser,
		deactivate: deactivateModalDelUser,
	} = useToggle(false); // стейт для модалки удаления пользователя

	const [deleteCurrentTeam] = useDeleteClientTeamMutation();
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
		isDropdownActive,
		handleDropdownMenuClose,
		isHoveredTitle,
		handleDropdownMenuClick,
		activateModalChangeTeamName,
		activateModalDelUser,
		displayData,
		isExpanded,
		activateModalAddUser,
		handleExpandClick,
		activeModalAddUser,
		deactivateModalAddUser,
		activeModalChangeTeamName,
		deactiveModalChangeTeamName,
		changeName,
		activeModalDelUser,
		deactivateModalDelUser,
		delTeam,
		allData,
		isValidName,
		setIsValidName,
	};
}

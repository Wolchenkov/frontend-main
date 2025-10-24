import * as S from './PillChangeTeam.styled';
import { DropdownMenu, useToggle } from 'reshaped/bundle';
import React, { FC, useState } from 'react';
import { SvgComponent } from '../../../shared';
import { useGetOurTeamsQuery } from '../../../store/teams/teamsApi';

interface IPillProps {
	margin?: string;
	titleTeam: string;
	newTeam: number;
	setNewTeam: React.Dispatch<React.SetStateAction<number>>;
}

export const PillChangeTeam: FC<IPillProps> = ({ titleTeam, margin, newTeam, setNewTeam }) => {
	const { data: ourTeams } = useGetOurTeamsQuery();

	const teamsWithLabels = ourTeams?.map((el) => ({ ...el, label: el.value }));

	const [isPillActive, setIsPillActive] = useState(false);
	const { active: isDropdownActive, activate: activateDropdown, deactivate: deactivateDropdown } = useToggle(false);

	const handlePillButtonClick = () => {
		setIsPillActive(!isPillActive);
		isDropdownActive ? deactivateDropdown() : activateDropdown();
	};

	const handleDropdownMenuClose = () => {
		setIsPillActive(false);
		deactivateDropdown();
	};

	return (
		<>
			<DropdownMenu active={isDropdownActive} onClose={handleDropdownMenuClose}>
				<DropdownMenu.Trigger>
					{(attributes) => (
						<S.MyButton
							{...attributes}
							margin={margin}
							activeBtn={isPillActive}
							variant='outline'
							size='small'
							onClick={handlePillButtonClick}
							startIcon={<SvgComponent name='group-neutral-faded' />}
						>
							<S.MyText variant='caption-1'>
								{newTeam ? teamsWithLabels?.find((el) => el.id === newTeam)?.label : 'Выберите новую команду'}
							</S.MyText>
						</S.MyButton>
					)}
				</DropdownMenu.Trigger>
				<DropdownMenu.Content>
					<S.DropdopdownContent>
						{teamsWithLabels
							?.filter((team) => team.label !== titleTeam)
							.map((team, index) => (
								<DropdownMenu.Item
									key={index}
									onClick={() => {
										setNewTeam(team.id);
									}}
								>
									<S.MyText variant='body-medium-2'>{team.label}</S.MyText>
								</DropdownMenu.Item>
							))}
					</S.DropdopdownContent>
				</DropdownMenu.Content>
			</DropdownMenu>
		</>
	);
};

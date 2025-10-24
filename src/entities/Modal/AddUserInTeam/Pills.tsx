import * as S from './Pills.styled';
import { DropdownMenu, Text, useToggle } from 'reshaped/bundle';
import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import { SvgComponent } from '../../../shared';
interface IAddUser {
	email: string;
	role: number;
	team: number;
	position: number;
	editMode: boolean;
	id: number;
	error: string;
}

interface IPillProps {
	isInvalid: boolean;
	mode: string;
	startIcon: React.ReactElement<any, string | React.JSXElementConstructor<any>> | undefined;
	dropdownValues: ITeamsWithLabels[] | undefined;
	pillValue: number;
	setPillValue: Dispatch<SetStateAction<IAddUser[]>>;
	currentTeam?: string | boolean;
	id: number;
}
const modeKeys = {
	Команда: 'team',
	Должность: 'position',
	Роль: 'role',
} as const;

type ModeKeys = keyof typeof modeKeys;

export const PillAddUser: FC<IPillProps> = ({
	mode,
	dropdownValues,
	pillValue,
	setPillValue,
	startIcon,
	isInvalid,
	currentTeam,
	id: rowId,
}) => {
	const updateState = (key: keyof IAddUser, id: number) => {
		setPillValue((prev) => [
			...prev.map((user) => {
				if (user.id === rowId) {
					return { ...user, [key]: id };
				} else {
					return user;
				}
			}),
		]);
	};

	const dropdownAction = (id: number) => {
		const modeKey = modeKeys[mode as ModeKeys];
		updateState(modeKey, id);
	};

	const [isPillActive, setIsPillActive] = useState(false);
	const { active: isDropdownActive, activate: activateDropdown, deactivate: deactivateDropdown } = useToggle(false);

	const handlePillButtonClick = () => {
		!currentTeam && setIsPillActive(!isPillActive);
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
							disabled={!!currentTeam && mode === 'Команда'}
							active={isPillActive}
							isInvalid={isInvalid}
							variant='outline'
							size='small'
							onClick={handlePillButtonClick}
							startIcon={currentTeam && mode === 'Команда' ? <SvgComponent name='group-disabled' /> : startIcon}
						>
							<Text variant='caption-1' attributes={{ style: { fontWeight: '500', letterSpacing: '-0.01em' } }}>
								{!!currentTeam && mode === 'Команда'
									? currentTeam
									: pillValue
									? dropdownValues?.find((el) => el.id === pillValue)?.label
									: mode}
							</Text>
						</S.MyButton>
					)}
				</DropdownMenu.Trigger>

				<DropdownMenu.Content>
					<S.DropdopdownContent>
						{dropdownValues?.map((el, index) => (
							<DropdownMenu.Item key={index} onClick={() => dropdownAction(el.id)}>
								<Text
									variant='body-2'
									attributes={{
										style: {
											fontWeight: '500',
											letterSpacing: '-0.01em',
										},
									}}
								>
									{el.label}
								</Text>
							</DropdownMenu.Item>
						))}
					</S.DropdopdownContent>
				</DropdownMenu.Content>
			</DropdownMenu>
		</>
	);
};

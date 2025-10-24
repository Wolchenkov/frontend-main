import React, { FC } from 'react';
import * as S from './ProjectsTableHead.styled';
import { Button, DropdownMenu, Icon, Text } from 'reshaped/bundle';
import { SvgComponent } from '../../../../shared';
import { UserRole } from '../../../../shared/utility/Constants/userRole';

interface IProjectsTableHeadProps {
	userRole: string | undefined;
	columns: { id: string; name: string; access: UserRole[] }[];
	columnOptions: { id: string; name: string; access: UserRole[] }[];
	checkedColumnOptions: { id: string; name: string; access: UserRole[] }[];
	handleOptionClick: (option: { id: string; name: string; access: UserRole[] }) => void;
}

export const ProjectsTableHead: FC<IProjectsTableHeadProps> = ({
	userRole,
	columns,
	columnOptions,
	checkedColumnOptions,
	handleOptionClick,
}) => {
	return (
		<S.ProjectsTableHead>
			<S.ProjectsTableHeadColumns>
				{columns
					.filter((tab) => tab.access.includes(userRole as UserRole))
					.map((columnOption) => (
						<S.ProjectsTableHeadCell
							className={`ProjectsTableHeadCell__${columnOption.id}`}
							key={columnOption.id}
							show={checkedColumnOptions.includes(columnOption)}
						>
							<Text
								variant='caption-1'
								color='neutral-faded'
								attributes={{ style: { fontWeight: 500, letterSpacing: '-0.01em' } }}
							>
								{columnOption.name}
							</Text>
						</S.ProjectsTableHeadCell>
					))}
			</S.ProjectsTableHeadColumns>

			<DropdownMenu>
				<DropdownMenu.Trigger>
					{(attributes) => (
						<Button {...attributes} variant='ghost' startIcon={<SvgComponent name='eye-off-clear' />} size='small' />
					)}
				</DropdownMenu.Trigger>
				<DropdownMenu.Content>
					{columnOptions
						.filter((option) => option.access.includes(userRole as UserRole))
						.map((option) => (
							<S.ProjectsTableFilterOption key={option.id} onClick={() => handleOptionClick(option)}>
								<Icon
									svg={
										<SvgComponent
											name={`${checkedColumnOptions.includes(option) ? 'checkbox-checked' : 'checkbox-default'}`}
										/>
									}
									size={5}
									attributes={{ style: { marginRight: '8px' } }}
								/>
								<Text variant='body-2' attributes={{ style: { letterSpacing: '-0.02em' } }}>
									{option.name}
								</Text>
							</S.ProjectsTableFilterOption>
						))}
				</DropdownMenu.Content>
			</DropdownMenu>
		</S.ProjectsTableHead>
	);
};

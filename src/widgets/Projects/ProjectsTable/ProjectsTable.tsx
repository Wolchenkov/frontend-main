import React, { FC, useState } from 'react';
import * as S from './ProjectsTable.styled';
import { SvgComponent } from '../../../shared';
import { ProjectsTableHead } from './ProjectsTableHead/ProjectsTableHead';
import { ProjectsTableRow } from './ProjectsTableRow/ProjectsTableRow';
import { ProjectsGroup } from '../ProjectsTypes';
import { UserRole } from '../../../shared/utility/Constants/userRole';
import { Text } from 'reshaped/bundle';

const TABlE_COLUMNS = [
	{
		id: 'name',
		name: 'Название',
		access: [UserRole.CLIENT, UserRole.MEMBER, UserRole.MANAGER, UserRole.UNITMASTER, UserRole.ADMIN],
	},
	{
		id: 'manager',
		name: '',
		access: [UserRole.CLIENT, UserRole.MEMBER, UserRole.MANAGER, UserRole.UNITMASTER, UserRole.ADMIN],
	},
	{
		id: 'members',
		name: 'Участники',
		access: [UserRole.CLIENT, UserRole.MEMBER, UserRole.MANAGER, UserRole.UNITMASTER, UserRole.ADMIN],
	},
	{
		id: 'client',
		name: 'Заказчик',
		access: [UserRole.CLIENT, UserRole.MEMBER, UserRole.MANAGER, UserRole.UNITMASTER, UserRole.ADMIN],
	},
	{
		id: 'end',
		name: 'Окончание',
		access: [UserRole.CLIENT, UserRole.MEMBER, UserRole.MANAGER, UserRole.UNITMASTER, UserRole.ADMIN],
	},
	{
		id: 'start',
		name: 'Старт',
		access: [UserRole.CLIENT, UserRole.MEMBER, UserRole.MANAGER, UserRole.UNITMASTER, UserRole.ADMIN],
	},
	{
		id: 'budget',
		name: 'Бюджет',
		access: [UserRole.MANAGER, UserRole.UNITMASTER, UserRole.ADMIN],
	},
	{
		id: 'balance',
		name: 'Остаток',
		access: [UserRole.MANAGER, UserRole.UNITMASTER, UserRole.ADMIN],
	},
	{
		id: 'status',
		name: 'Статус',
		access: [UserRole.CLIENT, UserRole.MEMBER, UserRole.MANAGER, UserRole.UNITMASTER, UserRole.ADMIN],
	},
];

interface IProjectsTableProps {
	data: ProjectsGroup[];
	openModal: () => void;
	userRole: string | undefined;
}

export const ProjectsTable: FC<IProjectsTableProps> = ({ data, openModal, userRole }) => {
	const [columnOptions] = useState(TABlE_COLUMNS.slice(2));
	const [checkedColumnOptions, setCheckedColumnOptions] = useState(TABlE_COLUMNS.slice(2));
	const [isEveryIssueShown, setIsEveryIssueShown] = useState(false);

	const handleOptionClick = (option: { id: string; name: string; access: UserRole[] }) => {
		const isAlreadySelected = checkedColumnOptions.some((checked) => checked.id === option.id);
		if (isAlreadySelected) {
			setCheckedColumnOptions(checkedColumnOptions.filter((selected) => selected.id !== option.id));
		} else {
			setCheckedColumnOptions([...checkedColumnOptions, option]);
		}
	};

	const activeProjects = data.filter((project) => project.project_status.id !== 5 && project.project_status.id !== 6);
	const finishedProjects = data.filter((project) => project.project_status.id === 5 || project.project_status.id === 6);

	return (
		<S.ProjectsTable>
			<ProjectsTableHead
				userRole={userRole}
				columns={TABlE_COLUMNS}
				columnOptions={columnOptions}
				checkedColumnOptions={checkedColumnOptions}
				handleOptionClick={handleOptionClick}
			/>
			{activeProjects.map((projectData) => (
				<ProjectsTableRow
					key={projectData.name}
					userRole={userRole}
					data={projectData}
					columns={TABlE_COLUMNS}
					checkedColumnOptions={checkedColumnOptions}
				/>
			))}
			{userRole && !(userRole === UserRole.CLIENT || userRole === UserRole.MEMBER) && (
				<S.ProjectsAddButton variant='ghost' startIcon={<SvgComponent name='add' />} onClick={openModal}>
					Добавить
				</S.ProjectsAddButton>
			)}
			{isEveryIssueShown
				? finishedProjects.map((projectData) => (
						<ProjectsTableRow
							key={projectData.name}
							userRole={userRole}
							data={projectData}
							columns={TABlE_COLUMNS}
							checkedColumnOptions={checkedColumnOptions}
						/>
				  ))
				: finishedProjects
						.slice(0, 3)
						.map((projectData) => (
							<ProjectsTableRow
								key={projectData.name}
								userRole={userRole}
								data={projectData}
								columns={TABlE_COLUMNS}
								checkedColumnOptions={checkedColumnOptions}
							/>
						))}
			{finishedProjects.length > 3 && (
				<S.TableButton
					variant='ghost'
					startIcon={<SvgComponent name={isEveryIssueShown ? 'arrow-up-s' : 'arrow-down-s'} />}
					size='small'
					attributes={{ style: { padding: '10px 20px' } }}
					onClick={() => {
						setIsEveryIssueShown((shownState) => !shownState);
					}}
				>
					<Text
						variant='caption-1'
						color='neutral-faded'
						attributes={{ style: { marginLeft: '8px', lineHeight: '20px', fontWeight: 500, letterSpacing: '-0.01em' } }}
					>
						{isEveryIssueShown ? 'Скрыть' : `Все завершенные (${finishedProjects.length})`}
					</Text>
				</S.TableButton>
			)}
		</S.ProjectsTable>
	);
};

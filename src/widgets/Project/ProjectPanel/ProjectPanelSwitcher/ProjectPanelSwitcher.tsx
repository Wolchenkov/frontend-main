import React, { FC } from 'react';
import { ProjectTab } from '../../ProjectController';
import * as S from './ProjectPanelSwitcher.styled';
import { Button, Tooltip, useToggle } from 'reshaped/bundle';
import { SvgComponent } from '../../../../shared';
import { ProjectTypeSwitcher } from '../../ProjectTypeSwitcher/ProjectTypeSwitcher';
import { HandlerObject } from '../../ProjectController';
import { useAppDispatch, useAppSelector } from '../../../../store';
import { selectIsFilterOpened, setFilter, setIsFilterOpened } from '../../../../store/tasks/tasksSlice';
import { MemberSwitcher } from './MemberSwitcher/MemberSwitcher';
import { HistorySwitcher } from './HistorySwitcher/HistorySwitcher';
import TimeSwitcher from './TimeSwitcher';
import { ExpensesSwitcher } from './ExpensesSwitcher/ExpensesSwitcher';
import { AddNewTaskModal } from '../../../../entities';
import { AddDocumentButton } from '../../../../features';

interface ProjectPanelSwitcherProps {
	activeTab: ProjectTab;
	tabValueType: string;
	handleTabChange: (obj: HandlerObject) => void;
	dataProject: IOneProject | undefined;
	members: IMembersState;
	setMembers: React.Dispatch<React.SetStateAction<IMembersState>>;
	historyInterval: IHistoryInterval | null;
	setHistoryInterval: React.Dispatch<React.SetStateAction<IHistoryInterval | null>>;
	setExpensesData: React.Dispatch<React.SetStateAction<IOneExpense[] | undefined>>;
	showTimeFilters: boolean;
	setShowTimeFilters: React.Dispatch<React.SetStateAction<boolean>>;
	currentFolder: IFolder;
	isClientRole: boolean;
}

export const ProjectPanelSwitcher: FC<ProjectPanelSwitcherProps> = ({
	activeTab,
	tabValueType,
	handleTabChange,
	dataProject,
	members,
	setMembers,
	historyInterval,
	setHistoryInterval,
	setExpensesData,
	showTimeFilters,
	setShowTimeFilters,
	currentFolder,
	isClientRole,
}) => {
	const dispatch = useAppDispatch();
	const { name } = activeTab;

	const isFilterOpened = useAppSelector(selectIsFilterOpened);

	const {
		active: isModalAddTaskActive,
		activate: activateAddTaskModal,
		deactivate: deactivateAddTaskModal,
	} = useToggle(false); // дропдаун для добавления задачи

	return (
		<>
			{name === 'tasks' ? (
				<>
					{!isClientRole && (
						<>
							<Button
								color='primary'
								startIcon={<SvgComponent name={dataProject?.Kanban.length === 0 ? 'add' : 'add-white'} />}
								size='small'
								onClick={activateAddTaskModal}
								attributes={{ style: { letterSpacing: '-0.02em' } }}
								disabled={dataProject?.Kanban.length === 0}
							>
								Задача
							</Button>
							{dataProject && (
								<AddNewTaskModal
									active={isModalAddTaskActive}
									onClose={deactivateAddTaskModal}
									dataProject={dataProject}
								/>
							)}
						</>
					)}
					<ProjectTypeSwitcher tabValueType={tabValueType} handleTabChange={handleTabChange} />

					{!isClientRole && tabValueType === 'list' && (
						<Tooltip position='top-end' text={`${isFilterOpened ? 'Скрыть' : 'Показать'}${'\u00A0'}фильтры⠀`}>
							{(attributes) => (
								<S.ProjectFilterButton
									attributes={attributes}
									size='small'
									color='neutral'
									active={isFilterOpened}
									startIcon={<SvgComponent name={isFilterOpened ? 'filter-active' : 'filter'} />}
									onClick={() => {
										if (isFilterOpened) {
											dispatch(setIsFilterOpened(false));
											dispatch(setFilter({}));
										} else {
											dispatch(setIsFilterOpened(true));
										}
									}}
								/>
							)}
						</Tooltip>
					)}
				</>
			) : name === 'members' ? (
				<MemberSwitcher dataProject={dataProject} setMembers={setMembers} members={members} />
			) : name === 'documents' ? (
				<AddDocumentButton currentFolder={currentFolder} type='projects' />
			) : name === 'history' ? (
				<HistorySwitcher
					historyInterval={historyInterval}
					setHistoryInterval={setHistoryInterval}
					projectStart={dataProject?.created_at}
				/>
			) : name === 'expenses' ? (
				<ExpensesSwitcher projectMembers={dataProject?.usersMember ?? []} setExpensesData={setExpensesData} />
			) : (
				<TimeSwitcher showTimeFilters={showTimeFilters} setShowTimeFilters={setShowTimeFilters} />
			)}
		</>
	);
};

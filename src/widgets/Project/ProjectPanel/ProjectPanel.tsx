import React, { FC, useEffect, useState } from 'react';
import * as S from './ProjectPanel.styled';
import { Tabs, Text } from 'reshaped/bundle';
import { SvgComponent } from '../../../shared';
import { HandlerObject, ProjectTab } from '../ProjectController';
import { ProjectTabList } from '../ProjectController';
import { ProjectPanelSwitcher } from './ProjectPanelSwitcher/ProjectPanelSwitcher';
import { ProjectFilter } from '../ProjectFilter/ProjectFilter';
import { UserRole } from '../../../shared/utility/Constants/userRole';

interface ProjectPanelProps {
	tabValueType: string;
	mainTabs: ProjectTabList;
	activeMainTab: ProjectTab;
	handleTabChange: (obj: HandlerObject) => void;
	handleMainTabChange: (obj: { value: string }) => void;
	dataProject: IOneProject | undefined;
	members: IMembersState;
	setMembers: React.Dispatch<React.SetStateAction<IMembersState>>;
	historyInterval: IHistoryInterval | null;
	setHistoryInterval: React.Dispatch<React.SetStateAction<IHistoryInterval | null>>;
	setExpensesData: React.Dispatch<React.SetStateAction<IOneExpense[] | undefined>>;
	showTimeFilters: boolean;
	setShowTimeFilters: React.Dispatch<React.SetStateAction<boolean>>;
	currentFolder: IFolder;
	userRole: string | undefined;
	isClientRole: boolean;
}

export const ProjectPanel: FC<ProjectPanelProps> = ({
	tabValueType,
	handleTabChange,
	mainTabs,
	handleMainTabChange,
	activeMainTab,
	dataProject,
	members,
	setMembers,
	historyInterval,
	setHistoryInterval,
	setExpensesData,
	showTimeFilters,
	setShowTimeFilters,
	currentFolder,
	userRole,
	isClientRole,
}) => {
	const [users, setUsers] = useState<IMember[]>([]);

	useEffect(() => {
		const clientMembers = dataProject?.clientMembers ?? [];
		const usersMembers = dataProject?.usersMember ?? [];
		setUsers([...clientMembers, ...usersMembers]);
	}, [dataProject]);

	return (
		<>
			<S.ProjectPanel>
				<Tabs variant='pills' onChange={handleMainTabChange}>
					<Tabs.List>
						{mainTabs
							.filter((tab) => tab.access.includes(userRole as UserRole))
							.map((tab) => (
								<Tabs.Item key={tab.name} value={tab.name} icon={<SvgComponent name={tab.icon} />}>
									<Text variant='body-2' attributes={{ style: { letterSpacing: '-0.02em' } }}>
										{tab.text}
									</Text>
								</Tabs.Item>
							))}
					</Tabs.List>
				</Tabs>
				<S.ProjectPanelRight>
					<ProjectPanelSwitcher
						activeTab={activeMainTab}
						tabValueType={tabValueType}
						handleTabChange={handleTabChange}
						dataProject={dataProject}
						setMembers={setMembers}
						members={members}
						historyInterval={historyInterval}
						setHistoryInterval={setHistoryInterval}
						setExpensesData={setExpensesData}
						showTimeFilters={showTimeFilters}
						setShowTimeFilters={setShowTimeFilters}
						currentFolder={currentFolder}
						isClientRole={isClientRole}
					/>
				</S.ProjectPanelRight>
			</S.ProjectPanel>
			{activeMainTab.name === 'tasks' && tabValueType === 'list' && <ProjectFilter users={users} />}
		</>
	);
};

/* eslint-disable react-hooks/exhaustive-deps */
import * as S from './Project.styled';
import React, { FC } from 'react';
import { ProjectHeader } from './ProjectHeader/ProjectHeader';
import { ProjectPanel } from './ProjectPanel/ProjectPanel';
import { ProjectTypeRenderComponent } from './ProjectTypeRenderComponent/ProjectTypeRenderComponent';
import { useProjectController } from './ProjectController';
import { PROJECT_TYPES, PROJECT_TABS } from './ProjectController';
import { ProjectTabsRenderComponent } from './ProjectTabsRenderComponent/ProjectTabsRenderComponent';
import { Loader } from 'reshaped/bundle';

interface ProjectProps {
	data: IOneProject;
	isLoading: boolean;
}

export const Project: FC<ProjectProps> = ({ data, isLoading }) => {
	const {
		tabValue,
		mainTabValue,
		handleTabChange,
		handleMainTabChange,
		members,
		setMembers,
		historyInterval,
		setHistoryInterval,
		expensesData,
		setExpensesData,
		historyData,
		setHistoryData,
		showTimeFilters,
		setShowTimeFilters,
		currentFolder,
		setCurrentFolder,
		user,
		isClientRole,
		isMemberRole,
		isLoadingHistory,
	} = useProjectController(PROJECT_TYPES, PROJECT_TABS, data);
	const groupId = data?.group_id;

	const mainTabsWithRoles = isClientRole
		? isMemberRole
			? PROJECT_TABS.filter((tab) => tab.name !== 'time' && tab.name !== 'members')
			: PROJECT_TABS.filter((tab) => tab.name === 'tasks')
		: PROJECT_TABS;

	return (
		<div style={{ position: 'relative' }}>
			<S.ProjectWrap>
				<ProjectHeader dataProject={data} groupId={groupId} isClientRole={isClientRole} isMemberRole={isMemberRole} />
				<ProjectPanel
					tabValueType={tabValue.type}
					handleTabChange={handleTabChange}
					mainTabs={mainTabsWithRoles}
					handleMainTabChange={handleMainTabChange}
					activeMainTab={mainTabValue}
					dataProject={data}
					members={members}
					setMembers={setMembers}
					historyInterval={historyInterval}
					setHistoryInterval={setHistoryInterval}
					setExpensesData={setExpensesData}
					showTimeFilters={showTimeFilters}
					setShowTimeFilters={setShowTimeFilters}
					currentFolder={currentFolder}
					userRole={user?.role?.name}
					isClientRole={isClientRole}
				/>
			</S.ProjectWrap>
			{isLoading ? (
				<S.LoaderContainer>
					<Loader size='medium' />
				</S.LoaderContainer>
			) : mainTabValue.name === 'tasks' ? (
				data && (
					<ProjectTypeRenderComponent
						tabValueType={tabValue.type}
						dataProject={data}
						userRole={user?.role?.name}
						isClientRole={isClientRole}
					/>
				)
			) : (
				<ProjectTabsRenderComponent
					tabValueName={mainTabValue}
					dataProject={data}
					members={members}
					setMembers={setMembers}
					isLoadingHistory={isLoadingHistory}
					historyData={historyData}
					setHistoryData={setHistoryData}
					expensesData={expensesData}
					setExpensesData={setExpensesData}
					showTimeFilters={showTimeFilters}
					currentFolder={currentFolder}
					setCurrentFolder={setCurrentFolder}
				/>
			)}
		</div>
	);
};

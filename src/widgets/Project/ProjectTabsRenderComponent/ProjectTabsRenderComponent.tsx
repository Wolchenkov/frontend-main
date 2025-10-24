import { FC } from 'react';
import { ProjectTab } from '../ProjectController';
import ProjectMembers from '../Members/ProjectMembers';
import ProjectTime from '../Time/ProjectTime';
import { Expenses } from '../Expenses/Expenses';
import { History } from '../History/History';
import { Documents } from '../../Documents/Documents';

interface ProjectTabsRenderComponentProps {
	tabValueName: ProjectTab;
	dataProject: IOneProject | undefined;
	members: IMembersState;
	setMembers: React.Dispatch<React.SetStateAction<IMembersState>>;
	historyData: IHistory | undefined;
	setHistoryData: React.Dispatch<React.SetStateAction<IHistory | undefined>>;
	expensesData: IOneExpense[] | undefined;
	setExpensesData: React.Dispatch<React.SetStateAction<IOneExpense[] | undefined>>;
	showTimeFilters: boolean;
	currentFolder: IFolder;
	setCurrentFolder: React.Dispatch<React.SetStateAction<IFolder>>;
	isLoadingHistory: boolean;
}
export const ProjectTabsRenderComponent: FC<ProjectTabsRenderComponentProps> = ({
	tabValueName,
	dataProject,
	members,
	setMembers,
	historyData,
	setHistoryData,
	expensesData,
	setExpensesData,
	showTimeFilters,
	currentFolder,
	setCurrentFolder,
	isLoadingHistory,
}) => {
	const { name } = tabValueName;

	return (
		<>
			{name === 'members' ? (
				<ProjectMembers dataProject={dataProject} setMembers={setMembers} members={members} />
			) : name === 'documents' ? (
				<Documents currentFolder={currentFolder} setCurrentFolder={setCurrentFolder} type='projects' />
			) : name === 'history' ? (
				<History history={historyData} setHistoryData={setHistoryData} isLoadingHistory={isLoadingHistory} />
			) : name === 'expenses' ? (
				<Expenses
					projectMembers={dataProject?.usersMember ?? []}
					expensesData={expensesData}
					setExpensesData={setExpensesData}
				/>
			) : (
				<ProjectTime dataProject={dataProject} showTimeFilters={showTimeFilters} />
			)}
		</>
	);
};

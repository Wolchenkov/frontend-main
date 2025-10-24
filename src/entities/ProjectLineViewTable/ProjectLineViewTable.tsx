import React, { FC, useState, Dispatch, SetStateAction } from 'react';
import * as S from './ProjectLineViewTable.styled';
import { TableHead } from './TableHead/TableHead';
import { Issues } from './Issues/Issues';
import { FinishedIssues } from './FinishedIssues/FinishedIssues';
import { useGetIssuePrioritiesQuery } from '../../store/dictionaries/dictionariesApi';

interface IProjectLineViewTableProps {
	issues: ITask[];
	allIssues: ITask[];
	finishedIssues: ITask[];
	kanbanGroupId: number;
	getFinishedIssues: () => void;
	activateTaskModal: () => void;
	updateKanbanData?: Dispatch<SetStateAction<IKanbanIssue[] | undefined>>;
	projectData: IOneProject;
	userRole: string | undefined;
}

export const ProjectLineViewTable: FC<IProjectLineViewTableProps> = ({
	issues,
	allIssues,
	finishedIssues,
	kanbanGroupId,
	getFinishedIssues,
	activateTaskModal,
	updateKanbanData,
	projectData,
	userRole,
}) => {
	const { data: issuePriorities = [] } = useGetIssuePrioritiesQuery();
	const [sortOption, setSortOption] = useState({ type: '', direction: '' });
	const [finishIconClickedIssue, setFinishIconClickedIssue] = useState<number | undefined>();

	return (
		<S.ProjectLineViewTable>
			{issues.length || finishedIssues.length ? (
				<TableHead userRole={userRole} sortOption={sortOption} setSortOption={setSortOption} />
			) : (
				<></>
			)}

			<Issues
				userRole={userRole}
				finishIconClickedIssue={finishIconClickedIssue}
				issues={issues}
				allIssues={allIssues}
				finishedIssues={finishedIssues}
				issuePriorities={issuePriorities}
				sortOption={sortOption}
				kanbanGroupId={kanbanGroupId}
				activateTaskModal={activateTaskModal}
				setFinishIconClickedIssue={setFinishIconClickedIssue}
				updateKanbanData={updateKanbanData}
				projectData={projectData}
			/>

			<FinishedIssues
				userRole={userRole}
				finishIconClickedIssue={finishIconClickedIssue}
				issuesData={finishedIssues.filter((issue) => issue.project_issue_kanban_id === kanbanGroupId)}
				finishedIssues={finishedIssues}
				allIssues={allIssues}
				issuePriorities={issuePriorities}
				sortOption={sortOption}
				getAllIssues={getFinishedIssues}
				activateTaskModal={activateTaskModal}
				setFinishIconClickedIssue={setFinishIconClickedIssue}
			/>
		</S.ProjectLineViewTable>
	);
};

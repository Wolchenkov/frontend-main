import { FC } from 'react';
import { GanttTable, AddProjectStageModal } from '../../../entities';
import { StagesEmpty } from '../../../entities/ProjectLineViewTable/StagesEmpty/StagesEmpty';

import { useRouter } from 'next/router';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import { useGetGanttChartQuery } from '../../../store/projects/projectsApi';

import { Loader, useToggle } from 'reshaped/bundle';
import * as S from './Gantt.styled';

interface IGanttProps {
	projectData: IOneProject;
	userRole: string | undefined;
	activateTaskModal: () => void;
}

const Gantt: FC<IGanttProps> = ({ projectData, userRole, activateTaskModal }) => {
	const router = useRouter();
	const { slug } = router.query;
	const projectSlug = typeof slug === 'string' ? slug : String(skipToken);
	const { data, isFetching } = useGetGanttChartQuery(projectSlug);

	const {
		active: activeModalAddProjectStage,
		activate: activateModalAddProjectStage,
		deactivate: deactivateModalAddProjectStage,
	} = useToggle(false); //  модалкa добавления этапа

	return (
		<>
			{projectData.Kanban.length === 0 ? (
				<StagesEmpty groupId={projectData.group_id} openModal={activateModalAddProjectStage} userRole={userRole} />
			) : data ? (
				<GanttTable data={data} isFetching={isFetching} activateTaskModal={activateTaskModal} />
			) : (
				<S.LoaderWrap>
					<Loader size='medium' />
				</S.LoaderWrap>
			)}
			<AddProjectStageModal
				size={'660px'}
				active={activeModalAddProjectStage}
				onClose={deactivateModalAddProjectStage}
				projectIssueSort={projectData.Kanban}
			/>
		</>
	);
};

export default Gantt;

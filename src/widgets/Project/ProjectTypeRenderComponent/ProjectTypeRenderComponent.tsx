import { FC, useEffect } from 'react';
import Kanban from '../Kanban/Kanban';
import Gantt from '../Gantt/Gantt';
import { ProjectLineView } from '../../ProjectLineView/ProjectLineView';
import { useRouter } from 'next/router';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import { useGetProjectFinishedIssuesQuery, useGetProjectIssuesQuery } from '../../../store/projects/projectsApi';
import { useToggle } from 'reshaped/bundle';
import { TaskModal } from '../TaskDetail/TaskModal';

interface ProjectTypeRenderComponentProps {
	tabValueType: string;
	dataProject: IOneProject;
	userRole: string | undefined;
	isClientRole: boolean;
}

export const ProjectTypeRenderComponent: FC<ProjectTypeRenderComponentProps> = ({
	tabValueType,
	dataProject,
	userRole,
	isClientRole,
}) => {
	const router = useRouter();
	const { slug: projectSlug } = router.query;
	const { data: dataProjectIssues } = useGetProjectIssuesQuery(
		typeof projectSlug === 'string' ? projectSlug : skipToken
	);
	const { data: dataProjectFinishedIssues } = useGetProjectFinishedIssuesQuery(
		typeof projectSlug === 'string' ? projectSlug : skipToken
	);

	const { active: activeTaskModal, activate: activateTaskModal, deactivate: deactivateTaskModal } = useToggle(false);

	const onCloseModalTask = () => {
		deactivateTaskModal();
	};

	useEffect(() => {
		if (router.query.modal) {
			activateTaskModal();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [router.query.modal]);

	return (
		<>
			{tabValueType === 'list' ? (
				dataProjectIssues &&
				dataProjectFinishedIssues && (
					<ProjectLineView
						userRole={userRole}
						projectData={dataProject}
						projectIssuesData={dataProjectIssues}
						finishedTasksData={dataProjectFinishedIssues}
						activateTaskModal={activateTaskModal}
					/>
				)
			) : tabValueType === 'kanban' ? (
				dataProjectIssues &&
				dataProjectFinishedIssues && (
					<Kanban
						projectData={dataProject}
						tasksData={dataProjectIssues}
						finishedTasksData={dataProjectFinishedIssues}
						activateTaskModal={activateTaskModal}
						isClientRole={isClientRole}
						userRole={userRole}
					/>
				)
			) : (
				<Gantt projectData={dataProject} userRole={userRole} activateTaskModal={activateTaskModal} />
			)}
			{activeTaskModal && (
				<TaskModal
					active={activeTaskModal}
					deactivate={onCloseModalTask}
					dataProject={dataProject}
					tasksData={dataProjectIssues}
				/>
			)}
		</>
	);
};

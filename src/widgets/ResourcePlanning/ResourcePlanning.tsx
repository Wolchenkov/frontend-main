import { FC, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Text, useToggle } from 'reshaped/bundle';
import { TaskModal } from '../Project/TaskDetail/TaskModal';
import { useLazyGetProjectIssuesQuery, useLazyGetProjectQuery } from '../../store/projects/projectsApi';
import ResourcePlanningTable from '../../entities/ResourcePlanningTable/ResourcePlanningTable';

const ResourcePlanning: FC = () => {
	const router = useRouter();

	const { active: activeTaskModal, activate: activateTaskModal, deactivate: deactivateTaskModal } = useToggle(false);
	const [activeTaskData, setActiveTaskData] = useState<{ id: number; projectSlug: string } | undefined>();
	const [getProject, { data: dataProject }] = useLazyGetProjectQuery();
	const [getProjectTasks, { data: dataProjectIssues }] = useLazyGetProjectIssuesQuery();

	useEffect(() => {
		if (activeTaskData !== undefined) {
			getProject(activeTaskData.projectSlug);
			getProjectTasks(activeTaskData.projectSlug);
			activateTaskModal();
			// Создание нового объекта query, чтобы не мутировать существующий
			const newQuery = { ...router.query, modal: activeTaskData.id };

			router.push({
				pathname: router.pathname,
				query: newQuery,
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activeTaskData]);

	const handleTaskModalClose = () => {
		deactivateTaskModal();
		setActiveTaskData(undefined);
	};

	return (
		<>
			<Text variant='title-2' attributes={{ style: { padding: '24px 20px', letterSpacing: '-0.015em' } }}>
				Ресурсное планирование
			</Text>
			<ResourcePlanningTable
				activateTaskModal={activateTaskModal}
				activeTaskData={activeTaskData}
				setActiveTaskData={setActiveTaskData}
			/>
			{activeTaskModal && dataProject && dataProjectIssues && (
				<TaskModal
					active={activeTaskModal}
					deactivate={handleTaskModalClose}
					dataProject={dataProject}
					tasksData={dataProjectIssues}
				/>
			)}
		</>
	);
};

export default ResourcePlanning;

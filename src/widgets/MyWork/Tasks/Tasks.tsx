/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect, useState } from 'react';
import { useGetMyTasksQuery } from '../../../store/myWork/myWorkApi';
import { TasksItem } from './Item/Item';
import { useToggle } from 'reshaped/bundle';
import { TaskModal } from '../../Project/TaskDetail/TaskModal';
import { useLazyGetProjectQuery, useLazyGetProjectIssuesQuery } from '../../../store/projects/projectsApi';
import { useRouter } from 'next/router';
import { TasksEmpty } from './Empty/Empty';

export const MyWorkTasks: FC = () => {
	const [myWorkTasks, setMyWorkTasks] = useState<IMyWorkTask[]>();
	const [myWorkProject, setMyWorkProject] = useState<IOneProject>();
	const [myWorkProjectIssues, setMyWorkProjectIssues] = useState<ITask[]>();

	const { active: activeTaskModal, activate: activateTaskModal, deactivate: deactivateTaskModal } = useToggle(false);
	const [activeTaskData, setActiveTaskData] = useState<{ id: number; projectSlug: string } | undefined>();

	const { data: tasks } = useGetMyTasksQuery();
	const [getProject, { originalArgs: projectArgs, data: dataProject }] = useLazyGetProjectQuery();
	const [getProjectTasks, { data: dataProjectIssues }] = useLazyGetProjectIssuesQuery();

	const router = useRouter();

	useEffect(() => {
		if (tasks) {
			setMyWorkTasks(tasks);
		}
	}, [tasks]);

	useEffect(() => {
		if (dataProject) {
			setMyWorkProject(dataProject);
		}
	}, [dataProject]);

	useEffect(() => {
		if (dataProjectIssues) {
			setMyWorkProjectIssues(dataProjectIssues);
		}
	}, [dataProjectIssues]);

	useEffect(() => {
		if (activeTaskData !== undefined) {
			if (activeTaskData.projectSlug === projectArgs) {
				setMyWorkProject(dataProject);
				setMyWorkProjectIssues(dataProjectIssues);
			} else {
				getProject(activeTaskData.projectSlug);
				getProjectTasks(activeTaskData.projectSlug);
			}
			activateTaskModal();
			// Создание нового объекта query, чтобы не мутировать существующий
			const newQuery = { ...router.query, modal: activeTaskData.id };

			router.push({
				pathname: router.pathname,
				query: newQuery,
			});
		}
	}, [activeTaskData]);

	const handleTaskModalClose = () => {
		deactivateTaskModal();
		setActiveTaskData(undefined);
		setMyWorkProject(undefined);
		setMyWorkProjectIssues(undefined);
	};

	return (
		<>
			{myWorkTasks &&
				(myWorkTasks.length ? (
					myWorkTasks.map((taskData) => (
						<TasksItem key={taskData.id} data={taskData} setActiveTaskData={setActiveTaskData} />
					))
				) : (
					<TasksEmpty />
				))}
			{activeTaskModal && myWorkProject && myWorkProjectIssues && (
				<TaskModal
					active={activeTaskModal}
					deactivate={handleTaskModalClose}
					dataProject={myWorkProject}
					tasksData={myWorkProjectIssues}
				/>
			)}
		</>
	);
};

import { useCompleteIssueMutation, useUpdateIssueMutation } from '../../../../store/projects/projectsApi';
import { useEffect, useState } from 'react';

import { useShowToast } from '../../../../shared/utility/Hooks';
import { useGetUserQuery } from '../../../../store/auth/authApi';
import { UserRole } from '../../../../shared/utility/Constants/userRole';

interface IChildControllerProps {
	setTaskState: React.Dispatch<React.SetStateAction<ITaskDetail | null>>;
	refetchTaskData: any;
	dataProject: IOneProject;
}
export function useChildTaskController({ setTaskState, refetchTaskData, dataProject }: IChildControllerProps) {
	const { data: user } = useGetUserQuery();
	const [isClientRole, setIsClientRole] = useState(user?.role?.name === UserRole.CLIENT ?? true); // возможно понадобится для быстрого отображения завершении дочерней задачи
	useEffect(() => {
		if (user && 'role' in user) {
			setIsClientRole(user.role?.name === UserRole.CLIENT);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user]);

	const showToast = useShowToast();
	const { slug: projectSlug } = dataProject;
	const [updateIssue] = useUpdateIssueMutation();

	// const {
	// 	active: isModalConfirmActive,
	// 	activate: activateConfirmModal,
	// 	deactivate: deactivateConfirmModal,
	// } = useToggle(false); // модалка подтверждения завершения задачи с незавершенными дочерними у дочерней

	const [complete] = useCompleteIssueMutation();

	function changeStatus(task: ITaskInTask) {
		setTaskState((prev) => {
			if (prev) {
				return {
					...prev,
					children: [
						...prev.children.map((ch) => {
							if (ch.id === task.id)
								return { ...ch, completed_on: task?.completed_on ? null : new Date().toISOString() };
							else return ch;
						}),
					],
				};
			} else return prev;
		});

		if (!task?.completed_on) {
			const payload = { projectSlug, projectIssueId: task?.id };
			complete(payload).then(() => {
				refetchTaskData();
				// deactivateConfirmModal();
			});
		} else {
			const body = { completed_on: null };
			const payload = { projectSlug, body, projectIssueId: task?.id };
			updateIssue(payload).then(() => refetchTaskData());
		}
	}

	// удаление подзадач
	function delChild(taskId: number) {
		const body = { parent_id: null };
		const payload = { projectSlug, body, projectIssueId: taskId };
		updateIssue(payload).then(() => {
			refetchTaskData();
			showToast('Подзадача удалена');
		});
	}

	return {
		projectSlug,
		changeStatus,
		delChild,
		refetchTaskData,
		isClientRole,
	};
}

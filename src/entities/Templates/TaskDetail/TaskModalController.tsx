/* eslint-disable react-hooks/exhaustive-deps */
import { useAppDispatch } from '../../../store';
import { useGetTaskQuery } from '../../../store/tasks/tasksApi';
import { useEffect, useRef, useState } from 'react';
import { useUpdateIssueMutation } from '../../../store/projects/projectsApi';
import { useGetUserQuery } from '../../../store/auth/authApi';
import { setTimers } from '../../../store/auth/authSlice';
import { OutputData } from '@editorjs/editorjs';
import { UserRole } from '../../../shared/utility/Constants/userRole';

interface Props {
	projectSlug: string;
	modalId: number | undefined;
}

export function useTaskModalController({ projectSlug, modalId }: Props) {
	const dispatch = useAppDispatch();

	const { data: user, isLoading: isLoadingUser } = useGetUserQuery();

	const [isClientRole, setIsClientRole] = useState(user?.role?.name === UserRole.CLIENT ?? true);
	const [isMemberRole, setIsMemberRole] = useState(user?.role?.name === UserRole.MEMBER ?? true);
	const [taskState, setTaskState] = useState<ITaskDetail | null>(null);

	const [activeModal, setActiveModal] = useState<number | undefined>(modalId);

	const {
		data: taskData,
		isLoading,
		refetch: refetchTaskData,
	} = useGetTaskQuery(
		{ project: projectSlug, projectIssue: activeModal },
		{ refetchOnMountOrArgChange: true, skip: typeof activeModal !== 'number' }
	);
	const [updateIssue] = useUpdateIssueMutation();

	useEffect(() => {
		if (user && 'role' in user) {
			setIsClientRole(user.role?.name === UserRole.CLIENT);
			setIsMemberRole(user.role?.name === UserRole.MEMBER);
		}
		dispatch(setTimers(user?.timers));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user]);

	useEffect(() => {
		if (taskData) {
			setTaskState(taskData);
		}
		return () => {
			setTaskState(null);
		};
	}, [taskData]);

	// обновление названия задачи
	const [name, setName] = useState<string>(taskState?.name || '');
	const timerNameRef = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		if (timerNameRef.current) {
			clearTimeout(timerNameRef.current);
		}

		timerNameRef.current = setTimeout(() => {
			if (taskState?.id && taskState?.name !== name) {
				const body = { name: name ? name : null };
				const payload = { projectSlug, body, projectIssueId: taskState?.id };
				updateIssue(payload).then(() => refetchTaskData());
			}
		}, 2000);
	}, [name]);

	useEffect(() => {
		setName(taskState?.name || '');
	}, [taskState]);

	// обновление описания
	const [description, setDescription] = useState<OutputData>();
	const timerIdRef = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		if (timerIdRef.current) {
			clearTimeout(timerIdRef.current);
		}
		timerIdRef.current = setTimeout(() => {
			if (
				description &&
				JSON.stringify(taskState?.description.blocks) !== JSON.stringify(description.blocks) &&
				taskState &&
				typeof activeModal === 'number'
			) {
				const body = { description: description ? description : null };
				const payload = { projectSlug, body, projectIssueId: taskState.id };
				updateIssue(payload).then(() => taskState && refetchTaskData());
			}
		}, 2000);
	}, [description]);

	useEffect(() => {
		taskState && setDescription(taskState.description);
	}, [taskState]);

	// отображение подзадач
	const sortedChildren =
		taskState &&
		[...taskState.children].sort((a, b) => {
			const dateA = a.completed_on ? new Date(a.completed_on).getTime() : Infinity;
			const dateB = b.completed_on ? new Date(b.completed_on).getTime() : Infinity;

			return dateB - dateA;
		});

	return {
		taskState,
		setTaskState,
		refetchTaskData,
		description,
		setDescription,
		isLoading,
		isLoadingUser,
		sortedChildren,
		name,
		setName,
		isClientRole,
		isMemberRole,
		setActiveModal,
	};
}

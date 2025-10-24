/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import { useAppDispatch } from '../../../store';
import { setActiveTask } from '../../../store/tasks/tasksSlice';
import { useGetTaskQuery } from '../../../store/tasks/tasksApi';
import React, { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import {
	useAddCommentInTaskMutation,
	useCompleteIssueMutation,
	useUpdateIssueMutation,
} from '../../../store/projects/projectsApi';
import { useShowToast } from '../../../shared/utility/Hooks';
import { useDeleteProjectIssueMutation, useDuplicateProjectIssueMutation } from '../../../store/projects/projectsApi';
import { useFileUploadMutation } from '../../../store/uploads/uploadsApi';
import { Icon, Loader, Text, useToast, useToggle } from 'reshaped/bundle';
import { SvgComponent } from '../../../shared';
import { useGetUserQuery } from '../../../store/auth/authApi';
import { setTimers } from '../../../store/auth/authSlice';
import { OutputData } from '@editorjs/editorjs';
import { UserRole } from '../../../shared/utility/Constants/userRole';
import { areAllBlocksEmpty } from '../../../shared/utility/Utils/checkIsEditorBloksEmpty';

interface FileWithId {
	file: File;
	id: number;
}
export interface HandlerObject {
	value: string;
	name?: string | undefined;
}

interface Props {
	deactivate: () => void;
	dataProject: IOneProject;
}

export const COMMENT_TYPES = [
	{
		name: 'comment',
		text: 'Комментарии',
		icon: 'comment-icon',
	},
	{
		name: 'commentWithFiles',
		text: 'Файлы',
		icon: 'attachment-black',
	},
];

//костыль для проверки кого упомянули в тексте
export function getFilteredMentions(data: OutputData | undefined, allMembers: IMember[]): number[] {
	const filteredMentions: number[] = [];

	if (!data) {
		return filteredMentions;
	}

	const regex = /@([а-яА-ЯёЁ]+ [а-яА-ЯёЁ]+)(?:&nbsp;|\s)/g;

	data.blocks.forEach((block) => {
		if (block.type === 'paragraph') {
			let match;
			while ((match = regex.exec(block.data.text)) !== null) {
				const mentionName = match[1];
				const member = allMembers.find((m) => m.name === mentionName);
				if (member) {
					filteredMentions.push(member.id);
				}
			}
		} else if (block.type === 'list') {
			block.data.items.forEach((item: string) => {
				let match;
				while ((match = regex.exec(item)) !== null) {
					const mentionName = match[1];
					const member = allMembers.find((m) => m.name === mentionName);
					if (member) {
						filteredMentions.push(member.id);
					}
				}
			});
		}
	});

	return filteredMentions;
}

export function useTaskModalController({ deactivate, dataProject }: Props) {
	const dispatch = useAppDispatch();
	const { data: user, isLoading: isLoadingUser, refetch: refetchUser } = useGetUserQuery();
	const [isClientRole, setIsClientRole] = useState(user?.role?.name === UserRole.CLIENT ?? true);
	const [isMemberRole, setIsMemberRole] = useState(user?.role?.name === UserRole.MEMBER ?? true);
	const [currentUser, setCurrentUser] = useState<IMember>();
	useEffect(() => {
		if (user && 'role' in user) {
			setIsClientRole(user.role?.name === UserRole.CLIENT);
			setIsMemberRole(user.role?.name === UserRole.MEMBER);
		}
		dispatch(setTimers(user?.timers));
		user && setCurrentUser(user);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user]);

	const toast = useToast();
	const showToast = useShowToast();
	const router = useRouter();
	const { modal } = router.query;
	const { slug: projectSlug } = dataProject;

	const {
		data: taskData,
		isLoading,
		isError,
		refetch: refetchTaskData,
	} = useGetTaskQuery(
		{ project: projectSlug, projectIssue: modal },
		{ refetchOnMountOrArgChange: true, skip: typeof modal !== 'string' }
	);

	useEffect(() => {
		if (isError) {
			deactivate();
			router.push('/404');
		}
	}, [isError]);

	const [updateIssue] = useUpdateIssueMutation();
	const [taskState, setTaskState] = useState<ITaskDetail | null>(null);
	const [trackedTime, setTrackedTime] = useState(0);
	const [isBackendRunning, setIsBackendRunning] = useState<boolean>(false);
	const [isDeletableTimer, setIsDeletableTimer] = useState(false);

	useEffect(() => {
		if (taskData) {
			setTaskState(taskData);
		}
		return () => {
			setTaskState(null);
		};
	}, [taskData]);

	useEffect(() => {
		if (taskState?.userTimer) {
			setTrackedTime(taskState.userTimer.elapsed);
			setIsBackendRunning(taskState.userTimer.isRunning);
			setIsDeletableTimer(true);
		} else {
			setTrackedTime(0);
			setIsDeletableTimer(false);
		}
	}, [taskState]);

	const onClose = () => {
		const projectSlug = router.query.slug;

		if (projectSlug) {
			router.push(
				{
					query: {
						slug: projectSlug,
					},
				},
				undefined,
				{ shallow: true }
			);
		} else {
			const { pathname } = router;
			router.push({ pathname }, undefined, { shallow: true });
		}

		dispatch(setActiveTask(null));
		deactivate();
	};

	// дублирование и удаление задачи
	const [duplicateIssue] = useDuplicateProjectIssueMutation();
	const [deleteIssue] = useDeleteProjectIssueMutation();
	const handleDuplicateIssue = () => {
		taskState &&
			duplicateIssue({ project: projectSlug as string, projectIssue: taskState.id })
				.unwrap()
				.then(() => {
					showToast('Копия задачи успешно создана');
				})
				.catch((error) => {
					showToast(`Ошибка! ${error?.data?.message}`);
				});
	};

	const handleDeleteIssue = () => {
		taskState &&
			deleteIssue({ project: projectSlug as string, projectIssue: taskState.id })
				.unwrap()
				.then(() => {
					deactivate();
					showToast('Задача удалена');
				});
	};

	// завершение либо восстановление текущей задачи
	const isChildren = taskState?.children?.filter((child) => child.completed_on === null).length;
	const {
		active: isModalConfirmActive,
		activate: activateConfirmModal,
		deactivate: deactivateConfirmModal,
	} = useToggle(false); // модалка подтверждения завершения задачи с незавершенными дочерними

	const [complete] = useCompleteIssueMutation();
	const [isCompleted, setIsCompleted] = useState(!!taskState?.completed_on);

	useEffect(() => {
		taskState && setIsCompleted(!!taskState.completed_on);
	}, [taskState]);

	const isUnmountedRef = useRef(false);
	useEffect(() => {
		// Это будет выполнено при размонтировании компонента
		return () => {
			isUnmountedRef.current = true;
		};
	}, []);

	function changeStatus(task: ITaskDetail) {
		if (task.id === taskState?.id) setIsCompleted(!isCompleted);
		if (!task?.completed_on) {
			const payload = { projectSlug, projectIssueId: task?.id };
			complete(payload).then(() => {
				if (refetchTaskData && typeof modal === 'string' && !isUnmountedRef.current) {
					refetchTaskData();
				}
				deactivateConfirmModal();
			});
		} else {
			const body = { completed_on: null };
			const payload = { projectSlug, body, projectIssueId: task?.id };
			updateIssue(payload).then(() => {
				refetchTaskData();
			});
		}
	}

	// обновление названия задачи
	const [name, setName] = useState<string>(taskState?.name || '');
	const timerNameRef = useRef<NodeJS.Timeout | null>(null);
	const textAreaRef = useRef<HTMLTextAreaElement>(null);

	// Обновление высоты textarea в зависимости от контента
	const updateHeight = () => {
		if (textAreaRef.current) {
			textAreaRef.current.style.height = 'auto'; // Сброс текущей высоты
			textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`; // Установка новой высоты
		}
	};

	useEffect(() => {
		if (timerNameRef.current) {
			clearTimeout(timerNameRef.current);
		}

		timerNameRef.current = setTimeout(() => {
			updateHeight(); // Установка начальной высоты при загрузке компонента
			if (taskState?.id && taskState?.name !== name) {
				const body = { name: name ? name : null };
				const payload = { projectSlug, body, projectIssueId: taskState?.id };
				updateIssue(payload);
				// .then(() => refetchTaskData());
			}
		}, 2000);
	}, [name]);

	useEffect(() => {
		setName(taskState?.name || '');
	}, [taskState]);

	// обновление описания
	const [description, setDescription] = useState<OutputData>();
	const [descriptionKey, setDescriptionKey] = useState<number | null>(null);
	const timerIdRef = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		if (timerIdRef.current) {
			clearTimeout(timerIdRef.current);
		}

		timerIdRef.current = setTimeout(() => {
			if (
				description &&
				JSON.stringify(taskState?.description?.blocks) !== JSON.stringify(description.blocks) &&
				taskState &&
				typeof modal === 'string'
			) {
				const body = { description: description ? description : null };
				const payload = { projectSlug, body, projectIssueId: taskState.id };
				updateIssue(payload);
			}
		}, 2000);
	}, [description]);

	useEffect(() => {
		if (taskState) {
			setDescription(taskState.description);
			// setDescriptionKey(Date.now() + 1);
		}
	}, [taskState]);

	useEffect(() => {
		setDescriptionKey(Date.now() + 1);
	}, [taskState?.description]);

	// загрузка файлов в задачу
	const fileInput = React.useRef<HTMLInputElement>(null);

	const handleClick = () => {
		if (fileInput.current) {
			fileInput.current.click();
		}
	};

	const [fileUpload] = useFileUploadMutation();

	const handleFileChange = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			if (!e.target.files) {
				return;
			}

			const files = Array.from(e.target.files);
			const disallowedFiles = [];

			const allowedFiles = files.filter((file) => {
				if (file.size / 1024 / 1024 > 100) {
					disallowedFiles.push(file.name);
					return false;
				}
				return true;
			});

			if (disallowedFiles.length > 0) {
				toast.show({
					color: 'critical',
					text: (
						<>
							<Text variant='body-strong-2' attributes={{ style: { letterSpacing: '-0.01em' } }}>
								{`Не удалось загрузить ${disallowedFiles.length} файл(ов)`}
							</Text>
							<Text variant='body-2'>Размер файлов не должен превышать 100 Мб</Text>
						</>
					),
					icon: <Icon svg={<SvgComponent name='close-circle-white' />} size={6} />,
				});
			}

			if (allowedFiles.length === 0) {
				return;
			}

			const id = toast.show({
				text: (
					<Text variant='body-strong-2'>{`Загрузка ${allowedFiles.length} ${
						allowedFiles.length > 1 ? 'файлов' : 'файла'
					}`}</Text>
				),
				startSlot: <Loader size='medium' attributes={{ style: { '--rs-loader-color': 'white' } }} />,
				timeout: 0,
			});

			Promise.all(allowedFiles.map((file) => fileUpload(file)))
				.then((responses) => {
					if (taskState) {
						const body = {
							attachment: [
								...taskState.attachment.map((attachment) => ({ uuid: attachment.uuid })),
								...responses.map((response) => {
									if ('data' in response) return { uuid: response.data.uuid };
								}),
							],
						};
						const payload = { projectSlug, body, projectIssueId: taskState.id };
						updateIssue(payload).then(() => {
							refetchTaskData();
						});
					}
				})
				.then(() => {
					toast.hide(id);
					showToast(
						`Загружен${
							allowedFiles.length > 4
								? 'o ' + allowedFiles.length + ' файлов'
								: allowedFiles.length > 1
								? 'o ' + allowedFiles.length + ' файла'
								: ' 1 файл'
						}`
					);
				});
		},
		[taskState]
	);

	// отображение подзадач
	const [sortedChildren, setSortedChildren] = useState<ITaskInTask[]>();
	useEffect(() => {
		taskState &&
			setSortedChildren(
				[...taskState.children].sort((a, b) => {
					const dateA = a.completed_on ? new Date(a.completed_on).getTime() : Infinity;
					const dateB = b.completed_on ? new Date(b.completed_on).getTime() : Infinity;

					return dateB - dateA;
				})
			);
	}, [taskState]);

	// комменты
	const [publishComment] = useAddCommentInTaskMutation();

	const [commentText, setCommentText] = useState<OutputData>();

	const [fileComment, setFileComment] = useState<FileWithId[]>();

	const allMembers = [...dataProject.usersMember, ...dataProject.clientMembers];

	const fileCommentInput = React.useRef<HTMLInputElement>(null);

	const handleCommentFileClick = () => {
		if (fileCommentInput.current) {
			fileCommentInput.current.click();
		}
	};

	const handleFileCommentChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files) {
			return;
		}
		const files = Array.from(e.target.files);
		const disallowedFiles = [];

		const allowedFiles = files.filter((file) => {
			if (file.size / 1024 / 1024 > 100) {
				disallowedFiles.push(file.name);
				return false;
			}
			return true;
		});
		if (disallowedFiles.length > 0) {
			toast.show({
				color: 'critical',
				text: (
					<>
						<Text variant='body-strong-2' attributes={{ style: { letterSpacing: '-0.01em' } }}>
							{`Не удалось загрузить ${disallowedFiles.length} файл(ов)`}
						</Text>
						<Text variant='body-2'>Размер файлов не должен превышать 100 Мб</Text>
					</>
				),
				icon: <Icon svg={<SvgComponent name='close-circle-white' />} size={6} />,
			});
		}

		if (allowedFiles.length === 0) {
			return;
		}

		setFileComment((prev) => [
			...(prev ?? []),
			...allowedFiles.map((file, index) => ({
				file,
				id: prev && prev.length > 0 ? Math.max(...prev.map((el) => el.id)) + index + 1 : index + 1,
			})),
		]);
	};

	const delFileComment = (id: number) => {
		setFileComment((prev) => prev?.filter((el) => el.id !== id));
	};

	async function onPublishComment() {
		const mentions = getFilteredMentions(commentText, allMembers);
		const uploadFileIds: { uuid: string }[] = [];

		if (fileComment && !areAllBlocksEmpty(commentText)) {
			const id = toast.show({
				text: (
					<Text variant='body-strong-2'>{`Загрузка ${fileComment.length} ${
						fileComment.length > 1 ? 'файлов' : 'файла'
					}`}</Text>
				),
				startSlot: <Loader size='medium' attributes={{ style: { '--rs-loader-color': 'white' } }} />,
				timeout: 0,
			});

			const responses = await Promise.all(fileComment?.map((el) => el.file).map((file) => fileUpload(file)));

			uploadFileIds.push(
				...responses
					.map((response) => {
						if ('data' in response && response.data) return { uuid: response.data.uuid };
					})
					.filter((uuid): uuid is { uuid: string } => Boolean(uuid))
			);
			toast.hide(id);
			showToast(
				`Загружен${
					fileComment.length > 4
						? 'o ' + fileComment.length + ' файлов'
						: fileComment.length > 1
						? 'o ' + fileComment.length + ' файла'
						: ' 1 файл'
				}`
			);
		}
		const body = { text: commentText, mentions, attachment: uploadFileIds };

		const payload = { projectSlug, issueId: taskState?.id, body };
		publishComment(payload).then(() => {
			setCommentText(undefined);
			setFileComment(undefined);
			refetchTaskData();
			setEditorKey(Date.now());
		});
	}

	const [editorKey, setEditorKey] = useState(Date.now()); // Запуск эдитора с уникальным ключом

	// отображение комментариев
	const [tabValue, setTabValue] = useState(COMMENT_TYPES[0]);
	const hasFileComments = taskState?.comments.some((comment) => comment.files.length > 0); //есть ли комменты с файлами

	const handleTabChange = (obj: { value: string }): void => {
		const newValue = COMMENT_TYPES.find(({ name }) => name === obj.value);
		if (newValue) {
			setTabValue(newValue);
		}
	};

	return {
		modal,
		onClose,
		taskState,
		setTaskState,
		trackedTime,
		isBackendRunning,
		isDeletableTimer,
		setIsDeletableTimer,
		setIsBackendRunning,
		refetchTaskData,
		description,
		setDescription,
		descriptionKey,
		projectSlug,
		changeStatus,
		isCompleted,
		isLoading,
		isLoadingUser,
		handleClick,
		handleFileChange,
		sortedChildren,
		handleDuplicateIssue,
		handleDeleteIssue,
		fileInput,
		isChildren,
		isModalConfirmActive,
		activateConfirmModal,
		deactivateConfirmModal,
		setCommentText,
		commentText,
		name,
		setName,
		textAreaRef,
		isClientRole,
		isMemberRole,
		refetchUser,
		fileCommentInput,
		handleCommentFileClick,
		handleFileCommentChange,
		fileComment,
		delFileComment,
		allMembers,
		onPublishComment,
		editorKey,
		tabValue,
		handleTabChange,
		hasFileComments,
		currentUser,
	};
}

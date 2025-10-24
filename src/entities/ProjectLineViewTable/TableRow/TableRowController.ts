import { Dispatch, SetStateAction } from 'react';
import { MouseEvent, useMemo, useState } from 'react';
import { useToggle } from 'reshaped/bundle';
import { useAppDispatch, useAppSelector } from '../../../store';
import { useRouter } from 'next/router';
import { useCompleteIssueMutation, useDragIssueMutation } from '../../../store/projects/projectsApi';
import { useShowToast } from '../../../shared/utility/Hooks';
import { setActiveTask, setActiveParentTask, selectActiveParentTask } from '../../../store/tasks/tasksSlice';
import { useDrag, useDrop } from 'react-dnd';

export function useTableRowController(
	issue: ITask,
	allIssues: ITask[],
	activateTaskModal: () => void,
	setFinishIconClickedIssue: (isueId: number | undefined) => void,
	finishedIssues: ITask[],
	isFinished?: boolean,
	index?: number,
	updateKanbanData?: Dispatch<SetStateAction<IKanbanIssue[] | undefined>>,
): any {
	const [isRowHovered, setIsRowHovered] = useState(false);
	const [isFinishIconHovered, setIsFinishIconHovered] = useState(false);
	const [isFinishIconFocused, setIsFinishIconFocused] = useState(false);
	const [showPlaceholderBefore, setShowPlaceholderBefore] = useState(false);
	const [showPlaceholderAfter, setShowPlaceholderAfter] = useState(false);

	const [dragIssue] = useDragIssueMutation();

	const dispatch = useAppDispatch();
	const activeParentIssue = useAppSelector(selectActiveParentTask);

	const showToast = useShowToast();
	const router = useRouter();
	const { slug: projectSlug } = router.query;

	const {
		active: isFinishModalActive,
		activate: activateFinishModal,
		deactivate: deactivateFinishModal,
	} = useToggle(false);

	const [completeIssue] = useCompleteIssueMutation();

	const totalIssues = useMemo<ITask[]>(() => {
		const all = [...allIssues, ...finishedIssues];
		const uniqueById = all.reduce<ITask[]>((acc, task) => {
			if (!acc.some(t => t.id === task.id)) acc.push(task);
			return acc;
		}, []);
		return uniqueById;
	}, [allIssues, finishedIssues]);

	const issueChildrenCount = useMemo(
		() => totalIssues.filter((currentIssue) => currentIssue.parent_id === issue.id).length,
		[totalIssues, issue]
	);

	const issueChildrenCompleteCount = useMemo(
		() => totalIssues.filter((currentIssue) => currentIssue.parent_id === issue.id)
			.filter((issue) => issue.completed_on !== null).length,
		[totalIssues, issue]
	);

	const onIssueClick = (id: number) => {
		activateTaskModal();
		dispatch(setActiveTask(id));
		// Создание нового объекта query, чтобы не мутировать существующий
		const newQuery = { ...router.query, modal: id };

		router.push({
			pathname: router.pathname,
			query: newQuery,
		});
	};

	const handleFinishIssue = (id: number) => {
		deactivateFinishModal();
		completeIssue({
			projectSlug,
			projectIssueId: id,
		})
			.unwrap()
			.then(() => {
				showToast('Задача завершена');
			})
			.catch((error) => {
				showToast(`Ошибка! ${error?.data?.message}`);
			})
			.finally(() => {
				setTimeout(() => {
					setFinishIconClickedIssue(undefined);
				}, 2000);
			});
	};

	const handleRestoreIssue = (id: number) => {
		completeIssue({
			projectSlug,
			projectIssueId: id,
		})
			.unwrap()
			.then(() => {
				showToast('Задача восстановлена');
			})
			.catch((error) => {
				showToast(`Ошибка! ${error?.data?.message}`);
			})
			.finally(() => {
				setTimeout(() => {
					setFinishIconClickedIssue(undefined);
				}, 2000);
			});
	};

	const handleFinishIconClick = (event: MouseEvent<HTMLElement>, id: number, issueChildrenCount: number, issueChildrenCompleteCount: number ) => {
		event.stopPropagation();
		setIsFinishIconFocused(true);
		setFinishIconClickedIssue(id);
		isFinished ? handleRestoreIssue(id) : issueChildrenCount !== issueChildrenCompleteCount ? activateFinishModal() : handleFinishIssue(id);
	};

	const setActiveParentIssue = (id: number | undefined) => dispatch(setActiveParentTask(id));

	const [{ isDragging }, dragRef] = useDrag({
		type: 'ISSUE',
		item: { ...issue, index },
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});

	const handleHoverBefore = (draggedIssue: any, droppedIssue: any) => {
		const draggedBoard = draggedIssue.project_issue_kanban_id;
		const droppedBoard = droppedIssue.project_issue_kanban_id;
		if (draggedBoard !== droppedBoard) {
			setShowPlaceholderBefore(true);
		} else {
			const draggedIssueIndex = draggedIssue.index;
			const droppedIssueIndex = droppedIssue.index;
			setShowPlaceholderBefore(!(droppedIssueIndex - draggedIssueIndex === 1));
		}
	};

	const handleHoverAfter = (draggedIssue: any, droppedIssue: any) => {
		const draggedBoard = draggedIssue.project_issue_kanban_id;
		const droppedBoard = droppedIssue.project_issue_kanban_id;
		if (draggedBoard !== droppedBoard) {
			setShowPlaceholderAfter(true);
		} else {
			const draggedIssueIndex = draggedIssue.index;
			const droppedIssueIndex = droppedIssue.index;
			setShowPlaceholderAfter(!(draggedIssueIndex - droppedIssueIndex === 1));
		}
	};

	const handleDrop = (draggedIssue: any, droppedIssue: any, before: boolean) => {
		const draggedBoardId = draggedIssue.project_issue_kanban_id;
		const droppedBoardId = droppedIssue.project_issue_kanban_id;

		if (updateKanbanData && draggedBoardId !== droppedBoardId) {
			updateKanbanData((prevKanbanData: IKanbanIssue[] | undefined) => {
				return (prevKanbanData as IKanbanIssue[]).map((kanbanGroup) => {
					if (kanbanGroup.id === draggedBoardId) {
						return {
							...kanbanGroup,
							issues: kanbanGroup.issues.filter(({ id }) => id !== draggedIssue.id),
						};
					} else if (kanbanGroup.id === droppedBoardId) {
						const droppedIssueIndex = kanbanGroup.issues.findIndex(({ id }) => id === droppedIssue.id);
						const draggedIssueIndex = before ? droppedIssueIndex : droppedIssueIndex + 1;
						const { index, ...issueData } = draggedIssue;

						return {
							...kanbanGroup,
							issues: [
								...kanbanGroup.issues.slice(0, draggedIssueIndex),
								issueData,
								...kanbanGroup.issues.slice(draggedIssueIndex),
							],
						};
					} else {
						return kanbanGroup;
					}
				});
			});
		}

		if (updateKanbanData && draggedBoardId === droppedBoardId) {
			updateKanbanData((prevKanbanData: IKanbanIssue[] | undefined) => {
				return (prevKanbanData as IKanbanIssue[]).map((kanbanGroup) => {
					if (kanbanGroup.id === draggedBoardId) {
						const issues = kanbanGroup.issues.filter(({ id }) => id !== draggedIssue.id);
						const droppedIssueIndex = issues.findIndex(({ id }) => id === droppedIssue.id);
						const draggedIssueIndex = before ? droppedIssueIndex : droppedIssueIndex + 1;
						const { index, ...issueData } = draggedIssue;

						return {
							...kanbanGroup,
							issues: [...issues.slice(0, draggedIssueIndex), issueData, ...issues.slice(draggedIssueIndex)],
						};
					} else {
						return kanbanGroup;
					}
				});
			});
		}

		dragIssue({
			projectSlug,
			body: {
				source: draggedIssue.id,
				target: droppedIssue.id,
				before,
			},
		});
	};

	const [{ isOver: isOverBeforePlaceholder }, issueBeforePlaceholderDropRef] = useDrop({
		accept: 'ISSUE',
		drop: (item: any) => handleDrop(item, { ...issue, index }, true),
		hover: (item: any) => handleHoverBefore(item, { ...issue, index }),
		collect: (monitor) => ({
			isOver: monitor.isOver(),
		}),
	});

	const [{ isOver: isOverBefore }, issueBeforeDropRef] = useDrop({
		accept: 'ISSUE',
		drop: (item: any) => handleDrop(item, { ...issue, index }, true),
		hover: (item: any) => handleHoverBefore(item, { ...issue, index }),
		collect: (monitor) => ({
			isOver: monitor.isOver(),
		}),
	});

	const [{ isOver: isOverAfterPlaceholder }, issueAfterPlaceholderDropRef] = useDrop({
		accept: 'ISSUE',
		drop: (item: any) => handleDrop(item, { ...issue, index }, false),
		hover: (item: any) => handleHoverAfter(item, { ...issue, index }),
		collect: (monitor) => ({
			isOver: monitor.isOver(),
		}),
	});

	const [{ isOver: isOverAfter }, issueAfterDropRef] = useDrop({
		accept: 'ISSUE',
		drop: (item: any) => handleDrop(item, { ...issue, index }, false),
		hover: (item: any) => handleHoverAfter(item, { ...issue, index }),
		collect: (monitor) => ({
			isOver: monitor.isOver(),
		}),
	});

	return {
		issueChildrenCount,
		issueChildrenCompleteCount,
		isRowHovered,
		setIsRowHovered,
		onIssueClick,
		isFinishIconFocused,
		isFinishIconHovered,
		setIsFinishIconHovered,
		setIsFinishIconFocused,
		handleFinishIconClick,
		isFinishModalActive,
		deactivateFinishModal,
		handleFinishIssue,
		handleRestoreIssue,
		activeParentIssue,
		setActiveParentIssue,
		showPlaceholderBefore,
		showPlaceholderAfter,
		isDragging,
		dragRef,
		isOverBeforePlaceholder,
		issueBeforePlaceholderDropRef,
		isOverBefore,
		issueBeforeDropRef,
		isOverAfterPlaceholder,
		issueAfterPlaceholderDropRef,
		isOverAfter,
		issueAfterDropRef,
	};
}

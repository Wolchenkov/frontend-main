import { Dispatch, SetStateAction, useState } from 'react';
import { useDrop } from 'react-dnd';
import { useRouter } from 'next/router';
import {
	useCompleteIssueMutation,
	useDragIssueEmptyColumnMutation,
	useUpdateIssueMutation,
} from '../../store/projects/projectsApi';
import { useToggle } from 'reshaped/bundle';
import { useShowToast } from '../../shared/utility/Hooks';

interface KanbanColumnProps {
	tasks: ITask[] | undefined;
	finishedTasks: ITask[] | undefined;
	step: {
		id: number;
		sort: number;
		name: string;
		projectIssue: number[];
	};
	setProjectIssueSort?: Dispatch<SetStateAction<IKanban[]>>;
	setFinishedTasks: Dispatch<SetStateAction<ITask[]>>;
}

export function useKanbanColumnController({
	tasks,
	step,
	setFinishedTasks,
	setProjectIssueSort,
	finishedTasks,
}: KanbanColumnProps) {
	const showToast = useShowToast();
	const [isHoveredHeader, setIsHoveredHeader] = useState(false);
	const isCompleted = step.name === 'Завершенные';

	const tasksForColumn = step.projectIssue
		.map((task) => [...(tasks || []), ...(finishedTasks || [])]?.find((el) => el.id === task))
		.filter((task): task is ITask => task !== undefined);

	const {
		active: isFinishModalActive,
		activate: activateFinishModal,
		deactivate: deactivateFinishModal,
	} = useToggle(false);
	const [draggedIdForFinishing, setDraggedIdForFinishing] = useState(0);

	const router = useRouter();
	const { slug: projectSlug } = router.query;

	const [completeIssue] = useCompleteIssueMutation();
	const [{ isOver: isOverCompleted }, dropRefOverCompleted] = useDrop({
		accept: 'TASK',
		drop: (item: { id: number }) => {
			const draggedId = item.id;
			if (setProjectIssueSort) {
				setProjectIssueSort((prev) => {
					const childrenCount = tasks && tasks.filter((currentIssue) => currentIssue.parent_id === draggedId).length;
					if (childrenCount && childrenCount > 0) {
						activateFinishModal();
						setDraggedIdForFinishing(draggedId);
						return prev;
					} else {
						// Находим перетаскиваемую задачу и удаляем её
						const draggedBoard = prev.find((board) => board.projectIssue.includes(draggedId));
						if (!draggedBoard) return prev;

						const draggedIndex = draggedBoard.projectIssue.findIndex((id) => id === draggedId);
						if (draggedIndex === -1) throw new Error('No index found for draggedId');
						// Создаем копию доски
						const newDraggedBoard: IKanban = {
							id: draggedBoard.id,
							sort: draggedBoard.sort,
							name: draggedBoard.name,
							projectIssue: [...draggedBoard.projectIssue],
							projectIssueFinish: [...draggedBoard.projectIssueFinish],
							projectIssueFinishCount: draggedBoard.projectIssueFinishCount,
						};

						// newDraggedBoard.projectIssue.splice(draggedIndex, 1);

						const draggedTask = tasks?.find((task) => task.id === draggedId);

						const updatedPrev = prev.map((board) => (board.id === newDraggedBoard.id ? newDraggedBoard : board));
						draggedTask && setFinishedTasks((prev) => [draggedTask, ...prev]);
						newDraggedBoard.projectIssue.splice(draggedIndex, 1);
						const payload = { projectSlug, projectIssueId: draggedId };
						completeIssue(payload);

						return updatedPrev;
					}
				});
			}
		},
		collect: (monitor) => ({
			isOver: monitor.isOver(),
		}),
	});
	const handleFinishIssue = (draggedId: number) => {
		if (setProjectIssueSort) {
			setProjectIssueSort((prev) => {
				// Находим перетаскиваемую задачу и удаляем её
				const draggedBoard = prev.find((board) => board.projectIssue.includes(draggedId));
				if (!draggedBoard) return prev;

				const draggedIndex = draggedBoard.projectIssue.findIndex((id) => id === draggedId);
				if (draggedIndex === -1) throw new Error('No index found for draggedId');
				// Создаем копию доски
				const newDraggedBoard: IKanban = {
					id: draggedBoard.id,
					sort: draggedBoard.sort,
					name: draggedBoard.name,
					projectIssue: [...draggedBoard.projectIssue],
					projectIssueFinish: [...draggedBoard.projectIssueFinish],
					projectIssueFinishCount: draggedBoard.projectIssueFinishCount,
				};

				// newDraggedBoard.projectIssue.splice(draggedIndex, 1);

				const draggedTask = tasks?.find((task) => task.id === draggedId);

				const updatedPrev = prev.map((board) => (board.id === newDraggedBoard.id ? newDraggedBoard : board));
				draggedTask && setFinishedTasks((prev) => [draggedTask, ...prev]);
				newDraggedBoard.projectIssue.splice(draggedIndex, 1);
				deactivateFinishModal();
				completeIssue({
					projectSlug,
					projectIssueId: draggedId,
				})
					.unwrap()
					.then(() => {
						showToast('Задача завершена');
					})
					.catch((error) => {
						showToast(`Ошибка! ${error?.data?.message}`);
					});
				return updatedPrev;
			});
		}
	};

	const [dragIssueInEmptyColumn] = useDragIssueEmptyColumnMutation();
	const [updateIssue] = useUpdateIssueMutation();
	const [{ isOver: isOverEmpty }, emptyColumnDropRef] = useDrop({
		accept: 'TASK',
		drop: (item: { id: number }) => {
			if (isCompleted) return;
			const draggedId = item.id;
			const droppedColumnId = step.id;
			if (setProjectIssueSort) {
				setProjectIssueSort((prev) => {
					const draggedBoard = prev.find((board) => board.projectIssue.includes(draggedId));
					if (!draggedBoard) {
						const droppedBoard = prev.find((board) => board.id === droppedColumnId);
						if (!droppedBoard) throw new Error('No board found for droppedColumnId');
						const newDroppedBoard: IKanban = {
							id: droppedBoard.id,
							sort: droppedBoard.sort,
							name: droppedBoard.name,
							projectIssue: [...droppedBoard.projectIssue],
							projectIssueFinish: [...droppedBoard.projectIssueFinish],
							projectIssueFinishCount: droppedBoard.projectIssueFinishCount,
						};
						newDroppedBoard.projectIssue.push(draggedId);

						const updatedPrev = prev.map((board) => (board.id === newDroppedBoard.id ? newDroppedBoard : board));

						const body = { completed_on: null };
						const payload = { projectSlug, body, projectIssueId: draggedId };
						updateIssue(payload);

						return updatedPrev;
					}

					const draggedIndex = draggedBoard.projectIssue.findIndex((id) => id === draggedId);
					if (draggedIndex === -1) throw new Error('No index found for draggedId');

					const newDraggedBoard: IKanban = {
						id: draggedBoard.id,
						sort: draggedBoard.sort,
						name: draggedBoard.name,
						projectIssue: [...draggedBoard.projectIssue],
						projectIssueFinish: [...draggedBoard.projectIssueFinish],
						projectIssueFinishCount: draggedBoard.projectIssueFinishCount,
					};
					newDraggedBoard.projectIssue.splice(draggedIndex, 1);

					const updatedPrev = prev.map((board) => (board.id === newDraggedBoard.id ? newDraggedBoard : board));

					const droppedBoard = updatedPrev.find((board) => board.id === droppedColumnId);
					if (!droppedBoard) throw new Error('No board found for droppedColumnId');

					const newDroppedBoard: IKanban = {
						id: droppedBoard.id,
						sort: droppedBoard.sort,
						name: droppedBoard.name,
						projectIssue: [...droppedBoard.projectIssue],
						projectIssueFinish: [...droppedBoard.projectIssueFinish],
						projectIssueFinishCount: droppedBoard.projectIssueFinishCount,
					};
					newDroppedBoard.projectIssue.push(draggedId);

					const updatedPrev2 = updatedPrev.map((board) => (board.id === newDroppedBoard.id ? newDroppedBoard : board));

					return updatedPrev2;
				});
			}

			const body = { project_issue_kanban_id: droppedColumnId };
			const payload = { projectSlug, body, projectIssueId: draggedId };
			dragIssueInEmptyColumn(payload);
		},
		collect: (monitor) => ({
			isOver: monitor.isOver(),
		}),
	});

	const [isOverTask, setIsOverTask] = useState(false);
	return {
		isHoveredHeader,
		setIsHoveredHeader,
		isCompleted,
		tasksForColumn,
		isOverEmpty,
		emptyColumnDropRef,
		dropRefOverCompleted,
		isOverCompleted,
		isOverTask,
		setIsOverTask,
		isFinishModalActive,
		deactivateFinishModal,
		draggedIdForFinishing,
		handleFinishIssue,
	};
}

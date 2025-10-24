import { Dispatch, SetStateAction, useState, useMemo } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useRouter } from 'next/router';
import { useDragIssueMutation, useUpdateIssueMutation, useCompleteIssueMutation } from '../../store/projects/projectsApi';
import { useShowToast } from '../../shared/utility/Hooks';

interface IKanbanTask {
	task: ITask;
	tasks: ITask[];
	finishedTasks: ITask[];
	setTasks: Dispatch<SetStateAction<ITask[]>>;
	setFinishedTasks: Dispatch<SetStateAction<ITask[]>>;
	isFocusMode: number;
	setIsFocusMode: Dispatch<SetStateAction<number>>;
	setProjectIssueSort?: React.Dispatch<React.SetStateAction<IKanban[]>>;
	projectIssueSort?: IKanban[];
}

export function useKanbanTaskController({
	task,
	setProjectIssueSort,
	projectIssueSort,
	tasks,
	isFocusMode,
	setIsFocusMode,
	setTasks,
	setFinishedTasks,
	finishedTasks,
}: IKanbanTask) {
	function convertDeadlineDate(dateStr: string) {
		const date = new Date(dateStr);
		const day = String(date.getDate()).padStart(2, '0');
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const year = String(date.getFullYear()).slice(2);
		return `До ${day}.${month}.${year}`;
	}

	const router = useRouter();
	const { slug: projectSlug } = router.query;

	const [dragIssue] = useDragIssueMutation();
	const [updateIssue] = useUpdateIssueMutation();
	const [completeIssue] = useCompleteIssueMutation();
	const showToast = useShowToast();

	const [{ isDragging }, dragRef] = useDrag({
		type: 'TASK',
		item: { id: task.id },
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});

	const handleDrop = (draggedId: number, droppedId: number, before: boolean) => {
		if (setProjectIssueSort)
			setProjectIssueSort((prev) => {
				const draggedBoard = prev.find((board) => board.projectIssue.includes(draggedId));
				if (!draggedBoard) {
					//если доска не найдена, значит это завершенная задача

					const droppedBoard = prev.find((board) => board.projectIssue.includes(droppedId));
					if (!droppedBoard) throw new Error('No board found for droppedColumnId');

					const droppedIndex = droppedBoard.projectIssue.findIndex((id) => id === droppedId);
					if (droppedIndex === -1) throw new Error('No index found for droppedId');
					// Создаем копию доски
					const newDroppedBoard: IKanban = {
						id: droppedBoard.id,
						sort: droppedBoard.sort,
						name: droppedBoard.name,
						projectIssue: [...droppedBoard.projectIssue],
						projectIssueFinish: [...droppedBoard.projectIssueFinish],
						projectIssueFinishCount: droppedBoard.projectIssueFinishCount,
					};

					newDroppedBoard.projectIssue.splice(droppedIndex + (before ? 0 : 1), 0, draggedId);

					const updatedPrev = prev.map((board) => (board.id === newDroppedBoard.id ? newDroppedBoard : board));

					const body = { completed_on: null };
					const payload = { projectSlug, body, projectIssueId: draggedId };
					updateIssue(payload);

					return updatedPrev;
				} else {
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
					newDraggedBoard.projectIssue.splice(draggedIndex, 1);

					const updatedPrev = prev.map((board) => (board.id === newDraggedBoard.id ? newDraggedBoard : board));
					// Находим задачу, над которой осуществляется drop и вставляем после нее перетаскиваемую задачу
					const droppedBoard = updatedPrev.find((board) => board.projectIssue.includes(droppedId));
					if (!droppedBoard) throw new Error('No board found for droppedColumnId');

					const droppedIndex = droppedBoard.projectIssue.findIndex((id) => id === droppedId);
					if (droppedIndex === -1) throw new Error('No index found for droppedId');
					// Создаем копию доски
					const newDroppedBoard: IKanban = {
						id: droppedBoard.id,
						sort: droppedBoard.sort,
						name: droppedBoard.name,
						projectIssue: [...droppedBoard.projectIssue],
						projectIssueFinish: [...droppedBoard.projectIssueFinish],
						projectIssueFinishCount: droppedBoard.projectIssueFinishCount,
					};

					newDroppedBoard.projectIssue.splice(droppedIndex + (before ? 0 : 1), 0, draggedId);

					const updatedPrev2 = updatedPrev.map((board) => (board.id === newDroppedBoard.id ? newDroppedBoard : board));

					return updatedPrev2;
				}
			});

		const body = { source: draggedId, target: droppedId, before };
		const payload = { projectSlug, body };
		dragIssue(payload);
	};

	const [showPlaceholderBefore, setShowPlaceholderBefore] = useState(false);
	const handleHoverBefore = (draggedId: number, droppedId: number) => {
		const draggedBoard = projectIssueSort?.find((board) => board.projectIssue.includes(draggedId));
		const droppedBoard = projectIssueSort?.find((board) => board.projectIssue.includes(droppedId));
		if (draggedBoard?.id !== droppedBoard?.id) {
			setShowPlaceholderBefore(true);
		} else {
			const draggedTaskIndex = draggedBoard?.projectIssue.findIndex((board) => board === draggedId);
			const droppedTaskIndex = draggedBoard?.projectIssue.findIndex((board) => board === droppedId);
			if (typeof draggedTaskIndex === 'number' && typeof droppedTaskIndex === 'number')
				setShowPlaceholderBefore(!(droppedTaskIndex - draggedTaskIndex === 1));
		}
	};

	const [{ isOver: isOverBefore }, taskBeforeDropRef] = useDrop({
		accept: 'TASK',
		drop: (item: { id: number }) => handleDrop(item.id, task.id, true),
		hover: (item: { id: number }) => handleHoverBefore(item.id, task.id),
		collect: (monitor) => ({
			isOver: monitor.isOver(),
		}),
	});
	const [{ isOver: isOverBeforePlaceholder }, taskBeforePlaceholderDropRef] = useDrop({
		accept: 'TASK',
		drop: (item: { id: number }) => handleDrop(item.id, task.id, true),
		hover: (item: { id: number }) => handleHoverBefore(item.id, task.id),
		collect: (monitor) => ({
			isOver: monitor.isOver(),
		}),
	});

	const handleHoverAfter = (draggedId: number, droppedId: number) => {
		const draggedBoard = projectIssueSort?.find((board) => board.projectIssue.includes(draggedId));
		const droppedBoard = projectIssueSort?.find((board) => board.projectIssue.includes(droppedId));
		if (draggedBoard?.id !== droppedBoard?.id) {
			setShowPlaceholderAfter(true);
		} else {
			const draggedTaskIndex = draggedBoard?.projectIssue.findIndex((board) => board === draggedId);
			const droppedTaskIndex = draggedBoard?.projectIssue.findIndex((board) => board === droppedId);
			if (typeof draggedTaskIndex === 'number' && typeof droppedTaskIndex === 'number')
				setShowPlaceholderAfter(!(draggedTaskIndex - droppedTaskIndex === 1));
		}
	};
	const [showPlaceholderAfter, setShowPlaceholderAfter] = useState(false);

	const [{ isOver: isOverAfter }, taskAfterDropRef] = useDrop({
		accept: 'TASK',
		drop: (item: { id: number }) => handleDrop(item.id, task.id, false),
		hover: (item: { id: number }) => handleHoverAfter(item.id, task.id),
		collect: (monitor) => ({
			isOver: monitor.isOver(),
		}),
	});
	const [{ isOver: isOverAfterPlaceholder }, taskAfterPlaceholderDropRef] = useDrop({
		accept: 'TASK',
		drop: (item: { id: number }) => handleDrop(item.id, task.id, false),
		hover: (item: { id: number }) => handleHoverAfter(item.id, task.id),
		collect: (monitor) => ({
			isOver: monitor.isOver(),
		}),
	});

	//фокус на тасках
	function focusChildTasks(e: MouseEvent) {
		e.stopPropagation();
		setIsFocusMode(task.id);
		const taskForFocus = tasks
			.map((el) => ({ ...el, focus: null }))
			.filter((item) => item.parent_id === task.id || item.id === task.id)
			.map((elem) => ({ ...elem, focus: true }));

		setTasks((prev) => {
			return prev.map((oldTask) => {
				const task = taskForFocus.find((task) => task.id === oldTask.id);
				return task ? task : oldTask;
			});
		});
		const taskCompletedForFocus = finishedTasks
			.map((el) => ({ ...el, focus: null }))
			.filter((item) => item.parent_id === task.id || item.id === task.id)
			.map((elem) => ({ ...elem, focus: true }));

		setFinishedTasks((prev) => {
			return prev.map((oldTask) => {
				const task = taskCompletedForFocus.find((task) => task.id === oldTask.id);
				return task ? task : oldTask;
			});
		});
	}

	function dropFocusChildTasks(e: MouseEvent) {
		e.stopPropagation();
		setIsFocusMode(0);
		setTasks((prev) => prev.map((el) => ({ ...el, focus: null })));
		setFinishedTasks((prev) => prev.map((el) => ({ ...el, focus: null })));
	}

	const [isCardHovered, setIsCardHovered] = useState(false);

	const totalIssues = useMemo( () => {
			return finishedTasks && finishedTasks ? [...tasks, ...finishedTasks] : tasks;
		}, [tasks, finishedTasks]);

	const childTasks = useMemo(() => totalIssues.filter((item) => item.parent_id === task.id), [totalIssues, task.id]);
	const completedChildTasks = useMemo(() => childTasks.filter((task) => task.completed_on !== null), [childTasks]);

	const handleFinishIssue = (id: number) => {
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
			});
	};

	return {
		convertDeadlineDate,
		isDragging,
		dragRef,
		isOverBefore,
		taskBeforeDropRef,
		isOverAfter,
		taskAfterDropRef,
		isCardHovered,
		setIsCardHovered,
		focusChildTasks,
		setIsFocusMode,
		isFocusMode,
		dropFocusChildTasks,
		taskBeforePlaceholderDropRef,
		isOverBeforePlaceholder,
		isOverAfterPlaceholder,
		taskAfterPlaceholderDropRef,
		showPlaceholderBefore,
		showPlaceholderAfter,
		handleFinishIssue,
		handleRestoreIssue,
		childTasks,
		completedChildTasks,
	};
}

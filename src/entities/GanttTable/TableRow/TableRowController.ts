import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { useLinkGanttTasksMutation } from '../../../store/projects/projectsApi';
import { useOnClickOutside } from '../../../shared/utility/Hooks';
import { setActiveTask } from '../../../store/tasks/tasksSlice';
import { useAppDispatch } from '../../../store';

interface ITableRowControllerProps {
	isFetching: boolean;
	kanban: number;
	activateTaskModal: () => void;
}

export const useTableRowController = ({ isFetching, kanban, activateTaskModal }: ITableRowControllerProps) => {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const { slug: projectSlug } = router.query;

	const [isExpanded, setIsExpanded] = useState(true);
	const [hoveredItem, setHoveredItem] = useState<number | undefined>();
	const [activeItem, setActiveItem] = useState<number | undefined>();
	const [temporaryArrows, setTemporaryArrows] = useState<{ [key: string]: { from: number } } | undefined>();
	const [temporaryRemovedArrows, setTemporaryRemovedArrows] = useState<number[]>([]);
	const [linkGanttTasks, { isLoading }] = useLinkGanttTasksMutation();

	const ref = useRef(null);
	useOnClickOutside(ref, () => setActiveItem(undefined), 'gantt-item');

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

	const onGanttItemClick = (id: number) => {
		if (!activeItem) {
			setActiveItem(id);
		} else if (activeItem === id) {
			setActiveItem(undefined);
		} else {
			setTemporaryArrows((prevState) => ({ ...prevState, [id]: { to: activeItem } }));

			setActiveItem(undefined);

			const body = {
				issue_id: id,
				gant_parent_id: activeItem,
			};
			linkGanttTasks({ projectSlug, kanban, body });
		}
	};

	const removeConnection = (id: number) => {
		const body = {
			issue_id: id,
		};
		setTemporaryRemovedArrows((prevState) => [...prevState, id]);
		linkGanttTasks({ projectSlug, kanban, body });
	};

	useEffect(() => {
		if (!isLoading && !isFetching) {
			setTemporaryArrows(undefined);
			setTemporaryRemovedArrows([]);
		}
	}, [isLoading, isFetching]);

	useEffect(() => {
		const handleEscapeKey = (event: KeyboardEvent) => {
			if (event.code === 'Escape') {
				setActiveItem(undefined);
			}
		};

		document.addEventListener('keydown', handleEscapeKey);
		return () => document.removeEventListener('keydown', handleEscapeKey);
	}, []);

	return {
		isExpanded,
		setIsExpanded,
		hoveredItem,
		setHoveredItem,
		activeItem,
		onIssueClick,
		onGanttItemClick,
		temporaryArrows,
		temporaryRemovedArrows,
		ref,
		removeConnection,
	};
};

import { FC, useEffect, useRef, useState } from 'react';
import * as S from './Kanban.styled';
import { SvgComponent } from '../../../shared';
import { KanbanColumn } from '../../../entities/Kanban/KanbanColumn';
import { useGetIssuePrioritiesQuery } from '../../../store/dictionaries/dictionariesApi';
import { AddProjectStageModal } from '../../../entities';
import { useToggle } from 'reshaped/bundle';
import { StagesEmpty } from '../../../entities/ProjectLineViewTable/StagesEmpty/StagesEmpty';
import DroppableColumn from '../../../entities/Kanban/DroppableColumnHOC/DroppableColumn';
import DraggableColumn from '../../../entities/Kanban/DraggableColumnHOC/DraggableColumn';

interface IKanbanProps {
	projectData: IOneProject;
	tasksData: ITask[];
	finishedTasksData: ITask[];
	activateTaskModal: () => void;
	isClientRole: boolean;
	userRole: string | undefined;
}

const Kanban: FC<IKanbanProps> = ({
	projectData,
	tasksData,
	finishedTasksData,
	activateTaskModal,
	isClientRole,
	userRole,
}) => {
	const { data: issuePriorities = [] } = useGetIssuePrioritiesQuery();
	const [columnsOrder, setColumnsOrder] = useState<number[]>([]); // для сортировки этапов
	const [projectIssueSort, setProjectIssueSort] = useState<IKanban[]>(JSON.parse(JSON.stringify(projectData.Kanban)));
	const [tasks, setTasks] = useState<ITask[]>(JSON.parse(JSON.stringify(tasksData)));
	const [finishedTasks, setFinishedTasks] = useState<ITask[]>(JSON.parse(JSON.stringify(finishedTasksData)));

	const [isFocusMode, setIsFocusMode] = useState(0);

	const {
		active: activeModalAddProjectStage,
		activate: activateModalAddProjectStage,
		deactivate: deactivateModalAddProjectStage,
	} = useToggle(false); //  модалкa добавления этапа

	useEffect(() => {
		setColumnsOrder([...projectData.Kanban].sort((a, b) => a.sort - b.sort).map((step) => step.id));
		setProjectIssueSort([...projectData.Kanban]);
	}, [projectData]);

	useEffect(() => {
		setFinishedTasks([...finishedTasksData]);
	}, [finishedTasksData]);

	useEffect(() => {
		setTasks([...tasksData]);
	}, [tasksData]);

	useEffect(() => {
		function handleGlobalClick() {
			if (isFocusMode) {
				setIsFocusMode(0);
				setTasks((prev) => prev.map((el) => ({ ...el, focus: null })));
				setFinishedTasks((prev) => prev.map((el) => ({ ...el, focus: null })));
			}
		}
		window.addEventListener('click', handleGlobalClick);
		window.addEventListener('dragstart', handleGlobalClick);
		return () => {
			window.removeEventListener('click', handleGlobalClick);
			window.removeEventListener('dragstart', handleGlobalClick);
		};
	}, [isFocusMode, setTasks, setFinishedTasks]);

	const [dragging, setDragging] = useState(false);
	const containerRef = useRef<HTMLElement | null>(null);
	// Событие, которое происходит при начале перетаскивания элемента
	const onDragStart = () => {
		setDragging(true);
	};

	// Событие, которое происходит при окончании перетаскивания элемента
	const onDragEnd = () => {
		setDragging(false);
	};

	// Событие, которое происходит при перетаскивании элемента
	const onDragOver = (e: any) => {
		e.preventDefault();

		if (dragging) {
			// Находим элемент с классом .MainContainer
			const container = containerRef.current;

			if (!container) return; // Если container все еще null, просто прерываем функцию

			// Вычисляем положение курсора относительно контейнера
			const rect = container.getBoundingClientRect();
			const x = e.clientX - rect.left; //x position within the element.

			const { scrollWidth } = container;
			const { clientWidth } = container;

			// Если курсор в начале или в конце контейнера
			if (x < scrollWidth * 0.075) {
				container.scrollLeft -= 10; // скролл влево
			} else if (x > clientWidth - clientWidth * 0.075) {
				container.scrollLeft += 10; // скролл вправо
			}
		}
	};

	const commonProps = {
		tasks,
		finishedTasks,
		issuePriorities,
		setTasks,
		setFinishedTasks,
		isFocusMode,
		setIsFocusMode,
		setProjectIssueSort,
		projectIssueSort,
		activateTaskModal,
	};

	return (
		<>
			{projectData.Kanban.length ? (
				<S.MainContainer onDragStart={onDragStart} onDragEnd={onDragEnd} onDragOver={onDragOver} ref={containerRef}>
					{columnsOrder?.map((columnId) => {
						const step = projectIssueSort.find((step) => step.id === columnId);
						if (!step) return null;
						return (
							<DroppableColumn key={step.id} id={step.id} columnsOrder={columnsOrder} setColumnsOrder={setColumnsOrder}>
								<DraggableColumn id={step.id} isClientRole={isClientRole}>
									<KanbanColumn
										{...commonProps}
										step={step}
										columnNames={projectData.Kanban.map(({ name }) => name)}
										isClientRole={isClientRole}
										dataProject={projectData}
									/>
								</DraggableColumn>
							</DroppableColumn>
						);
					})}
					<S.BtnAddColumn
						disabled={isClientRole}
						onClick={activateModalAddProjectStage}
						size='small'
						variant='ghost'
						startIcon={<SvgComponent name='add-line' />}
					/>
					{projectIssueSort && (
						<KanbanColumn
							{...commonProps}
							step={{
								id: 0,
								sort: 0,
								name: 'Завершенные',
								projectIssue: [],
							}}
							columnNames={projectData.Kanban.map(({ name }) => name)}
						/>
					)}
				</S.MainContainer>
			) : (
				<StagesEmpty groupId={projectData.group_id} openModal={activateModalAddProjectStage} userRole={userRole} />
			)}
			<AddProjectStageModal
				size={'660px'}
				active={activeModalAddProjectStage}
				onClose={deactivateModalAddProjectStage}
				projectIssueSort={projectIssueSort}
			/>
		</>
	);
};

export default Kanban;

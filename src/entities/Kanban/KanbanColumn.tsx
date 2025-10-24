import React, { Dispatch, FC, SetStateAction } from 'react';
import { Badge, Text, useToggle } from 'reshaped/bundle';
import * as S from './KanbanColumn.styled';
import { SvgComponent } from '../../shared';
import { KanbanTask } from './KanbanTask';
import { useKanbanColumnController } from './KanbanColumnController';
import { StageMenu } from '../ProjectLineViewTable/StageMenu/StageMenu';
import { ConfirmModal } from '../Modal/ConfirmModal/ConfirmModal';
import { AddNewTaskModal } from '../Modal/AddNewTask/AddNewTaskModal';
import { useSelector } from 'react-redux';
import { selectShowSubtasks } from '../../store/tasks/tasksSlice';

interface KanbanColumnProps {
	tasks: ITask[] | undefined;
	step: {
		id: number;
		sort: number;
		name: string;
		projectIssue: number[];
	};
	finishedTasks: ITask[] | undefined;
	issuePriorities: fetchingDictionaryPriority[];
	setProjectIssueSort: Dispatch<SetStateAction<IKanban[]>>;
	setTasks: Dispatch<SetStateAction<ITask[]>>;
	setFinishedTasks: Dispatch<SetStateAction<ITask[]>>;
	isFocusMode: number;
	setIsFocusMode: Dispatch<SetStateAction<number>>;
	projectIssueSort: IKanban[];
	columnNames: string[];
	activateTaskModal: () => void;
	isClientRole?: boolean;
	dataProject?: IOneProject;
}

const KanbanColumnComponent: FC<KanbanColumnProps> = ({
	tasks,
	step,
	finishedTasks,
	issuePriorities,
	setProjectIssueSort,
	setTasks,
	setFinishedTasks,
	isFocusMode,
	setIsFocusMode,
	projectIssueSort,
	columnNames,
	activateTaskModal,
	isClientRole,
	dataProject,
}) => {
	const showSubtasks = useSelector(selectShowSubtasks);
	const {
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
	} = useKanbanColumnController({
		tasks,
		step,
		setProjectIssueSort,
		setFinishedTasks,
		finishedTasks,
	});

	const taskProps = {
		issuePriorities,
		setTasks,
		setFinishedTasks,
		isFocusMode,
		setIsFocusMode,
		activateTaskModal,
		isClientRole,
	};

	const getFilteredfinishedTasks = () => {
		return finishedTasks?.filter(
			(task) =>
				!projectIssueSort
					.map((el) => el.projectIssue)
					.flat(1)
					.includes(task.id) &&
				(showSubtasks || !task.parent_id)
		);
	};

	const filteredTasksForColumn = tasksForColumn?.filter((task) => showSubtasks || !task.parent_id);

	const {
		active: isModalAddTaskActive,
		activate: activateAddTaskModal,
		deactivate: deactivateAddTaskModal,
	} = useToggle(false);

	return (
		<>
			<S.Column isCompleted={isCompleted} ref={isCompleted ? dropRefOverCompleted : null}>
				{isOverCompleted && isCompleted && (
					<S.ColumnOverCompleted>
						<S.ColumnOverCompletedText>
							<SvgComponent name='check-complete' />
							<Text variant='body-medium-2' attributes={{ style: { color: '#118D2E', letterSpacing: '-0.02em' } }}>
								Завершить задачу
							</Text>
						</S.ColumnOverCompletedText>
					</S.ColumnOverCompleted>
				)}
				<S.Header onMouseEnter={() => setIsHoveredHeader(true)} onMouseLeave={() => setIsHoveredHeader(false)}>
					<S.Title>
						<Text variant='body-medium-2' attributes={{ style: { letterSpacing: '-0.02em' } }}>
							{step.name}
						</Text>
						{isHoveredHeader && !isCompleted && !isClientRole && (
							<StageMenu id={step.id} name={step.name} isVisible={isHoveredHeader} stages={columnNames} />
						)}
					</S.Title>
					<Badge size='small' color={isCompleted ? 'positive' : 'primary'}>
						{!isCompleted
							? filteredTasksForColumn?.length ?? 0
							: (getFilteredfinishedTasks()?.length ?? 0) > 99
							? '99+'
							: getFilteredfinishedTasks()?.length}
					</Badge>
				</S.Header>
				<S.BtnAddTask
					variant='ghost'
					disabled={isCompleted || isClientRole}
					startIcon={<SvgComponent name={isCompleted ? 'add-line-disabled' : 'add-line'} />}
					onClick={activateAddTaskModal}
					fullWidth
				/>
				{dataProject && !isClientRole && (
					<AddNewTaskModal
						active={isModalAddTaskActive}
						onClose={deactivateAddTaskModal}
						dataProject={dataProject}
						kanbanId={step.id}
					/>
				)}
				<S.TaskList ref={!filteredTasksForColumn?.length || !isOverTask ? emptyColumnDropRef : null}>
					{isCompleted
						? tasks &&
						  finishedTasks &&
						  getFilteredfinishedTasks()
								?.slice(0, 99)
								.map((task) => (
									<KanbanTask
										{...taskProps}
										key={task.id}
										task={task}
										tasks={tasks}
										finishedTasks={finishedTasks}
										isCompleted={isCompleted}
									/>
								))
						: filteredTasksForColumn?.length && tasks && finishedTasks && step
						? filteredTasksForColumn.map((task) => (
								<KanbanTask
									{...taskProps}
									key={task.id}
									task={task}
									tasks={tasks}
									finishedTasks={finishedTasks}
									isCompleted={isCompleted}
									setProjectIssueSort={setProjectIssueSort}
									projectIssueSort={projectIssueSort}
									setIsOverTask={setIsOverTask}
								/>
						  ))
						: null}
					{isOverEmpty ? <S.UnderCard isDragging={isOverEmpty} /> : null}
				</S.TaskList>
			</S.Column>
			<ConfirmModal
				active={isFinishModalActive}
				deactivate={() => {
					deactivateFinishModal();
				}}
				confirmDel={() => handleFinishIssue(draggedIdForFinishing)}
				text='Вы не выполнили подзадачи. Все равно завершить эту задачу?'
			/>
		</>
	);
};

export const KanbanColumn = React.memo(KanbanColumnComponent);

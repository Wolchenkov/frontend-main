import React, { Dispatch, FC, SetStateAction } from 'react';
import { Actionable, Text, Tooltip } from 'reshaped/bundle';
import * as S from './KanbanTask.styled';
import { AvatarCustom, SvgComponent } from '../../shared';
import { getInitials } from '../../shared/utility/Utils';
import { IssueMenu } from '../ProjectLineViewTable/IssueMenu/IssueMenu';
import { useKanbanTaskController } from './KanbanTaskController';
import { setActiveTask } from '../../store/tasks/tasksSlice';
import { useAppDispatch } from '../../store';
import { useRouter } from 'next/router';
import { SubtasksDropdownMenu } from '../ProjectLineViewTable/SubtasksDropdownMenu/SubtasksDropdownMenu';

export interface IKanbanTask {
	task: ITask;
	tasks: ITask[];
	finishedTasks: ITask[];
	isCompleted: boolean;
	issuePriorities: fetchingDictionaryPriority[];
	projectIssueSort?: IKanban[];
	setProjectIssueSort?: React.Dispatch<React.SetStateAction<IKanban[]>>;
	setTasks: Dispatch<SetStateAction<ITask[]>>;
	setFinishedTasks: Dispatch<SetStateAction<ITask[]>>;
	isFocusMode: number;
	setIsFocusMode: Dispatch<SetStateAction<number>>;
	activateTaskModal: () => void;
	setIsOverTask?: React.Dispatch<React.SetStateAction<boolean>>;
	isClientRole?: boolean;
}

export function getProgressPath(fraction: number) {
	const r = 4;
	const cx = 6;
	const cy = 6;

	if (fraction <= 0) return '';
	if (fraction >= 1) return `M${cx},${cy} L${cx},${cy - r} A${r},${r} 0 1,1 ${cx - 0.001},${cy - r} Z`;

	const angle = 2 * Math.PI * fraction - Math.PI / 2;
	const x = cx + r * Math.cos(angle);
	const y = cy + r * Math.sin(angle);
	const largeArc = fraction > 0.5 ? 1 : 0;

	return `M${cx},${cy} L${cx},${cy - r} A${r},${r} 0 ${largeArc},1 ${x},${y} Z`;
}

const KanbanTaskComponent: FC<IKanbanTask> = ({
	task,
	tasks,
	isCompleted,
	issuePriorities,
	setProjectIssueSort,
	setTasks,
	setFinishedTasks,
	isFocusMode,
	setIsFocusMode,
	finishedTasks,
	activateTaskModal,
	projectIssueSort,
	setIsOverTask,
	isClientRole,
}) => {
	const {
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
	} = useKanbanTaskController({
		task,
		setProjectIssueSort,
		tasks,
		isFocusMode,
		setIsFocusMode,
		setTasks,
		setFinishedTasks,
		finishedTasks,
		projectIssueSort,
	});

	const dispatch = useAppDispatch();
	const router = useRouter();

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

	const handleSetActiveParentIssue = (id: number | undefined) => {
		setIsFocusMode(id ?? 0);
	};

	return (
		<>
			{(isOverBefore || isOverBeforePlaceholder) && showPlaceholderBefore ? (
				<S.UnderCard
					ref={isCompleted ? null : taskBeforePlaceholderDropRef}
					isDragging={isDragging}
					onDragOver={() => setIsOverTask && setIsOverTask(true)}
					onDragLeave={() => setIsOverTask && setIsOverTask(false)}
				/>
			) : null}
			{isDragging ? (
				<S.UnderCard
					ref={!isClientRole ? dragRef : null}
					isDragging={isDragging}
					onDragOver={() => setIsOverTask && setIsOverTask(true)}
					onDragLeave={() => setIsOverTask && setIsOverTask(false)}
				/>
			) : (
				<S.Card
					focus={task.focus}
					isFocusMode={isFocusMode}
					ref={!isClientRole ? dragRef : null}
					onMouseEnter={() => setIsCardHovered(true)}
					onMouseLeave={() => setIsCardHovered(false)}
					isDragging={isDragging}
					onClick={() => onIssueClick(task.id)}
					onDragOver={() => setIsOverTask && setIsOverTask(true)}
					onDragLeave={() => setIsOverTask && setIsOverTask(false)}
				>
					<div ref={isCompleted ? null : taskBeforeDropRef}>
						<S.Header>
							<S.LeftSideHeader>
								<S.MyBadge size='small' colorBadge={isCompleted ? '#E9E9EB' : task.priority.color}>
									<></>
								</S.MyBadge>
								<Text
									color='neutral-faded'
									variant='caption-1'
									attributes={{ style: { fontWeight: 600, color: '#898B8F' } }}
								>
									{task.deadline ? convertDeadlineDate(task.deadline) : 'Не установлено'}
								</Text>
							</S.LeftSideHeader>
							{!isClientRole && (
								<IssueMenu
									issueId={task.id}
									priorities={issuePriorities}
									isFinished={isCompleted}
									isRowHovered={isCardHovered}
									setIsRowHovered={setIsCardHovered}
									kanban={true}
								/>
							)}
						</S.Header>
						<Text
							maxLines={3}
							variant='caption-1'
							attributes={{
								style: { fontWeight: 500, letterSpacing: '-0.01em' },
							}}
						>
							{task.parent_id && (
								<SvgComponent
									name={
										task.focus && task.id !== isFocusMode ? 'git-merge-fill-rotated-primary' : 'git-merge-fill-rotated'
									}
								/>
							)}
							{' ' + task.name}
						</Text>
					</div>

					<S.Footer ref={isCompleted ? null : taskAfterDropRef}>
						{task.delegate?.name ? (
							<Tooltip position='top' text={task.delegate.name}>
								{(attributes) => (
									<Actionable attributes={{ ...attributes, style: { cursor: 'default' } }}>
										<AvatarCustom
											src={task.delegate?.avatar || undefined}
											initials={getInitials(task.delegate.name)}
											size={6}
										/>
									</Actionable>
								)}
							</Tooltip>
						) : (
							<SvgComponent name='avatar-unassigned' />
						)}
						{childTasks.length ? (
							<SubtasksDropdownMenu
								subtasks={childTasks}
								isFinished={isCompleted}
								isRowHovered={isCardHovered}
								activeParentIssue={isFocusMode}
								issueId={task.id}
								issueChildrenCompleteCount={completedChildTasks.length}
								issueChildrenCount={childTasks.length}
								setActiveParentIssue={handleSetActiveParentIssue}
								onIssueClick={onIssueClick}
								onSubtaskStatusChange={(subtaskId, isCompleted) => {
									if (isCompleted) {
										handleFinishIssue(subtaskId);
									} else {
										handleRestoreIssue(subtaskId);
									}
								}}
								onMouseEnter={childTasks.length && !isFocusMode ? (e) => focusChildTasks(e as any) : undefined}
								onMouseLeave={childTasks.length && isFocusMode ? (e) => dropFocusChildTasks(e as any) : undefined}
							/>
						) : null}
					</S.Footer>
				</S.Card>
			)}
			{(isOverAfter || isOverAfterPlaceholder) && showPlaceholderAfter ? (
				<S.UnderCard ref={isCompleted ? null : taskAfterPlaceholderDropRef} isDragging={isDragging} />
			) : null}
		</>
	);
};

export const KanbanTask = React.memo(KanbanTaskComponent);

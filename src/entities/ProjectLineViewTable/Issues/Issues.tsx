import React, { FC, Dispatch, SetStateAction } from 'react';
import * as S from './Issues.styled';
import { Text, useToggle } from 'reshaped/bundle';
import { SvgComponent } from '../../../shared';
import { TableRow } from '../TableRow/TableRow';
import { getFilteredIssues, getSortedIssues } from '../../../shared/utility/Utils';
import { useIssuesController } from './IssuesController';
import { AddNewTaskModal } from '../../Modal/AddNewTask/AddNewTaskModal';
import { useSelector } from 'react-redux';
import { selectShowSubtasks } from '../../../store/tasks/tasksSlice';

interface IIssuesProps {
	userRole: string | undefined;
	finishIconClickedIssue: number | undefined;
	issues: ITask[];
	allIssues: ITask[];
	finishedIssues: ITask[];
	issuePriorities: fetchingDictionaryPriority[];
	sortOption: { type: string; direction: string };
	kanbanGroupId: number;
	activateTaskModal: () => void;
	setFinishIconClickedIssue: (isueId: number | undefined) => void;
	updateKanbanData?: Dispatch<SetStateAction<IKanbanIssue[] | undefined>>;
	projectData: IOneProject;
}

export const Issues: FC<IIssuesProps> = ({
	userRole,
	finishIconClickedIssue,
	issues,
	allIssues,
	finishedIssues,
	issuePriorities,
	sortOption,
	kanbanGroupId,
	activateTaskModal,
	setFinishIconClickedIssue,
	updateKanbanData,
	projectData,
}) => {
	const showSubtasks = useSelector(selectShowSubtasks);
	const {
		filter,
		showPlaceholderBefore,
		isOverBeforePlaceholder,
		issueBeforePlaceholderDropRef,
		isOverBefore,
		issueBeforeDropRef,
	} = useIssuesController(kanbanGroupId, updateKanbanData);

	const {
		active: isModalAddTaskActive,
		activate: activateAddTaskModal,
		deactivate: deactivateAddTaskModal,
	} = useToggle(false); // модалка для добавления задачи

	const filteredIssues = getFilteredIssues(getSortedIssues(issues, sortOption), filter).filter(
		(issue) => showSubtasks || !issue.parent_id
	);

	return (
		<>
			{filteredIssues.length ? (
				<S.TableBody>
					{filteredIssues.map((issue, index) => (
						<TableRow
							key={issue.id}
							userRole={userRole}
							index={index}
							issue={issue}
							finishIconClickedIssue={finishIconClickedIssue}
							allIssues={allIssues}
							finishedIssues={finishedIssues}
							priorities={issuePriorities}
							activateTaskModal={activateTaskModal}
							setFinishIconClickedIssue={setFinishIconClickedIssue}
							updateKanbanData={updateKanbanData}
						/>
					))}
				</S.TableBody>
			) : null}

			{(isOverBefore || isOverBeforePlaceholder) && showPlaceholderBefore ? (
				<S.UnderRow ref={issueBeforePlaceholderDropRef} />
			) : null}

			<S.TableButton
				variant='ghost'
				startIcon={<SvgComponent name='add-line' />}
				size='small'
				attributes={{
					style: { marginTop: `${filteredIssues.length ? '0' : '6px'}`, padding: '10px 20px' },
					ref: filteredIssues.length ? null : issueBeforeDropRef,
				}}
				onClick={activateAddTaskModal}
			>
				<Text
					variant='caption-1'
					color='neutral-faded'
					attributes={{ style: { marginLeft: '8px', lineHeight: '20px', fontWeight: 500, letterSpacing: '-0.01em' } }}
				>
					Добавить задачу
				</Text>
			</S.TableButton>
			<AddNewTaskModal
				active={isModalAddTaskActive}
				onClose={deactivateAddTaskModal}
				dataProject={projectData}
				kanbanId={kanbanGroupId}
			/>
		</>
	);
};

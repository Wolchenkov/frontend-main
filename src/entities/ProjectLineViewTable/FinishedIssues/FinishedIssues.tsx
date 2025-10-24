/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect, useState } from 'react';
import * as S from './FinishedIssues.styled';
import { Text } from 'reshaped/bundle';
import { SvgComponent } from '../../../shared';
import { TableRow } from '../TableRow/TableRow';
import { getFilteredIssues, getSortedIssues } from '../../../shared/utility/Utils';
import { useAppSelector } from '../../../store';
import { selectFilter, selectShowSubtasks } from '../../../store/tasks/tasksSlice';
import { useSelector } from 'react-redux';

interface IFinishedIssuesProps {
	userRole: string | undefined;
	finishIconClickedIssue: number | undefined;
	issuesData: ITask[];
	allIssues: ITask[];
	issuePriorities: fetchingDictionaryPriority[];
	sortOption: { type: string; direction: string };
	getAllIssues: () => void;
	activateTaskModal: () => void;
	setFinishIconClickedIssue: (isueId: number | undefined) => void;
	finishedIssues: ITask[];
}

export const FinishedIssues: FC<IFinishedIssuesProps> = ({
	userRole,
	finishIconClickedIssue,
	issuesData,
	allIssues,
	issuePriorities,
	sortOption,
	// getAllIssues,
	activateTaskModal,
	setFinishIconClickedIssue,
	finishedIssues,
}) => {
	const issues = issuesData;
	const [previewIssues, setPreviewIssues] = useState<ITask[]>([]);
	const [isEveryIssueShown, setIsEveryIssueShown] = useState(false);
	const filter = useAppSelector(selectFilter);
	const showSubtasks = useSelector(selectShowSubtasks);

	useEffect(() => {
		setPreviewIssues(issues);
	}, [issues]);

	useEffect(() => {
		if (!isEveryIssueShown) {
			setPreviewIssues(getSortedIssues(issues, sortOption).slice(0, 3));
		}
	}, [issues, isEveryIssueShown]);

	if (!issues.length) return null;

	const filteredIssues = getFilteredIssues(getSortedIssues(issues, sortOption), filter).filter(
		(issue) => showSubtasks || !issue.parent_id
	);

	const filteredPreviewIssues = getFilteredIssues(getSortedIssues(previewIssues, sortOption), filter).filter(
		(issue) => showSubtasks || !issue.parent_id
	);

	const filteredCount = filteredIssues.length;

	return (
		<>
			<S.TableBody>
				{isEveryIssueShown
					? filteredIssues.map((issue) => (
							<TableRow
								userRole={userRole}
								activateTaskModal={activateTaskModal}
								setFinishIconClickedIssue={setFinishIconClickedIssue}
								finishedIssues={finishedIssues}
								key={issue.id}
								issue={issue}
								finishIconClickedIssue={finishIconClickedIssue}
								allIssues={allIssues}
								priorities={issuePriorities}
								isFinished
							/>
					  ))
					: filteredPreviewIssues.map((issue) => (
							<TableRow
								userRole={userRole}
								activateTaskModal={activateTaskModal}
								setFinishIconClickedIssue={setFinishIconClickedIssue}
								finishedIssues={finishedIssues}
								key={issue.id}
								issue={issue}
								finishIconClickedIssue={finishIconClickedIssue}
								allIssues={allIssues}
								priorities={issuePriorities}
								isFinished
							/>
					  ))}
			</S.TableBody>

			{Object.values(filter).filter((item) => item !== null).length === 0 && filteredCount > 3 && (
				<S.TableButton
					variant='ghost'
					startIcon={<SvgComponent name={isEveryIssueShown ? 'arrow-up-s' : 'arrow-down-s'} />}
					size='small'
					attributes={{ style: { padding: '10px 20px' } }}
					onClick={() => {
						setIsEveryIssueShown((shownState) => !shownState);
					}}
				>
					<Text
						variant='caption-1'
						color='neutral-faded'
						attributes={{ style: { marginLeft: '8px', lineHeight: '20px', fontWeight: 500, letterSpacing: '-0.01em' } }}
					>
						{isEveryIssueShown ? 'Скрыть' : `Все завершенные (${filteredCount})`}
					</Text>
				</S.TableButton>
			)}
		</>
	);
};

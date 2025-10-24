import { FC, useMemo } from 'react';
import { parse, differenceInDays } from 'date-fns';
import { formatMinutesToHours } from '../../../shared/utility/Utils';

import { Text } from 'reshaped/bundle';
import * as S from './ResourcePlanningTableIssues.styled';

interface IResourcePlanningIssuesProps {
	item: { name: string; issues: IResourcePlanningIssue[] };
	list: IResourcePlanningDates;
	activateTaskModal: () => void;
	setActiveTaskData: React.Dispatch<React.SetStateAction<{ id: number; projectSlug: string } | undefined>>;
}

const ResourcePlanningTableIssues: FC<IResourcePlanningIssuesProps> = ({
	item,
	list,
	activateTaskModal,
	setActiveTaskData,
}) => {
	const groups = useMemo(
		() =>
			item.issues.reduce((acc, curr, i) => {
				if (i === 0) {
					acc.push([curr]);
				} else {
					const el = acc[acc.length - 1].pop();
					if (el) {
						if (curr.date_start <= el.deadline) {
							acc[acc.length - 1].push(el);
							acc.push([curr]);
						} else {
							acc[acc.length - 1].push(el);
							acc[acc.length - 1].push(curr);
						}
					}
				}
				return acc;
			}, [] as IResourcePlanningIssue[][]),
		[item.issues]
	);

	return (
		<S.Row className='issues' height={groups.length * 40 + 24}>
			<S.RowInner>
				<S.ProjectName>
					<Text variant='caption-1'>{item.name}</Text>
				</S.ProjectName>
				{Object.keys(list).map((date) => (
					<S.RowCell key={date} isWorkDay={list[date].is_workDay} isEmpty>
						<div />
					</S.RowCell>
				))}
				{groups.map((group, index) =>
					group.map((issue) => {
						const daysFromStart = differenceInDays(
							parse(issue.date_start, 'yyyy-MM-dd', new Date()),
							parse(Object.keys(list)[0], 'yyyy-MM-dd', new Date())
						);

						return (
							<S.Issue
								key={issue.id}
								top={12 + index * 40}
								daysFromStart={daysFromStart}
								duration={issue.count_day}
								isEstimated={!!issue.estimate}
								onClick={() => {
									setActiveTaskData({ id: issue.id, projectSlug: issue.project_slug });
									activateTaskModal();
								}}
							>
								<Text variant='caption-2'>{issue.name}</Text>
								<Text variant='caption-2'>
									{issue.estimate_for_one_day_minute
										? formatMinutesToHours(issue.estimate_for_one_day_minute).split(':')[0] + ' ч/д'
										: 'Без оценки'}
								</Text>
							</S.Issue>
						);
					})
				)}
			</S.RowInner>
		</S.Row>
	);
};

export default ResourcePlanningTableIssues;

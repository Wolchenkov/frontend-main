import React, { Dispatch, FC, SetStateAction } from 'react';
import * as S from './Row.styled';

interface IScheduleRowProps {
	taskName: string;
	taskData: IMyWorkScheduleTask;
	projectSlug: string;
	setActiveTaskData: Dispatch<SetStateAction<{ id: number; projectSlug: string } | undefined>>;
}

export const ScheduleRow: FC<IScheduleRowProps> = ({ taskName, taskData, projectSlug, setActiveTaskData }) => {
	return (
		<>
			<S.Row onClick={() => setActiveTaskData({ id: taskData.issue_id, projectSlug })}>
				<S.RowCell>
					<S.RowText variant='caption-1' color='neutral-faded'>
						{taskName}
					</S.RowText>
				</S.RowCell>

				{Object.entries(taskData.list).map(([date, { is_workDay, sum_issue_day_time }]) => (
					<S.RowCell key={date} isWeekend={!is_workDay}>
						<S.RowText variant='caption-1' color='neutral-faded'>
							{sum_issue_day_time === null && is_workDay ? '—' : sum_issue_day_time}
						</S.RowText>
					</S.RowCell>
				))}

				<S.RowCell>
					<S.RowText variant='caption-1' color='neutral-faded'>
						{taskData.sum_issue_time}
					</S.RowText>
				</S.RowCell>
			</S.Row>
		</>
	);
};

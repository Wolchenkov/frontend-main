import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import Link from 'next/link';
import * as S from './Item.styled';
import { Badge, Icon, View } from 'reshaped/bundle';
import { SvgComponent } from '../../../../shared';
import { ScheduleRow } from '../Row/Row';

interface IScheduleItemProps {
	projectName: string;
	projectData: IMyWorkScheduleProject;
	setActiveTaskData: Dispatch<SetStateAction<{ id: number; projectSlug: string } | undefined>>;
}

export const ScheduleItem: FC<IScheduleItemProps> = ({ projectName, projectData, setActiveTaskData }) => {
	const [isExpanded, setIsExpanded] = useState(false);

	return (
		<>
			<S.ItemRow>
				<S.ItemRowCell>
					<View direction='row' gap={2}>
						<Icon
							size={5}
							svg={
								<SvgComponent name='arrow-right-fill-black' onClick={() => setIsExpanded((prevState) => !prevState)} />
							}
							attributes={{
								style: {
									transform: `${isExpanded ? 'rotate(90deg)' : 'none'}`,
									transition: 'transform 0.3s ease',
									cursor: 'pointer',
								},
							}}
						/>
						<Link href={`/project/${projectData.project_slug}`}>
							<S.ItemLink>
								<S.ItemRowText variant='body-medium-2' attributes={{ style: { letterSpacing: '-0.02em' } }}>
									{projectName}
								</S.ItemRowText>
							</S.ItemLink>
						</Link>
						<Badge color='primary' size='small' variant='faded'>
							{Object.keys(projectData.issues).length}
						</Badge>
					</View>
				</S.ItemRowCell>

				{Object.entries(projectData.list).map(([date, { is_workDay, sum_project_time_for_date }]) => (
					<S.ItemRowCell key={date} isWeekend={!is_workDay}>
						<S.ItemRowText variant='caption-1'>
							{sum_project_time_for_date == null && is_workDay ? '—' : sum_project_time_for_date}
						</S.ItemRowText>
					</S.ItemRowCell>
				))}

				<S.ItemRowCell>
					<S.ItemRowText variant='caption-1'>{projectData.sum_time_all}</S.ItemRowText>
				</S.ItemRowCell>
			</S.ItemRow>

			<S.Table isExpanded={isExpanded}>
				{Object.entries(projectData.issues).map(([taskName, taskData]) => (
					<ScheduleRow
						key={taskName}
						taskName={taskName}
						taskData={taskData}
						projectSlug={projectData.project_slug}
						setActiveTaskData={setActiveTaskData}
					/>
				))}
			</S.Table>
		</>
	);
};

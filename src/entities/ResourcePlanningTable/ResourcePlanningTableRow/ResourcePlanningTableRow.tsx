import { FC, useState, useMemo } from 'react';
import { formatMinutesToHours, getInitials } from '../../../shared/utility/Utils';

import { Text } from 'reshaped/bundle';
import { AvatarCustom, SvgComponent } from '../../../shared';
import * as S from './ResourcePlanningTableRow.styled';

import ResourcePlanningTableIssues from '../ResourcePlanningTableIssues/ResourcePlanningTableIssues';

interface IResourcePlanningTableRowProps {
	resource: IResource;
	isLast: boolean;
	activateTaskModal: () => void;
	setActiveTaskData: React.Dispatch<React.SetStateAction<{ id: number; projectSlug: string } | undefined>>;
}

const ResourcePlanningTableRow: FC<IResourcePlanningTableRowProps> = ({
	resource,
	isLast,
	activateTaskModal,
	setActiveTaskData,
}) => {
	const { project_issues, list } = resource;
	const [showProjectIssues, setShowProjectIssues] = useState(false);

	const estimate = useMemo(() => {
		const dates = {} as { [key: string]: { allTasksEstimated: boolean } };
		project_issues.forEach((item) => {
			item.issues.forEach((issue) => {
				const interval = Object.keys(list).filter((value) => value >= issue.date_start && value <= issue.deadline);
				interval.forEach((date) => {
					dates[date]
						? (dates[date] = {
								allTasksEstimated: dates[date].allTasksEstimated ? !!issue.estimate : false,
						  })
						: (dates[date] = { allTasksEstimated: !!issue.estimate });
				});
			});
		});
		return dates;
	}, [project_issues, list]);

	return (
		<>
			<S.Row isLast={isLast} className={showProjectIssues ? 'expanded' : ''}>
				<S.RowCell>
					<S.Arrow
						showProjectIssues={showProjectIssues}
						onClick={() => setShowProjectIssues((prevState: boolean) => !prevState)}
					>
						{resource.project_issues.length > 0 && <SvgComponent name='arrow-right-fill-black' />}
					</S.Arrow>
					<AvatarCustom color='positive' src={resource.avatar || undefined} initials={getInitials(resource.name)} size={6} />
					<Text variant='body-medium-2'>{resource.name}</Text>
				</S.RowCell>
				{Object.keys(list).map((date) => {
					const isWorkDay = list[date].is_workDay;
					const isDayOff = !list[date].is_ready_to_work;
					const overTime = list[date].estimate_for_one_day > 480;
					const ontime = list[date].estimate_for_one_day === 480;

					return (
						<S.RowCell
							key={date}
							isWorkDay={isWorkDay}
							isEmpty={!estimate[date]}
							isDayOff={isDayOff}
							overtime={overTime}
							ontime={ontime}
							allTasksEstimated={estimate[date] && estimate[date].allTasksEstimated}
						>
							<div>
								{!isWorkDay ? null : ontime ? (
									<SvgComponent name='check-fill' />
								) : (
									<Text variant='caption-1'>
										{isDayOff ? 'Off' : formatMinutesToHours(list[date].estimate_for_one_day)}
									</Text>
								)}
							</div>
						</S.RowCell>
					);
				})}
			</S.Row>
			{showProjectIssues &&
				project_issues.map((item, index) => (
					<ResourcePlanningTableIssues
						key={item.name + index}
						item={item}
						list={list}
						activateTaskModal={activateTaskModal}
						setActiveTaskData={setActiveTaskData}
					/>
				))}
		</>
	);
};

export default ResourcePlanningTableRow;

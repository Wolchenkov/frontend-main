import React, { Dispatch, FC, Fragment, SetStateAction } from 'react';
import * as S from './MainRow.styled';
import { Divider, Icon } from 'reshaped/bundle';
import { AvatarCustom, SvgComponent } from '../../../../shared';
import { getInitials } from '../../../../shared/utility/Utils';

interface IMainRowProps {
	userData: IScheduleUser;
	activeUsers: number[];
	setActiveUsers: Dispatch<SetStateAction<number[]>>;
}

export const MainRow: FC<IMainRowProps> = ({ userData, activeUsers, setActiveUsers }) => {
	const { avatar, name, team, projects, id, timeUser } = userData;

	const isActiveUser = activeUsers.includes(id);

	function checkActiveUsers() {
		setActiveUsers((prev) => (isActiveUser ? prev.filter((userID) => userID !== id) : prev.concat(id)));
	}

	return (
		<>
			<S.Row>
				<S.UserNameContainer>
					<Icon
						size={4}
						svg={<SvgComponent name='arrow-right-fill-black' onClick={checkActiveUsers} />}
						attributes={{ style: { transform: `${isActiveUser ? 'rotate(90deg)' : 'none'}` } }}
					/>
					<AvatarCustom src={avatar ? avatar : undefined} initials={getInitials(name ? name : '')} size={6} />
					<S.MyText500 variant='caption-1' maxLines={1}>
						{name}
					</S.MyText500>
				</S.UserNameContainer>
				<S.TeamNameContainer>
					<S.MyText500 variant='caption-1' maxLines={1}>
						{team}
					</S.MyText500>
				</S.TeamNameContainer>
				<S.TimeData>
					{Object.entries(timeUser.list).map(([date, { is_little, is_ready_to_work, is_workDay, time }]) => (
						<S.TimeRecord key={date} isWorkDay={is_workDay}>
							{is_ready_to_work || time ? (
								<S.MyText700 variant='caption-1' color={is_little ? 'critical' : 'neutral'}>
									{time || '—'}
								</S.MyText700>
							) : (
								<S.MyText500 variant='caption-1' color='neutral-faded'>
									Off
								</S.MyText500>
							)}
						</S.TimeRecord>
					))}
					<S.TimeRecord isWorkDay={true}>
						<S.MyText700 variant='caption-1' color={timeUser.is_little ? 'critical' : 'neutral'}>
							{timeUser.sum_time_all}
						</S.MyText700>
					</S.TimeRecord>
				</S.TimeData>
			</S.Row>
			<Divider />

			<S.ProjectsReportsList active={activeUsers.includes(id)}>
				{Object.entries(projects).map(([projectName, { list, sum_time_all_project, issues }]) => (
					<Fragment key={projectName}>
						<S.ProjectRow isProject>
							<S.MyText500
								color='neutral-faded'
								variant='caption-1'
								attributes={{ style: { lineHeight: '20px', padding: '12px 0 12px 28px', overflow: 'visible' } }}
							>
								{projectName}
							</S.MyText500>
							<S.TimeData>
								{Object.entries(list).map(([date, { is_workDay, sum_project_time_for_date, is_ready_to_work }]) => (
									<S.TimeRecord key={date} isWorkDay={is_workDay}>
										{is_ready_to_work || sum_project_time_for_date ? (
											<S.MyText500 variant='caption-1'>{sum_project_time_for_date || '—'}</S.MyText500>
										) : (
											<S.MyText500 variant='caption-1' color='neutral-faded'>
												Off
											</S.MyText500>
										)}
									</S.TimeRecord>
								))}
								<S.TimeRecord isWorkDay={true}>
									<S.MyText500 variant='caption-1'>{sum_time_all_project}</S.MyText500>
								</S.TimeRecord>
							</S.TimeData>
						</S.ProjectRow>

						{Object.entries(issues).map(([issueName, { issue_id, sum_issue_time, list }], index) => (
							<Fragment key={issue_id}>
								{index === 0 && <Divider />}
								<S.ProjectRow>
									<S.MyText500
										color='neutral-faded'
										variant='caption-1'
										attributes={{ style: { lineHeight: '20px', padding: '12px 0 12px 28px ' } }}
									>
										{issueName}
									</S.MyText500>
									<S.TimeData>
										{Object.entries(list).map(([date, { is_workDay, sum_issue_day_time, is_ready_to_work }]) => (
											<S.TimeRecord key={date} isWorkDay={is_workDay}>
												{is_ready_to_work || sum_issue_day_time ? (
													<S.MyText500 variant='caption-1'>{sum_issue_day_time || '—'}</S.MyText500>
												) : (
													<S.MyText500 variant='caption-1' color='neutral-faded'>
														Off
													</S.MyText500>
												)}
											</S.TimeRecord>
										))}
										<S.TimeRecord isWorkDay={true}>
											<S.MyText500 variant='caption-1'>{sum_issue_time}</S.MyText500>
										</S.TimeRecord>
									</S.TimeData>
								</S.ProjectRow>
								<Divider />
							</Fragment>
						))}
					</Fragment>
				))}
			</S.ProjectsReportsList>
		</>
	);
};

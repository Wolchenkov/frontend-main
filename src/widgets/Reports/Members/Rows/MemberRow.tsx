import { FC } from 'react';
import { Divider, Icon } from 'reshaped/bundle';
import { ProjectRow } from './ProjectRow';
import { getInitials } from '../../../../shared/utility/Utils';
import { AvatarCustom, SvgComponent } from '../../../../shared';
import * as S from '../Members.styled';

interface IMemberRowProps {
	member: IMemberReportData;
	checkActiveUsers: (id: number) => void;
	activeUsers: number[];
}

export const MemberRow: FC<IMemberRowProps> = ({ member, checkActiveUsers, activeUsers }) => {
	const {
		avatar,
		completed_issue,
		deviation,
		id,
		name,
		project_estimate_in_hour,
		projects,
		team_name,
		time_amount_all,
		utilization,
	} = member;

	return (
		<>
			<S.Row>
				<S.UserNameContainer>
					<Icon
						size={4}
						svg={<SvgComponent name='arrow-right-fill-black' onClick={() => checkActiveUsers(id)} />}
						attributes={{
							style: { transform: `${activeUsers.includes(id) ? 'rotate(90deg)' : 'none'}` },
						}}
					/>
					<AvatarCustom src={avatar ? avatar : undefined} initials={getInitials(name ? name : '')} size={6} />
					<S.MyText500 variant='caption-1' attributes={{ style: { overflow: 'visible' } }}>
						{name}
					</S.MyText500>
				</S.UserNameContainer>
				<S.TeamNameContainer>
					<S.MyText500 variant='caption-1' attributes={{ style: { overflow: 'visible' } }}>
						{team_name}
					</S.MyText500>
				</S.TeamNameContainer>
				<S.CountCompletedIssuesContainer>
					<S.MyText500 variant='caption-1'>{completed_issue}</S.MyText500>
				</S.CountCompletedIssuesContainer>
				<S.DefaultCellContainer>
					<S.MyText500 variant='caption-1'>{project_estimate_in_hour}</S.MyText500>
				</S.DefaultCellContainer>
				<S.DefaultCellContainer>
					<S.MyText500 variant='caption-1'>{time_amount_all}</S.MyText500>
				</S.DefaultCellContainer>
				<S.DefaultCellContainer>
					<S.MyText500
						variant='caption-1'
						color={
							deviation < 0 && Math.abs(deviation) >= 10
								? 'critical'
								: deviation > 0 && Math.abs(deviation) >= 10
								? 'positive'
								: 'neutral'
						}
					>
						{Math.abs(Math.round(deviation)) + '%'}
					</S.MyText500>
				</S.DefaultCellContainer>
				<S.DefaultCellContainer>
					<S.MyText500 variant='caption-1' color={utilization < 65 ? 'critical' : 'neutral'}>
						{Math.round(utilization) + '%'}
					</S.MyText500>
				</S.DefaultCellContainer>
			</S.Row>
			<S.ProjectContainer active={activeUsers.includes(id)}>
				{projects.map((project) => (
					<ProjectRow key={project.project_slug} project={project} />
				))}
			</S.ProjectContainer>
			<Divider />
		</>
	);
};

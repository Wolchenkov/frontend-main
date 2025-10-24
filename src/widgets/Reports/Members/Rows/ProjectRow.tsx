import React, { FC } from 'react';
import { Divider } from 'reshaped/bundle';
import * as S from '../Members.styled';

interface IProjectRowProps {
	project: IMemberProjectReport;
}

export const ProjectRow: FC<IProjectRowProps> = ({ project }) => {
	const { completed_issue, deviation, issues, project_estimate_in_hour, project_name, time_amount_all, utilization } =
		project;
	return (
		<>
			<Divider />
			<S.ProjectRow>
				<S.ProjectNameContainer>
					<S.MyText500 variant='caption-1' color='neutral-faded' attributes={{ style: { overflow: 'visible' } }}>
						{project_name}
					</S.MyText500>
				</S.ProjectNameContainer>
				<div style={{ width: '160px' }} />
				<S.CountCompletedIssuesContainer>
					<S.MyText500 variant='caption-1' color='neutral-faded'>
						{completed_issue}
					</S.MyText500>
				</S.CountCompletedIssuesContainer>
				<S.DefaultCellContainer>
					<S.MyText500 variant='caption-1' color='neutral-faded'>
						{project_estimate_in_hour}
					</S.MyText500>
				</S.DefaultCellContainer>
				<S.DefaultCellContainer>
					<S.MyText500 variant='caption-1' color='neutral-faded'>
						{time_amount_all}
					</S.MyText500>
				</S.DefaultCellContainer>
				<S.DefaultCellContainer>
					<S.MyText500
						variant='caption-1'
						color={
							deviation < 0 && Math.abs(deviation) >= 10
								? 'critical'
								: deviation > 0 && Math.abs(deviation) >= 10
								? 'positive'
								: 'neutral-faded'
						}
					>
						{Math.abs(Math.round(deviation)) + '%'}
					</S.MyText500>
				</S.DefaultCellContainer>
				<S.DefaultCellContainer>
					<S.MyText500 variant='caption-1' color={utilization < 65 ? 'critical' : 'neutral-faded'}>
						{Math.round(utilization) + '%'}
					</S.MyText500>
				</S.DefaultCellContainer>
			</S.ProjectRow>
			<Divider />
			{issues.map(({ deviation, estimate_in_hour, id, name, time_amount_all, utilization }, i) => (
				<React.Fragment key={id}>
					<S.IssueRow>
						<S.ProjectNameContainer>
							<S.MyText500 variant='caption-1' color='neutral-faded' attributes={{ style: { overflow: 'visible' } }}>
								{name}
							</S.MyText500>
						</S.ProjectNameContainer>
						<div style={{ width: '160px' }} />
						<div style={{ width: '132px' }} />
						<S.DefaultCellContainer>
							<S.MyText500 variant='caption-1' color='neutral-faded'>
								{estimate_in_hour}
							</S.MyText500>
						</S.DefaultCellContainer>
						<S.DefaultCellContainer>
							<S.MyText500 variant='caption-1' color='neutral-faded'>
								{time_amount_all}
							</S.MyText500>
						</S.DefaultCellContainer>
						<S.DefaultCellContainer>
							<S.MyText500
								variant='caption-1'
								color={
									deviation < 0 && Math.abs(deviation) >= 10
										? 'critical'
										: deviation > 0 && Math.abs(deviation) >= 10
										? 'positive'
										: 'neutral-faded'
								}
							>
								{Math.abs(Math.round(deviation)) + '%'}
							</S.MyText500>
						</S.DefaultCellContainer>
						<S.DefaultCellContainer>
							<S.MyText500 variant='caption-1' color={utilization < 65 ? 'critical' : 'neutral-faded'}>
								{Math.round(utilization) + '%'}
							</S.MyText500>
						</S.DefaultCellContainer>
					</S.IssueRow>
					{i !== issues.length - 1 && <Divider />}
				</React.Fragment>
			))}
		</>
	);
};

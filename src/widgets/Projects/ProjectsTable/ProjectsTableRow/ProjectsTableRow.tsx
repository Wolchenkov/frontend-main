import React, { FC } from 'react';
import * as S from './ProjectsTableRow.styled';
import { Parser } from 'html-to-react';
import { Avatar, Icon } from 'reshaped/bundle';
import { formatProjectBudget, formatProjectDate, getInitials } from '../../../../shared/utility/Utils';
import { useRouter } from 'next/router';
import { ProjectsGroup } from '../../ProjectsTypes';
import { AvatarCustom, SvgComponent } from '../../../../shared';
import { UserRole } from '../../../../shared/utility/Constants/userRole';

interface IProjectsTableRowProps {
	userRole: string | undefined;
	data: ProjectsGroup;
	columns: { id: string; name: string; access: UserRole[] }[];
	checkedColumnOptions: { id: string; name: string; access: UserRole[] }[];
}

export const ProjectsTableRow: FC<IProjectsTableRowProps> = ({ userRole, data, columns, checkedColumnOptions }) => {
	const htmlToReactParser = new (Parser as any)();
	const router = useRouter();

	const isFinished = data.project_status.id === 5 || data.project_status.id === 6;

	return (
		<S.ProjectsTableRow onClick={() => router.push(`/project/${data.slug}`)} isFinished={isFinished}>
			{columns
				.filter((columnOption) => columnOption.access.includes(userRole as UserRole))
				.map((columnOption) => {
					switch (columnOption.id) {
						case 'name':
							return (
								<S.ProjectsTableRowCell
									className={`ProjectsTableRowCell__${columnOption.id}`}
									key={columnOption.id}
									show={checkedColumnOptions.includes(columnOption)}
								>
									<S.ProjectsText variant='caption-1'>{data.name}</S.ProjectsText>
								</S.ProjectsTableRowCell>
							);
						case 'manager':
							return (
								<S.ProjectsTableRowCell
									className={`ProjectsTableRowCell__${columnOption.id}`}
									key={columnOption.id}
									show={checkedColumnOptions.includes(columnOption)}
								>
									{data.manager ? (
										<AvatarCustom
											src={data.manager.avatar ? data.manager.avatar : undefined}
											initials={getInitials(data.manager.name)}
											size={6}
										/>
									) : (
										<SvgComponent name='avatar-unassigned' />
									)}
								</S.ProjectsTableRowCell>
							);
						case 'members':
							return (
								<S.ProjectsTableRowCell
									className={`ProjectsTableRowCell__${columnOption.id}`}
									key={columnOption.id}
									show={checkedColumnOptions.includes(columnOption)}
								>
									<S.ProjectsTeam>
										{data.members.slice(0, 4).map((teamMember, index) => (
											<S.ProjectsTeamAvatar
												key={index}
												src={teamMember.avatar ? teamMember.avatar : undefined}
												initials={getInitials(teamMember.name)}
												size={6}
											/>
										))}
										{data.members.length > 4 && <Avatar initials={`+${data.members.length - 4}`} size={6} />}
									</S.ProjectsTeam>
								</S.ProjectsTableRowCell>
							);
						case 'client':
							return (
								<S.ProjectsTableRowCell
									className={`ProjectsTableRowCell__${columnOption.id}`}
									key={columnOption.id}
									show={checkedColumnOptions.includes(columnOption)}
								>
									<S.ProjectsText variant='caption-1'>{data.client ? data.client.name : ''}</S.ProjectsText>
								</S.ProjectsTableRowCell>
							);
						case 'end':
							return (
								<S.ProjectsTableRowCell
									className={`ProjectsTableRowCell__${columnOption.id}`}
									key={columnOption.id}
									show={checkedColumnOptions.includes(columnOption)}
								>
									<S.ProjectsText variant='caption-1'>{formatProjectDate(data.date_end)}</S.ProjectsText>
								</S.ProjectsTableRowCell>
							);
						case 'start':
							return (
								<S.ProjectsTableRowCell
									className={`ProjectsTableRowCell__${columnOption.id}`}
									key={columnOption.id}
									show={checkedColumnOptions.includes(columnOption)}
								>
									<S.ProjectsText variant='caption-1'>{formatProjectDate(data.date_start)}</S.ProjectsText>
								</S.ProjectsTableRowCell>
							);
						case 'budget':
							return (
								<S.ProjectsTableRowCell
									className={`ProjectsTableRowCell__${columnOption.id}`}
									key={columnOption.id}
									show={checkedColumnOptions.includes(columnOption)}
								>
									<S.ProjectsText variant='caption-1'>{formatProjectBudget(data.budget_amount)}</S.ProjectsText>
								</S.ProjectsTableRowCell>
							);
						case 'balance':
							return (
								<S.ProjectsTableRowCell
									className={`ProjectsTableRowCell__${columnOption.id}`}
									key={columnOption.id}
									show={checkedColumnOptions.includes(columnOption)}
								>
									<S.ProjectsText variant='caption-1'>{formatProjectBudget(data.budget_balance)}</S.ProjectsText>
								</S.ProjectsTableRowCell>
							);
						case 'status':
							return (
								<S.ProjectsTableRowCell
									className={`ProjectsTableRowCell__${columnOption.id}`}
									key={columnOption.id}
									show={checkedColumnOptions.includes(columnOption)}
								>
									<S.ProjectsStatus isFinished={isFinished}>
										<Icon
											size={4}
											svg={htmlToReactParser.parse(data.project_status.svg)}
											attributes={{ style: { marginRight: '8px' } }}
										/>
										<S.ProjectsText variant='caption-1'>{`${Number(data.completion).toFixed()}%`}</S.ProjectsText>
									</S.ProjectsStatus>
								</S.ProjectsTableRowCell>
							);
						default:
							return <></>;
					}
				})}
		</S.ProjectsTableRow>
	);
};

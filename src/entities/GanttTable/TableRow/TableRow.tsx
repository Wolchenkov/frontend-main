import { FC, Fragment, useState, useEffect } from 'react';
import { isWeekend, differenceInDays, parse } from 'date-fns';
import { getInitials } from '../../../shared/utility/Utils';

import { Text, Badge } from 'reshaped/bundle';
import { AvatarCustom, SvgComponent } from '../../../shared';
import * as S from './TableRow.styled';

import Arrow from '../Arrow/Arrow';
import { useTableRowController } from './TableRowController';

interface ITableRowProps {
	item: IGanttItem;
	interval: [string, Date[]][] | undefined;
	start: Date | undefined;
	showPlan: boolean;
	isFetching: boolean;
	activateTaskModal: () => void;
}

export const TableRow: FC<ITableRowProps> = ({ item, interval, start, showPlan, isFetching, activateTaskModal }) => {
	const { name, project_issues, time_line } = item;
	const { plan_end_point, plan_start_point, end_point, start_point } = time_line;
	const [projectIssues, setProjectIssues] = useState<IGanttProjectIssue[]>();
	/* TODO: Убрать после того, как пофиксят сортировку на беке */
	useEffect(() => {
		const arr = [...project_issues];
		setProjectIssues(
			arr.sort(function (a, b) {
				return a.date_start.localeCompare(b.date_start) || a.name.localeCompare(b.name);
			})
		);
	}, [project_issues]);

	const {
		isExpanded,
		setIsExpanded,
		hoveredItem,
		setHoveredItem,
		activeItem,
		onIssueClick,
		onGanttItemClick,
		temporaryArrows,
		temporaryRemovedArrows,
		ref,
		removeConnection,
	} = useTableRowController({ isFetching, kanban: item.id, activateTaskModal: activateTaskModal });

	return (
		<S.TableRow>
			{projectIssues && (
				<>
					<S.Stage>
						<S.StageName onClick={() => setIsExpanded((prevState) => !prevState)}>
							<S.ArrowIcon isExpanded={isExpanded}>
								<SvgComponent name='arrow-down-fill' />
							</S.ArrowIcon>
							<Text variant='body-medium-2'>{name}</Text>
							<Badge size='small' color='primary' variant='faded'>
								{!showPlan
									? projectIssues.filter((projectIssue) => !projectIssue.is_deleted).length
									: projectIssues.length}
							</Badge>
						</S.StageName>
						<S.ProjectIssues isExpanded={isExpanded}>
							{projectIssues.map(({ id, name, delegate, is_deleted }) => (
								<Fragment key={id}>
									{(!is_deleted || (showPlan && is_deleted)) && (
										<S.ProjectIssue onClick={() => onIssueClick(id)}>
											<Text variant='caption-1'>{name}</Text>
											{delegate && (
												<AvatarCustom
													src={delegate.avatar ? delegate.avatar : undefined}
													color='positive'
													initials={getInitials(delegate.name)}
													size={6}
												/>
											)}
										</S.ProjectIssue>
									)}
								</Fragment>
							))}
						</S.ProjectIssues>
					</S.Stage>
					<S.TableBody>
						<S.Days>
							{interval?.map((month) =>
								month[1].map((date, i) => <S.Day key={month[0] + i} className={isWeekend(date) ? 'weekend' : ''} />)
							)}
						</S.Days>
						{start && projectIssues.length > 0 && (
							<S.CommonDeadline
								countDaysFromStart={differenceInDays(parse(start_point, 'yyyy-MM-dd', new Date()), start)}
								countDays={
									differenceInDays(
										parse(end_point, 'yyyy-MM-dd', new Date()),
										parse(start_point, 'yyyy-MM-dd', new Date())
									) + 1
								}
							/>
						)}
						{start &&
							projectIssues.length > 0 &&
							showPlan &&
							(plan_start_point < start_point || plan_end_point > end_point) && (
								<S.CommonDeadline
									countDaysFromStart={differenceInDays(parse(plan_start_point, 'yyyy-MM-dd', new Date()), start)}
									countDays={
										differenceInDays(
											parse(plan_end_point, 'yyyy-MM-dd', new Date()),
											parse(plan_start_point, 'yyyy-MM-dd', new Date())
										) || 0 + 1
									}
									showPlan
									showStart={plan_start_point < start_point}
									showEnd={plan_end_point > end_point}
								/>
							)}
						<S.GanttItems isExpanded={isExpanded}>
							{start &&
								projectIssues.map(
									(
										{
											id,
											gant_parent_id,
											date_start,
											deadline,
											plan_date_start,
											plan_deadline,
											count_fact_days,
											count_plan_date_start_days,
											count_plan_deadline_days,
											is_finished,
											is_deleted,
										},
										index
									) => (
										<Fragment key={id}>
											{(!is_deleted || (showPlan && is_deleted)) && (
												<S.GanttItem
													id={String(id)}
													className='gantt-item'
													countDays={count_fact_days}
													countDaysFromStart={differenceInDays(parse(date_start, 'yyyy-MM-dd', new Date()), start)}
													itemId={id}
													index={index}
													isFinished={is_finished}
													isDeleted={is_deleted}
													isHovered={hoveredItem === id}
													activeItem={activeItem}
													onMouseEnter={() => setHoveredItem(id)}
													onMouseLeave={() => setHoveredItem(undefined)}
													onClick={() => onGanttItemClick(id)}
													ref={ref}
												>
													{(hoveredItem === id || activeItem === id) && !is_deleted && (
														<SvgComponent name='guide-line' />
													)}
													{is_deleted && (
														<Text variant='caption-2' color='disabled'>
															Задача удалена
														</Text>
													)}
												</S.GanttItem>
											)}
											{showPlan && (plan_date_start || plan_deadline) && (
												<S.GanttItemPlanMore
													countDays={
														count_fact_days + (count_plan_date_start_days || 0) + (count_plan_deadline_days || 0)
													}
													countDaysFromStart={differenceInDays(
														parse(plan_date_start || date_start, 'yyyy-MM-dd', new Date()),
														start
													)}
													index={index}
												/>
											)}
											{showPlan && plan_deadline && plan_deadline < deadline && (
												<S.GanttItemPlanLess
													countDays={count_fact_days + (count_plan_deadline_days || 0)}
													countDaysFromStart={differenceInDays(parse(date_start, 'yyyy-MM-dd', new Date()), start)}
													index={index}
												/>
											)}
											{!temporaryRemovedArrows.includes(id) &&
												(gant_parent_id ||
													(temporaryArrows && id in temporaryArrows) ||
													(activeItem && activeItem !== hoveredItem && hoveredItem === id)) && (
													<Arrow
														taskFrom={
															activeItem && activeItem !== hoveredItem && hoveredItem === id
																? activeItem
																: temporaryArrows && id in temporaryArrows
																? temporaryArrows[id].from
																: gant_parent_id
														}
														taskTo={id}
														rowHeight={24}
														onClick={() => removeConnection(id)}
													/>
												)}
										</Fragment>
									)
								)}
						</S.GanttItems>
					</S.TableBody>
				</>
			)}
		</S.TableRow>
	);
};

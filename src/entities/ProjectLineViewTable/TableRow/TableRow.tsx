import React, { FC, Dispatch, SetStateAction } from 'react';
import * as S from './TableRow.styled';
import { Actionable, Text, Tooltip } from 'reshaped/bundle';
import { AvatarCustom, SvgComponent } from '../../../shared';
import { formatMinutesToHours, getInitials } from '../../../shared/utility/Utils';
import { IssueMenu } from '../IssueMenu/IssueMenu';
import { CalendarMenu } from '../CalendarMenu/CalendarMenu';
import { ConfirmModal } from '../../Modal/ConfirmModal/ConfirmModal';
import { useTableRowController } from './TableRowController';
import { UserRole } from '../../../shared/utility/Constants/userRole';
import { useTextOverflow } from '../../../shared/utility/Hooks/useTextOverflow';
import { SubtasksDropdownMenu } from '../SubtasksDropdownMenu/SubtasksDropdownMenu';

interface ITableRowProps {
	userRole: string | undefined;
	finishIconClickedIssue: number | undefined;
	index?: number;
	issue: ITask;
	allIssues: ITask[];
	finishedIssues: ITask[];
	isFinished?: boolean;
	priorities: fetchingDictionaryPriority[];
	activateTaskModal: () => void;
	setFinishIconClickedIssue: (isueId: number | undefined) => void;
	updateKanbanData?: Dispatch<SetStateAction<IKanbanIssue[] | undefined>>;
}

export const TableRow: FC<ITableRowProps> = ({
	userRole,
	index,
	issue,
	finishIconClickedIssue,
	allIssues,
	finishedIssues,
	isFinished,
	priorities,
	activateTaskModal,
	setFinishIconClickedIssue,
	updateKanbanData,
}) => {
	const {
		id,
		name,
		delegate,
		priority,
		date_start,
		deadline,
		estimate,
		time_amount,
		budget,
		balance,
		hide_from_client,
	} = issue;
	const {
		issueChildrenCount,
		issueChildrenCompleteCount,
		isRowHovered,
		setIsRowHovered,
		onIssueClick,
		isFinishIconFocused,
		isFinishIconHovered,
		setIsFinishIconHovered,
		setIsFinishIconFocused,
		handleFinishIconClick,
		isFinishModalActive,
		deactivateFinishModal,
		handleFinishIssue,
		handleRestoreIssue,
		activeParentIssue,
		setActiveParentIssue,
		showPlaceholderBefore,
		showPlaceholderAfter,
		isDragging,
		// dragRef,
		isOverBeforePlaceholder,
		issueBeforePlaceholderDropRef,
		isOverBefore,
		// issueBeforeDropRef,
		isOverAfterPlaceholder,
		issueAfterPlaceholderDropRef,
		isOverAfter,
		// issueAfterDropRef,
	} = useTableRowController(
		issue,
		allIssues,
		activateTaskModal,
		setFinishIconClickedIssue,
		finishedIssues,
		isFinished,
		index,
		updateKanbanData
	);

	const [issueNameRef, isOverflowed] = useTextOverflow<HTMLDivElement>();

	if (userRole === UserRole.CLIENT && hide_from_client) return <></>;

	return (
		<>
			{(isOverBefore || isOverBeforePlaceholder) && showPlaceholderBefore ? (
				<S.UnderRow ref={issueBeforePlaceholderDropRef} />
			) : null}

			{isDragging ? (
				<S.UnderRow />
			) : (
				<S.TableRow
					key={id}
					// ref={!isFinished ? dragRef : null}
					isHovered={isRowHovered || id === finishIconClickedIssue}
					isFinished={isFinished}
					isActiveParentBadge={activeParentIssue === issue.id || (activeParentIssue === issue.parent_id && !isFinished)}
					onMouseEnter={() => setIsRowHovered(true)}
					onMouseLeave={() => setIsRowHovered(false)}
					onClick={() => onIssueClick(id)}
				>
					{/* <S.TableRowHeader ref={!isFinished ? issueBeforeDropRef : null} /> */}
					<S.TableRowBody>
						<S.TableRowCell className='TableHeadCell__name'>
							{/* <S.TableRowDragIcon
								size={4}
								svg={<SvgComponent name='grid-dots-vertical' />}
								isFinishedIssue={isFinished}
								isDragging={!isFinished && isDragging}
								isRowHovered={isRowHovered}
							/> */}
							<S.TableRowCellNameWrap>
								{userRole === UserRole.CLIENT ? (
									<S.TableRowFinishIcon
										size={4}
										svg={<SvgComponent name={isFinished ? 'checkbox-issue-finished' : 'checkbox-issue-default'} />}
										isClickable={false}
									/>
								) : (
									<S.TableRowFinishIcon
										size={4}
										svg={
											<SvgComponent
												name={
													isFinishIconFocused
														? 'checkbox-issue-active'
														: isFinishIconHovered
														? 'checkbox-issue-hover'
														: isFinished
														? 'checkbox-issue-finished'
														: 'checkbox-issue-default'
												}
											/>
										}
										isClickable={true}
										attributes={{
											tabIndex: 0,
											onMouseEnter: () => setIsFinishIconHovered(true),
											onMouseLeave: () => {
												setIsFinishIconHovered(false);
												setIsFinishIconFocused(false);
											},
											onClick: (e) => handleFinishIconClick(e, id, issueChildrenCount, issueChildrenCompleteCount),
										}}
									/>
								)}
								<S.TableRowIssueNameWrap
									ref={issueNameRef}
									isChild={!isFinished && activeParentIssue === issue.parent_id}
								>
									<S.TableRowIssueName
										variant='caption-1'
										color={isFinished ? 'disabled' : 'neutral'}
										isRowHovered={isRowHovered || id === finishIconClickedIssue}
										isOverflowed={isOverflowed}
									>
										{name}
									</S.TableRowIssueName>
								</S.TableRowIssueNameWrap>
								{!isFinished && activeParentIssue === issue.parent_id && (
									<S.TableRowChildIcon svg={<SvgComponent name='git-merge-fill-rotated-primary' />} size={3} />
								)}
							</S.TableRowCellNameWrap>
						</S.TableRowCell>

						<S.TableRowCell className='TableHeadCell__children'>
							{issueChildrenCount ? (
								<SubtasksDropdownMenu
									subtasks={[
										...allIssues.filter((task) => task.parent_id === issue.id),
										...(finishedIssues?.filter((task) => task.parent_id === issue.id) || []),
									]}
									isFinished={isFinished}
									isRowHovered={isRowHovered}
									activeParentIssue={activeParentIssue}
									issueId={issue.id}
									issueChildrenCompleteCount={issueChildrenCompleteCount}
									issueChildrenCount={issueChildrenCount}
									setActiveParentIssue={setActiveParentIssue}
									onIssueClick={onIssueClick}
									onSubtaskStatusChange={(subtaskId, isCompleted) => {
										if (isCompleted) {
											handleFinishIssue(subtaskId);
										} else {
											handleRestoreIssue(subtaskId);
										}
									}}
								/>
							) : (
								<></>
							)}
						</S.TableRowCell>
						<S.TableRowCell className='TableHeadCell__delegate'>
							{delegate?.name ? (
								<Tooltip position='top' text={delegate.name}>
									{(attributes) => (
										<Actionable attributes={{ ...attributes, style: { cursor: 'default' } }}>
											<div
												style={isFinished ? { filter: 'grayscale(1)', WebkitFilter: 'grayscale(1)', opacity: 0.5 } : {}}
											>
												<AvatarCustom
													src={delegate.avatar ? delegate.avatar : undefined}
													initials={getInitials(delegate.name)}
													size={6}
												/>
											</div>
										</Actionable>
									)}
								</Tooltip>
							) : (
								<SvgComponent name='avatar-unassigned' />
							)}
						</S.TableRowCell>
						<S.TableRowCell className='TableHeadCell__priority'>
							<S.TableRowPriorityBadge color={isFinished ? '#E9E9EB' : priority.color} size={2} />
						</S.TableRowCell>
						<S.TableRowCell className='TableHeadCell__deadline'>
							<CalendarMenu
								issueId={id}
								date={deadline}
								minDate={date_start}
								isFinished={isFinished}
								userRole={userRole}
							/>
						</S.TableRowCell>
						{userRole !== UserRole.CLIENT && (
							<S.TableRowCell className='TableHeadCell__estimate'>
								<Text
									variant='caption-1'
									color={isFinished ? 'disabled' : 'neutral'}
									attributes={{ style: { lineHeight: '20px', fontWeight: 500, letterSpacing: '-0.01em' } }}
								>
									{formatMinutesToHours(estimate)}
								</Text>
							</S.TableRowCell>
						)}
						{userRole !== UserRole.CLIENT && (
							<S.TableRowCell className='TableHeadCell__time_amount'>
								<Text
									variant='caption-1'
									color={isFinished ? 'disabled' : 'neutral'}
									attributes={{ style: { lineHeight: '20px', fontWeight: 500, letterSpacing: '-0.01em' } }}
								>
									{formatMinutesToHours(time_amount)}
								</Text>
							</S.TableRowCell>
						)}
						{!(userRole === UserRole.CLIENT || userRole === UserRole.MEMBER) && (
							<S.TableRowCell className='TableHeadCell__budget'>
								<Text
									variant='caption-1'
									color={isFinished ? 'disabled' : 'neutral'}
									attributes={{ style: { lineHeight: '20px', fontWeight: 500, letterSpacing: '-0.01em' } }}
								>
									{budget && `${budget.toLocaleString('ru-RU')} ₽`}
								</Text>
							</S.TableRowCell>
						)}
						{!(userRole === UserRole.CLIENT || userRole === UserRole.MEMBER) && (
							<S.TableRowCell className='TableHeadCell__consumption'>
								<Text
									variant='caption-1'
									color={isFinished ? 'disabled' : 'neutral'}
									attributes={{ style: { lineHeight: '20px', fontWeight: 500, letterSpacing: '-0.01em' } }}
								>
									{budget && balance && `${(budget - balance).toLocaleString('ru-RU')} ₽`}
								</Text>
							</S.TableRowCell>
						)}
						{!(userRole === UserRole.CLIENT || userRole === UserRole.MEMBER) && (
							<S.TableRowCell className='TableHeadCell__balance'>
								<Text
									variant='caption-1'
									color={isFinished ? 'disabled' : 'neutral'}
									attributes={{ style: { lineHeight: '20px', fontWeight: 500, letterSpacing: '-0.01em' } }}
								>
									{balance && `${balance.toLocaleString('ru-RU')} ₽`}
								</Text>
							</S.TableRowCell>
						)}
						{userRole !== UserRole.CLIENT && (
							<S.TableRowCell className='TableHeadCell__menu'>
								<IssueMenu
									issueId={id}
									priorities={priorities}
									isFinished={isFinished}
									isRowHovered={isRowHovered}
									setIsRowHovered={setIsRowHovered}
								/>
							</S.TableRowCell>
						)}
					</S.TableRowBody>
					{/* <S.TableRowFooter ref={!isFinished ? issueAfterDropRef : null} /> */}
				</S.TableRow>
			)}

			{(isOverAfter || isOverAfterPlaceholder) && showPlaceholderAfter ? (
				<S.UnderRow ref={issueAfterPlaceholderDropRef} />
			) : null}

			<ConfirmModal
				active={isFinishModalActive}
				deactivate={() => {
					deactivateFinishModal();
					setFinishIconClickedIssue(undefined);
				}}
				confirmDel={() => handleFinishIssue(id)}
				text='Вы не выполнили подзадачи. Все равно завершить эту задачу?'
			/>
		</>
	);
};

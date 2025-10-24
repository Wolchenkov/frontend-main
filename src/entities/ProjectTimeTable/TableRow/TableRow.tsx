import { FC, Fragment } from 'react';
import { formatMinutesToHours, getInitials } from '../../../shared/utility/Utils';
import { useTimeRowController } from './TableRowController';
import { useAppDispatch, useAppSelector } from '../../../store';
import { checkTimeRecord } from '../../../store/time/timeSlice';

import * as S from './TableRow.styled';
import { Text, Checkbox, Tooltip, Badge } from 'reshaped/bundle';
import { AvatarCustom, SvgComponent } from '../../../shared';

interface ITableRowProps {
	columns: { id: string; name?: string }[];
	timeRecord: ITimeRecord;
	onIssueClick: (id: number) => void;
	openTimeCommentModal: (
		projectIssueName: string,
		projectIssueId: number,
		timeRecordId: number,
		userId: number
	) => void;
	checkedColumnOptions: string[];
}

const TableRow: FC<ITableRowProps> = ({
	columns,
	timeRecord,
	onIssueClick,
	openTimeCommentModal,
	checkedColumnOptions,
}) => {
	const {
		id,
		project_issue_id,
		project_issue_name,
		user,
		type_work_name,
		project_issue_estimate,
		project_issue_time_amount,
		time_amount,
		is_approved,
		is_changed,
		has_comment,
	} = timeRecord;

	const { confirmTimeRecord, rowHover, setRowHover, currentUser } = useTimeRowController();

	const dispatch = useAppDispatch();
	const checkedTimeRecords = useAppSelector((state) => state.time.checkedTimeRecords);

	return (
		<S.TableRow
			onClick={() => onIssueClick(project_issue_id)}
			onMouseEnter={() => setRowHover(true)}
			onMouseLeave={() => setRowHover(false)}
			isApproved={is_approved}
			isChanged={is_changed}
			hasComment={has_comment}
		>
			<S.TableRowCell onClick={(e) => e.stopPropagation()}>
				<label>
					<Checkbox
						name={'checkbox' + id}
						checked={checkedTimeRecords.includes(timeRecord.id)}
						onChange={({ checked }) => dispatch(checkTimeRecord({ checked, timeRecordId: timeRecord.id }))}
						disabled={is_approved}
					/>
				</label>
			</S.TableRowCell>
			{columns.map((column) => {
				switch (column.id) {
					case 'project_issue_name':
						return (
							<S.TableRowCell key={column.id}>
								<Text variant='caption-1'>{project_issue_name}</Text>
							</S.TableRowCell>
						);
					case 'user':
						return (
							<Fragment key={column.id}>
								{checkedColumnOptions.includes('user') && (
									<S.TableRowCell>
										<AvatarCustom
											src={user.avatar ? user.avatar : ''}
											color='positive'
											initials={getInitials(user.name ? user.name : '')}
											size={6}
										/>
										<Text variant='caption-1'>{user.name}</Text>
									</S.TableRowCell>
								)}
							</Fragment>
						);
					case 'type_work_name':
						return (
							<Fragment key={column.id}>
								{checkedColumnOptions.includes('type_work_name') && (
									<S.TableRowCell key={column.id}>
										<Text variant='caption-1'>{type_work_name}</Text>
									</S.TableRowCell>
								)}
							</Fragment>
						);
					case 'project_issue_estimate':
						return (
							<Fragment key={column.id}>
								{checkedColumnOptions.includes('project_issue_estimate') && (
									<S.TableRowCell key={column.id}>
										<Text variant='caption-1'>{formatMinutesToHours(project_issue_estimate)}</Text>
									</S.TableRowCell>
								)}
							</Fragment>
						);
					case 'project_issue_time_amount':
						return (
							<Fragment key={column.id}>
								{checkedColumnOptions.includes('project_issue_time_amount') && (
									<S.TableRowCell key={column.id}>
										<Text variant='caption-1'>{formatMinutesToHours(project_issue_time_amount)}</Text>
									</S.TableRowCell>
								)}
							</Fragment>
						);
					case 'time_amount':
						return (
							<S.TableRowCell key={column.id}>
								<Badge
									size='small'
									variant='faded'
									color={time_amount > project_issue_estimate + project_issue_time_amount ? 'critical' : undefined}
								>
									{formatMinutesToHours(time_amount)}
								</Badge>
							</S.TableRowCell>
						);
					case 'comment':
						return (
							<S.TableRowCell key={column.id}>
								{has_comment && !is_approved && <SvgComponent name='align-left' />}
							</S.TableRowCell>
						);
					case 'action_buttons':
						return (
							<S.TableRowCell key={column.id}>
								<Tooltip text='Комментарий исполнителю' position='bottom-end'>
									{(attributes) => (
										<S.ActionButton
											variant='ghost'
											size='small'
											startIcon={<SvgComponent name='chat-4-line' />}
											rowHover={rowHover}
											isApproved={is_approved}
											isSameUser={currentUser?.id === user.id}
											onClick={(e) => {
												e.stopPropagation();
												openTimeCommentModal(project_issue_name, project_issue_id, timeRecord.id, user.id);
											}}
											attributes={attributes}
										/>
									)}
								</Tooltip>
								<S.ActionButton
									variant='ghost'
									size='small'
									startIcon={<SvgComponent name='check-fill' />}
									rowHover={rowHover}
									isApproved={is_approved}
									isSameUser={currentUser?.id === user.id}
									disabled={is_approved}
									onClick={(e) => {
										e.stopPropagation();
										confirmTimeRecord(timeRecord);
									}}
								/>
							</S.TableRowCell>
						);
					default:
						return <></>;
				}
			})}
		</S.TableRow>
	);
};

export default TableRow;

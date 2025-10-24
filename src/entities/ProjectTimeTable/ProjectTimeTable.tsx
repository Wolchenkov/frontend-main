import { FC, Fragment } from 'react';
import { format, isToday } from 'date-fns';
import { ru } from 'date-fns/locale';

import TableHead from './TableHead/TableHead';
import TableRow from './TableRow/TableRow';
import Filters from './Filters/Filters';
import TimeRecordsEmpty from './TimeRecordsEmpty/TimeRecordsEmpty';
import TimeRecordsEmptyFilters from './TimeRecordsEmptyFilters/TimeRecordsEmptyFilters';
import { useProjectTimeTableController } from './ProjectTimeTableController';

import * as S from './ProjectTImeTable.styled';
import { Text } from 'reshaped/bundle';

import { AddTimeComment } from '../Modal/AddTimeComment/AddTimeComment';

interface IProjectTimeTableProps {
	showTimeFilters: boolean;
	activateTaskModal: () => void;
}

const ProjectTimeTable: FC<IProjectTimeTableProps> = ({ showTimeFilters, activateTaskModal }) => {
	const {
		timeRecords,
		timeRecordsGroups,
		onIssueClick,
		openTimeCommentModal,
		activeModalAddTimeComment,
		deactivateModalAddTimeComment,
		timeRecordId,
		projectIssue,
		userId,
		userFilter,
		setUserFilter,
		showApproved,
		setShowApproved,
		dateFilter,
		setDateFilter,
		tableFilterOptions,
		checkedColumnOptions,
		setCheckedColumnOptions,
		TABLE_COLUMNS,
	} = useProjectTimeTableController({ activateTaskModal });

	return (
		<>
			{showTimeFilters && (
				<Filters
					timeRecords={timeRecords}
					userFilter={userFilter}
					setUserFilter={setUserFilter}
					showApproved={showApproved}
					setShowApproved={setShowApproved}
					dateFilter={dateFilter}
					setDateFilter={setDateFilter}
				/>
			)}
			{timeRecords && timeRecords.length > 0 && timeRecordsGroups ? (
				<S.TableContainer showFilters={showTimeFilters}>
					{timeRecordsGroups.length > 0 ? (
						timeRecordsGroups.map((group, i) => {
							return (
								<S.TableWrapper key={group.date}>
									<Text variant='body-medium-2' color='neutral-faded'>
										{isToday(group.date) ? 'Сегодня' : format(group.date, 'd MMMM', { locale: ru })}
									</Text>
									<S.Table>
										<TableHead
											columns={TABLE_COLUMNS}
											timeRecords={group.timeRecords.filter((timeRecord) => !timeRecord.is_approved)}
											showTableFilter={!i}
											tableFilterOptions={tableFilterOptions}
											checkedColumnOptions={checkedColumnOptions}
											setCheckedColumnOptions={setCheckedColumnOptions}
										/>
										{group.timeRecords.map((timeRecord) => (
											<Fragment key={Math.random()}>
												{(!userFilter || userFilter.id === timeRecord.user.id) &&
													(!timeRecord.is_approved || showApproved) && (
														<TableRow
															columns={TABLE_COLUMNS}
															timeRecord={timeRecord}
															onIssueClick={onIssueClick}
															openTimeCommentModal={openTimeCommentModal}
															checkedColumnOptions={checkedColumnOptions}
														/>
													)}
											</Fragment>
										))}
									</S.Table>
								</S.TableWrapper>
							);
						})
					) : (
						<TimeRecordsEmptyFilters />
					)}
				</S.TableContainer>
			) : (
				<TimeRecordsEmpty />
			)}
			<AddTimeComment
				active={activeModalAddTimeComment}
				onClose={deactivateModalAddTimeComment}
				size='660px'
				projectIssue={projectIssue}
				timeRecordId={timeRecordId}
				userId={userId}
			/>
		</>
	);
};

export default ProjectTimeTable;

import React, { FC, Fragment } from 'react';
import { Modal, View } from 'reshaped/bundle';
import * as S from './EditTrackedTimeModal.styled';
import { Row } from './Row';
import { format, isToday } from 'date-fns';
import { ru } from 'date-fns/locale';
import { formatMinutes, formatTime } from '../../../shared/utility/Utils/formatTime';

interface IEditTrackedTimeModal {
	taskState: ITaskDetail;
	refetchTaskData: any;
	active: boolean;
	deactivate: any;
}

export const EditTrackedTimeModal: FC<IEditTrackedTimeModal> = ({ taskState, refetchTaskData, active, deactivate }) => {
	const groupByDate =
		taskState.time_records.length > 0
			? taskState.time_records.reduce((groups: { [key: string]: ITimeRecords[] }, timeRecord) => {
					const { record_date, is_approved } = timeRecord;
					groups[record_date] = groups[record_date] ?? [];
					is_approved ? groups[record_date].push({ ...timeRecord }) : groups[record_date].unshift({ ...timeRecord });
					return groups;
			  }, {})
			: {};

	const timeRecordsGroups = Object.keys(groupByDate)
		.map((date) => ({
			date: Date.parse(date),
			timeRecords: groupByDate[date],
			allTime: groupByDate[date].reduce((sum, timeRecord) => sum + timeRecord.time_amount, 0),
		}))
		.sort((a, b) => b.date - a.date);

	return (
		<>
			<Modal size='480px' active={active} onClose={deactivate} padding={0}>
				<S.Container>
					<View padding={5} direction='row' align='center' attributes={{ style: { justifyContent: 'space-between' } }}>
						<Modal.Title>
							<div style={{ width: '380px' }}>
								<S.MyText variant='body-medium-1'>{taskState.name}</S.MyText>
							</div>
						</Modal.Title>
						<S.MyText variant='body-medium-1'>
							{taskState.time_records.length > 0 ? formatMinutes(taskState.time_records.reduce((total, {time_amount}) => total + time_amount, 0)) + ' ч' : '00:00 ч'}
						</S.MyText>
					</View>

					<div style={{ marginBottom: 20 }}>
						{timeRecordsGroups.map((group) => (
							<Fragment key={group.date}>
								<S.Header>
									<S.HeaderText variant='caption-1'>
										{isToday(group.date) ? 'Сегодня' : format(group.date, 'd MMMM', { locale: ru })}
									</S.HeaderText>
									<S.HeaderText variant='caption-1' attributes={{ style: { width: '64px' } }}>
										{formatTime(group.allTime) + ' ч'}
									</S.HeaderText>
								</S.Header>
								{group.timeRecords.map((row, index) => (
									<Row key={row.id} row={row} index={index} refetchTaskData={refetchTaskData} />
								))}
							</Fragment>
						))}
					</div>
				</S.Container>
			</Modal>
		</>
	);
};

import { useState } from 'react';
import { useShowToast } from '../../../shared/utility/Hooks';
import { useAppDispatch } from '../../../store';
import { useApproveTimeRecordsMutation } from '../../../store/time/timeApi';
import { useGetUserQuery } from '../../../store/auth/authApi';

import { clearCheckedTimeRecords } from '../../../store/time/timeSlice';

export const useTimeRowController = () => {
	const [rowHover, setRowHover] = useState(false);
	const { data: currentUser } = useGetUserQuery();
	const [approveTimeRecord] = useApproveTimeRecordsMutation();

	const dispatch = useAppDispatch();
	const showToast = useShowToast();

	const confirmTimeRecord = (timeRecord: ITimeRecord) => {
		const body = {
			time_records: [timeRecord.id],
			is_approved: true,
		};

		approveTimeRecord(body).then((response) => {
			if ('error' in response) {
				showToast(`Ошибка!`);
				return;
			}
			showToast(`Время согласовано`, `Вы согласовали время по задаче ${timeRecord.project_issue_name}`);
			dispatch(clearCheckedTimeRecords());
		});
	};

	return { confirmTimeRecord, rowHover, setRowHover, currentUser };
};

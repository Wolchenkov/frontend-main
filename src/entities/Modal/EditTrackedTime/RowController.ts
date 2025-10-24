import { useEffect, useState } from 'react';
import { useToggle } from 'reshaped/bundle';
import { convertTimeToMinutes } from '../../../shared/utility/Utils';
import { useRouter } from 'next/router';
import { useGetUserQuery } from '../../../store/auth/authApi';
import { useGetCurrentIssueTypeWorkQuery } from '../../../store/dictionaries/dictionariesApi';
import { useDeleteTimeMutation, useUpdateTimeMutation } from '../../../store/time/timeApi';

interface IRow {
	row: ITimeRecords;
	refetchTaskData: any;
}

export function useRowController({ row, refetchTaskData }: IRow) {
	const [isHover, setIsHover] = useState(false);

	const { active, activate, deactivate } = useToggle(false); // поле для редактирования

	const router = useRouter();
	const { query } = router;
	const [date, setDate] = useState<string>(row.record_date);

	const updateTaskDate = (_: any, fieldValue: any) => {
		setDate(fieldValue as string);
	};

	function formatMinutes(minutes: number) {
		let hours: string | number = Math.floor(minutes / 60);
		let remainingMinutes: string | number = minutes % 60;
		hours = hours < 10 ? '0' + hours : hours;
		remainingMinutes = remainingMinutes < 10 ? '0' + remainingMinutes : remainingMinutes;
		return hours + ':' + remainingMinutes;
	}

	const [inputTimeValue, setInputTimeValue] = useState<string>(formatMinutes(row.time_amount));

	useEffect(() => {
		setInputTimeValue(formatMinutes(row.time_amount));
	}, [row.time_amount]);
	//тип работ
	const { data: typesWork } = useGetCurrentIssueTypeWorkQuery(row.project_issue_id.toString());
	const [typeWork, setTypeWork] = useState<fetchingTypeWork>();

	useEffect(() => {
		typesWork && setTypeWork(typesWork.find((el) => el.id === row.type_work_id));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [typesWork, row.type_work_id]);

	const { active: isActiveTypeWork, activate: activateTypeWork, deactivate: deactivateTypeWork } = useToggle(false); // дропдаун для типов работ

	// оплачивается ли
	const [isBillable, setIsBillable] = useState(row.is_billable);

	const { data: user } = useGetUserQuery();

	const [comment, setComment] = useState((row.description && JSON.parse(row.description).blocks[0].data.text) || '');

	const [updateTime] = useUpdateTimeMutation();
	const [deleteTime] = useDeleteTimeMutation();

	function approveRecordTime() {
		const body = {
			user_id: user?.id,
			project_issue_id: Number(query.modal),
			...(date !== row.record_date && { record_date: date }),
			...(isBillable !== row.is_billable && { is_billable: isBillable }),
			...(typeWork?.id !== row.type_work_id && { type_work_id: typeWork?.id }),
			...(convertTimeToMinutes(inputTimeValue) !== row.time_amount && {
				time_amount: convertTimeToMinutes(inputTimeValue),
			}),
			...(comment !== (row.description && JSON.parse(row.description).blocks[0].data.text) && {
				description:
					comment.length === 0
						? null
						: JSON.stringify({
								blocks: [{ id: 'time-comment', data: { text: comment }, type: 'paragraph' }],
								timestamp: Date.now(),
								version: '2.27.2',
						  }),
			}),
		};
		const payload = { body, timeRecordId: row.id };
		if (body.time_amount === 0) {
			deleteTime(row.id).then(() => {
				refetchTaskData();
				deactivate();
			});
		}
		else {
			updateTime(payload).then(() => {
				refetchTaskData();
				deactivate();
			});
		}
	}

	function closeEditMode() {
		setDate(row.record_date);
		setInputTimeValue(formatMinutes(row.time_amount));
		typesWork && setTypeWork(typesWork.find((el) => el.id === row.type_work_id));
		setComment(row.description || '');
		setIsBillable(row.is_billable);
		deactivate();
	}

	return {
		isHover,
		setIsHover,
		active,
		deactivate,
		activate,
		date,
		updateTaskDate,
		inputTimeValue,
		setInputTimeValue,
		isActiveTypeWork,
		activateTypeWork,
		deactivateTypeWork,
		typeWork,
		setTypeWork,
		typesWork,
		isBillable,
		setIsBillable,
		comment,
		setComment,
		closeEditMode,
		approveRecordTime,
	};
}

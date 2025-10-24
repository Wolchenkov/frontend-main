import { Dispatch, SetStateAction, useState, useEffect } from 'react';
import {
	useDeleteTimeMutation,
	useDeleteTimerMutation,
	useRecordTimerMutation,
	useSwitchTimerMutation,
} from '../../store/time/timeApi';
import { useRouter } from 'next/router';
import { useGetCurrentIssueTypeWorkQuery } from '../../store/dictionaries/dictionariesApi';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import { Button, Text, View, Icon, useToast, useToggle } from 'reshaped/bundle';
import { useGetUserQuery } from '../../store/auth/authApi';
import { format } from 'date-fns';
import { convertTimeToMinutes } from '../../shared/utility/Utils';
import { SvgComponent } from '../../shared';
import { formatMinutesToString } from '../../shared/utility/Utils/formatTime';
import { useShowToast } from '../../shared/utility/Hooks';

interface IUseTimerTrackDropdownController {
	isRunning: boolean;
	setIsRunning: Dispatch<SetStateAction<boolean>>;
	setIsBackendRunning: Dispatch<SetStateAction<boolean>>;
	setIsDeletableTimer: Dispatch<SetStateAction<boolean>>;
	setInputHoursValue: Dispatch<SetStateAction<string>>;
	setInputMinutesValue: Dispatch<SetStateAction<string>>;
	setTime: Dispatch<SetStateAction<number>>;
	setSendValue: Dispatch<SetStateAction<string>>;
	activate: () => void;
	deactivate: () => void;
	refetchTaskData: any;
	refetchUser: any;
}

export function useTimerTrackDropdownController({
	isRunning,
	setIsRunning,
	setIsBackendRunning,
	setIsDeletableTimer,
	setInputHoursValue,
	setInputMinutesValue,
	setTime,
	setSendValue,
	activate,
	deactivate,
	refetchTaskData,
	refetchUser,
}: IUseTimerTrackDropdownController) {
	// router
	const router = useRouter();
	const { query } = router;

	// states
	const [date, setDate] = useState<string | undefined>(undefined);
	const [inputTimeValue, setInputTimeValue] = useState('');
	const [typeWork, setTypeWork] = useState<fetchingTypeWork | undefined>(undefined);
	const [isBillable, setIsBillable] = useState(true);
	const [comment, setComment] = useState('');

	// toggles
	const { active: isActiveTypeWork, activate: activateTypeWork, deactivate: deactivateTypeWork } = useToggle(false);

	// api
	const { data: user } = useGetUserQuery();
	const { data: typesWork } = useGetCurrentIssueTypeWorkQuery(
		typeof query.modal === 'string' ? query.modal : skipToken
	);
	const [onRecordTimer] = useRecordTimerMutation();
	const [onDeleteTimer] = useDeleteTimerMutation();
	const [onSwitchTimer] = useSwitchTimerMutation();
	const [onDeleteTime] = useDeleteTimeMutation();

	const showToast = useShowToast();
	const toast = useToast();

	const handleDelete = (timeId: number) => {
		onDeleteTime(timeId).then((response) => {
			if ('error' in response) {
				showToast(`Ошибка!`);
				return;
			}
			refetchTaskData();
			showToast('Запись о времени удалена');
		});
	};

	const showSuccessToast = (time: number, id: number) => {
		toast.show({
			title: (
				<View direction='row'>
					<Icon svg={<SvgComponent name='zap' />} size={5} attributes={{ style: { marginRight: '16px' } }} />
					<Text variant='body-strong-2' attributes={{ style: { letterSpacing: '-0.01em', color: 'white' } }}>
						{formatMinutesToString(time)}
					</Text>
				</View>
			),
			text: (
				<>
					<Text
						variant='body-2'
						attributes={{ style: { marginBottom: '10px', marginLeft: '36px', letterSpacing: '-0.02em' } }}
					>
						Добавлены в общее время
					</Text>
					{id && (
						<Button
							color='neutral'
							variant='solid'
							attributes={{
								style: {
									minHeight: '28px',
									marginLeft: '36px',
									padding: '4px 8px',
									letterSpacing: '-0.02em',
									background: '#E9E9EB',
									color: '#000000',
								},
							}}
							onClick={() => handleDelete(id)}
						>
							Отменить
						</Button>
					)}
				</>
			),
		});
	};

	const updateTaskDate = (_: any, fieldValue: any) => {
		setDate(fieldValue as string);
	};

	const onOpenApproveModal = () => {
		const prevIsRunning = isRunning;
		setIsRunning(false);
		prevIsRunning &&
			onSwitchTimer({ project_issue_id: Number(query.modal) })
				.unwrap()
				.then((res) => {
					res.forEach((el: IResponseSwitchTimer) => {
						if (el.project_issue_id === Number(query.modal)) {
							setTime(el.elapsed);
							setIsRunning(el.isRunning);
							setIsDeletableTimer(true);
							setIsBackendRunning(el.isRunning);
							refetchUser();
						}
					});
				})
				.catch((err) => alert(err));
		activate();
	};

	const onApproveTimer = () => {
		const time = convertTimeToMinutes(inputTimeValue);
		const body = {
			user_id: user?.id,
			project_issue_id: Number(query.modal),
			record_date: date ? date : format(new Date(), 'yyyy-MM-dd'),
			is_billable: isBillable,
			type_work_id: typeWork?.id,
			time_amount: time,
			...(comment !== '' && {
				description: JSON.stringify({
					blocks: [{ id: 'time-comment', data: { text: comment }, type: 'paragraph' }],
					timestamp: Date.now(),
					version: '2.27.2',
				}),
			}),
		};
		onRecordTimer(body).then((response) => {
			if ('error' in response) {
				showToast(`Ошибка!`);
				return;
			}
			onDeleteTimer({ project_issue_id: Number(query.modal) }).then(() => {
				setTime(0);
				setInputHoursValue('');
				setInputMinutesValue('');
				setSendValue('');
				setIsDeletableTimer(false);
				setIsRunning(false);
				setTypeWork(undefined);
				refetchTaskData();
				refetchUser();
				showSuccessToast(time as number, response?.data?.id);
			});
		});
		deactivate();
	};

	useEffect(() => {
		if (!typeWork && typesWork && user?.lastTypeWork) {
			const found = typesWork.find(
				(tw: any) => tw.type === user.lastTypeWork || String(tw.id) === String(user.lastTypeWork)
			);
			if (found) {
				setTypeWork(found);
			}
		}
	}, [typeWork, typesWork, user?.lastTypeWork]);

	return {
		inputTimeValue,
		setInputTimeValue,
		typeWork,
		setTypeWork,
		isBillable,
		setIsBillable,
		comment,
		setComment,
		typesWork,
		isActiveTypeWork,
		activateTypeWork,
		deactivateTypeWork,
		updateTaskDate,
		onOpenApproveModal,
		onApproveTimer,
	};
}

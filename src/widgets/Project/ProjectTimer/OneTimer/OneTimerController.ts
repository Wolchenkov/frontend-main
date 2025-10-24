import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useToggle } from 'reshaped/bundle';
import { useAppDispatch, useAppSelector } from '../../../../store';
import { selectTimers, setTimers } from '../../../../store/auth/authSlice';
import { useDeleteTimerMutation, useRecordTimerMutation, useSwitchTimerMutation } from '../../../../store/time/timeApi';
import { format } from 'date-fns';
import { useGetCurrentIssueTypeWorkQuery } from '../../../../store/dictionaries/dictionariesApi';
import { convertTimeToMinutes } from '../../../../shared/utility/Utils';
import { useShowToast } from '../../../../shared/utility/Hooks';

interface IOneTimer {
	timer: ITimerInUser;
	onSwitchTimerFunc: (project_issue_id: number) => void;
	refetchUser: any;
	user: IMember;
}

export const useOneTimerController = ({ timer, onSwitchTimerFunc, refetchUser, user }: IOneTimer) => {
	const dispatch = useAppDispatch();
	const showToast = useShowToast();
	const timersRedux = useAppSelector(selectTimers);
	const [onSwitchTimer] = useSwitchTimerMutation();
	const [onDeleteTimer] = useDeleteTimerMutation();

	// refs
	const timerRef = useRef<HTMLDivElement>(null);
	const timerRedactorRef = useRef<any>(null);

	// states
	const [isEditable, setIsEditable] = useState<boolean>(false);
	const [inputValue, setInputValue] = useState('');
	const [time, setTime] = useState(timer.elapsed);
	const [sendFlag, setSendFlag] = useState<boolean>(false);
	const [sendValue, setSendValue] = useState('');

	useEffect(() => {
		setTime(timer.elapsed);
	}, [timer.elapsed]);

	const [running, setRunning] = useState(timer.isRunning);
	useEffect(() => setRunning(timer.isRunning), [timer]);

	useEffect(() => {
		setTimeout(() => {
			if (timerRedactorRef && timerRedactorRef.current) {
				timerRedactorRef.current.focus();
			}
		}, 100);
	}, [isEditable]);

	useEffect(() => {
		const onClick = (e: any) => {
			if (timerRef && timerRef.current) {
				if (timerRef.current.contains(e.target)) {
					setIsEditable(true);
				} else {
					setIsEditable(false);
				}
			}
		};
		document.addEventListener('click', onClick);
		return () => document.removeEventListener('click', onClick);
	}, []);

	const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSendValue(e.target.value);
		setInputValue(e.target.value);
	};

	const onFocusInput = () => {
		setSendFlag(true);
	};
	const onBlurInput = () => {
		setIsEditable(false);
	};

	//ручной ввод времени
	const valueFormatterToSeconds = (value: string) => {
		if (value === '') {
			return 0;
		} else {
			const valueArray = value.split(':');
			const [hours, minutes] = valueArray;
			return Number(hours) * 3600 + Number(minutes) * 60;
		}
	};
	const onSendTrackedTime = () => {
		setSendFlag(false);
		if (sendValue.length === 5) {
			const trackedSeconds = valueFormatterToSeconds(sendValue);
			setSendValue('');
			dispatch(
				setTimers(
					timersRedux.map((t) => {
						if (t.project_issue_id === timer.project_issue_id) {
							return { ...t, elapsed: trackedSeconds, isRunning: false };
						} else {
							return t;
						}
					})
				)
			);
			onSwitchTimer({ project_issue_id: timer.project_issue_id, elapsed: trackedSeconds })
				.unwrap()
				.then(() => {
					refetchUser();
				})
				.catch((err) => {
					throw Error(err);
				});
		}
	};
	const onKeyDownInput = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter' && inputValue.length === 5) {
			const trackedSeconds = valueFormatterToSeconds(sendValue);
			setTime(trackedSeconds);
			setSendFlag(false);
			setSendValue('');
			setInputValue('');
			setIsEditable(false);
			onSwitchTimer({ project_issue_id: timer.project_issue_id, elapsed: trackedSeconds })
				.unwrap()
				.then(() => {
					refetchUser();
				})
				.catch((err) => {
					throw Error(err);
				});
		}
	};
	// отправка записи таймера

	const { active, activate, deactivate } = useToggle(false);

	function onOpenApproveModal() {
		if (timer.isRunning) onSwitchTimerFunc(timer.project_issue_id);
		active ? deactivate() : activate();
	}

	const [date, setDate] = useState<string | undefined>(format(new Date(), 'yyyy-MM-dd'));

	const updateTaskDate = (_: any, fieldValue: any) => {
		setDate(fieldValue as string);
	};

	const timerMinutes = () => (time && time === 0 ? '00' : ('0' + Math.floor((time / 60) % 60)).slice(-2)); // получаем минуты
	const timerHours = () => (time && time === 0 ? '00' : ('0' + Math.floor((time / 3600) % 100)).slice(-2)); // получаем часы
	const formatTimeHandler = () => {
		return `${timerHours()}:${timerMinutes()}`;
	};

	const [inputTimeValue, setInputTimeValue] = useState(formatTimeHandler() === '00:00' ? '00:01' : formatTimeHandler());

	const { data: typesWork } = useGetCurrentIssueTypeWorkQuery(timer.project_issue_id.toString());
	const [typeWork, setTypeWork] = useState<fetchingTypeWork | undefined>(undefined);

	const { active: isActiveTypeWork, activate: activateTypeWork, deactivate: deactivateTypeWork } = useToggle(false); // дропдаун для типов работ

	// оплачивается ли
	const [isBillable, setIsBillable] = useState(true);

	const [comment, setComment] = useState('');

	const [recordTimer] = useRecordTimerMutation();

	function approveTimer() {
		const body = {
			user_id: user?.id,
			project_issue_id: timer.project_issue_id,
			record_date: date ? date : format(new Date(), 'yyyy-MM-dd'),
			is_billable: isBillable,
			type_work_id: typeWork?.id,
			time_amount: convertTimeToMinutes(inputTimeValue),
			...(comment !== '' && {
				description: JSON.stringify({
					blocks: [{ id: 'time-comment', data: { text: comment }, type: 'paragraph' }],
					timestamp: Date.now(),
					version: '2.27.2',
				}),
			}),
		};
		recordTimer(body).then(() => {
			dispatch(setTimers(timersRedux.filter((t) => t.project_issue_id !== timer.project_issue_id)));
			onDeleteTimer({ project_issue_id: timer.project_issue_id }).then(() => {
				refetchUser();
				showToast('Время по задаче успешно учтено');
			});
		});
		deactivate();
	}

	// удаление таймера
	const { active: activeDelMenu, activate: activateDelMenu, deactivate: deactivateDelMenu } = useToggle(false);

	function delTimer() {
		dispatch(setTimers(timersRedux.filter((t) => t.project_issue_id !== timer.project_issue_id)));
		onDeleteTimer({ project_issue_id: timer.project_issue_id }).then(() => {
			showToast('Таймер удален');
			refetchUser();
		});
	}
	return {
		running,
		isEditable,
		timerRedactorRef,
		inputValue,
		onInputChange,
		onFocusInput,
		onBlurInput,
		timerRef,
		timerHours,
		timerMinutes,
		active,
		deactivate,
		sendFlag,
		onSendTrackedTime,
		onOpenApproveModal,
		updateTaskDate,
		date,
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
		approveTimer,
		activeDelMenu,
		deactivateDelMenu,
		activateDelMenu,
		delTimer,
		onKeyDownInput,
	};
};

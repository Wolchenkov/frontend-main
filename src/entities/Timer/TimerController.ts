import { ChangeEvent, Dispatch, SetStateAction, useEffect, useMemo, useRef, useState } from 'react';
import { useToggle } from 'reshaped/bundle';
import { useDeleteTimerMutation, useSwitchTimerMutation } from '../../store/time/timeApi';
import { useRouter } from 'next/router';
import { useShowToast } from '../../shared/utility/Hooks';

interface IUseTimerController {
	trackedTime: number;
	isBackendRunning: boolean;
	setIsDeletableTimer: Dispatch<SetStateAction<boolean>>;
	setIsBackendRunning: Dispatch<SetStateAction<boolean>>;
	refetchUser: any;
}

export function useTimerController({
	trackedTime,
	isBackendRunning,
	setIsDeletableTimer,
	setIsBackendRunning,
	refetchUser,
}: IUseTimerController) {
	// refs
	const timerReadOnlyRef = useRef<HTMLDivElement>(null);
	const timerHoursRedactorRef = useRef<any>(null);
	const timerMinutesRedactorRef = useRef<any>(null);

	// router
	const router = useRouter();
	const { query } = router;

	// states
	const [isEditable, setIsEditable] = useState<boolean>(false);
	const [isRunning, setIsRunning] = useState(false);
	const [areSomeInputFocused, setAreSomeInputFocused] = useState(false);

	const [inputHoursValue, setInputHoursValue] = useState('');
	const [inputMinutesValue, setInputMinutesValue] = useState('');
	const [time, setTime] = useState(0);
	const [sendValue, setSendValue] = useState('');

	// toggles
	const { active, activate, deactivate } = useToggle(false);
	const {
		active: activeConfirmModal,
		activate: activateConfirmModal,
		deactivate: deactivateConfirmModal,
	} = useToggle(false);

	// api
	const [onSwitchTimer] = useSwitchTimerMutation();
	const [onDeleteTimer] = useDeleteTimerMutation();

	const showToast = useShowToast();

	const timerMinutes = useMemo(() => {
		const minutes = Math.floor((time / 60) % 60);
		return String(minutes).padStart(2, '0');
	}, [time]);

	const timerHours = useMemo(() => {
		const hours = Math.floor((time / 3600) % 100);
		return String(hours).padStart(2, '0');
	}, [time]);

	const formattedTime = useMemo(() => {
		return `${timerHours}:${timerMinutes}`;
	}, [timerHours, timerMinutes]);

	useEffect(() => {
		const onClick = (e: any) => {
			if (isRunning) return;
			if (timerReadOnlyRef && timerReadOnlyRef.current) {
				if (timerReadOnlyRef.current.contains(e.target)) {
					setIsEditable(true);
				} else {
					setIsEditable(false);
				}
			}
		};
		document.addEventListener('click', onClick);
		return () => document.removeEventListener('click', onClick);
	}, [isRunning]);

	useEffect(() => {
		if (isBackendRunning) {
			setIsRunning(true);
		} else {
			setIsRunning(false);
		}
	}, [isBackendRunning]);

	useEffect(() => {
		setTime(trackedTime);
	}, [trackedTime]);

	useEffect(() => {
		if (!!timerHours && !!timerMinutes) return;
		setInputHoursValue(timerHours);
		setInputMinutesValue(timerMinutes);
		setSendValue(`${timerHours}:${timerMinutes}`);
	}, [timerHours, timerMinutes]);

	useEffect(() => {
		let intervalId: any;
		if (isRunning) {
			intervalId = setInterval(() => {
				setTime((prevTime) => prevTime + 60);
			}, Math.ceil((60 - (time / 60 - Math.floor(time / 60)) * 100) * 1000));
		} else {
			clearInterval(intervalId);
		}
		return () => {
			clearInterval(intervalId);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		let interval: any;
		if (isRunning) {
			interval = setInterval(() => {
				setTime((prevTime) => prevTime + 60);
			}, 60000);
		} else if (!isRunning) {
			clearInterval(interval);
		}
		return () => clearInterval(interval);
	}, [isRunning]);

	useEffect(() => {
		if ((/[^:0]/).test(sendValue)) {
			setIsDeletableTimer(true);
		} else {
			setIsDeletableTimer(false);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [sendValue]);

	useEffect(() => {
		isRunning && setIsEditable(!isRunning);
	}, [isRunning]);

	const onFocusInput = () => {
		setAreSomeInputFocused(true);
	};

	const onBlurInputHours = () => {
		setSendValue(`${inputHoursValue.padStart(2, '0')}:${inputMinutesValue || '00'}`);
		setInputHoursValue(inputHoursValue.padStart(2, '0'));
		setAreSomeInputFocused(false);
	};

	const onBlurInputMinutes = () => {
		setSendValue(`${inputHoursValue || '00'}:${inputMinutesValue.padStart(2, '0')}`);
		setInputMinutesValue(`${inputMinutesValue.padStart(2, '0')}`);
		setAreSomeInputFocused(false);
	};

	const onInputHoursChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.selectionStart === 2 && e.target.value.length === 2) {
			timerMinutesRedactorRef.current?.focus();
		}
		setSendValue(`${e.target.value.padStart(2, '0')}:${inputMinutesValue.padStart(2, '0')}`);
		setInputHoursValue(e.target.value);
	};

	const onInputMinutesChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (['6', '7', '8', '9'].includes(e.target.value)) {
			e.target.value = `0${e.target.value}`;
		}
		if (['6', '7', '8', '9'].includes(e.target.value[0]) && e.target.value.length === 2) {
			setTimeout(function() {
				e.target.setSelectionRange(1, 1);
			}, 0);
			return;
		}
		setSendValue(`${inputHoursValue.padStart(2, '0')}:${e.target.value.padStart(2, '0')}`);
		setInputMinutesValue(e.target.value);
	};

	const onKeyDownInputHours = (e: React.KeyboardEvent) => {
		if (e.key === 'ArrowRight') {
			if ((e.target as HTMLInputElement).selectionStart === 0 && inputHoursValue.length === 0) {
				timerMinutesRedactorRef.current?.focus();
			} else if ((e.target as HTMLInputElement).selectionStart === 1 && inputHoursValue.length === 1) {
				timerMinutesRedactorRef.current?.focus();
			} else if ((e.target as HTMLInputElement).selectionStart === 2) {
				timerMinutesRedactorRef.current?.focus();
			}
		}
	};

	const onKeyDownInputMinutes = (e: React.KeyboardEvent) => {
		if (e.key === 'ArrowLeft' && (e.target as HTMLInputElement).selectionStart === 0) {
			timerHoursRedactorRef.current?.focus();
		} else if (e.key === 'Backspace' && inputMinutesValue.length === 0) {
			timerHoursRedactorRef.current?.focus();
		}
	};

	const onDeleteTimerHandler = () => {
		onDeleteTimer({ project_issue_id: Number(query.modal) })
			.unwrap()
			.then(() => {
				deactivateConfirmModal();
				setInputHoursValue('');
				setInputMinutesValue('');
				setSendValue('');
				setIsDeletableTimer(false);
				setTime(0);
				setIsRunning(false);
				showToast('Запись о времени удалена');
			})
			.catch((err) => {
				throw new Error(err);
			});
	};

	const onSwitchTimerFunc = (newIsRunning: boolean) => {
		setIsRunning(newIsRunning);
		setInputHoursValue('');
		setInputMinutesValue('');
		setSendValue('');
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
	};

	return {
		timerReadOnlyRef,
		timerHoursRedactorRef,
		timerMinutesRedactorRef,

		isEditable,
		isRunning,
		setIsRunning,
		areSomeInputFocused,

		inputHoursValue,
		setInputHoursValue,
		inputMinutesValue,
		setInputMinutesValue,
		time,
		setTime,
		sendValue,
		setSendValue,

		active,
		activate,
		deactivate,
		activeConfirmModal,
		activateConfirmModal,
		deactivateConfirmModal,

		timerHours,
		timerMinutes,
		formattedTime,

		onFocusInput,
		onBlurInputHours,
		onBlurInputMinutes,
		onInputHoursChange,
		onInputMinutesChange,
		onKeyDownInputHours,
		onKeyDownInputMinutes,
		onDeleteTimerHandler,
		onSwitchTimerFunc,
	};
}

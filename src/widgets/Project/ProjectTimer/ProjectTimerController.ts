import { useEffect, useState } from 'react';
import { useToggle } from 'reshaped/bundle';
import { useAppDispatch, useAppSelector } from '../../../store';
import { selectTimers, setTimers as dispatchTimers } from '../../../store/auth/authSlice';
import { useSwitchTimerMutation } from '../../../store/time/timeApi';

export const useProjectTimerContoller = ({ refetchUser }: any) => {
	const dispatch = useAppDispatch();
	const timersRedux = useAppSelector(selectTimers);

	const [runningTimer, setRunningTimer] = useState<ITimerInUser>();
	const [timers, setTimers] = useState(timersRedux);

	const [onSwitchTimer] = useSwitchTimerMutation();

	const onSwitchTimerFunc = (project_issue_id: number) => {
		setTimers((prev) =>
			prev.map((timer) => {
				if (timer.project_issue_id === project_issue_id) {
					return { ...timer, isRunning: !timer.isRunning };
				} else if (timer.isRunning) {
					return { ...timer, isRunning: false };
				} else {
					return timer;
				}
			})
		);
		onSwitchTimer({ project_issue_id })
			.unwrap()
			.then(() => {
				refetchUser();
			})
			.catch((err) => alert(err));
	};

	const { active, activate, deactivate } = useToggle();
	//таймер на фронте
	useEffect(() => {
		let interval: any;
		if (runningTimer?.isRunning) {
			interval = setInterval(() => {
				timersRedux &&
					dispatch(
						dispatchTimers([
							...timersRedux.filter((t) => t.project_issue_id !== runningTimer?.project_issue_id),
							{
								...runningTimer,
								elapsed: runningTimer?.elapsed && runningTimer?.elapsed + 60,
							},
						])
					);
			}, 60000);
		} else if (!runningTimer?.isRunning) {
			clearInterval(interval);
		}
		return () => clearInterval(interval);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [runningTimer]);

	useEffect(() => {
		setRunningTimer(timersRedux.find((timer) => timer.isRunning === true));
		setTimers(timersRedux);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [timersRedux]);

	const timerMinutes = () => runningTimer && ('0' + Math.floor((runningTimer.elapsed / 60) % 60)).slice(-2); // получаем минуты
	const timerHours = () => runningTimer && ('0' + Math.floor((runningTimer.elapsed / 3600) % 100)).slice(-2); // получаем часы

	return { runningTimer, timers, active, activate, deactivate, timerHours, timerMinutes, onSwitchTimerFunc };
};

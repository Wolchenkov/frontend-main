import * as S from './Timer.styled';
import { SvgComponent } from '../../shared';
import { Button, Tooltip } from 'reshaped/bundle';
import { TimerTrackDropdown } from '../TimerTrackDropdown/TimerTrackDropdown';
import { useTimerController } from './TimerController';
import React, { Dispatch, FC, SetStateAction } from 'react';
import { ConfirmModal } from '../Modal/ConfirmModal/ConfirmModal';

interface TimerProps {
	trackedTime: number;
	isBackendRunning: boolean;
	isDeletableTimer: boolean;
	setIsDeletableTimer: Dispatch<SetStateAction<boolean>>;
	setIsBackendRunning: Dispatch<SetStateAction<boolean>>;
	refetchTaskData: any;
	refetchUser: any;
	projectBudgetType: string;
}

export const TimerComponent: FC<TimerProps> = ({
	trackedTime,
	isBackendRunning,
	isDeletableTimer,
	setIsDeletableTimer,
	setIsBackendRunning,
	refetchTaskData,
	refetchUser,
	projectBudgetType,
}) => {
	const {
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
	} = useTimerController({ trackedTime, isBackendRunning, setIsDeletableTimer, setIsBackendRunning, refetchUser });

	return (
		<S.Timer isRunning={isRunning || areSomeInputFocused}>
			{isRunning
				? (
					<Tooltip text='Остановить таймер' position='bottom-start'>
						{(attributes) => (
							<Button
								variant='solid'
								color='primary'
								startIcon={<SvgComponent name='pause-mini-line' />}
								size='small'
								attributes={attributes}
								onClick={() => onSwitchTimerFunc(false)}
							/>
						)}
					</Tooltip>
				) : (
					<Tooltip text='Запустить таймер' position='bottom-start'>
						{(attributes) => (
							<Button
								variant='ghost'
								startIcon={<SvgComponent name='play-mini-fill' />}
								size='small'
								attributes={attributes}
								onClick={() => onSwitchTimerFunc(true)}
							/>
						)}
					</Tooltip>
				)
			}
			{isEditable ? (
				<S.TimerInputWrapper>
					<S.InputMaskWrapper
						placeholder='00'
						maskPlaceholder={null}
						ref={timerHoursRedactorRef}
						mask={[/[0-9]/, /[0-9]/]}
						value={inputHoursValue}
						onChange={(e) => onInputHoursChange(e)}
						onFocus={onFocusInput}
						onBlur={onBlurInputHours}
						onKeyDown={onKeyDownInputHours}
					/>
					<span>:</span>
					<S.InputMaskWrapper
						placeholder='00'
						maskPlaceholder={null}
						ref={timerMinutesRedactorRef}
						mask={[/[0-9]/, /[0-9]/]}
						value={inputMinutesValue}
						onChange={(e) => onInputMinutesChange(e)}
						onFocus={onFocusInput}
						onBlur={onBlurInputMinutes}
						onKeyDown={onKeyDownInputMinutes}
					/>
				</S.TimerInputWrapper>
			) : (
				<S.TimerCurrentTime ref={timerReadOnlyRef} isEmpty={!time}>
					<span
						onClick={() => {
							setTimeout(() => {
								timerHoursRedactorRef.current?.focus();
							}, 100);
						}}
					>{timerHours}</span>
					<S.TimerDotted running={isRunning}>:</S.TimerDotted>
					<span
						onClick={() => {
							setTimeout(() => {
								timerMinutesRedactorRef.current?.focus();
							}, 100);
						}}
					>{timerMinutes}</span>
				</S.TimerCurrentTime>
			)}
			{isDeletableTimer && !active && (
				<Tooltip text='Удалить время' position='bottom'>
					{(attributes) => (
						<Button
							variant='ghost'
							size='small'
							onClick={activateConfirmModal}
							startIcon={<SvgComponent name='close-line-gray' />}
							attributes={{...attributes, style: { position: 'absolute', transform: 'translateX(-50%)', left: '73%' } }}
						/>
					)}
				</Tooltip>
			)}
			{(
				(!isRunning && ((/[^:0]/).test(sendValue)) || time >= 60) ||
				(isRunning && time >= 60))
			&&
			<TimerTrackDropdown
				isRunning={isRunning}
				setIsRunning={setIsRunning}
				setIsBackendRunning={setIsBackendRunning}
				setIsDeletableTimer={setIsDeletableTimer}
				setInputHoursValue={setInputHoursValue}
				setInputMinutesValue={setInputMinutesValue}
				setTime={setTime}
				sendValue={sendValue}
				setSendValue={setSendValue}
				active={active}
				activate={activate}
				deactivate={deactivate}
				formattedTime={formattedTime}
				refetchTaskData={refetchTaskData}
				refetchUser={refetchUser}
				projectBudgetType={projectBudgetType}
			/>}
			<ConfirmModal
				active={activeConfirmModal}
				deactivate={deactivateConfirmModal}
				confirmDel={onDeleteTimerHandler}
				text={'Вы действительно хотите удалить запись о времени?'}
			/>
		</S.Timer>
	);
};
TimerComponent.displayName = 'Timer';

export const Timer = React.memo(TimerComponent);

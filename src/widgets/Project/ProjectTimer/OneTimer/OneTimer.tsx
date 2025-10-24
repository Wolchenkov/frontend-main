/* eslint-disable no-console */
import { FC } from 'react';
import { Actionable, Button, Divider, DropdownMenu, Text, Tooltip } from 'reshaped/bundle';
import { SvgComponent } from '../../../../shared';
import * as S from './OneTimer.styled';
import { PillCalendar } from '../../../../entities';
import { format } from 'date-fns';
import { PillTrackedTime } from '../../../../entities/Pills/PillsTimer/PillTrackedTime/PillTrackedTime';
import { PillTypeWork } from '../../../../entities/Pills/PillsTimer/PillTypeWork/PillTypeWork';
import { useOneTimerController } from './OneTimerController';

interface IOneTimer {
	timer: ITimerInUser;
	onSwitchTimerFunc: (project_issue_id: number) => void;
	refetchUser: any;
	user: IMember;
}

// vars
const resultMask = [/[0-9]/, /[0-9]/, ':', /[0-5]/, /[0-9]/];

export const OneTimer: FC<IOneTimer> = ({ timer, onSwitchTimerFunc, refetchUser, user }) => {
	const {
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
	} = useOneTimerController({ timer, onSwitchTimerFunc, refetchUser, user });
	return (
		<div key={timer.project_issue_id}>
			<S.Row>
				<div style={{ width: 250 }}>
					<S.TaskName variant='body-medium-2'>{timer.project_issue_name}</S.TaskName>
				</div>
				<S.TimerWrapper>
					{running ? (
						<Button
							variant='solid'
							color='primary'
							startIcon={<SvgComponent name='pause-mini-line' />}
							size='small'
							onClick={() => onSwitchTimerFunc(timer.project_issue_id)}
						/>
					) : (
						<Button
							size='small'
							color='white'
							variant='solid'
							startIcon={<SvgComponent name='play-mini-fill' />}
							onClick={() => onSwitchTimerFunc(timer.project_issue_id)}
						/>
					)}
					{isEditable ? (
						<S.InputMaskWrapper
							placeholder='00:00'
							maskPlaceholder={null}
							ref={timerRedactorRef}
							style={{
								caretColor: '#ff6633',
								position: 'absolute',
								transform: 'translateX(-50%)',
								left: '61px',
							}}
							mask={resultMask}
							value={inputValue}
							onChange={(e) => onInputChange(e)}
							onFocus={onFocusInput}
							onBlur={onBlurInput}
							onKeyDown={onKeyDownInput}
						/>
					) : (
						<S.TimerCurrentTime ref={timerRef}>
							<span>{timerHours()}</span>
							<S.TimerDotted running={timer.isRunning}>:</S.TimerDotted>
							<span>{timerMinutes()}</span>
						</S.TimerCurrentTime>
					)}

					<DropdownMenu active={active} position='bottom-end' onClose={deactivate} width='386'>
						<DropdownMenu.Trigger>
							{(attributes) => (
								<Button
									{...attributes}
									variant='solid'
									color='white'
									startIcon={<SvgComponent name='check-fill' />}
									size='small'
									onClick={sendFlag ? onSendTrackedTime : onOpenApproveModal}
								/>
							)}
						</DropdownMenu.Trigger>
						<DropdownMenu.Content>
							<S.TimerTrackDropdownHeader>
								<div style={{ width: '365px' }}>
									<S.TruncatedText variant='body-medium-2'>{timer.project_issue_name}</S.TruncatedText>
								</div>
								<SvgComponent
									onClick={deactivate}
									style={{ cursor: 'pointer', pointerEvents: 'all' }}
									name='close-line'
								/>
							</S.TimerTrackDropdownHeader>
							<Divider />
							<S.TimerTrackDropdownWrapper>
								<S.TimerTrackDropdownPillsWrapper>
									<PillCalendar
										title={format(new Date(), 'dd.MM')}
										name='data_start'
										onChange={updateTaskDate}
										inTask={true}
										value={date}
									/>
									<PillTrackedTime inputValue={inputTimeValue} setInputValue={setInputTimeValue} />
									<PillTypeWork
										active={isActiveTypeWork}
										activate={activateTypeWork}
										deactivate={deactivateTypeWork}
										typeWork={typeWork}
										setTypeWork={setTypeWork}
										typesWork={typesWork}
									/>
									<Tooltip position='top' text={isBillable ? 'Задача оплачивается' : 'Задача не оплачивается'}>
										{(attributes) => (
											<Button
												disabled={timer.project_budget === 'not_billable'}
												variant='solid'
												color={isBillable ? 'primary' : 'neutral'}
												startIcon={
													<SvgComponent name={isBillable ? 'money-ruble-circle-white' : 'money-ruble-circle-line'} />
												}
												size='small'
												attributes={{ ...attributes, style: { width: '36px' } }}
												onClick={() => setIsBillable(!isBillable)}
											/>
										)}
									</Tooltip>
								</S.TimerTrackDropdownPillsWrapper>
								<Text
									variant='caption-1'
									attributes={{
										style: {
											fontWeight: '500',
											letterSpacing: '-0.01em',
										},
									}}
								>
									Комментарий
								</Text>
								<S.TimerTrackDropdownTextArea value={comment} onChange={(e) => setComment(e.target.value)} />
								<S.TimerTrackDropdownBottomWrapper>
									<Button
										variant='solid'
										color='primary'
										size='small'
										disabled={typeWork === undefined || inputTimeValue.length < 5}
										onClick={approveTimer}
									>
										Сохранить
									</Button>
								</S.TimerTrackDropdownBottomWrapper>
							</S.TimerTrackDropdownWrapper>
						</DropdownMenu.Content>
					</DropdownMenu>
				</S.TimerWrapper>

				<DropdownMenu active={activeDelMenu} position='bottom-end' onClose={deactivateDelMenu} width='438px'>
					<DropdownMenu.Trigger>
						{(attributes) => (
							<Actionable {...attributes} onClick={activeDelMenu ? deactivateDelMenu : activateDelMenu}>
								<SvgComponent style={{ cursor: 'pointer', pointerEvents: 'all' }} name='close-line-gray' />
							</Actionable>
						)}
					</DropdownMenu.Trigger>
					<DropdownMenu.Content>
						<S.ContentHeader>
							<Text variant='body-medium-2' attributes={{ style: { letterSpacing: '-0.02em' } }}>
								Таймер
							</Text>
							<SvgComponent
								onClick={deactivateDelMenu}
								style={{ cursor: 'pointer', pointerEvents: 'all' }}
								name='close-line'
							/>
						</S.ContentHeader>
						<Divider />
						<S.ContentWrapper>
							<Text variant='body-medium-2' attributes={{ style: { letterSpacing: '-0.02em' } }}>
								Удалить таймер?
							</Text>
							<S.ButtonWrapper>
								<Button variant='solid' color='black' size='small' onClick={delTimer}>
									Удалить
								</Button>
								<Button variant='solid' size='small' onClick={deactivateDelMenu}>
									Отменить
								</Button>
							</S.ButtonWrapper>
						</S.ContentWrapper>
					</DropdownMenu.Content>
				</DropdownMenu>
			</S.Row>
		</div>
	);
};

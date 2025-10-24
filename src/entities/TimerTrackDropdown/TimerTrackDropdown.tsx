import { Actionable, Button, DropdownMenu, Text, Tooltip } from 'reshaped/bundle';
import { SvgComponent } from '../../shared';
import React, { FC, Dispatch, SetStateAction } from 'react';
import * as S from './TimerTrackDropdown.styled';
import { PillDropdownTrackedTime } from '../Pills/PillsTimer/PillDropdownTrackedTime/PillDropdownTrackedTime';
import { PillTypeWork } from '../Pills/PillsTimer/PillTypeWork/PillTypeWork';
import { PillCalendar } from '../Pills/PillCalendar/PillCalendar';
import { format } from 'date-fns';
import { useTimerTrackDropdownController } from './TimerTrackDropdownController';

interface TimerTrackDropdownProps {
	isRunning: boolean;
	setIsRunning: Dispatch<SetStateAction<boolean>>;
	setIsBackendRunning: Dispatch<SetStateAction<boolean>>;
	setIsDeletableTimer: Dispatch<SetStateAction<boolean>>;
	setInputHoursValue: Dispatch<SetStateAction<string>>;
	setInputMinutesValue: Dispatch<SetStateAction<string>>;
	setTime: Dispatch<SetStateAction<number>>;
	sendValue: string;
	setSendValue: Dispatch<SetStateAction<string>>;
	active: boolean;
	activate: () => void;
	deactivate: () => void;
	formattedTime: string;
	refetchTaskData: any;
	refetchUser: any;
	projectBudgetType: string;
}

export const TimerTrackDropdown: FC<TimerTrackDropdownProps> = ({
	isRunning,
	setIsRunning,
	setIsBackendRunning,
	setIsDeletableTimer,
	setInputHoursValue,
	setInputMinutesValue,
	setTime,
	sendValue,
	setSendValue,
	active,
	activate,
	deactivate,
	formattedTime,
	refetchTaskData,
	refetchUser,
	projectBudgetType,
}) => {
	const {
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
	} = useTimerTrackDropdownController({
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
	});

	return (
		<DropdownMenu active={active} width='386' position='bottom-end' onClose={deactivate}>
			<DropdownMenu.Trigger>
				{(attributes) => (
					active ? (
						<Actionable
							attributes={{ ...attributes, style: { paddingRight: '4px', position: 'absolute', right: 0 } }}
							as='div'
						>
							<Button
								{...attributes}
								variant='solid'
								startIcon={<SvgComponent name='close-line' />}
								size='small'
								onClick={deactivate}
							/>
						</Actionable>
					) : (
						<Tooltip
							position='bottom'
							text='Сохранить время'
						>
							{(tooltipAttributes) =>
								<Actionable
									attributes={{...tooltipAttributes, style: { paddingRight: '4px', position: 'absolute', right: 0 } }}
									as='div'
								>
									<Button
										{...attributes}
											variant='ghost'
											startIcon={<SvgComponent name='check-fill' />}
											size='small'
											onClick={onOpenApproveModal}
									/>
								</Actionable>
							}
						</Tooltip>
					)
				)}
			</DropdownMenu.Trigger>

			<DropdownMenu.Content>
				<S.TimerTrackDropdownWrapper>
					<S.TimerTrackDropdownPillsWrapper>
						<PillCalendar
							title={format(new Date(), 'dd.MM')}
							name='data_start'
							onChange={updateTaskDate}
							inTask={true}
						/>
						<PillDropdownTrackedTime
							formattedTime={formattedTime}
							inputTimeValue={sendValue}
							setInputTimeValue={setInputTimeValue}
						/>
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
									disabled={projectBudgetType === 'not_billable'}
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
							disabled={typeWork === undefined || !(/[^:0]/).test(inputTimeValue)}
							onClick={onApproveTimer}
						>
							Сохранить
						</Button>
					</S.TimerTrackDropdownBottomWrapper>
				</S.TimerTrackDropdownWrapper>
			</DropdownMenu.Content>
		</DropdownMenu>
	);
};
